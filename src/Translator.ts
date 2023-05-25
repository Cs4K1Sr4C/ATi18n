import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { Configuration, OpenAIApi } from "openai";
import * as TextCompletionPrompts from "./prompts/text/prompts";
import "./utils/helpers";
import { REGEXES } from "./utils/regexes";
import { setTimeout } from "node:timers/promises";

dotenv.config();
console.log(process.env.OPENAI_TRANSLATION_METHOD);

interface TranslationOptions {
  debug?: boolean;
  srcLang?: string | "en";
  targetLang?: string | null;
  availableLangs?: string[] | null;
  translateToAllAllowed?: boolean;
  translatorService?: string;
  openaiTranslationMethod?: string;
  isI18nConfigFileExist?: boolean;
  i18nConfigFilePath?: string;
}

interface KeyNamespacePair {
  key: string;
  namespace: string;
}

interface KeyTextNamespacePair {
  key: string;
  defaultText: string;
  namespace: string;
}

interface Translations {
  [key: string]: string;
}

class Translator {
  private srcLang: string | null;
  private targetLang: string | null;
  private translateToAllAllowed: boolean;
  private keyNamespacePairs: KeyNamespacePair[];
  private keyTextNamespacePairs: KeyTextNamespacePair[];
  private translatorService: string;
  private openaiTranslationMethod: string;
  private configuration: Configuration | undefined;
  private openai: OpenAIApi | undefined;
  private debug: boolean;
  private translationsDir: string | undefined;
  private translationDir: string | undefined;
  private srcDirectory: any;

  constructor(options?: TranslationOptions) {
    this.srcLang = options?.srcLang || null;
    this.targetLang = options?.targetLang || null;
    this.translateToAllAllowed = options?.translateToAllAllowed || false;
    this.keyNamespacePairs = [];
    this.keyTextNamespacePairs = [];
    this.translatorService =
      options?.translatorService || process.env.TRANSLATOR_SERVICE || "google";
    this.openaiTranslationMethod =
      options?.openaiTranslationMethod ||
      process.env.OPENAI_TRANSLATION_METHOD ||
      "chat";
    this.debug = options?.debug || false;

    if (
      this.translatorService === "openai" &&
      process.env.OPENAI_API_KEY !== ""
    ) {
      this.configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.openai = new OpenAIApi(this.configuration);
    } else {
      throw new Error(
        "ERROR: OpenAI API key is not set but the translator service is set to 'openai'"
      );
    }
  }

  private collectKeyNamespacePairs(directory: string): void {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        this.collectKeyNamespacePairs(filePath); // Recursively process subdirectories
      } else if (
        stats.isFile() &&
        (file.endsWith(".ts") || file.endsWith(".tsx"))
      ) {
        this.extractKeyNamespacePairs(filePath);
      }
    });
  }

  private extractKeyNamespacePairs(filePath: string): void {
    let fileContent: string = fs.readFileSync(filePath, "utf8");

    const regex: RegExp =
      /(?:translate\(|i18n\?\.t\(|t\()['"](?!(?:\\n|a)['"])([^'"]+)['"](?:\s?,\s?['"]([^'"]+)['"])?(?:,\s?['"]([^'"]+)['"])?\)/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(fileContent)) !== null) {
      const key: string = match[1];
      let defaultText: string = match[3]
        ? match[2]
        : match[2] !== ""
        ? match[2]
        : "common";
      let namespace: string = match[3]
        ? match[3] !== ""
          ? match[3]
          : "common"
        : match[2]
        ? match[2] !== ""
          ? match[2]
          : "common"
        : "common";
      if (this.debug && !match[3] && !match[4]) {
        console.log(
          key +
            " at line " +
            fileContent.substring(0, regex.lastIndex).split("\n").length +
            " " +
            filePath
        );
      }

      if (match[3]) {
        this.keyTextNamespacePairs.push({ key, defaultText, namespace });
        const replacement: string = `translate("${key}", "${namespace}")`;
        fileContent = fileContent.replace(match[0], replacement);
      } else {
        this.keyNamespacePairs.push({ key, namespace });
      }
    }
    fs.writeFileSync(filePath, fileContent, "utf8");
  }

  async translateAndWriteFiles(): Promise<void> {
    this.translationsDir = path.join(__dirname, "public", "locales", "ati18n");

    if (!fs.existsSync(this.translationsDir)) {
      fs.mkdirSync(this.translationsDir);
    }

    if (this.translateToAllAllowed) {
      const allowedLocales = await this.detectAllowedLocales();
      for (const locale of allowedLocales) {
        this.targetLang = locale;
        this.translationDir = path.join(this.translationsDir, locale);

        if (fs.existsSync(this.translationDir)) {
          fs.rmdirSync(this.translationDir, { recursive: true });
        }

        fs.mkdirSync(this.translationDir);

        await Promise.all(
          this.keyNamespacePairs.map(async ({ key, namespace }) => {
            const srcLangFilePath = path.join(
              __dirname,
              "public",
              "locales",
              this.srcLang,
              `${namespace}.json`
            );
            const targetLangFilePath = path.join(
              this.translationDir,
              `${namespace}.json`
            );
            if (!fs.existsSync(targetLangFilePath)) {
              fs.writeFileSync(targetLangFilePath, "{}");
            }

            const sourceTranslationValue = this.getTranslationValue(
              srcLangFilePath,
              key
            );
            if (sourceTranslationValue !== "") {
              const translatedValue = await this.translateText(
                sourceTranslationValue
              );
              this.writeTranslationFile(
                targetLangFilePath,
                key,
                translatedValue
              );
            } else {
              this.writeTranslationFile(
                targetLangFilePath,
                key,
                process.env.MISSING_TRANSLATION_PLACEHOLDER
              );
            }
            if (this.keyTextNamespacePairs.length > 0) {
              await Promise.all(
                this.keyTextNamespacePairs.map(
                  async ({ key, defaultText, namespace }) => {
                    const targetLangFilePath = path.join(
                      this.translationDir,
                      `${namespace}.json`
                    );
                    if (!fs.existsSync(targetLangFilePath)) {
                      fs.writeFileSync(targetLangFilePath, "{}");
                    }
                    const sourceTranslationValue = defaultText;
                    if (sourceTranslationValue !== "") {
                      const translatedValue = await this.translateText(
                        sourceTranslationValue
                      );
                      this.writeTranslationFile(
                        targetLangFilePath,
                        key,
                        translatedValue
                      );
                    } else {
                      this.writeTranslationFile(
                        targetLangFilePath,
                        key,
                        process.env.MISSING_TRANSLATION_PLACEHOLDER
                      );
                    }
                  }
                )
              );
            }
          })
        );
      }
    } else {
      this.translationDir = path.join(
        __dirname,
        "public",
        "locales",
        "ati18n",
        this.targetLang
      );

      if (fs.existsSync(this.translationDir)) {
        fs.rmdirSync(this.translationDir, { recursive: true });
      }

      fs.mkdirSync(this.translationDir);

      await Promise.all(
        this.keyNamespacePairs.map(async ({ key, namespace }) => {
          const srcLangFilePath = path.join(
            __dirname,
            "public",
            "locales",
            this.srcLang,
            `${namespace}.json`
          );
          const targetLangFilePath = path.join(
            this.translationDir,
            `${namespace}.json`
          );
          if (!fs.existsSync(targetLangFilePath)) {
            fs.writeFileSync(targetLangFilePath, "{}");
          }

          const sourceTranslationValue = this.getTranslationValue(
            srcLangFilePath,
            key
          );
          if (sourceTranslationValue !== "") {
            const translatedValue = await this.translateText(
              sourceTranslationValue
            );
            this.writeTranslationFile(targetLangFilePath, key, translatedValue);
          } else {
            this.writeTranslationFile(
              targetLangFilePath,
              key,
              process.env.MISSING_TRANSLATION_PLACEHOLDER
            );
          }
        })
      );

      if (this.keyTextNamespacePairs.length > 0) {
        await Promise.all(
          this.keyTextNamespacePairs.map(
            async ({ key, defaultText, namespace }) => {
              const targetLangFilePath = path.join(
                this.translationDir,
                `${namespace}.json`
              );
              if (!fs.existsSync(targetLangFilePath)) {
                fs.writeFileSync(targetLangFilePath, "{}");
              }
              const sourceTranslationValue = defaultText;
              if (sourceTranslationValue !== "") {
                const translatedValue = await this.translateText(
                  sourceTranslationValue
                );
                this.writeTranslationFile(
                  targetLangFilePath,
                  key,
                  translatedValue
                );
              } else {
                this.writeTranslationFile(
                  targetLangFilePath,
                  key,
                  process.env.MISSING_TRANSLATION_PLACEHOLDER
                );
              }
            }
          )
        );
      }
    }
  }

  getTranslationValue(filePath: string, key: string): string {
    if (!fs.existsSync(filePath)) {
      return "";
    }
    const content = fs.readFileSync(filePath, "utf8");
    const translations = JSON.parse(content);
    const keys = key.split(".");
    let value = translations;
    for (const k of keys) {
      if (value.hasOwnProperty(k)) {
        value = value[k];
      } else {
        value = "";
        break;
      }
    }
    return value;
  }

  async translateText(sourceTranslationValue: string): Promise<string> {
    if (this.translatorService === "google") {
      return await this.GoogleTranslate(
        this.srcLang,
        this.targetLang,
        sourceTranslationValue
      );
    } else if (
      this.translatorService === "openai" &&
      this.openaiTranslationMethod === "chat"
    ) {
      const USER_PROMPT = `What you have to translate is: "${sourceTranslationValue}"\nThe language code you have to use is: ${this.targetLang}`;
      return await this.translateViaChatCompletion(USER_PROMPT);
    } else if (
      this.translatorService === "openai" &&
      this.openaiTranslationMethod === "text"
    ) {
      const TRANSLATE_PROMPT = `Translate the ${sourceTranslationValue} text using the ${this.targetLang} language code then respond only with the translated text.`;
      return await this.translateViaTextCompletion(TRANSLATE_PROMPT);
    } else {
      console.log("No translator service selected.");
      return "";
    }
  }

  writeTranslationFile(
    filePath: string,
    key: string,
    translatedValue: string
  ): void {
    if (!fs.existsSync(this.translationDir)) {
      fs.mkdirSync(this.translationDir, { recursive: true });
    }

    const translation = { [key]: translatedValue };

    if (fs.existsSync(filePath)) {
      const existingContent = fs.readFileSync(filePath, "utf8");
      let existingTranslations: Translations = {};

      try {
        existingTranslations = JSON.parse(existingContent);
      } catch (error) {
        console.error(`Error parsing existing translations file: ${filePath}`);
      }

      const mergedTranslations = { ...existingTranslations, ...translation };

      const sortedTranslations = Object.keys(mergedTranslations)
        .sort()
        .reduce((sortedObj: Translations, sortedKey) => {
          sortedObj[sortedKey] = mergedTranslations[sortedKey];
          return sortedObj;
        }, {});

      const mergedContent = JSON.stringify(sortedTranslations, null, 2);

      fs.writeFileSync(filePath, mergedContent, "utf8");
    } else {
      const content = JSON.stringify(translation, null, 2);
      fs.writeFileSync(filePath, content, "utf8");
    }
  }

  private async detectAllowedLocales(): Promise<string[]> {
    // Detect the allowed locales by analyzing the i18n config file and then return an array of detected locales
    return [
      "br",
      "de",
      "es",
      "fr",
      "hi",
      "hu",
      "ja",
      "ru",
      "th",
      "en",
      "ko",
      "pt",
      "ar",
      "id",
      "it",
      "uk",
      "zh",
      "vi",
      "au",
      "gb",
      "lt",
      "cs",
      "el",
      "sv",
      "da",
      "fi",
      "no",
      "tr",
      "tw",
      "bg",
    ];
  }

  async suggestKeyAndNamespace(
    defaultText: string,
    fileName: string
  ): Promise<{ key: string; namespace: string }> {
    if (
      this.translatorService === "openai" &&
      this.openaiTranslationMethod === "chat"
    ) {
      const MASTER_PROMPT = `As ATi18n, the translation integrator AI, you need to wait for the user to provide a default text and a file name. Once provided, you will suggest a KEY and NAMESPACE based on the given text.\n\nYou have to respond only with a JSON-parseable object with the following syntax:\n\n{key: "THE_SUGGESTED_KEY", namespace: "the_suggested_namespace", default_text: "the_given_default_text"}`;
      const USER_PROMPT = `The default text is: "${defaultText}"\nThe filename is: "${fileName}"`;
      const result = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        messages: [
          { role: "system", content: MASTER_PROMPT },
          { role: "user", content: USER_PROMPT },
        ],
      });

      const suggestion = result.data.choices[0].message.content.trim();
      const [key, namespace] = suggestion.split("|").map((part) => part.trim());

      return { key, namespace };
    } else if (
      this.translatorService === "openai" &&
      this.openaiTranslationMethod === "text"
    ) {
      const MASTER_PROMPT = `Suggest key and namespace for the following default text: "${defaultText}"\nFor the namespace suggestion analyze the following filename: "${fileName}"\nRespond only with a JSON-parseable object by the following syntax: {key: "capitalized_sneak_case_capitalized_suggestion_key", namespace: "suggested_namespace"}`;
      const result = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: MASTER_PROMPT,
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const suggestion = result.data.choices[0].text.trim();
      const [key, namespace] = suggestion.split("|").map((part) => part.trim());

      return { key, namespace };
    } else {
      throw new Error("Invalid translation service or translation method");
    }
  }

  async generateLanguageSyntaxes(languages: any[]): Promise<any> {
    if (
      this.translatorService === "openai" &&
      this.openaiTranslationMethod === "chat"
    ) {
      const MASTER_PROMPT = `As ATi18n, the translation integrator AI, you are tasked with generating the language syntax for a given set of languages. The languages array contains the language codes. You need to return the syntax for each language in the following format:\n\n{ code: '{languageCode}', name: '{languageName}', flag: '{languageFlag}' }\n\nPlease respond with a JSON-parseable array of language syntaxes based on the input languages.`;

      console.log(languages);
      const USER_PROMPT = JSON.stringify(languages);
      console.log(USER_PROMPT);

      const result = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        messages: [
          { role: "system", content: MASTER_PROMPT },
          { role: "user", content: USER_PROMPT },
        ],
      });

      const response = result.data.choices[0].message.content.trim();
      const syntaxes = JSON.parse(response);

      console.log(syntaxes);

      return syntaxes;
    } else if (
      this.translatorService === "openai" &&
      this.openaiTranslationMethod === "text"
    ) {
      const MASTER_PROMPT = `As ATi18n, the translation integrator AI, you are tasked with generating the language syntax for a given set of languages. The languages array contains the language codes. You need to return the syntax for each language in the following format:\n\n{ code: '{languageCode}', name: '{languageName}', flag: '{languageFlag}' }\n\nPlease respond with a JSON-parseable array of language syntaxes based on the input languages. The languages:  ${languages}`;

      const prompt = MASTER_PROMPT;
      const result = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const suggestion = result.data.choices[0].text.trim();
      const syntaxes = JSON.parse(suggestion);

      console.log(syntaxes);

      return syntaxes;
    }
  }

  async synchronizeTranslations(sourceLang: string): Promise<void> {
    const sourceLangDir = path.join(__dirname, "public", "locales", sourceLang);

    if (!fs.existsSync(sourceLangDir)) {
      throw new Error(
        `Source language directory '${sourceLangDir}' does not exist.`
      );
    }

    const sourceLangFiles = fs.readdirSync(sourceLangDir);

    for (const sourceFile of sourceLangFiles) {
      const sourceFilePath = path.join(sourceLangDir, sourceFile);
      const sourceContent = fs.readFileSync(sourceFilePath, "utf8");
      const sourceTranslations = JSON.parse(sourceContent);

      const sourceNamespace = sourceFile.slice(0, -5); // Remove '.json' extension

      for (const lang of await this.detectAllowedLocales()) {
        if (lang === sourceLang) {
          continue; // Skip the source language
        }

        const targetLangDir = path.join(__dirname, "public", "locales", lang);
        const targetFilePath = path.join(
          targetLangDir,
          `${sourceNamespace}.json`
        );

        if (!fs.existsSync(targetLangDir)) {
          throw new Error(
            `Target language directory '${targetLangDir}' does not exist for language '${lang}'.`
          );
        }

        let targetTranslations: { [key: string]: any } = {};
        if (fs.existsSync(targetFilePath)) {
          const targetContent = fs.readFileSync(targetFilePath, "utf8");
          targetTranslations = JSON.parse(targetContent);
          for (const [key, value] of Object.entries(sourceTranslations)) {
            if (!(key in targetTranslations)) {
              const translatedValue = await this.translateText(
                value === undefined ? "" : "null"
              );
              targetTranslations[key] = translatedValue; // Add index signature
            }
          }
        }

        const sortedTranslations = Object.keys(targetTranslations)
          .sort()
          .reduce((sortedObj: { [key: string]: any }, sortedKey) => {
            sortedObj[sortedKey] = targetTranslations[sortedKey];
            return sortedObj;
          }, {});

        const mergedContent = JSON.stringify(sortedTranslations, null, 2);

        fs.writeFileSync(targetFilePath, mergedContent, "utf8");
      }
    }
  }

  // Services
  // GoogleTranslate
  GoogleTranslate = async (
    sourceLanguageCode: string,
    targetLanguageCode: string,
    sourceTranslationValue: string
  ): Promise<string> => {
    const params = new URLSearchParams({
      client: "gtx",
      sl: sourceLanguageCode,
      tl: targetLanguageCode,
      dt: "t",
      q: sourceTranslationValue,
    }).toString();

    const url = `https://translate.google.com/translate_a/single?${params}`;

    const translationResult = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const translatedText = data[0][0][0];
        return translatedText;
      })
      .catch((error) => console.log(error));

    return translationResult !== undefined
      ? translationResult.replace(/^['"`]+|['"`]+$/g, "")
      : "";
  };

  // Translate via OpenAI ChatCompletion
  translateViaChatCompletion = async (USER_PROMPT: string): Promise<string> => {
    const MASTER_PROMPT =
      "You are a professional translator named ATi18n. You have to wait for the user to provide the translatable text and the target language's code. You have to respond ONLY with the translated text.";
    const translationResult = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages: [
        { role: "system", content: MASTER_PROMPT },
        { role: "user", content: USER_PROMPT },
      ],
    });
    return translationResult.data.choices[0].message.content.replace(
      /^['",`]+|['",`]+$/g,
      ""
    );
  };

  // Translate via OpenAI TextCompletion
  translateViaTextCompletion = async (
    TRANSLATE_PROMPT: string
  ): Promise<string> => {
    const translationResult = await this?.openai?.createCompletion({
      model: "text-davinci-003",
      prompt: TRANSLATE_PROMPT,
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    if (translationResult?.data.choices[0].text) {
      return translationResult.data.choices[0].text
        .split("\n\n")[1]
        .replace(/^['",`]+|['",`]+$/g, "");
    } else {
      return "";
    }
  };

  // main run
  async run(srcDirectory: string): Promise<void> {
    console.log(
      `[ATi18n]:> Starting translation process for ${this.srcDirectory} directory`
    );
    this.collectKeyNamespacePairs(srcDirectory);
    await this.translateAndWriteFiles();
    console.log("[ATi18n]:> Translation files generated successfully.");
  }
}

export default Translator;

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

interface TranslationOptions {
  srcLang?: string | null;
  targetLang?: string | null;
  translateToAllAllowed?: boolean;
  manualMode?: boolean;
  transService?: string;
  openaiTranslationMethod?: string;
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

class Translator {
  private srcLang: string | null;
  private targetLang: string | null;
  private translateToAllAllowed: boolean;
  private keyNamespacePairs: KeyNamespacePair[];
  private keyTextNamespacePairs: KeyTextNamespacePair[];
  private manualMode: boolean;
  private translatorService: string;
  private openaiTranslationMethod: string;
  private configuration: Configuration | undefined;
  private openai: OpenAIApi | undefined;
  private debug: boolean;
  private translationsDir: string | undefined;
  private translationDir: string | undefined;

  constructor(options: TranslationOptions) {
    this.srcLang = options.srcLang || null;
    this.targetLang = options.targetLang || null;
    this.translateToAllAllowed = options.translateToAllAllowed || false;
    this.keyNamespacePairs = [];
    this.keyTextNamespacePairs = [];
    this.manualMode = options.manualMode || false;
    this.translatorService =
      options.transService || process.env.TRANSLATOR_SERVICE || 'google';
    this.openaiTranslationMethod =
      options.openaiTranslationMethod ||
      process.env.OPENAI_TRANSLATION_METHOD ||
      'chat';
    this.debug = false;

    if (
      this.translatorService === 'openai' &&
      process.env.OPENAI_API_KEY !== ''
    ) {
      this.configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.openai = new OpenAIApi(this.configuration);
    } else {
      throw new Error(
        "ERROR: OpenAI API key is not set but the translator service is set to 'openai'",
      );
    }
  }

  public collectKeyNamespacePairs(directory: string): void {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        this.collectKeyNamespacePairs(filePath); // Recursively process subdirectories
      } else if (
        stats.isFile() &&
        (file.endsWith('.ts') || file.endsWith('.tsx'))
      ) {
        this.extractKeyNamespacePairs(filePath);
      }
    });
  }

  public extractKeyNamespacePairs(filePath: string): void {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    const regex =
      /(?:translate\(|i18n\?\.t\(|t\()['"](?!(?:\\n|a)['"])([^'"]+)['"](?:\s?,\s?['"]([^'"]+)['"])?(?:,\s?['"]([^'"]+)['"])?\)/g;
    let match;

    while ((match = regex.exec(fileContent)) !== null) {
      const key = match[1];
      let defaultText = match[3]
        ? match[2]
        : match[2] !== ''
        ? match[2]
        : 'common';
      let namespace = match[3]
        ? match[3] !== ''
        ? match[3]
        : 'common'
        : match[2]
        ? match[2] !== ''
        ? match[2]
        : 'common'
        : 'common';

      const keyNamespacePair: KeyNamespacePair = {
        key,
        namespace,
      };

      const keyTextNamespacePair: KeyTextNamespacePair = {
        key,
        defaultText,
        namespace,
      };

      this.keyNamespacePairs.push(keyNamespacePair);
      this.keyTextNamespacePairs.push(keyTextNamespacePair);
    }
  }

  // TODO: Format the rest of the Translator class from the ../translator.cjs
}

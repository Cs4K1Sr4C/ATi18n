import { PromptTemplate } from "langchain/prompts";

export const generateLanguageObjectWithItsCodeNameAndFlagIcon = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, you are tasked with generating the language syntax for a given set of languages. The languages array contains the language codes. You need to return the syntax for each language in the following format:\n\n{ code: '{languageCode}', name: '{languageName}', flag: '{languageFlag}' }\n\nPlease respond with a JSON-parseable array of language syntaxes based on the input languages.`,
  inputVariables: ["languages"],
});

export const generateNextI18nextConfig = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, you are tasked with generating the next-i18next configuration for seamless integration into a project. Given the project requirements and available translations, provide the necessary configuration options. Consider aspects such as supported languages, translation file locations, fallback options, and namespaces.\n\nPlease respond with a JSON-parseable object containing the next-i18next configuration.`,
  inputVariables: ["projectRequirements", "translations"],
});

export const extractTranslatableText = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, your role is to extract translatable text from the source code of a project. Given the project's source code in {programmingLanguage}, identify all the text that requires translation and provide the necessary information for localization. Consider different text formats, such as strings, JSX components, or template literals.\n\nPlease respond with a JSON-parseable object containing the extracted translatable text and relevant metadata.`,
  inputVariables: ["programmingLanguage"],
});

export const generateTranslationFiles = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, you need to generate translation files compatible with next-i18next for a given set of languages. Provide the translations for each language in the required format, considering the structure and naming conventions expected by next-i18next. The translations should be provided as key-value pairs, with the keys corresponding to the translatable text.\n\nPlease respond with a JSON-parseable object containing the generated translation files.`,
  inputVariables: ["languages", "namespaces"],
});

export const updateNextI18nextConfig = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, you are responsible for updating the next-i18next configuration when new translations become available. Given the existing configuration and the new translations, suggest the required modifications to incorporate the new languages and namespaces. Consider aspects such as adding language codes, updating namespaces, and configuring fallback options.\n\nPlease respond with a JSON-parseable object containing the updated next-i18next configuration.`,
  inputVariables: ["existingConfig", "newTranslations"],
});

export const analyzeDirectoryStructureAndSuggestNamespacesForLaterUsage= new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, you have to analyze the given directory structure to be able to provide the best namespaces you'll use later for the translations. The structure: {structure}\n\n You have to respond only with the suggested namespaces in a JSON-parseable Array!`,
  inputVariables: ["directoryStructure"],
});

export const suggestTranslationStrategies = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, you are tasked with suggesting translation strategies for multilingual content. Given the content in {sourceLanguage}, provide a set of strategies for translating it into {targetLanguage}. Consider factors such as cultural nuances, context, and target audience.\n\nPlease respond with a JSON-parseable array of suggested translation strategies.`,
  inputVariables: ["sourceLanguage", "targetLanguage"],
});

export const evaluateLanguageQuality = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, you are responsible for evaluating the language quality in translated texts. Given a set of translated sentences in {targetLanguage}, analyze and provide a quality assessment for each sentence. Consider aspects such as grammar, coherence, fluency, and adherence to the source meaning.\n\nPlease respond with a JSON-parseable array of quality assessments for the translated sentences.`,
  inputVariables: ["targetLanguage"],
});

export const generateLocalizedLabels = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, your task is to generate localized user interface labels. Given a set of English labels, create the corresponding translations in {targetLanguage}. Consider the context and best practices for UI translations to ensure optimal user experience.\n\nPlease respond only with a JSON-parseable object containing the localized labels.`,
  inputVariables: ["targetLanguage"],
});

export const adaptTextForDialects = new PromptTemplate({
  template: `As ATi18n, the translation integrator AI, you are tasked with adapting translated texts for dialectal variations. Given a set of texts in {sourceLanguage}, generate alternative translations or adaptations that are suitable for different dialects within {targetLanguage}. Consider regional differences, idiomatic expressions, and linguistic preferences.\n\nPlease respond only with a JSON-parseable array of adapted translations for each text.`,
  inputVariables: ["sourceLanguage", "targetLanguage"],
});

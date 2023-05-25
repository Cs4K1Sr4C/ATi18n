import * as fs from 'fs';
import { I18n } from 'i18n';
const i18n = new I18n();

function detectDefaultLanguage(): string {
    // TODO: Implement the logic to detect the default language here
    // For example: process.env.LANG or os.userInfo().lang
    // Default language is 'en'
    return 'en';
}

function loadTranslation(languageCode?: string) {
    // Configure the module
    i18n.configure({
        locales: ['en', 'hu', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'zh'],
        defaultLocale: 'en',
        directory: '../locales',
        objectNotation: true,
        updateFiles: false,
    });

    // Load the translation
    try {
        i18n.setLocale(languageCode);
    } catch (error) {
        console.error(`[🤖]:> Error loading translation for language: ${languageCode}`);
        console.error(`[🤖]:> Falling back to English (en)`);
        i18n.setLocale('hu');
    }

}

let translations = {};

const loadTranslations = (locale: number | string) => {
    const translationFile = `../locales/${locale}.json`;
    if (fs.existsSync(translationFile)) {
        const translationData = fs.readFileSync(translationFile, 'utf8');
        translations = JSON.parse(translationData);
    } else {
        console.error(`Translation file not found for locale ${locale}`);
    }
};

const __ = (key: string) => {
    const localeTranslations = translations;
    return localeTranslations ? localeTranslations || key : key;
};

i18n.configure({
    locales: ['en', 'hu', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'zh'],
    defaultLocale: 'hu',
    directory: '../locales',
    objectNotation: true,
    updateFiles: false,
});

i18n.setLocale("hu");

export default i18n;
import * as i18n from 'i18n';

function detectDefaultLanguage(): string {
    // TODO: Implement the logic to detect the default language here
    // For example: process.env.LANG or os.userInfo().lang
    // Default language is 'en'
    return 'en';
}

function loadTranslation(languageCode: string) {
    // Configure the module
    i18n.configure({
        locales: ['en', 'hu', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'ru', 'zh'],
        defaultLocale: 'en',
        directory: '../locales',
    });

    // Load the translation
    try {
        i18n.setLocale(languageCode);
    } catch (error) {
        console.error(`[🤖]:> Error loading translation for language: ${languageCode}`);
        console.error(`[🤖]:> Falling back to English (en)`);
        i18n.setLocale('en');
    }

}


const defaultLanguage = detectDefaultLanguage();

loadTranslation(defaultLanguage);

export default loadTranslation;
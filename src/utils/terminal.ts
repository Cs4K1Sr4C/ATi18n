import Translator from '../Translator';
import * as p from '@clack/prompts';

export const promptTranslateEntireProject = async () => {
  const translateEntireProject = await p.confirm({
    message: '[ATi18n]:> Would you like me to translate the entire project automatically to all the locales you have enabled? (y/n)',
  });
  return translateEntireProject ? 'yes' : 'no';
};

export const promptTranslationMode = async () => {
  const translationMode = await p.select({
    message: '[ATi18n]:> Which kind of translation process would you like me to run?\n1. I have the translatable parts WITHOUT {key} and {namespace} declaration\n2. I have the translatable parts WITHOUT {default text} but the {key} and {namespace} are declared\n3. I have only the {default text} and the {namespace} declarations, but some parts contain only the {default text}\nChoose a number!',
    options: [
      { label: '1. Translatable parts without {key} and {namespace}', value: '1' },
      { label: '2. Translatable parts without {default text}', value: '2' },
      { label: '3. Translatable parts with only {default text}', value: '3' },
    ],
  });
  return translationMode;
};

(async () => {
  const translateEntireProject = await promptTranslateEntireProject();

  if (translateEntireProject === 'yes') {
    const translationMode = await promptTranslationMode();

    if (translationMode === '1') {
      console.log('[ATi18n]:> Translation mode 1 selected. I will create the keys and namespaces for you.');
      const translator = new Translator({ translateToAllAllowed: true, srcLang: 'en' });
      translator.run('src');
    } else if (translationMode === '2') {
      console.log('[ATi18n]:> Translation mode 2 selected.');
      // TODO: Implement the logic for translation mode 2
    } else if (translationMode === '3') {
      console.log('[ATi18n]:> Translation mode 3 selected.');
      // TODO: Implement the logic for translation mode 3
    } else {
      console.log('[ATi18n]:> Invalid translation mode selected.');
    }
  } else {
    const translationMode = await promptTranslationMode();

    if (translationMode === '1') {
      console.log('[ATi18n]:> Translation mode 1 selected. I will create the keys and namespaces for you.');

      const srcLang = await p.text({ message: '[ATi18n]:> Enter source language code (Default: EN): ' });
      const targetLang = await p.text({ message: '[ATi18n]:> Enter target language code (Default: HU): ' });

      const translator = new Translator({ srcLang: srcLang as string || 'en', targetLang: targetLang as string || 'hu' });
      translator.run('src');
    } else if (translationMode === '2') {
      console.log('[ATi18n]:> Translation mode 2 selected.');
      // TODO: Implement the logic for translation mode 2
    } else if (translationMode === '3') {
      console.log('[ATi18n]:> Translation mode 3 selected.');
      // TODO: Implement the logic for translation mode 3
    } else {
      console.log('[ATi18n]:> Invalid translation mode selected.');
    }
  }

  process.exit(0);
})();

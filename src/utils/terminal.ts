import Translator from '../Translator';
import * as p from '@clack/prompts';
import color from 'picocolors';
import { exec } from 'child_process';
import runFlaskServer from './flaskServer';
import { setTimeout } from 'node:timers/promises';

export const selectMainMenu: any = async () => {
  const mainMenu = await p.select({
    message: "[🤖]:> What would you like to do?",
    options: [
      { label: "Extract", value: 1 },
      { label: "Translate", value: 2 },
      { label: "Settings", value: 3 },
      { label: "Help", value: 4 },
      { label: "Exit", value: "X" },
    ]
  })
}

export const selectSettingsMenu: any = async () => {
  console.clear();
  const settingsMenu = await p.select({
    message: "[🤖]:> What would you like to do?",
    options: [
      { label: "Change Translation Service", value: 1 },
      { label: "Set/Change OpenAI key", value: 2 },
      { label: "Set/Change OpenAI Translation Mode", value: 3 },
      { label: "Set/change OpenAI Model", value: "4" },
      { label: "Enable/Disable Suggestions for KEY and NAMESPACE", value: 5 },
      { label: "Enable/Disable Debug mode", value: 6 },
      { label: "Back to the Main menu", value: "X" },
    ]
  })
}

export const promptExit = async () => {
  console.clear();
  const Exit = await p.confirm({
    message: '[🤖]:> It seems everything is done. Would you like to exit or do yo need my assistance more?',
  });
  return Exit ? 'I want to EXIT' : 'I need you more...';
};

export const promptFlaskServer = async () => {
  console.clear();
  const flaskServer = await p.confirm({
    message: '[🤖]:> Would you like me to run in the background a Web-based view?\nNote: This needs python installed on your computer; it will set-up a Flask server and serves the web-based view on port 5000)',
  });
  return flaskServer ? 'yes' : 'no';
};

export const promptTranslateEntireProject = async () => {
  const translateEntireProject = await p.confirm({
    message: '[🤖]:> Would you like me to translate the entire project automatically to all the locales you have enabled? (y/n)',
  });
  return translateEntireProject ? 'yes' : 'no';
};

export const selectTranslationMode = async () => {
  const translationMode = await p.select({
    message: '[🤖]:> Which task would you like me to run?',
    options: [
      { label: '1. Translate. The parts are without {key} and {namespace}', value: '1' },
      { label: '2. Translate. The parts are with {key} and {namespace}', value: '2' },
      { label: '3. Translate. The parts are with {key} only', value: '3' },
      { label: '4. Translate. The parts are with {default_text} and {namespace}', value: '4' },
      { label: '5. Translate. The parts are with {default_text} only', value: '5' },
      { label: 'X. Back to the Main menu', value: 'X' },
    ],
  });
  return translationMode;
};

 const s = p.spinner();

const main = async (firstRun: boolean) => {
  console.clear();
  if (firstRun) {
    p.intro(`${color.yellow("Welcome in the world of the languages!🌐")}`);
    s.start('ℹ Your personal translator AI is walking closer to you...');
    await setTimeout(5000);
    s.stop("[🤖]:> Hi, I'm your personal AI assistant named ATi18n. How may I help you today?");
  }

  const selectMainMenuAnswer = await selectMainMenu();
  if (selectMainMenuAnswer === 1) {
    console.clear();
    console.log("[🤖]:> You've selected option 1.")
  } else if (selectMainMenuAnswer === 2) {
    console.clear();
    console.log("[🤖]:> You've selected option 2.")
  } else if (selectMainMenuAnswer === 3) {
    const settingsMenuAnswer = await selectSettingsMenu();
  } else if (selectMainMenuAnswer === 'X') {
    console.clear();
    console.log('Thank you for using 🤖ATi18n🌐! Have a lovely day!💕');
    return;
  }


  const translateEntireProject = await promptTranslateEntireProject();
  if (translateEntireProject === 'yes') {

    const translationMode = await selectTranslationMode();
    if (translationMode === '1') {
      console.log('[🤖]:> Translation mode 1 selected. I will create the keys and namespaces for you.');
      const translator = new Translator({ translateToAllAllowed: true, srcLang: 'en' });
      translator.run('src');
    } else if (translationMode === '2') {
      console.log('[🤖]:> Translation mode 2 selected.');
      // TODO: Implement the logic for translation mode 2
    } else if (translationMode === '3') {
      console.log('[🤖]:> Translation mode 3 selected.');
      // TODO: Implement the logic for translation mode 3
    } else {
      console.log('[🤖]:> Invalid translation mode selected.');
    }

  } else {

    const translationMode = await selectTranslationMode();
    if (translationMode === '1') {
      const srcLang = await p.text({ message: '[🤖]:> Enter source language code (Default: EN): ' });
      const targetLang = await p.text({ message: '[🤖]:> Enter target language code (Default: HU): ' });

      const translator = new Translator({ srcLang: srcLang as string || 'en', targetLang: targetLang as string || 'hu' });
      translator.run('src');
    } else if (translationMode === '2') {
      console.log('[🤖]:> Translation mode 2 selected.');
      // TODO: Implement the logic for translation mode 2
    } else if (translationMode === '3') {
      console.log('[🤖]:> Translation mode 3 selected.');
      // TODO: Implement the logic for translation mode 3
    } else {
      console.log('[🤖]:> Invalid translation mode selected.');
    }
  }

  const promptExitResult: string = await promptExit();
  if (promptExitResult === 'yes') {
    process.exit(0);
  } else {
    main(false);
  }
};

export default main;

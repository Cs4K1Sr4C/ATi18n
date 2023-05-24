import ATi18n from '../agents/ATi18n';
import * as p from '@clack/prompts';
import color from 'picocolors';
import { setTimeout } from 'node:timers/promises';


export const selectMainMenu = async (shouldExit: boolean) => {
  const mainMenu = await p.select({
    message: "[🤖]:> What would you like to do?",
    options: [
      { label: "Extract", value: "1" },
      { label: "Translate", value: "2" },
      { label: "Settings", value: "3" },
      { label: "Help", value: "4" },
      { label: "Exit", value: "X" },
    ]
  })

  if (mainMenu === '1') {
    const extractionMenu = await selectExtractionMenu();
  }
  else if (mainMenu === '2') {
    const translateMenu = await selectTranslationMenu();
  }
  else if (mainMenu === '3') {
    const settingsMenu = await selectSettingsMenu();
  }
  else if (mainMenu === '4') { }
  else if (mainMenu === 'X') {
    const _exit = await exit(shouldExit);
    return _exit;
  }
}

export const selectExtractionMenu = async () => {
  const extractionMenu = await p.select({
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
  return extractionMenu;
};

export const selectSettingsMenu = async () => {
  const settingsMenu = await p.select({
    message: "[🤖]:> What would you like to do?",
    options: [
      { label: "Change the Translation Service", value: "1" },
      { label: "Set/Change OpenAI key", value: "2" },
      { label: "Set/Change OpenAI Translation Mode", value: "3" },
      { label: "Set/change OpenAI Model", value: "4" },
      { label: "Enable/Disable Suggestions for KEY and NAMESPACE", value: "5" },
      { label: "Enable/Disable Debug mode", value: "6" },
      { label: "Back to the Main menu", value: "X" },
    ]
  })
}

export const selectTranslationMenu = async () => {
  const translationMenu = await p.select({
    message: '[🤖]:> Choose the best fit for your project?',
    options: [
      { label: 'The translatable parts are without {key} and {namespace}', value: '1' },
      { label: 'The translatable parts are with {key} and {namespace}', value: '2' },
      { label: 'The translatable parts are with {key} only', value: '3' },
      { label: 'The translatable parts are with {default_text} and {namespace}', value: '4' },
      { label: 'The translatable parts are with {default_text} only', value: '5' },
      { label: 'X. Back to the Main menu', value: 'X' },
    ],
  });
  if (translationMenu === '1') {

  } else if (translationMenu === '2') {

  } else if (translationMenu === '3') {

  } else if (translationMenu === '4') {

  } else if (translationMenu === '5') {

  } else if (translationMenu === 'X') { }
  return translationMenu;
};

export const promptFlaskServer = async () => {
  console.clear();
  const flaskServer = await p.confirm({
    message: '[🤖]:> Would you like me to run in the background a Web-based view?\nNote: This needs python installed on your computer; it will set-up a Flask server and serves the web-based view on port 5000)',
  });
  return flaskServer ? 'yes' : 'no';
};

export const exit = async (shouldExit: boolean) => {
  shouldExit = true;
  s.start("[🤖]:> It was a pleasure to work together with you! I hope we can see each other soon!");
  await setTimeout(5000);
  s.stop("Thank you for using 🤖ATi18n🌐! Have a lovely day!💕");
  return shouldExit;
}

// Elements
const s = p.spinner();

// Main - loop
const main = async (firstRun: boolean) => {

  if (process.env.OPENAI_KEY === undefined || null) {
    console.clear();
    s.start("[⚠]:> Please set your OpenAI key in the .env file");
    await setTimeout(5000);
    s.stop("[⚠]:> Please set your OpenAI key in the .env file");
    return;
  }

  let shouldExit = false;
  if (firstRun) {
    console.clear();
    p.intro(`${color.yellow("Welcome in the world of the languages!🌐")}`);
    s.start('ℹ Your personal translator AI is walking closer to you...');
    await setTimeout(5000);
    s.stop("[🤖]:> Hi, I'm your personal AI assistant named ATi18n.");
  }



  while (!shouldExit) {
    const selectMainMenuAnswer = await selectMainMenu(shouldExit);
    selectMainMenuAnswer === true ? shouldExit = true : shouldExit = false;
  }


}

export default main;
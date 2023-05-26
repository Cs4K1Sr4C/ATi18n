import * as p from "@clack/prompts";
import * as CONSTANTS from '../../utils/constants';
import { waitForEnter } from "../../utils/helpers";
import { setTimeout } from "node:timers/promises";
import { TerminalAssistant } from "../TerminalAssistant";

const TA = new TerminalAssistant();

const s = p.spinner();

export const selectMainMenu = async (
  firstRun: boolean,
  shouldExit: boolean
) => {
  const mainMenu = await p.select({
    message: "[🤖]:::> Select a menu then press enter to see its content!",
    options: CONSTANTS.mainMenuOptions,
  });

  if (mainMenu === "1") {
    const extractionMenu = await selectExtractionMenu();
  } else if (mainMenu === "2") {
    const translateMenu = await selectTranslationMenu();
  } else if (mainMenu === "3") {
    const settingsMenu = await selectSettingsMenu();
  } else if (mainMenu === "4") {
    const project = await p.group({
      prompt: () =>
        p.text({
          message: "Ask me anything about the ATi18n platform...",
          placeholder: "How can I change the OpenAI key?",
          validate: (value) => {
            if (!value) return "Please ask me something...";
          },
        }),
    });

    await TA.textModel(project.prompt);
    console.log('\n\n\n');
    await waitForEnter();
  }
  else if (mainMenu === "X") {
    const _exit = await exit(shouldExit);
    return _exit;
  }
};

export const selectExtractionMenu = async () => {
  console.clear();
  const extractionMenu = await p.select({
    message: "[🤖]::> Which task would you like me to run?",
    options: CONSTANTS.extractionMenuOptions,
  });
  return extractionMenu;
};

export const selectSettingsMenu = async () => {
  console.clear();
  const settingsMenu = await p.select({
    message: "[🤖]::> What would you like to do?",
    options: CONSTANTS.settingsMenuOptions,
  });
  if (settingsMenu === "1") { }
  else if (settingsMenu === "2") { }
  else if (settingsMenu === "3") { }
  else if (settingsMenu === "4") { }
  else if (settingsMenu === "5") { }
  else if (settingsMenu === "X") { }
};

export const selectTranslationMenu = async () => {
  console.clear();
  const translationMenu = await p.select({
    message: "[🤖]::> Choose the best fit for your project?",
    options: CONSTANTS.translationMenuOptions,
  });
  if (translationMenu === "1") {
  } else if (translationMenu === "2") {
  } else if (translationMenu === "3") {
  } else if (translationMenu === "4") {
  } else if (translationMenu === "5") {
  } else if (translationMenu === "X") {
  }
  return translationMenu;
};

export const promptFlaskServer = async () => {
  console.clear();
  const flaskServer = await p.confirm({
    message:
      "[🤖]:> Would you like me to run in the background a Web-based view?\nNote: This needs python installed on your computer; it will set-up a Flask server and serves the web-based view on port 5000)",
  });
  return flaskServer ? "yes" : "no";
};

export const exit = async (shouldExit: boolean) => {
  shouldExit = true;
  s.start(
    "[🤖]:::> It was a pleasure to work together with you! I hope that soon we can see each other again!"
  );
  await setTimeout(5000);
  s.stop("Thank you for using ATi18n🤖🌐!\n\n\nPlease consider to support the project on GitHub! (https://github.com/Cs4K1Sr4C/ATi18n)\n\nHave a lovely day! 💗");
  return shouldExit;
};
import * as p from "@clack/prompts";
import {
  mainMenuOptions,
  extractionMenuOptions,
  translationMenuOptions,
} from "../../utils/constants";
import { waitForEscapeOrEnter } from "../../utils/helpers";
import { setTimeout } from "node:timers/promises";
import selectSettingsMenu from "./settings";
import selectTranslationMenu from "./translation";
import selectExtractionMenu from "./extraction";
import { TerminalAssistant } from "../ATi18n";

const s = p.spinner();

export const selectMainMenu = async (
  freshStart: boolean,
  shouldExit: boolean,
  TA: TerminalAssistant,
) => {
  let mainMenu = await p.select({
    message: "[🤖]:::> Select a menu then press enter to see its content!",
    options: mainMenuOptions,
  });

  if (mainMenu === "1") {
    const extractionMenu = await selectExtractionMenu();
  } else if (mainMenu === "2") {
    const translateMenu = await selectTranslationMenu();
  } else if (mainMenu === "3") {
    const settingsMenu = await selectSettingsMenu();
  } else if (mainMenu === "4") {
    let condition = true;
    do {
      let help = await p.group({
        question: () =>
          p.text({
            message: "[🤖]:::> Ask me anything about the ATi18n platform...",
            placeholder: "How can I change the OpenAI key?",
            validate: (value) => {
              if (!value)
                return "[🤖]:::> Ask me something or quit from this menu via sending a 'q' letter.";
            },
          }),
      });
      if (
        help.question === "X" ||
        help.question === "x" ||
        help.question === "x" ||
        help.question === "Q" ||
        help.question === "q" ||
        help.question === "menu" ||
        help.question === "back" ||
        help.question === "exit"
      ) {
        condition = false;
      } else {
        s.start("ℹ Waiting for the answer...");
        let answer = await TA.chatModel.call({ input: help.question });
        s.stop(`[🤖]:::> ${answer["response"]}`);
        console.log(
          "\n\n\nPress 'ENTER' to continue or press the 'ESCAPE' button to step back to the Main menu."
        );
        condition = await waitForEscapeOrEnter(condition);
      }
    } while (condition);
  } else if (mainMenu === "X") {
    return await exit(shouldExit);
  }
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
  s.stop(
    "Thank you for using 🤖ATi18n🌐!\n\n\nPlease consider to support the project on GitHub! (https://github.com/Cs4K1Sr4C/ATi18n)\n\nHave a lovely day! 💗"
  );
  return shouldExit;
};

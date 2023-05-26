import * as fs from "fs";
import * as p from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "node:timers/promises";
import * as MENUGROUPS from '../agents/TerminalAssistant/index';
import { OPENAI_CHAT_COMPLETION } from "../services/openai";

const welcomerSystemPrompt = "You are an AI who welcomes the user at ATi18n the AI driven interactive i18n integrator and translator platform and you don't have to ask that how may you help.";

// Visual Elements
const s = p.spinner();

// Main - loop
const terminal = async (firstRun: boolean) => {
  console.clear();

  let shouldExit = false;
  let _firstRun = firstRun;
  const chat = await OPENAI_CHAT_COMPLETION(welcomerSystemPrompt)

  if (firstRun) {
    let res = await chat.call({ input: "Hello" });

    if (!fs.existsSync("../config.json")) {
      await setTimeout(3000);
      p.text({ message: "ℹ There is no configuration file found. I will guide you through the configuration process..." });
    }

    s.start("ℹ Saving the configuration file...");
    fs.writeFileSync("../config.json", JSON.stringify({}, null, 2));
    await setTimeout(3000);
    s.stop("ℹ Configuration file has been saved");
  }

  _firstRun = false;

  while (!shouldExit) {
    const selectMainMenuAnswer = await MENUGROUPS.default.main.selectMainMenu(_firstRun, shouldExit);
    selectMainMenuAnswer === true ? (shouldExit = true) : (shouldExit = false);
  }
};

export default terminal;

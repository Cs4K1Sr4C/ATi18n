//import ATi18n from '../agents/ATi18n';
import * as p from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "node:timers/promises";
import { selectMainMenu } from "../agents/TerminalAssistant/functions/controller";

// Elements
const s = p.spinner();

// Main - loop
const terminal = async (firstRun: boolean) => {
  let shouldExit = false;
  let _firstRun = firstRun;
  if (firstRun) {
    console.clear();
    p.intro(`${color.yellow("Welcome in the world of the languages!🌐")}`);
    s.start("ℹ Your personal translator AI is walking closer to you...");
    await setTimeout(5000);
    s.stop("[🤖]:> Hi, I'm your personal AI assistant named ATi18n.");
  }

  _firstRun = false;

  while (!shouldExit) {
    const selectMainMenuAnswer = await selectMainMenu(_firstRun, shouldExit);
    selectMainMenuAnswer === true ? (shouldExit = true) : (shouldExit = false);
  }
};

export default terminal;

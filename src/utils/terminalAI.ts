require("dotenv").config();
import * as p from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "node:timers/promises";
import { customSpinner } from "./spinner";
import { selectMainMenu } from "../agents/TerminalAssistant/main";

// Elements
//const s = p.spinner();

// Main - loop
const terminalAI = async (firstRun: boolean) => {
  let shouldExit = false;
  let _firstRun = firstRun;
  if (firstRun) {
    console.clear();
    p.intro(`${color.yellow("Welcome in the world of the languages!🌐")}`);
    //s.start("ℹ Your personal translator AI is walking closer to you...");
    await customSpinner({ startText: "Hello", doneText: "Goodbye", stages: [{ text: "Hello megint" }] });;
    await setTimeout(5000);
    //s.stop("[🤖]:> Hi, I'm your personal AI assistant named ATi18n.");
  }

  _firstRun = false;

  while (!shouldExit) {
    console.log(process.env.TRANSLATOR_SERICE, process.env.OPENAAI_API_KEY);
    const selectMainMenuAnswer = await selectMainMenu(_firstRun, shouldExit);
    selectMainMenuAnswer === true ? (shouldExit = true) : (shouldExit = false);
  }
};

export default terminalAI;

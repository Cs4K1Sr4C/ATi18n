import * as fs from "fs";
import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import { ATi18n } from "../agents/ATi18n";
import * as MENUGROUPS from "../agents/ATi18n/index";
import { Configurator } from "../utils/configurator";
import MemoryHandler from "./memoryHandler";

// Visual Elements
const s = p.spinner();

// ATi18n
const _ATi18n = new ATi18n();

// Main - loop
const terminal = async (freshStart: boolean) => {
  console.clear();

  let shouldExit = false;
  let firstRun = !fs.existsSync(__dirname + "/../config.json") ? false : true;

  if (freshStart) {
    if (firstRun) {
      p.note("ℹ There is no configuration file found. I will guide you through the configuration process...");
    }
    //let config = await Configurator();
    s.start("ℹ Saving the configuration file...");
    fs.writeFileSync(
      __dirname + "/../config.json",
      JSON.stringify({}, null, 2)
    );
    await setTimeout(3000);
    s.stop("ℹ Configuration file has been saved! Continue...");
  }

  while (!shouldExit) {
    const selectMainMenuAnswer = await MENUGROUPS.default.main.selectMainMenu(
      freshStart,
      shouldExit,
      _ATi18n
    );
    selectMainMenuAnswer === true ? (shouldExit = true) : (shouldExit = false);
  }
};

export default terminal;

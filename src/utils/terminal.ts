import * as fs from "fs";
import * as p from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "node:timers/promises";
import { TerminalAssistant } from "../agents/ATi18n";
import * as MENUGROUPS from "../agents/ATi18n/index";

// Visual Elements
const s = p.spinner();

// TerminalAssistant
const TA = new TerminalAssistant();

// Main - loop
const terminal = async (freshStart: boolean) => {
  console.clear();

  let shouldExit = false;
  let firstRun = !fs.existsSync(__dirname + "/../config.json") ? false : true;

  if (freshStart) {
    if (firstRun) {
      p.text({
        message:
          "ℹ There is no configuration file found. I will guide you through the configuration process...",
      });
    }
    // TODO: Implement here the configurator interface
    s.start("ℹ Saving the configuration file...");
    fs.writeFileSync(
      __dirname + "/../config.json",
      JSON.stringify({}, null, 2)
    );
    await setTimeout(3000);
    s.stop("ℹ Configuration file has been saved");
  }

  while (!shouldExit) {
    const selectMainMenuAnswer = await MENUGROUPS.default.main.selectMainMenu(
      freshStart,
      shouldExit,
      TA
    );
    selectMainMenuAnswer === true ? (shouldExit = true) : (shouldExit = false);
  }
};

export default terminal;

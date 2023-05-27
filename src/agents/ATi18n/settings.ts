import * as p from "@clack/prompts";
import { settingsMenuOptions } from "../../utils/constants";

const selectSettingsMenu = async () => {
  console.clear();
  const settingsMenu = await p.select({
    message: "[🤖]::> What would you like to do?",
    options: settingsMenuOptions,
  });
  if (settingsMenu === "1") {
  } else if (settingsMenu === "2") {
  } else if (settingsMenu === "3") {
  } else if (settingsMenu === "4") {
  } else if (settingsMenu === "5") {
  } else if (settingsMenu === "X") {
  }
};

export default selectSettingsMenu;

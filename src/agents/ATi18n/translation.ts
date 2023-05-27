import * as p from "@clack/prompts";
import { translationMenuOptions } from "../../utils/constants";

const selectTranslationMenu = async () => {
  console.clear();
  const translationMenu = await p.select({
    message: "[🤖]::> Choose the best fit for your project?",
    options: translationMenuOptions,
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

export default selectTranslationMenu;

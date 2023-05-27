import * as p from "@clack/prompts";
import { extractionMenuOptions } from "../../utils/constants";

const selectExtractionMenu = async () => {
  console.clear();
  const extractionMenu = await p.select({
    message: "[🤖]::> Which task would you like me to run?",
    options: extractionMenuOptions,
  });
  return extractionMenu;
};

export default selectExtractionMenu;

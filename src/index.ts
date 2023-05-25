import terminal from "./utils/terminal";
import terminalAI from "./utils/terminalAI";

if (
  process.env.TRANSLATOR_SERICE === "openai" &&
  process.env.OPENAI_API_KEY !== undefined
) {
  terminalAI(true);
} else {
  terminal(true);
}

import * as readline from "readline";

export async function waitForEnter(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("PRESS_ENTER_TO_CONTINUE", () => {
      rl.close();
      resolve();
    });
  });
}

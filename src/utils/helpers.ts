import * as readline from "readline";

export async function waitForEnter(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Press Enter to step back to the Main menu", () => {
      rl.close();
      resolve();
    });
  });
}

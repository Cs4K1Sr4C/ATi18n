import readline, { Key } from "readline";

export const waitForEscapeOrEnter = async (conditionHandler: boolean) => {
  return new Promise<boolean>((resolve) => {
    const handleKeyPress = (input: string, key?: Key) => {
      if (key && (key.name === "escape" || key.name === "backspace")) {
        conditionHandler = false;
        console.clear();
        resolve(conditionHandler);
      } else if (input.trim() === "") {
        conditionHandler = true;
        resolve(conditionHandler);
      }
    };

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (_, key) => {
      handleKeyPress("", key);
    });

    rl.on("line", (input) => {
      handleKeyPress(input);
    });
  });
};

export const waitForEscape = async (conditionHandler?: { value: boolean }) => {
  return new Promise<void>((resolve) => {
    const handleKeyPress = (input: string) => {
      if (input.trim().toLowerCase() === "escape") {
        conditionHandler
          ? (conditionHandler.value = false)
          : (conditionHandler.value = true);
        resolve();
      }
    };

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    rl.on("keypress", (_, key) => {
      if ((key && key.name === "escape") || key.sequence === "\u001b") {
        conditionHandler
          ? (conditionHandler.value = false)
          : (conditionHandler.value = true);
        resolve();
      }
    });

    rl.on("data", (chunk) => {
      if (
        chunk[0] === 0x1b &&
        chunk[1] === 0x5b &&
        chunk[2] === 0x33 &&
        chunk[3] === 0x7e
      ) {
        conditionHandler
          ? (conditionHandler.value = false)
          : (conditionHandler.value = true);
        resolve();
      }
    });
  });
};

export const waitForEnter = async (): Promise<void> => {
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
};

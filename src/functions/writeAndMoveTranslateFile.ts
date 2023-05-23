import * as fs from 'fs';
import * as path from 'path';

export const writeAndMoveTranslateFile = (directory?: string | null) => {
  const content = `
  import { i18n } from "next-i18next";
  export const translate = (
    key: string,
    ns?: string | undefined | null,
    text?: string | undefined | null
  ) => {
    const opts = !!ns ? { ns } : undefined;
    const defaultText = text ? text : key;
    return i18n?.t(key, defaultText, opts) ?? key;
  };`;
  const defaultDirectory = './src/utils/';
  const targetDirectory = directory || defaultDirectory;
  const filePath = path.join(targetDirectory, 'translate.ts');

  try {
    fs.writeFileSync(filePath, content);
    console.log(`File "translate.ts" created at ${filePath}`);

    // Move the file if it's not already in the target directory
    if (directory && directory !== defaultDirectory) {
      const newFilePath = path.join(targetDirectory, 'translate.ts');
      fs.renameSync(filePath, newFilePath);
      console.log(`File moved to ${newFilePath}`);
    }
  } catch (error) {
    console.error('An error occurred while writing/moving the file:', error);
  }
};

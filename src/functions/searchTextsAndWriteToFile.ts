import * as fs from 'fs';
import * as path from 'path';
import { REGEXES } from '../utils/regexes';

interface MatchedPart {
  file: string;
  line: number;
  match: string;
}

async function searchTextsAndWriteToFile(directory: string): Promise<void> {
  const jsonResult: MatchedPart[] = [];

  async function searchFiles(dir: string): Promise<void> {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory() && !isNodeModulesDir(filePath)) {
        await searchFiles(filePath);
      } else if (stats.isFile() && isSupportedFile(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        await processFile(filePath, fileContent);
      }
    }
  }

  async function processFile(filePath: string, fileContent: string): Promise<void> {
    const matches: MatchedPart[] = [];

    for (const regexKey in REGEXES) {
      const regex = REGEXES[regexKey];

      let match: RegExpExecArray | null;
      while ((match = regex.exec(fileContent)) !== null) {
        const line = getLineNumber(fileContent, match.index);
        const matchedPart = match[1];

        matches.push({ file: filePath, line, match: matchedPart });
      }
    }

    jsonResult.push(...matches);
  }

  function getLineNumber(fileContent: string, position: number): number {
    const lines = fileContent.substr(0, position).split('\n');
    return lines.length;
  }

  function isSupportedFile(filePath: string): boolean {
    const supportedExtensions = ['.ts', '.tsx', '.js', '.jsx'];
    const fileExtension = path.extname(filePath);
    return supportedExtensions.includes(fileExtension);
  }

  function isNodeModulesDir(dirPath: string): boolean {
    const nodeModulesDir = path.sep + 'node_modules' + path.sep;
    return dirPath.includes(nodeModulesDir);
  }

  await searchFiles(__dirname);

  const jsonOutput = JSON.stringify(jsonResult, null, 2);
  fs.writeFileSync(`${directory}/output.json`, jsonOutput);

  console.log('Extraction completed. JSON object written to output.json file.');
}
  
export default searchTextsAndWriteToFile;

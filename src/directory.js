import os from "os";
import path from 'node:path';

let currentDir = os.homedir();
process.chdir(currentDir);

export const rootDir = path.parse(currentDir).root;

export const getCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

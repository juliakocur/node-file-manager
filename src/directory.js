import os from "os";

let currentDir = os.homedir();
process.chdir(currentDir);

export const getCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

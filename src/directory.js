import os from 'os';
import path from 'node:path';
import fs from 'node:fs';

let currentDir = os.homedir();
process.chdir(currentDir);

const rootDir = path.parse(currentDir).root;

export const getCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const changeDirectory = (input) => {
    const newPath = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
    try {
        process.chdir(newPath);
    } catch {
        console.log('Operation failed');
    }
};

export const goUp = () => {
    const parentDir = path.resolve(process.cwd(), '..');

    try {
        if (parentDir.startsWith(rootDir)) {
            process.chdir(parentDir);
        } else {
            throw new Error();
        }
    } catch {
        console.log('Operation failed');
    }
};
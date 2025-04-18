import fs from 'node:fs';
import path from 'node:path';
import { rootDir } from './directory.js';

export const handleCommand = (input) => {
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'cd':
            if (args.length !== 1) {
                throw new Error('Invalid input');
            }
        changeDirectory(args[0]);
        break;

        default:
        console.error('Invalid input');
    }
};

const changeDirectory = (input) => {
    const newPath = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
    try {
        if (fs.existsSync(newPath) && fs.statSync(newPath).isDirectory() && newPath.startsWith(rootDir)) {
            process.chdir(newPath);
        } else {
            throw new Error();
        }
    } catch {
        console.log('Operation failed');
    }
}

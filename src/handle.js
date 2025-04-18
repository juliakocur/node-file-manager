import { goUp, changeDirectory } from './directory.js';
import { cat, addFile, addNewDir } from './commands.js';

export const handleCommand = (input) => {
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'mkdir':
            if (args.length !== 1) {
                throw new Error('Invalid input');
            }
            addNewDir(args[0]);
            break;

        case 'add':
            if (args.length !== 1) {
                throw new Error('Invalid input');
            }
            addFile(args[0]);
            break;

        case 'cat':
            if (args.length !== 1) {
                throw new Error('Invalid input');
            }
            cat(args[0]);
            break;

        case 'cd':
            if (args.length !== 1) {
                throw new Error('Invalid input');
            }
            changeDirectory(args[0]);
            break;

        case 'up':
            if (args.length !== 0) {
                throw new Error('Invalid input');
            }
            goUp();
            break;

        default:
        console.error('Invalid input');
    }
};

import { goUp, changeDirectory } from './directory.js';
import { cat, addFile, addNewDir, renameFile, copyFile, moveFile, deleteFile,createDirList } from './commands.js';

export const handleCommand = (input) => {
    const [command, ...args] = input.split(' ');

    switch (command) {
        case 'ls':
            createDirList();
            break;

        case 'rm':
            if (args.length !== 1) {
                throw new Error('Invalid input');
            }
            deleteFile(args[0]);
            break;

        case 'mv':
            if (args.length !== 2) {
                throw new Error('Invalid input');
            }
            moveFile(args[0], args[1]);
            break;

        case 'cp':
            if (args.length !== 2) {
                throw new Error('Invalid input');
            }
            copyFile(args[0], args[1]);
            break;

        case 'rn':
            if (args.length !== 2) {
                throw new Error('Invalid input');
            }
            renameFile(args[0], args[1]);
            break;

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

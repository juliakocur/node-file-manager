import { goUp, changeDirectory } from './directory.js';

export const handleCommand = (input) => {
    const [command, ...args] = input.split(' ');

    switch (command) {
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

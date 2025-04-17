import { getUserName } from './src/args.js';
import * as readline from 'node:readline/promises';
const userName = getUserName();

const welcomeUser = () => {
    console.log(`Welcome to the File Manager, ${userName}!`)
};

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout, 
    prompt: '> ',
});

const exitUser = () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    rl.close();
    process.exit(0);
}

rl.on('line', (chunk) => {
    const command = chunk.trim();

    if (command === '.exit' ) {
        exitUser();
    } else {
        rl.prompt();
    }
});

rl.on('close', () => {
    exitUser();
});

rl.prompt();
welcomeUser();

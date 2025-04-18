import fs from 'node:fs';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { mkdir as asyncMkdir } from 'node:fs/promises';

export const cat = (filePath) => {
    const pathResolved = path.isAbsolute(filePath) ?
    filePath :
    path.resolve(process.cwd(), filePath);

    try {
        const readStream = fs.createReadStream(pathResolved, { encoding: 'utf-8' });
        readStream.on('error', () => {
            console.log('Operation failed');
        });
        readStream.pipe(process.stdout);
    } catch {
        console.log('Operation failed');
    }
};

export const addFile = (fileName) => {
    const filePath = path.resolve(process.cwd(), fileName);
    try {
        if (fs.existsSync(filePath)) {
            throw new Error()
        }
        writeFile(filePath, '', { flag: 'wx' }) 
    } catch {
        console.log('Operation failed');
    }
};

export const addNewDir = async (dirName) => {
    const dirPath = path.resolve(process.cwd(), dirName);
    try {
        await asyncMkdir(dirPath);
    } catch {
        console.log('Operation failed');
    }
}

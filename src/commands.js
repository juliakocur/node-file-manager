import fs from 'node:fs';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { mkdir as asyncMkdir } from 'node:fs/promises';
import { rename as asyncRename, access } from 'node:fs/promises';
import {createReadStream, createWriteStream} from 'fs';

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
};

export const renameFile = async (fileName, newName) => {
    const oldPath = path.isAbsolute(fileName) ? fileName : path.resolve(process.cwd(), fileName);
    const newPath = path.resolve(path.dirname(oldPath), newName);
    try {
        await access(oldPath);
        await asyncRename(oldPath, newPath);
    } catch {
        console.log('Operation failed');
    }
};

export const copyFile = (sourcePath, destPath) => {
    const filePath = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(process.cwd(), sourcePath);
    const dest = path.isAbsolute(destPath) ? destPath : path.resolve(process.cwd(), destPath);
    try {
        if (fs.existsSync(dest)) {
            throw new Error()
        }
        const readStream = createReadStream(filePath);
        const writeStream = createWriteStream(dest);
      
        readStream.pipe(writeStream);
    } catch {
        console.log('Operation failed');
    }
};

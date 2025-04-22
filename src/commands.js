import fs from 'node:fs';
import path from 'node:path';
import { writeFile, unlink, readdir } from 'node:fs/promises';
import { mkdir as asyncMkdir } from 'node:fs/promises';
import { rename as asyncRename, access } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';

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

export const copyFile = async (sourcePath, destPath) => {
    const filePath = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(process.cwd(), sourcePath);
    const dest = path.isAbsolute(destPath) ? destPath : path.resolve(process.cwd(), destPath);
    try {
        if (fs.existsSync(dest)) {
            throw new Error()
        }
        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(dest);
        await pipeline(readStream, writeStream);
    } catch {
        console.log('Operation failed');
    }
};

export const moveFile = async (sourcePath, destPath) => {    
    const filePath = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(process.cwd(), sourcePath);
    try {
        await copyFile(sourcePath, destPath);
        await unlink(filePath);
    } catch {
        console.log('Operation failed');
    }
};

export const deleteFile = async (filePath) => {    
    const pathResolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    try {
        await unlink(pathResolved);
    } catch {
        console.log('Operation failed');
    }
};


// const files = await fs.readdir(currentDir, { withFileTypes: true });
//         const sortedFiles = files.sort((a, b) => {
//           if (a.isDirectory() && !b.isDirectory()) return -1;
//           if (!a.isDirectory() && b.isDirectory()) return 1;
//           return a.name.localeCompare(b.name);
//         });
//         console.table(sortedFiles.map((file, index) => ({
//           Name: file.name,
//           Type: file.isDirectory() ? 'directory' : 'file'
//         })));

export const createDirList = async () => {
    try {
        const currentDir = process.cwd();
        const files = await readdir(currentDir, { withFileTypes: true });

        const directory = files.map((file) => {
            const name = file.name;
            const type = file.isDirectory() ? 'directory' : 'file';
            return {name, type};
        });
        const dirSorted = directory.sort((a, b) => {
            if (a.type !== b.type) {
                return a.type === 'directory' ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
        })
        console.table(dirSorted);
    } catch {
        console.log('Operation failed');
    }
}

import fs from 'node:fs';
import path from 'node:path';

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
}

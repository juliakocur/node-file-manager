import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';

export const createHashFile = async (filePath) => {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    const hash = createHash('sha256');
    const stream = fs.createReadStream(fullPath);

    try {
        await pipeline(stream, hash);
        console.log(hash.digest('hex'));
    } catch {
        console.log('Operation failed');
    }
};

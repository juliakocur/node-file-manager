import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import path from 'node:path';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';

export const compressAndDecompress = async (command, input, output) => {

    const source = path.isAbsolute(input) ? input : path.resolve(process.cwd(), input);
    const dest = path.isAbsolute(output) ? output : path.resolve(process.cwd(), output);
    const readableStream = fs.createReadStream(source);
    const writableStream = fs.createWriteStream(dest);
    const brotliCompress = createBrotliCompress();
    const brotliDecompress = createBrotliDecompress();
    try {
        if (command === 'compress') {
            await pipeline(readableStream, brotliCompress, writableStream);
        } 
        if (command === 'decompress') {
            await pipeline(readableStream, brotliDecompress, writableStream);
        }
    } catch {
        console.log('Operation failed');
    }
};

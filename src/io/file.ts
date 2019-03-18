/**
 * @author WMXPY
 * @namespace IO
 * @description file
 */

import * as Fs from 'fs';

export const UTF8 = 'utf8';

export const readTextFile = async (path: string): Promise<string> =>
    new Promise<string>((resolve: (result: string) => void, reject: (reason: NodeJS.ErrnoException) => void) =>
        Fs.readFile(path, UTF8, (error: NodeJS.ErrnoException, data: string) => {

            if (error) {
                reject(error);
            }
            resolve(data);

            return;
        }));

export const writeTextFile = async (path: string, content: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) =>
        Fs.writeFile(path, content, UTF8, (error: NodeJS.ErrnoException) => {

            if (error) {
                reject(error);
            }
            resolve();

            return;
        }));

export const recursiveDo = async (path: string, func: (file: string) => Promise<void>): Promise<void> => {

    const status: Fs.Stats = Fs.statSync(path);

    if (status.isDirectory()) {
        const files: string[] = Fs.readdirSync(path);
        for (const file of files) {
            await recursiveDo(file, func);
        }
    } else if (status.isFile()) {
        await func(path);
    }

    return;
};

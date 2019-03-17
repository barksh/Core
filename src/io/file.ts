/**
 * @author WMXPY
 * @namespace IO
 * @description file
 */

import * as Fs from 'fs';

export const readTextFile = async (path: string): Promise<string> =>
    new Promise<string>((resolve: (result: string) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.readFile(path, 'utf8', (error: NodeJS.ErrnoException, data: string) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });

export const writeTextFile = async (path: string, content: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.writeFile(path, content, 'utf8', (error: NodeJS.ErrnoException) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });

/**
 * @author WMXPY
 * @namespace IO
 * @description File
 */

import * as Fs from 'fs';
import { getConfigFilePath } from './util';

export const UTF8 = 'utf8';

export const readTextFile = async (path: string): Promise<string> =>
    new Promise<string>((resolve: (result: string) => void, reject: (reason: NodeJS.ErrnoException) => void) =>
        Fs.readFile(path, UTF8, (error: NodeJS.ErrnoException, data: string) => {

            if (error) {
                reject(error);
                return;
            }
            resolve(data);
            return;
        }));

export const writeTextFile = async (path: string, content: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) =>
        Fs.writeFile(path, content, UTF8, (error: NodeJS.ErrnoException) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        }));

export const recursiveDo = async (
    path: string,
    folder: (file: string) => Promise<void>,
    directory: (path: string) => Promise<void>,
): Promise<void> => {

    const status: Fs.Stats = Fs.statSync(path);

    if (status.isDirectory()) {
        await directory(path);
        const files: string[] = Fs.readdirSync(path);
        for (const file of files) {
            await recursiveDo(file, folder, directory);
        }
    } else if (status.isFile()) {
        await folder(path);
    }
    return;
};

export const fileExists = async (path: string): Promise<boolean> =>
    new Promise<boolean>((resolve: (exist: boolean) => void) => {
        Fs.exists(path, (exists: boolean) => {
            resolve(exists);
            return;
        });
        return;
    });

export const attemptMarkDir = async (path: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.exists(path, (exists: boolean) => {
            if (exists) {
                Fs.mkdir(path, (error: NodeJS.ErrnoException) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                    return;
                });
            }
        });
        return;
    });

export const getConfigFile = async (): Promise<string> => {

    const configFilePath: string = getConfigFilePath();
    const exists: boolean = await fileExists(configFilePath);
    console.log(exists);
    return '';
};

/**
 * @author WMXPY
 * @namespace IO
 * @description File
 */

import * as Fs from 'fs';
import { getAppDataPath, getAppDataPathMakeDirList, getConfigFilePath } from './util';

export const UTF8 = 'utf8';

export const removeTextFile = async (path: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.unlink(path, (error: NodeJS.ErrnoException) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });

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

export const getPathStatus = async (path: string): Promise<Fs.Stats> =>
    new Promise<Fs.Stats>((resolve: (status: Fs.Stats) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.stat(path, (error: NodeJS.ErrnoException, status: Fs.Stats) => {

            if (error) {
                reject(error);
                return;
            }
            resolve(status);
            return;
        });
    });

export const getDirectoryFiles = async (path: string): Promise<string[]> =>
    new Promise<string[]>((resolve: (files: string[]) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.readdir(path, (error: NodeJS.ErrnoException, files: string[]) => {

            if (error) {
                reject(error);
                return;
            }
            resolve(files);
            return;
        });
    });

export const recursiveDo = async (
    path: string,
    folder: (file: string) => Promise<void>,
    directory: (path: string) => Promise<void>,
): Promise<void> => {

    const status: Fs.Stats = await getPathStatus(path);

    if (status.isDirectory()) {
        await directory(path);
        const files: string[] = await getDirectoryFiles(path);
        for (const file of files) {
            await recursiveDo(file, folder, directory);
        }
    } else if (status.isFile()) {
        await folder(path);
    }
    return;
};

export const checkPathExists = async (path: string): Promise<boolean> =>
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

            if (!exists) {
                Fs.mkdir(path, (error: NodeJS.ErrnoException) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                    return;
                });
            } else {
                resolve();
            }
        });
        return;
    });

export const ensureConfigPath = async (): Promise<void> => {

    const configPath: string = getAppDataPath();
    const exists: boolean = await checkPathExists(configPath);
    if (exists) {
        return;
    }

    const preList: string[] = getAppDataPathMakeDirList();
    console.log(preList);
    for (const dir of preList) {
        console.log(dir);
        await attemptMarkDir(dir);
    }
    return;
};

export const getConfigFile = async (): Promise<string | null> => {

    const configFilePath: string = getConfigFilePath();
    const exists: boolean = await checkPathExists(configFilePath);

    if (exists) {
        return await readTextFile(configFilePath);
    }
    return null;
};

export const replaceConfigFile = async (content: string): Promise<void> => {

    const configFilePath: string = getConfigFilePath();
    const exists: boolean = await checkPathExists(configFilePath);

    if (!exists) {
        await ensureConfigPath();
    }
    await writeTextFile(configFilePath, content);
    return;
};

export const removeConfigFile = async (): Promise<void> => {

    const configFilePath: string = getConfigFilePath();
    const exists: boolean = await checkPathExists(configFilePath);

    if (exists) {
        await removeTextFile(configFilePath);
    }
    return;
};

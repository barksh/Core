/**
 * @author WMXPY
 * @namespace IO
 * @description File
 */

import * as Crypto from "crypto";
import * as Fs from "fs";
import * as Path from "path";

export const UTF8 = 'utf8';

export const removeFile = (path: string): Promise<void> =>
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

export const readTextFile = (path: string): Promise<string> =>
    new Promise<string>((resolve: (result: string) => void, reject: (reason: NodeJS.ErrnoException) => void) =>
        Fs.readFile(path, UTF8, (error: NodeJS.ErrnoException, data: string) => {

            if (error) {
                reject(error);
                return;
            }
            resolve(data);
            return;
        }));

export const writeTextFile = (path: string, content: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) =>
        Fs.writeFile(path, content, UTF8, (error: NodeJS.ErrnoException) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        }));

export const getPathStatus = (path: string): Promise<Fs.Stats> =>
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

export const getDirectoryFiles = (path: string): Promise<string[]> =>
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
    fileFunction: (file: string) => Promise<void>,
    directoryFunction?: (path: string) => Promise<void>,
    condition?: (isFile: boolean, path: string) => boolean,
): Promise<void> => {

    const status: Fs.Stats = await getPathStatus(path);

    if (status.isDirectory()) {

        if (condition ? condition(false, path) : true) {
            if (directoryFunction) {
                await directoryFunction(path);
            }
            const files: string[] = await getDirectoryFiles(path);
            for (const file of files) {
                const appended: string = Path.join(path, file);
                await recursiveDo(appended, fileFunction, directoryFunction);
            }
        }
    } else if (status.isFile()) {
        if (condition ? condition(true, path) : true) {
            await fileFunction(path);
        }
    }
    return;
};

export const recursiveDoExcludeFileName = async (
    path: string,
    fileFunction: (file: string, relative: string[]) => Promise<void>,
    excludes: string[],
    relative: string[] = [],
): Promise<void> => {

    const status: Fs.Stats = await getPathStatus(path);
    if (status.isDirectory()) {
        const subpaths: string[] = await getDirectoryFiles(path);
        for (const subpath of subpaths) {
            const appended: string = Path.join(path, subpath);
            await recursiveDoExcludeFileName(appended, fileFunction, excludes, [...relative, subpath]);
        }
    } else if (status.isFile()) {
        if (!excludes.includes(Path.basename(path))) {
            await fileFunction(path, relative);
        }
    }
    return;
};

export const checkPathExists = (path: string): Promise<boolean> =>
    new Promise<boolean>((resolve: (exist: boolean) => void) => {
        Fs.exists(path, (exists: boolean) => {

            resolve(exists);
            return;
        });
        return;
    });

export const attemptMarkDir = (path: string): Promise<void> =>
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

export const getFileMd5 = (path: string): Promise<string> =>
    new Promise<string>((resolve: (result: string) => void, reject: (reason: Error) => void) => {

        const readStream: Fs.ReadStream = Fs.createReadStream(path);

        const hash: Crypto.Hash = Crypto.createHash('md5');
        readStream.on('data', hash.update.bind(hash));
        readStream.on('end', () => {
            resolve(hash.digest('hex'));
        });
        readStream.on('error', (error: Error) => {
            reject(error);
        });
    });

export const renameFile = (origin: string, target: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (error: NodeJS.ErrnoException) => void) => {
        Fs.rename(origin, target, (error: NodeJS.ErrnoException) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });

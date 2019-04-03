/**
 * @author WMXPY
 * @namespace IO
 * @description File
 */

import { directoryFiles, pathStatus } from "@sudoo/io";
import * as Fs from "fs";
import * as Path from "path";

export const recursiveDo = async (
    path: string,
    fileFunction: (file: string) => Promise<void>,
    directoryFunction?: (path: string) => Promise<void>,
    condition?: (isFile: boolean, path: string) => boolean,
): Promise<void> => {

    const status: Fs.Stats = await pathStatus(path);

    if (status.isDirectory()) {

        if (condition ? condition(false, path) : true) {
            if (directoryFunction) {
                await directoryFunction(path);
            }
            const files: string[] = await directoryFiles(path);
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

    const status: Fs.Stats = await pathStatus(path);
    if (status.isDirectory()) {
        const subpaths: string[] = await directoryFiles(path);
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

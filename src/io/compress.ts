/**
 * @author WMXPY
 * @namespace IO
 * @description Compress
 */

import { ChildProcess, spawn } from "child_process";
import { ERROR_CODE, panic } from "../panic/declare";

export const decompressZipFile = (filePath: string, targetPath: string) =>
    new Promise<void>((resolve: () => void, reject: (reason: Error) => void) => {

        const unzip: ChildProcess = spawn('unzip', ['-o', filePath, '-d', targetPath]);
        unzip.on('exit', (code: number) => {
            if (code === 0) {
                resolve();
                return;
            } else {
                reject(panic.code(ERROR_CODE.DECOMPRESS_FILE_FAILED, filePath));
                return;
            }
        });
        unzip.on('error', (error: Error) => {
            reject(error);
        });
    });

/**
 * @author WMXPY
 * @namespace IO
 * @description External
 */

import * as Fs from "fs";
import * as Http from "http";
import * as Https from "https";
import { Environment } from "../config/environment";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { decompressZipFile } from "./compress";
import { EXTERNAL_PROTOCOL } from "./declare";
import { getFileMd5, removeFile, renameFile } from "./file";
import { getRandomTempFilePath, parseExternalProtocol, parseGithubProtocol } from "./util";

export const getHttpClient = (url: string) => {

    if (url.substring(0, 5) === 'https') {
        return Https;
    }
    return Http;
};

export const downloadFile = (url: string, targetPath: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: Error) => void) => {

        const client: typeof Http | typeof Https = getHttpClient(url);

        const writeStream: Fs.WriteStream = Fs.createWriteStream(targetPath);
        writeStream.on('finish', () => {
            resolve();
            writeStream.close();
            return;
        });
        writeStream.on('error', (error: Error) => {
            reject(error);
            writeStream.close();
            return;
        });

        const request: Http.ClientRequest = client.get(url, (response: Http.IncomingMessage) => {
            response.pipe(writeStream);
            return;
        });
        request.on('error', (error: Error) => {
            removeFile(targetPath).then(() => {
                reject(error);
            }).catch(() => {
                reject(error);
            });
        });
    });

export const downloadAndDecompress = async (env: Environment, url: string, targetPath: string): Promise<void> => {

    const tempFilePath: string = await getRandomTempFilePath(env, 'zip');
    await downloadFile(url, tempFilePath);

    const hash: string = await getFileMd5(tempFilePath);
    const newFilePath: string = await getRandomTempFilePath(env, 'zip', hash);

    await renameFile(tempFilePath, newFilePath);
    await decompressZipFile(newFilePath, targetPath);
};

export const fetchAndDecompressFromAnyExternalByProtocol = async (env: Environment, protocol: EXTERNAL_PROTOCOL, url: string, targetPath: string): Promise<void> => {

    switch (protocol) {
        case EXTERNAL_PROTOCOL.GITHUB: {
            const parsed: string = parseGithubProtocol(url);
            await downloadAndDecompress(env, parsed, targetPath);
            return;
        }
        default: throw Panic.code(ERROR_CODE.NOT_IMPLEMENTED);
    }
};

export const fetchAndDecompressFromAnyExternal = async (env: Environment, url: string, targetPath: string): Promise<void> => {

    const protocol: EXTERNAL_PROTOCOL = parseExternalProtocol(url);
    await fetchAndDecompressFromAnyExternalByProtocol(env, protocol, url, targetPath);
};

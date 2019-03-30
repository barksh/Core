/**
 * @author WMXPY
 * @namespace IO
 * @description External
 */

import * as Fs from "fs";
import * as Http from "http";
import * as Https from "https";
import { Environment } from "../config/environment";
import { ERROR_CODE, panic } from "../panic/declare";
import { StringBuffer } from "../util/buffer/string";
import { decompressZipFile } from "./compress";
import { EXTERNAL_PROTOCOL } from "./declare";
import { getFileMd5, removeFile } from "./file";
import { getRandomPackagePath, getRandomTempFilePath, parseExternalProtocol, parseGithubProtocol } from "./util";

export const getHttpClient = (url: string) => {

    if (url.substring(0, 5) === 'https') {
        return Https;
    }
    return Http;
};

export const getExternalData = (url: string): Promise<string> =>
    new Promise<string>((resolve: (data: string) => void, reject: (reason: Error) => void) => {

        const client: typeof Http | typeof Https = getHttpClient(url);
        const stringBuffer: StringBuffer = StringBuffer.create();

        client.get(url, (response: Http.IncomingMessage) => {
            response.on('data', (chunk: string) => {
                stringBuffer.add(chunk);
            });
            response.on('end', () => {
                resolve(stringBuffer.value);
            });
        }).on("error", (error: Error) => {
            reject(error);
        });
    });

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

export const downloadAndDecompress = async (env: Environment, url: string): Promise<string> => {

    const tempFilePath: string = await getRandomTempFilePath(env, 'zip');
    await downloadFile(url, tempFilePath);

    const hash: string = await getFileMd5(tempFilePath);
    const packagePath: string = await getRandomPackagePath(env, hash);

    await decompressZipFile(tempFilePath, packagePath);
    return hash;
};

export const fetchAndDecompressFromAnyExternalByProtocol = async (env: Environment, protocol: EXTERNAL_PROTOCOL, url: string): Promise<string> => {

    switch (protocol) {
        case EXTERNAL_PROTOCOL.GITHUB: {
            const parsed: string = parseGithubProtocol(url);
            const packageHash: string = await downloadAndDecompress(env, parsed);
            return packageHash;
        }
        default: throw panic.code(ERROR_CODE.NOT_IMPLEMENTED);
    }
};

export const fetchAndDecompressFromAnyExternal = async (env: Environment, url: string): Promise<string> => {

    const protocol: EXTERNAL_PROTOCOL = parseExternalProtocol(url);
    const packageHash: string = await fetchAndDecompressFromAnyExternalByProtocol(env, protocol, url);
    return packageHash;
};

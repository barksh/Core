/**
 * @author WMXPY
 * @namespace IO
 * @description External
 */

import * as Fs from "fs";
import * as Http from "http";
import * as Https from "https";
import { removeFile } from "./file";

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
            writeStream.close();
            resolve();
            return;
        });
        writeStream.on('error', (error: Error) => {
            writeStream.close();
            reject(error);
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

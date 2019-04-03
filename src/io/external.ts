/**
 * @author WMXPY
 * @namespace IO
 * @description External
 */

import { decompressZipFile, downloadFile, md5File } from "@sudoo/io";
import { Environment } from "../config/environment";
import { ERROR_CODE, panic } from "../panic/declare";
import { EXTERNAL_PROTOCOL } from "./declare";
import { getRandomPackagePath, getRandomTempFilePath, parseExternalProtocol, parseGithubProtocol } from "./util";

export const downloadAndDecompress = async (env: Environment, url: string): Promise<string> => {

    const tempFilePath: string = await getRandomTempFilePath(env, 'zip');
    await downloadFile(url, tempFilePath);

    const hash: string = await md5File(tempFilePath);
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

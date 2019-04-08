/**
 * @author WMXPY
 * @namespace IO
 * @description External
 */

import { decompressZipFile, getExternalFileByProtocol, md5File } from "@sudoo/io";
import { Environment } from "../config/environment";
import { getRandomPackagePath, getRandomTempFilePath } from "./util";

export const downloadAndDecompress = async (env: Environment, url: string): Promise<string> => {

    const tempFilePath: string = await getRandomTempFilePath(env, 'zip');
    await getExternalFileByProtocol(url, tempFilePath);

    const hash: string = await md5File(tempFilePath);

    const packagePath: string = await getRandomPackagePath(env, hash);

    await decompressZipFile(tempFilePath, packagePath);
    return hash;
};

export const fetchAndDecompressFromAnyExternal = async (env: Environment, url: string): Promise<string> => {

    const packageHash: string = await downloadAndDecompress(env, url);
    return packageHash;
};

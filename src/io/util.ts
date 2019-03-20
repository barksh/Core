/**
 * @author WMXPY
 * @namespace IO
 * @description Util
 */

import * as Path from "path";
import { Environment } from "../config/environment";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { unique } from "../util/random";
import { EXTERNAL_PROTOCOL } from "./declare";
import { checkPathExists } from "./file";

export const splitPath = (path: string): string[] => path.split(Path.sep);

export const resolveUrl = (url: string): {
    protocol: EXTERNAL_PROTOCOL;
    rest: string[];
} => {

    const splited: string[] = url.split(/:\/\/|\//g);

    if (splited.length < 2) {
        throw Panic.code(ERROR_CODE.INVALID_EXTERNAL_URL, url);
    }

    const firstElement: string = splited.shift() as string;
    const protocol: string = firstElement.toLowerCase();

    switch (protocol) {
        case 'http':
        case 'https': return {
            protocol: EXTERNAL_PROTOCOL.HTTP_HTTPS,
            rest: splited,
        };
        case 'github': return {
            protocol: EXTERNAL_PROTOCOL.GITHUB,
            rest: splited,
        };
        case 'file': return {
            protocol: EXTERNAL_PROTOCOL.FILE,
            rest: splited,
        };
        default: throw Panic.code(ERROR_CODE.INVALID_EXTERNAL_PROTOCOL, protocol);
    }
};

export const parseExternalProtocol = (url: string): EXTERNAL_PROTOCOL => {

    const resolvedUrl: {
        protocol: EXTERNAL_PROTOCOL;
        rest: string[];
    } = resolveUrl(url);

    return resolvedUrl.protocol;
};

export const parseGithubProtocol = (url: string): string => {

    const { protocol, rest }: {
        protocol: EXTERNAL_PROTOCOL;
        rest: string[];
    } = resolveUrl(url);

    if (protocol !== EXTERNAL_PROTOCOL.GITHUB) {
        throw Panic.code(ERROR_CODE.INTERNAL_ISSUE);
    }

    return 'https://raw.githubusercontent.com/' + rest.join('/');
};

export const getRandomTempFilePath = async (env: Environment, extension: string, filename?: string): Promise<string> => {

    const tempPath: string = env.temporaryPath;
    const exists: boolean = await checkPathExists(tempPath);

    if (!exists) {
        throw Panic.code(ERROR_CODE.PATH_NOT_EXIST, tempPath);
    }
    const uniqueFileName: string = (filename || unique()) + '.' + extension;
    return Path.join(tempPath, uniqueFileName);
};

export const getRandomPackagePath = async (env: Environment, filename?: string): Promise<string> => {

    const packagePath: string = env.packagePath;
    const exists: boolean = await checkPathExists(packagePath);

    if (!exists) {
        throw Panic.code(ERROR_CODE.PATH_NOT_EXIST, packagePath);
    }
    const uniqueFolderName: string = filename || unique();
    return Path.join(packagePath, uniqueFolderName);
};

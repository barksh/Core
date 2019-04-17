/**
 * @author WMXPY
 * @namespace IO
 * @description Util
 */

import { _Random } from "@sudoo/bark/random";
import { Ensure } from "@sudoo/io";
import * as Path from "path";
import { Environment } from "../config/environment";
import { ERROR_CODE, panic } from "../panic/declare";
import { ConfigFileName } from "../template/declare";
import { EXTERNAL_PROTOCOL } from "./declare";

export const splitPath = (path: string): string[] => path.split(Path.sep);

export const resolveUrl = (url: string): {
    protocol: EXTERNAL_PROTOCOL;
    rest: string[];
} => {

    const splited: string[] = url.split(/:\/\/|\//g);

    if (splited.length < 2) {
        throw panic.code(ERROR_CODE.INVALID_EXTERNAL_URL, url);
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
        default: throw panic.code(ERROR_CODE.INVALID_EXTERNAL_PROTOCOL, protocol);
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
        throw panic.code(ERROR_CODE.INTERNAL_ISSUE);
    }

    return 'https://raw.githubusercontent.com/' + rest.join('/');
};

export const getRandomTempFilePath = async (env: Environment, extension: string, filename?: string): Promise<string> => {

    const tempPath: string = env.temporaryPath;
    await Ensure.create().ensureFolder(tempPath);

    const uniqueFileName: string = (filename || _Random.unique()) + '.' + extension;
    return Path.join(tempPath, uniqueFileName);
};

export const getRandomPackagePath = async (env: Environment, filename?: string): Promise<string> => {

    const packagePath: string = env.packagePath;
    await Ensure.create().ensureFolder(packagePath);

    const uniqueFolderName: string = filename || _Random.unique();
    return Path.join(packagePath, uniqueFolderName);
};

export const getBarkTemplateConfigFilePathByOriginPath = (originPath: string): string => Path.join(originPath, ConfigFileName);

export const getBarkPackageFolderPath = (env: Environment, folder: string): string => Path.join(env.packagePath, folder);

export const getBarkTemplateConfigFilePath = (env: Environment, folder: string): string => Path.join(env.packagePath, folder, ConfigFileName);

export const getPathWithNewExtName = (path: string, newExt: string): string => {

    const extWithoutDot: string = newExt.replace('.', '');
    const parsed: Path.ParsedPath = Path.parse(path);

    return Path.join(parsed.dir, parsed.name + '.' + extWithoutDot);
};

export const getPathWithoutExtName = (path: string, when?: string): string => {

    const parsed: Path.ParsedPath = Path.parse(path);

    if (when) {
        const parsedWhen: string = when.replace('.', '').toLowerCase();
        const parsedExt: string = parsed.ext.replace('.', '').toLowerCase();

        if (parsedWhen === parsedExt) {
            return Path.join(parsed.dir, parsed.name);
        }

        return path;
    }
    return Path.join(parsed.dir, parsed.name);
};

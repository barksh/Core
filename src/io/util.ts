/**
 * @author WMXPY
 * @namespace IO
 * @description Util
 */

import * as OS from "os";
import * as Path from "path";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { EXTERNAL_PROTOCOL } from "./declare";

export const splitPath = (path: string): string[] => path.split(Path.sep);

export const getAppDataPath = (): string => {

    if (process.env.BARKSH_LOCALLY_TEST) {
        return Path.resolve('./test_barksh');
    }

    const os: NodeJS.Platform = OS.platform();
    const home: string = OS.homedir();
    switch (os) {

        case 'darwin': return Path.join(home, 'Library', 'Application Support', '.barksh');
        case 'linux': {
            const linuxPath: string | undefined = process.env.XDG_CONFIG_HOME;
            return linuxPath || Path.join(home, '.config', '.barksh');
        }
        case 'win32': throw new Error('...TODO');
        default: return Path.join(home, '.barksh');
    }
};

export const getAppDataPathMakeDirList = (): string[] => {

    if (process.env.BARKSH_LOCALLY_TEST) {
        return [Path.resolve('./test_barksh')];
    }

    const os: NodeJS.Platform = OS.platform();
    const home: string = OS.homedir();
    switch (os) {

        case 'darwin': return [
            Path.join(home, 'Library', 'Application Support'),
            Path.join(home, 'Library', 'Application Support', '.barksh'),
        ];
        case 'linux': {
            const linuxPath: string | undefined = process.env.XDG_CONFIG_HOME;
            if (linuxPath) {
                return [
                    linuxPath,
                ];
            }
            return [
                Path.join(home, '.config'),
                Path.join(home, '.config', '.barksh'),
            ];
        }
        case 'win32': throw new Error('...TODO');
        default: return [
            Path.join(home, '.barksh'),
        ];
    }
};

export const getConfigFilePath = (): string => Path.join(getAppDataPath(), 'bark.json');

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

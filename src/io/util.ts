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

export const parseExternalProtocol = (url: string): EXTERNAL_PROTOCOL => {

    const splited: string[] = url.split(/(:\/\/)|(\/)/g);

    if (splited.length < 2) {
        throw Panic.code(ERROR_CODE.INVALID_EXTERNAL_URL, url);
    }

    const protocol: string = splited.shift().toLowerCase();
    switch (protocol) {
        case 'http':
        case 'https': return EXTERNAL_PROTOCOL.HTTP_HTTPS;
        case 'github': return EXTERNAL_PROTOCOL.GITHUB;
        case 'file': return EXTERNAL_PROTOCOL.FILE;
        default: throw Panic.code(ERROR_CODE.INVALID_EXTERNAL_PROTOCOL, protocol);
    }
};

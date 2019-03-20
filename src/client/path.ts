/**
 * @author WMXPY
 * @namespace Client
 * @description Path
 */

import * as OS from "os";
import * as Path from "path";
import { attemptMarkDir, checkPathExists } from "../io/file";

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

export const ensureAppDataPath = async (): Promise<void> => {

    const configPath: string = getAppDataPath();
    const exists: boolean = await checkPathExists(configPath);
    if (exists) {
        return;
    }

    const preList: string[] = getAppDataPathMakeDirList();
    for (const dir of preList) {
        await attemptMarkDir(dir);
    }
    return;
};

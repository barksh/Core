/**
 * @author WMXPY
 * @namespace Client
 * @description Config
 */

import { BarkConfig, getDefaultConfig } from "../config/declare";
import { checkPathExists, ensureAppDataPath, readTextFile, removeFile, writeTextFile } from "../io/file";
import { getConfigFilePath } from "../io/util";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";

export const getConfigFile = async (): Promise<string | null> => {

    const configFilePath: string = getConfigFilePath();
    const exists: boolean = await checkPathExists(configFilePath);

    if (exists) {
        return await readTextFile(configFilePath);
    }
    return null;
};

export const replaceConfigFile = async (content: string): Promise<void> => {

    const configFilePath: string = getConfigFilePath();
    const exists: boolean = await checkPathExists(configFilePath);

    if (!exists) {
        await ensureAppDataPath();
    }
    await writeTextFile(configFilePath, content);
    return;
};

export const removeConfigFile = async (): Promise<void> => {

    const configFilePath: string = getConfigFilePath();
    const exists: boolean = await checkPathExists(configFilePath);

    if (exists) {
        await removeFile(configFilePath);
    }
    return;
};

export const getOrInitConfig = async (): Promise<BarkConfig> => {

    const file: string | null = await getConfigFile();
    if (file) {
        try {
            const barkConfig: BarkConfig = JSON.parse(file);
            return barkConfig;
        } catch (error) {
            throw Panic.code(ERROR_CODE.CONFIG_PARSE_FAILED);
        }
    }
    const defaultConfig: BarkConfig = getDefaultConfig();
    await replaceConfigFile(JSON.stringify(getDefaultConfig(), null, 2));

    return defaultConfig;
};

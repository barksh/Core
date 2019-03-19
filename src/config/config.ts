/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 */

import { getConfigFile, replaceConfigFile } from "../io/file";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { BarkConfig, getDefaultConfig } from "./declare";

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

/**
 * @author WMXPY
 * @namespace Client
 * @description Config
 */

import { BarkConfig, getDefaultConfig } from "../config/declare";
import { readTextFile, writeTextFile } from "../io/file";
import { ERROR_CODE, panic } from "../panic/declare";

export const getOrInitConfig = async (path: string): Promise<BarkConfig> => {

    const file: string | null = await readTextFile(path);
    if (file) {
        try {
            const barkConfig: BarkConfig = JSON.parse(file);
            return barkConfig;
        } catch (error) {
            throw panic.code(ERROR_CODE.CONFIG_PARSE_FAILED);
        }
    }
    const defaultConfig: BarkConfig = getDefaultConfig();
    await writeTextFile(path, JSON.stringify(getDefaultConfig(), null, 2));

    return defaultConfig;
};

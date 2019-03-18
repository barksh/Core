/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 */

import { getConfigFile, replaceConfigFile } from "../io/file";
import { BarkConfig, getDefaultConfig } from "./declare";

export const getOrInitConfig = async (): Promise<BarkConfig> => {

    const file: string | null = await getConfigFile();
    if (file) {
        try {
            const barkConfig: BarkConfig = JSON.parse(file);
            return barkConfig;
        } catch (error) {
            throw new Error('Not valid');
        }
    }
    const defaultConfig: BarkConfig = getDefaultConfig();
    await replaceConfigFile(JSON.stringify(getDefaultConfig(), null, 2));

    return defaultConfig;
};

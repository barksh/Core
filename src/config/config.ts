/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 */

import { getConfigFile } from "../io/file";
import { BarkConfig } from "./declare";

export const getConfig = async (): Promise<BarkConfig> => {

    const file: string = await getConfigFile();

    return {} as any;
};

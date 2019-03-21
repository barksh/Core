/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 */

import { BarkConfig } from "./declare";

export const verifyBarkConfig = (config: BarkConfig): boolean => {

    if (!config.sources) {
        return false;
    }

    return true;
};

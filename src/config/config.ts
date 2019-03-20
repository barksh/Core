/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 */

import { BarkConfig } from "./declare";

export const verifyBarkConfig = (config: BarkConfig): boolean => {

    if (!config.source) {
        return false;
    }

    if (!config.templates) {
        return false;
    }

    return true;
};

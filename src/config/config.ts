/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 */

import { BarkConfig, BarkTemplate } from "./declare";

export const addTemplate = (previous: BarkConfig, template: BarkTemplate): BarkConfig => {

    return {
        ...previous,
        templates: [...previous.templates, template],
    };
};

export const verifyBarkConfig = (config: BarkConfig): boolean => {

    if (!config.sources) {
        return false;
    }

    return true;
};

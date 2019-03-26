/**
 * @author WMXPY
 * @namespace Source
 * @description Refresh
 */

import { BarkConfig, BarkSource } from "../config/declare";
import { Environment } from "../config/environment";
import { getExternalData } from "../io/external";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { safeParseJSON } from "../util/safe";
import { ExternalSourceStructure, ExternalTemplate } from "./declare";
import { updateBarkSourceFromExternalSourceStructure } from "./source";

export const verifyExternalSourceStructure = (structure: ExternalSourceStructure): boolean => {

    if (!structure.templates) {
        return false;
    }

    if (!structure.templates.every(
        (template: ExternalTemplate) => {
            return Boolean(template.name)
                && Boolean(template.url)
                && Boolean(template.version);
        })) {
        return false;
    }

    return true;
};

export const updateSourceFromExternal = async (source: BarkSource): Promise<BarkSource> => {

    const info: string = await getExternalData(source.url);
    const parsed: ExternalSourceStructure = safeParseJSON(info, Panic.code(ERROR_CODE.EXTERNAL_SOURCE_PARSE_FAILED));

    if (!verifyExternalSourceStructure(parsed)) {
        throw Panic.code(ERROR_CODE.EXTERNAL_SOURCE_VERIFY_FAILED);
    }

    return updateBarkSourceFromExternalSourceStructure(source, parsed);
};

export const updateAllSourceFromExternal = async (env: Environment): Promise<Environment> => {

    const newSourceList: BarkSource[] = [];
    for (const source of env.config.sources) {
        const newSource: BarkSource = await updateSourceFromExternal(source);
        newSourceList.push(newSource);
    }

    const newConfig: BarkConfig = {
        ...env.config,
        sources: newSourceList,
    };

    const newEnvironment: Environment = env.clone();
    newEnvironment.setConfig(newConfig);

    return newEnvironment;
};

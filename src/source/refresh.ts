/**
 * @author WMXPY
 * @namespace Source
 * @description Refresh
 */

import { _Json } from "@sudoo/bark/json";
import { getExternalTextByProtocol } from "@sudoo/io";
import { BarkConfig, BarkSource } from "../config/declare";
import { Environment } from "../config/environment";
import { ERROR_CODE, panic } from "../panic/declare";
import { ExternalSourceStructure, ExternalTemplate } from "./declare";
import { replaceSourceFormEnvironment } from "./mutate";
import { findSourceByName, updateBarkSourceFromExternalSourceStructure } from "./source";

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

    const info: string | null = await getExternalTextByProtocol(source.url);

    if (!info) {
        throw panic.code(ERROR_CODE.SOURCE_EXTERNAL_FILE_NOT_FOUND, source.url);
    }

    const parsed: ExternalSourceStructure = _Json.safeParse(info, panic.code(ERROR_CODE.EXTERNAL_SOURCE_PARSE_FAILED));

    if (!verifyExternalSourceStructure(parsed)) {
        throw panic.code(ERROR_CODE.EXTERNAL_SOURCE_VERIFY_FAILED);
    }

    return updateBarkSourceFromExternalSourceStructure(source, parsed);
};

export const updateSourceFromExternalByName = async (env: Environment, name: string): Promise<Environment> => {

    const source: BarkSource | null = findSourceByName(env, name);

    if (!source) {
        throw panic.code(ERROR_CODE.SOURCE_NAME_NOT_FOUND, name);
    }

    const newSource: BarkSource = await updateSourceFromExternal(source);
    return replaceSourceFormEnvironment(env, name, newSource);
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

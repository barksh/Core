/**
 * @author WMXPY
 * @namespace Source
 * @description Initial
 */

import { _Json } from "@sudoo/bark/json";
import { _Random } from "@sudoo/bark/random";
import { getExternalData } from "@sudoo/io";
import { BarkConfig, BarkSource } from "../config/declare";
import { Environment } from "../config/environment";
import { ERROR_CODE, panic } from "../panic/declare";
import { getCurrentDate } from "../util/date";
import { ExternalSourceStructure } from "./declare";
import { verifyExternalSourceStructure } from "./refresh";
import { findSourceIndexByName, getSourceFromUrlByEnvironment } from "./source";

export const addSourceFromURLToEnvironment = async (env: Environment, url: string, name?: string): Promise<Environment> => {

    const template: BarkSource | null = getSourceFromUrlByEnvironment(env, url);

    if (template) {
        throw panic.code(ERROR_CODE.SOURCE_ALREADY_EXIST, url);
    }

    const info: string = await getExternalData(url);
    const parsed: ExternalSourceStructure = _Json.safeParse(info, panic.code(ERROR_CODE.EXTERNAL_SOURCE_PARSE_FAILED));

    if (!verifyExternalSourceStructure(parsed)) {
        throw panic.code(ERROR_CODE.EXTERNAL_SOURCE_VERIFY_FAILED);
    }

    const source: BarkSource = {
        name: name || _Random.unique(),
        url,
        lastUpdate: getCurrentDate(),
        structure: parsed,
    };

    const newEnv: Environment = env.clone();
    const newConfig: BarkConfig = newEnv.config;

    newEnv.setConfig({
        ...newConfig,
        sources: [...newConfig.sources, source],
    });
    return newEnv;
};

export const replaceSourceFormEnvironment = (env: Environment, name: string, newSource: BarkSource): Environment => {

    const newEnvironment: Environment = env.clone();

    const newConfig: BarkConfig = {
        ...newEnvironment.config,
        sources: newEnvironment.config.sources.map((value: BarkSource) => {
            if (value.name === name) {
                return newSource;
            }
            return value;
        }),
    };

    newEnvironment.setConfig(newConfig);
    return newEnvironment;
};

export const removeSourceFromEnvironment = (env: Environment, name: string): Environment => {

    const index: number | null = findSourceIndexByName(env, name);
    if (typeof index !== 'number') {
        throw panic.code(ERROR_CODE.SOURCE_NAME_NOT_FOUND, name);
    }

    const newEnv: Environment = env.clone();
    const newConfig: BarkConfig = newEnv.config;

    newConfig.sources.splice(index, 1);

    newEnv.setConfig(newConfig);
    return newEnv;
};

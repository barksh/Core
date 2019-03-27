/**
 * @author WMXPY
 * @namespace Source
 * @description Initial
 */

import { BarkConfig, BarkSource } from "../config/declare";
import { Environment } from "../config/environment";
import { getExternalData } from "../io/external";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { getCurrentDate } from "../util/date";
import { safeParseJSON } from "../util/safe";
import { ExternalSourceStructure } from "./declare";
import { verifyExternalSourceStructure } from "./refresh";
import { getSourceFromUrlByEnvironment } from "./source";

export const addSourceFromURLToEnvironment = async (env: Environment, url: string): Promise<Environment> => {

    const template: BarkSource | null = getSourceFromUrlByEnvironment(env, url);

    if (template) {
        throw Panic.code(ERROR_CODE.SOURCE_ALREADY_EXIST, url);
    }

    const info: string = await getExternalData(url);
    const parsed: ExternalSourceStructure = safeParseJSON(info, Panic.code(ERROR_CODE.EXTERNAL_SOURCE_PARSE_FAILED));

    if (!verifyExternalSourceStructure(parsed)) {
        throw Panic.code(ERROR_CODE.EXTERNAL_SOURCE_VERIFY_FAILED);
    }

    const source: BarkSource = {
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

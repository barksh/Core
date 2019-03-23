/**
 * @author WMXPY
 * @namespace Action
 * @description Info
 */

import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { searchTemplateFromEnvironmentByQuery } from "../template/template";

export const infoAction = async (env: Environment, query: string): Promise<BarkTemplate> => {

    const searchResult: BarkTemplate | null = searchTemplateFromEnvironmentByQuery(env, query);

    if (!searchResult) {
        throw Panic.code(ERROR_CODE.TEMPLATE_NOT_INSTALLED, query);
    }

    return searchResult;
};

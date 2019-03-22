/**
 * @author WMXPY
 * @namespace Action
 * @description Install
 */

import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { fetchAndDecompressFromAnyExternal } from "../io/external";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { ExternalTemplate } from "../source/declare";
import { findUrlFromSourcesByEnvironment } from "../source/source";
import { TemplateQueryInfo } from "../template/declare";
import { parseTemplateQuery, searchTemplateFromConfig } from "../template/template";

export const installAction = async (env: Environment, query: string, target: string): Promise<void> => {

    const templateInfo: TemplateQueryInfo = parseTemplateQuery(query);

    const existTemplates: BarkTemplate | null = searchTemplateFromConfig(env.config, templateInfo);
    if (existTemplates) {
        throw Panic.code(ERROR_CODE.TEMPLATE_NAME_ALREADY_EXIST, query);
    }

    const searchResult: ExternalTemplate | null = findUrlFromSourcesByEnvironment(env, templateInfo);
    if (!searchResult) {
        throw Panic.code(ERROR_CODE.TEMPLATE_NOT_EXIST, query);
    }

    // fetchAndDecompressFromAnyExternal(env, searchResult.url)
    return;
};

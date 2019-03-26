/**
 * @author WMXPY
 * @namespace Core
 * @description Actions
 */

import { addTemplate } from "../config/config";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { fetchAndDecompressFromAnyExternal } from "../io/external";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { ExternalTemplate } from "../source/declare";
import { findUrlFromSourcesByEnvironment } from "../source/source";
import { TemplateQueryInfo } from "../template/declare";
import { parseTemplateQuery, searchTemplateFromConfig } from "../template/template";

export const installAction = async (env: Environment, query: string): Promise<Environment> => {

    const info: TemplateQueryInfo = parseTemplateQuery(query);
    const installed: BarkTemplate | null = searchTemplateFromConfig(env.config, info);

    if (installed) {
        return;
    }

    const template: ExternalTemplate | null = findUrlFromSourcesByEnvironment(env, info);

    if (!template) {
        throw Panic.code(ERROR_CODE.TEMPLATE_NOT_EXIST_FROM_EXTERNAL, query);
    }

    const packagePath: string = await fetchAndDecompressFromAnyExternal(env, template.url);

    const newEnv: Environment = env.clone().setConfig(addTemplate(env.config, {
        name: info.name,
        version: info.version,
        folderName: packagePath,
    }));

    return newEnv;
};

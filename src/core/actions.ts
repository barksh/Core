/**
 * @author WMXPY
 * @namespace Core
 * @description Actions
 */

import { addTemplate } from "../config/config";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { fetchAndDecompressFromAnyExternal } from "../io/external";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { ExternalTemplate } from "../source/declare";
import { findUrlFromSourcesByEnvironment } from "../source/source";
import { getDefaultTemplateConfig, TemplateConfig, TemplateQueryInfo } from "../template/declare";
import { getPackageTemplateConfigByBarkTemplate } from "../template/package";
import { parseTemplateQuery, searchTemplateFromConfig, searchTemplateFromEnvironmentByQuery } from "../template/template";

export const attemptAction = async (env: Environment, query: string): Promise<Template | null> => {

    const template: BarkTemplate | null = searchTemplateFromEnvironmentByQuery(env, query);

    if (!template) {
        return null;
    }

    const attempt: TemplateConfig | null = await getPackageTemplateConfigByBarkTemplate(env, template);
    if (attempt) {
        return Template.create(attempt, template);
    }
    return Template.create(getDefaultTemplateConfig(), template);
};

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

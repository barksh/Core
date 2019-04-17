/**
 * @author WMXPY
 * @namespace Template
 * @description Clean
 */

import { directoryFiles, RMRFFolder } from "@sudoo/io";
import { BarkConfig, BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { ERROR_CODE, panic } from "../panic/declare";
import { TemplateQueryInfo } from "./declare";
import { parseTemplateQuery, removeTemplateFromConfig, searchTemplateFromEnvironmentByQuery } from "./template";

export const removeTemplate = async (env: Environment, query: string): Promise<Environment> => {

    const newEnv: Environment = env.clone();
    const template: BarkTemplate | null = searchTemplateFromEnvironmentByQuery(env, query);

    if (!template) {
        throw panic.code(ERROR_CODE.TEMPLATE_NOT_EXIST, query);
    }

    await RMRFFolder(env.joinPackagePath(template.folderName));

    const info: TemplateQueryInfo = parseTemplateQuery(query);
    const newConfig: BarkConfig = removeTemplateFromConfig(newEnv.config, info);
    return newEnv.setConfig(newConfig);
};

export const removeAllTemplates = async (env: Environment): Promise<Environment> => {

    const newEnv: Environment = env.clone();

    const templateFolders: string[] = await directoryFiles(env.temporaryPath);

    for (const folder of templateFolders) {
        await RMRFFolder(folder);
    }

    const newConfig: BarkConfig = {
        ...newEnv.config,
        templates: [],
    };

    newEnv.setConfig(newConfig);
    return newEnv;
};

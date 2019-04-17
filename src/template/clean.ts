/**
 * @author WMXPY
 * @namespace Template
 * @description Clean
 */

import { RMRFFolder } from "@sudoo/io";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { ERROR_CODE, panic } from "../panic/declare";
import { searchTemplateFromEnvironmentByQuery } from "./template";

export const removeTemplate = async (env: Environment, query: string): Promise<Environment> => {

    const newEnv: Environment = env.clone();
    const template: BarkTemplate | null = searchTemplateFromEnvironmentByQuery(env, query);

    if (!template) {
        throw panic.code(ERROR_CODE.TEMPLATE_NOT_EXIST, query);
    }

    await RMRFFolder(env.joinPackagePath(template.folderName));

    return newEnv; // WIP
};

export const removeAllTemplates = async (env: Environment): Promise<Environment> => {

    const newEnv: Environment = env.clone();

    return newEnv; // WIP
};

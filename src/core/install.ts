/**
 * @author WMXPY
 * @namespace Core
 * @description Install
 */

import { _Random } from "@sudoo/bark/random";
import { addTemplate } from "../config/config";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { fetchAndDecompressFromAnyExternal } from "../io/external";
import { getRandomPackagePath } from "../io/util";
import { ERROR_CODE, panic } from "../panic/declare";
import { ExternalTemplate } from "../source/declare";
import { findUrlFromSourcesByEnvironment } from "../source/source";
import { copyAllFiles } from "../template/copy";
import { TemplateQueryInfo } from "../template/declare";
import { parseTemplateQuery, searchTemplateFromConfig } from "../template/template";

const ensureTemplateNotExist = (env: Environment, info: TemplateQueryInfo): void => {

    const installed: BarkTemplate | null = searchTemplateFromConfig(env.config, info);

    if (installed) {
        throw panic.code(ERROR_CODE.TEMPLATE_ALREADY_EXIST, info.name + '@' + info.version);
    }

    return;
};

export const installFromLocalAction = async (
    env: Environment,
    name: string,
    version: string,
    path: string,
    packageFolderName: string = _Random.unique(),
): Promise<Environment> => {

    ensureTemplateNotExist(env, {
        name,
        version,
    });

    const packagePath: string = await getRandomPackagePath(env, packageFolderName);

    await copyAllFiles(path, packagePath);

    const newEnv: Environment = env.clone().setConfig(addTemplate(env.config, {
        name,
        version,
        folderName: packageFolderName,
    }));

    return newEnv;
};

export const installFromExternalAction = async (
    env: Environment,
    name: string,
    version: string,
    url: string,
): Promise<Environment> => {

    ensureTemplateNotExist(env, {
        name,
        version,
    });

    const packagePath: string = await fetchAndDecompressFromAnyExternal(env, url);

    const newEnv: Environment = env.clone().setConfig(addTemplate(env.config, {
        name,
        version,
        folderName: packagePath,
    }));

    return newEnv;
};

export const installFromSourceAction = async (env: Environment, query: string): Promise<Environment> => {

    const info: TemplateQueryInfo = parseTemplateQuery(query);
    ensureTemplateNotExist(env, info);

    const template: ExternalTemplate | null = findUrlFromSourcesByEnvironment(env, info);

    if (!template) {
        throw panic.code(ERROR_CODE.TEMPLATE_NOT_EXIST_FROM_EXTERNAL, query);
    }

    const packagePath: string = await fetchAndDecompressFromAnyExternal(env, template.url);

    const newEnv: Environment = env.clone().setConfig(addTemplate(env.config, {
        name: info.name,
        version: template.version,
        folderName: packagePath,
    }));

    return newEnv;
};

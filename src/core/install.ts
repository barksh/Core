/**
 * @author WMXPY
 * @namespace Core
 * @description Install
 */

import { _Random } from "@sudoo/bark/random";
import { addTemplate } from "../config/config";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { TEXT } from "../i18n/declare";
import { fPrint } from "../i18n/i18n";
import { fetchAndDecompressFromAnyExternal } from "../io/external";
import { getRandomPackagePath } from "../io/util";
import { Log } from "../log/log";
import { ERROR_CODE, panic } from "../panic/declare";
import { AutoWire } from "../services/di";
import { ExternalTemplate } from "../source/declare";
import { findUrlFromSourcesByEnvironment } from "../source/source";
import { copyAllFiles } from "../template/copy";
import { TemplateQueryInfo } from "../template/declare";
import { parseTemplateQuery, searchTemplateFromConfig } from "../template/template";

export const installFromLocalAction = async (
    env: Environment,
    name: string,
    version: string,
    path: string,
    packageFolderName: string = _Random.unique(),
): Promise<Environment> => {

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

    const packagePath: string = await fetchAndDecompressFromAnyExternal(env, url);

    const newEnv: Environment = env.clone().setConfig(addTemplate(env.config, {
        name,
        version,
        folderName: packagePath,
    }));

    return newEnv;
};

export const installFromSourceAction = async (env: Environment, query: string, replace: boolean = true): Promise<Environment> => {

    const log: Log = AutoWire('log');

    const info: TemplateQueryInfo = parseTemplateQuery(query);
    const installed: BarkTemplate | null = searchTemplateFromConfig(env.config, info);

    if (installed) {
        if (replace) log.log(fPrint(TEXT.PACKAGE_ALREADY_INSTALLED_REPLACE));
        else {
            log.log(fPrint(TEXT.PACKAGE_ALREADY_INSTALLED_ABORT));
            return env;
        }
    }

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

/**
 * @author WMXPY
 * @namespace Template
 * @description Package
 */

import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { checkPathExists, readTextFile } from "../io/file";
import { getBarkTemplateConfigFilePath } from "../io/util";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { safeParseJSON } from "../util/safe";
import { TemplateConfig } from "./declare";

export const verifyTemplateConfig = (config: TemplateConfig): boolean => {

    if (!config.templateMethod) {
        return false;
    }

    return true;
};

export const getPackageTemplateConfigByBarkTemplate = async (env: Environment, template: BarkTemplate): Promise<TemplateConfig | null> => {

    return await getPackageTemplateConfigByFolderName(env, template.folderName);
};

export const getPackageTemplateConfigByFolderName = async (env: Environment, folderName: string): Promise<TemplateConfig | null> => {

    const configFilePath: string = getBarkTemplateConfigFilePath(env, folderName);
    const existences: boolean = await checkPathExists(configFilePath);

    if (!existences) {
        return null;
    }

    const content: string = await readTextFile(configFilePath);
    const parsed: TemplateConfig = safeParseJSON(content, Panic.code(ERROR_CODE.TEMPLATE_CONFIG_PARSE_FAILED, folderName));

    if (!verifyTemplateConfig(parsed)) {
        throw Panic.code(ERROR_CODE.TEMPLATE_CONFIG_VERIFY_FAILED, folderName);
    }

    return parsed;
};

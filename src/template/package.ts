/**
 * @author WMXPY
 * @namespace Template
 * @description Package
 */

import { _Json } from "@sudoo/bark/json";
import { digFolder, Folder, pathExists, readTextFile } from "@sudoo/io";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { getBarkPackageFolderPath, getBarkTemplateConfigFilePath, getBarkTemplateConfigFilePathByOriginPath } from "../io/util";
import { ERROR_CODE, panic } from "../panic/declare";
import { TemplateConfig } from "./declare";

export const getFilesFromTemplateByTemplate = async (env: Environment, template: Template): Promise<string[]> => {

    const path: string = getBarkPackageFolderPath(env, template.template.folderName);
    const folder: Folder = await digFolder(path);

    return folder.getAllFilePaths();
};

export const verifyTemplateConfig = (config: TemplateConfig): boolean => {

    return true;
};

export const getPackageTemplateConfigByBarkTemplate = async (env: Environment, template: BarkTemplate): Promise<TemplateConfig | null> => {

    return await getPackageTemplateConfigByFolderName(env, template.folderName);
};

export const getPackageTemplateConfigByOriginPath = async (path: string): Promise<TemplateConfig | null> => {

    const configFilePath: string = getBarkTemplateConfigFilePathByOriginPath(path);
    const existences: boolean = await pathExists(configFilePath);

    if (!existences) {
        return null;
    }

    const content: string = await readTextFile(configFilePath);
    const parsed: TemplateConfig = _Json.safeParse(content, panic.code(ERROR_CODE.TEMPLATE_CONFIG_PARSE_FAILED, path));

    if (!verifyTemplateConfig(parsed)) {
        throw panic.code(ERROR_CODE.TEMPLATE_CONFIG_VERIFY_FAILED, path);
    }

    return parsed;
};

export const getPackageTemplateConfigByFolderName = async (env: Environment, folderName: string): Promise<TemplateConfig | null> => {

    const configFilePath: string = getBarkTemplateConfigFilePath(env, folderName);
    const existences: boolean = await pathExists(configFilePath);

    if (!existences) {
        return null;
    }

    const content: string = await readTextFile(configFilePath);
    const parsed: TemplateConfig = _Json.safeParse(content, panic.code(ERROR_CODE.TEMPLATE_CONFIG_PARSE_FAILED, folderName));

    if (!verifyTemplateConfig(parsed)) {
        throw panic.code(ERROR_CODE.TEMPLATE_CONFIG_VERIFY_FAILED, folderName);
    }

    return parsed;
};

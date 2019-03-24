/**
 * @author WMXPY
 * @namespace Template
 * @description Package
 */

import { Environment } from "../config/environment";
import { checkPathExists } from "../io/file";
import { getBarkTemplateConfigFilePath } from "../io/util";
import { TemplateConfig } from "./declare";

export const getPackageInstruction = async (env: Environment, folderName: string): Promise<TemplateConfig | null> => {

    const existences: boolean = await checkPathExists(getBarkTemplateConfigFilePath(env, folderName));

    if (!existences) {
        return null;
    }
    return null;
};

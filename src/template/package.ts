/**
 * @author WMXPY
 * @namespace Template
 * @description Package
 */

import * as Path from "path";
import { Environment } from "../config/environment";
import { checkPathExists } from "../io/file";
import { ConfigFileName, TemplateConfig } from "./declare";

export const getPackageInstruction = async (env: Environment, folderName: string): Promise<TemplateConfig | null> => {

    const existences: boolean = await checkPathExists(Path.join(env.packagePath, folderName, ConfigFileName));

    if (!existences) {
        return null;
    }
    return null;
};

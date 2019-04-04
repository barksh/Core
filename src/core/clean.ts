/**
 * @author WMXPY
 * @namespace Core
 * @description Clean
 */

import { directoryFiles, RMRFFolder } from "@sudoo/io";
import * as Path from "path";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";

export const cleanTempFiles = async (env: Environment): Promise<void> => {

    await RMRFFolder(env.temporaryPath);
    return;
};

export const getInActivePackageFullPaths = async (env: Environment): Promise<string[]> => {

    const result: string[] = [];

    const activeFolderNames: string[] = env.config.templates.map((template: BarkTemplate) => template.folderName);

    const packagePath: string = env.packagePath;
    const packageFolders: string[] = await directoryFiles(packagePath);

    for (const folder of packageFolders) {

        if (!activeFolderNames.includes(folder)) {
            const fullPath: string = Path.join(packagePath, folder);
            result.push(fullPath);
        }
    }

    return result;
};


export const cleanInActivePackages = async (env: Environment): Promise<void> => {

    const inActivePackagesFullPaths: string[] = await getInActivePackageFullPaths(env);

    for (const fullPath of inActivePackagesFullPaths) {
        await RMRFFolder(fullPath);
    }
    return;
};

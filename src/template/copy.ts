/**
 * @author WMXPY
 * @namespace Template
 * @description Copy
 */

import * as Path from "path";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { recursiveDoExcludeFileName } from "../io/file";
import { ConfigFileName } from "./declare";

export const parseAndCopyTemplate = async (env: Environment, template: BarkTemplate, replacements: Record<string, string>, targetPath: string): Promise<void> => {

    const templatePath: string = Path.join(env.packagePath, template.folderName);
    await recursiveDoExcludeFileName(templatePath, async (file: string) => {
        console.log(file);
    }, [ConfigFileName]);
};

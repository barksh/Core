/**
 * @author WMXPY
 * @namespace Template
 * @description Copy
 */

import * as Path from "path";
import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { recursiveDo } from "../io/file";

export const parseAndCopyTemplate = async (env: Environment, template: BarkTemplate, replacements: Record<string, string>, targetPath: string): Promise<void> => {

    const templatePath: string = Path.join(env.packagePath, template.folderName);
    await recursiveDo(templatePath, async (file: string) => {

    });
};

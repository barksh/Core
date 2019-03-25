/**
 * @author WMXPY
 * @namespace Template
 * @description Copy
 */

import * as Path from "path";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { readTextFile, recursiveDoExcludeFileName } from "../io/file";
import { ConfigFileName } from "./declare";
import { parseContent } from "./parse";

export const parseAndCopyTemplate = async (env: Environment, template: Template, replacements: Record<string, string>, targetPath: string): Promise<void> => {

    const templatePath: string = Path.join(env.packagePath, template.template.folderName);
    await recursiveDoExcludeFileName(templatePath, async (file: string) => {

        const content: string = await readTextFile(file);
        const parsed: string = parseContent(template.config.templateMethod, content, replacements);
    }, [ConfigFileName]);
};

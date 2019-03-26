/**
 * @author WMXPY
 * @namespace Template
 * @description Copy
 */

import * as Path from "path";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { readTextFile, recursiveDoExcludeFileName, writeTextFile } from "../io/file";
import { getPathWithoutExtName } from "../io/util";
import { Ensure } from "../util/ensure";
import { ConfigFileName } from "./declare";
import { parseContent } from "./parse";

export const parseAndCopyTemplate = async (
    env: Environment,
    template: Template,
    replacements: Record<string, string>,
    targetPath: string,
): Promise<void> => {

    const templatePath: string = Path.join(env.packagePath, template.template.folderName);
    const ensure: Ensure = Ensure.create();

    await recursiveDoExcludeFileName(templatePath, async (file: string, relative: string[]) => {

        const content: string = await readTextFile(file);
        const parsed: string = parseContent(template.config.templateMethod, content, replacements);

        const targetFile: string = Path.join(targetPath, ...relative);

        await ensure.ensure(targetFile);

        const pathWithoutExtName = getPathWithoutExtName(targetFile);

        await writeTextFile(pathWithoutExtName, parsed);
    }, [ConfigFileName]);
};

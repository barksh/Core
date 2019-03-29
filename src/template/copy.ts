/**
 * @author WMXPY
 * @namespace Template
 * @description Copy
 */

import * as Path from "path";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { HOOKS } from "../hook/declare";
import { readTextFile, recursiveDoExcludeFileName, writeTextFile } from "../io/file";
import { getPathWithoutExtName } from "../io/util";
import { Ensure } from "../util/ensure";
import { ConfigFileName, getExtNameLooksLike, TEMPLATE_METHOD } from "./declare";
import { parseContent } from "./parse";

export const parseAndCopyDirect = async (
    env: Environment,
    path: string,
    replacements: Record<string, string>,
    targetPath: string,
): Promise<void> => {

    const ensure: Ensure = Ensure.create();

    await recursiveDoExcludeFileName(path, async (file: string, relative: string[]) => {

        const content: string = await readTextFile(file);
        const method: TEMPLATE_METHOD = TEMPLATE_METHOD.EJS; // TODO
        const parsed: string = parseContent(method, content, replacements);

        const targetFile: string = Path.join(targetPath, ...relative);

        await ensure.ensure(targetFile);

        const pathWithoutExtName = getPathWithoutExtName(targetFile, getExtNameLooksLike(method));

        env.hook.call(HOOKS.PARSE_FILE, file);
        await writeTextFile(pathWithoutExtName, parsed);
    }, [ConfigFileName]);
};

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
        const method: TEMPLATE_METHOD = template.config.templateMethod;
        const parsed: string = parseContent(method, content, replacements);

        const targetFile: string = Path.join(targetPath, ...relative);

        await ensure.ensure(targetFile);

        const pathWithoutExtName = getPathWithoutExtName(targetFile, getExtNameLooksLike(method));

        env.hook.call(HOOKS.PARSE_FILE, file);
        await writeTextFile(pathWithoutExtName, parsed);
    }, [ConfigFileName]);
};

export const copyAllFiles = async (from: string, to: string): Promise<void> => {

    const ensure: Ensure = Ensure.create();

    await recursiveDoExcludeFileName(from, async (file: string, relative: string[]) => {

        const content: string = await readTextFile(file);

        const targetFile: string = Path.join(to, ...relative);

        await ensure.ensure(targetFile);
        await writeTextFile(targetFile, content);
    }, []);
};

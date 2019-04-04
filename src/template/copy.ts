/**
 * @author WMXPY
 * @namespace Template
 * @description Copy
 */

import { Ensure, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { HOOKS } from "../hook/declare";
import { recursiveDoExcludeFileName } from "../io/file";
import { getPathWithoutExtName } from "../io/util";
import { ERROR_CODE, panic } from "../panic/declare";
import { ConfigFileName, getExtNameLooksLike, TemplateConfig, PARSING_METHOD } from "./declare"; // tslint:disable-line
import { getPackageTemplateConfigByOriginPath } from "./package";
import { parseContent } from "./parse";

export const parseAndCopyDirect = async (
    env: Environment,
    path: string,
    replacements: Record<string, string>,
    targetPath: string,
): Promise<void> => {

    const exist: boolean = await pathExists(targetPath);

    if (!exist) {
        throw panic.code(ERROR_CODE.ORIGIN_FOLDER_NOT_EXIST, path);
    }

    const config: TemplateConfig | null = await getPackageTemplateConfigByOriginPath(targetPath);

    if (!config) {
        throw panic.code(ERROR_CODE.CONFIG_IS_REQUIRED_FOR_FOLDER_INIT, path);
    }

    const method: PARSING_METHOD = config.templateMethod;

    const ensure: Ensure = Ensure.create();

    await recursiveDoExcludeFileName(path, async (file: string, relative: string[]) => {

        const content: string = await readTextFile(file);
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
    const method: PARSING_METHOD = template.config.templateMethod;

    const ensure: Ensure = Ensure.create();

    await recursiveDoExcludeFileName(templatePath, async (file: string, relative: string[]) => {

        const content: string = await readTextFile(file);
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

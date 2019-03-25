/**
 * @author WMXPY
 * @namespace Core
 * @description Core
 */

import { BarkTemplate } from "./config/declare";
import { Environment } from "./config/environment";
import { Template } from "./config/template";
import { parseAndCopyTemplate } from "./template/copy";
import { getDefaultTemplateConfig, TemplateConfig } from "./template/declare";
import { getPackageTemplateConfigByBarkTemplate } from "./template/package";
import { searchTemplateFromEnvironmentByQuery } from "./template/template";

export class Core {

    public static withEnvironment(env: Environment): Core {

        return new Core(env);
    }

    private readonly _env: Environment;

    private constructor(env: Environment) {

        this._env = env;
    }

    public async attempt(query: string): Promise<Template | null> {

        const template: BarkTemplate | null = searchTemplateFromEnvironmentByQuery(this._env, query);

        if (!template) {
            return null;
        }

        const attempt: TemplateConfig | null = await getPackageTemplateConfigByBarkTemplate(this._env, template);
        if (attempt) {
            return Template.create(attempt, template);
        }
        return Template.create(getDefaultTemplateConfig(), template);
    }

    public async init(template: Template, replacements: Record<string, string>, targetPath: string) {

        return parseAndCopyTemplate(this._env, template, replacements, targetPath);
    }
}

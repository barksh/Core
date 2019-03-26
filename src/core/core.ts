/**
 * @author WMXPY
 * @namespace Core
 * @description Core
 */

import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { parseAndCopyTemplate } from "../template/copy";
import { getDefaultTemplateConfig, TemplateConfig } from "../template/declare";
import { getPackageTemplateConfigByBarkTemplate } from "../template/package";
import { searchTemplateFromEnvironmentByQuery } from "../template/template";
import { installAction } from "./actions";

export class Core {

    public static withEnvironment(env: Environment): Core {

        return new Core(env);
    }

    private _env: Environment;

    private constructor(env: Environment) {

        this._env = env;
    }

    public setEnvironment(env: Environment): this {

        this._env = env;
        return this;
    }

    public async install(query: string): Promise<Environment> {

        const newEnv: Environment = await installAction(this._env, query);
        this.setEnvironment(newEnv);

        return newEnv;
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

    public async init(template: Template, replacements: Record<string, string>, targetPath: string): Promise<void> {

        return parseAndCopyTemplate(this._env, template, replacements, targetPath);
    }
}

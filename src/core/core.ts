/**
 * @author WMXPY
 * @namespace Core
 * @description Core
 */

import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { updateAllSourceFromExternal } from "../source/refresh";
import { parseAndCopyTemplate } from "../template/copy";
import { getDefaultTemplateConfig, TemplateConfig } from "../template/declare";
import { getPackageTemplateConfigByBarkTemplate } from "../template/package";
import { searchTemplateFromEnvironmentByQuery } from "../template/template";
import { installAction } from "./actions";

export class Core {

    public static withEnvironment(env: Environment, immutable?: boolean): Core {

        return new Core(env, immutable || false);
    }

    private _env: Environment;
    private _enablePrivateUpdateEnv: boolean;

    private constructor(env: Environment, immutable: boolean) {

        this._env = env;
        this._enablePrivateUpdateEnv = !immutable;
    }

    public setEnvironment(env: Environment): this {

        this._env = env;
        return this;
    }

    public useImmutable(): this {

        this._enablePrivateUpdateEnv = false;
        return this;
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

    public async install(query: string): Promise<Environment> {

        const newEnv: Environment = await installAction(this._env, query);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async update(): Promise<Environment> {

        const newEnv: Environment = await updateAllSourceFromExternal(this._env);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    private _privateUpdateEnvironment(newEnv: Environment): this {

        if (this._enablePrivateUpdateEnv) {
            this.setEnvironment(newEnv);
        }
        return this;
    }
}

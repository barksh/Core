/**
 * @author WMXPY
 * @namespace Core
 * @description Core
 */

import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { addSourceFromURLToEnvironment } from "../source/init";
import { updateAllSourceFromExternal } from "../source/refresh";
import { parseAndCopyTemplate } from "../template/copy";
import { attemptAction } from "./actions";
import { installAction, installFromLocalAction } from "./install";

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

        return await attemptAction(this._env, query);
    }

    public async source(url: string): Promise<Environment> {

        const newEnv: Environment = await addSourceFromURLToEnvironment(this._env, url);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async init(template: Template, replacements: Record<string, string>, targetPath: string): Promise<void> {

        return parseAndCopyTemplate(this._env, template, replacements, targetPath);
    }

    public async install(query: string): Promise<Environment> {

        const newEnv: Environment = await installAction(this._env, query);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async installFromLocal(name: string, version: string, path: string): Promise<Environment> {

        const newEnv: Environment = await installFromLocalAction(this._env, name, version, path);
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

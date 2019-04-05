/**
 * @author WMXPY
 * @namespace Core
 * @description Core
 */

import { BarkConfig } from "./config/declare";
import { Environment } from "./config/environment";
import { Template } from "./config/template";
import { attemptAction } from "./core/actions";
import { cleanInActivePackages, cleanTempFiles, getInActivePackageFullPaths } from "./core/clean";
import { installAction, installFromLocalAction } from "./core/install";
import { addSourceFromURLToEnvironment, removeSourceFromEnvironment } from "./source/mutate";
import { updateAllSourceFromExternal, updateSourceFromExternalByName } from "./source/refresh";
import { parseAndCopyDirect, parseAndCopyTemplate } from "./template/copy";

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

    public get config(): BarkConfig {
        return this._env.config;
    }
    public get environment(): Environment {
        return this._env;
    }

    public setEnvironment(env: Environment): this {

        this._env = env;
        return this;
    }

    public useImmutable(): this {

        this._enablePrivateUpdateEnv = false;
        return this;
    }

    public async attemptFindTemplate(query: string): Promise<Template | null> {

        return await attemptAction(this._env, query);
    }

    public async addSource(url: string, name?: string): Promise<Environment> {

        const newEnv: Environment = await addSourceFromURLToEnvironment(this._env, url, name);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public removeSource(name: string): Environment {

        const newEnv: Environment = removeSourceFromEnvironment(this._env, name);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async initTemplate(template: Template, replacements: Record<string, string>, targetPath: string): Promise<void> {

        return parseAndCopyTemplate(this._env, template, replacements, targetPath);
    }

    public async directCopy(from: string, replacements: Record<string, string>, targetPath: string): Promise<void> {

        return parseAndCopyDirect(this._env, from, replacements, targetPath);
    }

    public async installFromSource(query: string): Promise<Environment> {

        const newEnv: Environment = await installAction(this._env, query);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async installFromLocal(name: string, version: string, path: string): Promise<Environment> {

        const newEnv: Environment = await installFromLocalAction(this._env, name, version, path);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async updateAllSources(): Promise<Environment> {

        const newEnv: Environment = await updateAllSourceFromExternal(this._env);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async updateSource(name: string): Promise<Environment> {

        const newEnv: Environment = await updateSourceFromExternalByName(this._env, name);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async cleanTempFiles(): Promise<void> {

        await cleanTempFiles(this._env);
        return;
    }

    public async cleanInActivePackages(): Promise<void> {

        await cleanInActivePackages(this._env);
        return;
    }

    public async getInActivePackages(): Promise<string[]> {

        const inActivePackageFullPaths: string[] = await getInActivePackageFullPaths(this._env);
        return inActivePackageFullPaths;
    }

    private _privateUpdateEnvironment(newEnv: Environment): this {

        if (this._enablePrivateUpdateEnv) {
            this.setEnvironment(newEnv);
        }
        return this;
    }
}

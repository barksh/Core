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

        return new Core(env, immutable || true);
    }

    private _env: Environment;
    private _immutable: boolean;

    private constructor(env: Environment, immutable: boolean) {

        this._env = env;
        this._immutable = immutable;
    }

    // Env

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

    public setImmutable(immutable: boolean): this {

        this._immutable = immutable;
        return this;
    }

    // Core

    public async addSource(url: string, name?: string): Promise<Environment> {

        const newEnv: Environment = await addSourceFromURLToEnvironment(this._env, url, name);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async attemptFindTemplate(query: string): Promise<Template | null> {

        return await attemptAction(this._env, query);
    }

    public async cleanInActivePackages(): Promise<void> {

        await cleanInActivePackages(this._env);
        return;
    }

    public async cleanTempFiles(): Promise<void> {

        await cleanTempFiles(this._env);
        return;
    }

    public async directCopy(from: string, replacements: Record<string, string>, targetPath: string): Promise<Environment> {

        await parseAndCopyDirect(this._env, from, replacements, targetPath);
        return this._env;
    }

    public async getInActivePackages(): Promise<string[]> {

        const inActivePackageFullPaths: string[] = await getInActivePackageFullPaths(this._env);
        return inActivePackageFullPaths;
    }

    public async initTemplate(template: Template, replacements: Record<string, string>, targetPath: string): Promise<Environment> {

        await parseAndCopyTemplate(this._env, template, replacements, targetPath);
        return this._env;
    }

    public async installFromLocal(name: string, version: string, path: string): Promise<Environment> {

        const newEnv: Environment = await installFromLocalAction(this._env, name, version, path);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public async installFromSource(query: string): Promise<Environment> {

        const newEnv: Environment = await installAction(this._env, query);
        this._privateUpdateEnvironment(newEnv);

        return newEnv;
    }

    public removeSource(name: string): Environment {

        const newEnv: Environment = removeSourceFromEnvironment(this._env, name);
        return this._privateUpdateEnvironment(newEnv);
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

    // Other

    private _privateUpdateEnvironment(newEnv: Environment): Environment {

        if (!this._immutable) {
            this.setEnvironment(newEnv);
        }
        return newEnv;
    }
}

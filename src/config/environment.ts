/**
 * @author WMXPY
 * @namespace Config
 * @description Environment
 */

import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { verifyBarkConfig } from "./config";
import { BarkConfig } from "./declare";

export class Environment {

    public static create(): Environment {
        return new Environment();
    }

    private _packagePath: string | null;
    private _temporaryPath: string | null;
    private _config: BarkConfig | null;

    private constructor() {

        this._packagePath = null;
        this._temporaryPath = null;
        this._config = null;
    }

    public get config(): BarkConfig {
        if (!this._config) {
            throw Panic.code(ERROR_CODE.ENVIRONMENT_NOT_SETTLED, 'Config');
        }
        return this._config;
    }

    public get temporaryPath(): string {
        if (!this._temporaryPath) {
            throw Panic.code(ERROR_CODE.ENVIRONMENT_NOT_SETTLED, 'Temporary Path');
        }
        return this._temporaryPath;
    }

    public get packagePath(): string {
        if (!this._packagePath) {
            throw Panic.code(ERROR_CODE.ENVIRONMENT_NOT_SETTLED, 'Package Path');
        }
        return this._packagePath;
    }

    public setPackagePath(path: string): this {
        this._packagePath = path;
        return this;
    }

    public setTemporaryPath(path: string): this {
        this._temporaryPath = path;
        return this;
    }

    public clone(): Environment {

        const newEnv: Environment = Environment.create();
        newEnv._config = this._getClonedConfig();
        newEnv._temporaryPath = this._temporaryPath;
        newEnv._packagePath = this._packagePath;

        return newEnv;
    }

    public setConfig(config: BarkConfig): this {

        if (!verifyBarkConfig(config)) {
            throw Panic.code(ERROR_CODE.INVALID_CONFIG);
        }
        this._config = config;
        return this;
    }

    private _getClonedConfig(): BarkConfig | null {

        if (!this._config) {
            return null;
        }

        const newConfig: BarkConfig = {
            sources: [...this._config.sources],
            templates: [...this._config.templates],
        };
        return newConfig;
    }
}

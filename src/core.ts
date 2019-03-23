/**
 * @author WMXPY
 * @namespace Core
 * @description Core
 */

import { BarkTemplate } from "./config/declare";
import { Environment } from "./config/environment";
import { searchTemplateFromEnvironmentByQuery } from "./template/template";

export class Core {

    public static withEnvironment(env: Environment): Core {

        return new Core(env);
    }

    private readonly _env: Environment;

    private constructor(env: Environment) {

        this._env = env;
    }

    public attempt(query: string): BarkTemplate | null {

        return searchTemplateFromEnvironmentByQuery(this._env, query);
    }
}

/**
 * @author WMXPY
 * @namespace Core
 * @description Core
 */

import { Environment } from "./config/environment";

export class Core {

    public static withEnvironment(env: Environment): Core {

        return new Core(env);
    }

    private readonly _env: Environment;

    private constructor(env: Environment) {

        this._env = env;
    }
}

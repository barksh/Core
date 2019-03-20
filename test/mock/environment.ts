/**
 * @author WMXPY
 * @namespace Mock
 * @description Environment
 */

import * as Chance from "chance";
import { getDefaultConfig } from "../../src/config/declare";
import { Environment } from "../../src/config/environment";

export const createMockEnvironment = (): Environment => {

    const chance = new Chance('environment');

    return Environment.create()
        .setConfig(getDefaultConfig())
        .setPackagePath(chance.string())
        .setTemporaryPath(chance.string());
};

/**
 * @author WMXPY
 * @namespace Core
 * @description Example
 */

import * as Path from "path";
import { BarkTemplate } from "./config/declare";
import { Environment } from "./config/environment";
import { Core } from "./core";

(async () => {

    const appDataPath = Path.resolve('./test_barksh');
    const env: Environment = Environment
        .create()
        .setConfig({
            templates: [
                {
                    name: 'test',
                    version: '',
                    folderName: 'test',
                    replacements: {},
                },
            ],
            sources: [],
        })
        .setPackagePath(Path.join(appDataPath, 'package'))
        .setTemporaryPath(Path.join(appDataPath, 'temp'));
    try {
        const core: Core = Core.withEnvironment(env);
        const template: BarkTemplate | null = core.attempt('test');

        if (!template) {
            throw new Error('no template');
        }

        console.log(await core.read(template));
    } catch (err) {
        console.log(err);
    }
})();

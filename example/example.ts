/**
 * @author WMXPY
 * @namespace Core
 * @description Example
 */

import * as Path from "path";
import { Core } from "../src";
import { Environment } from "../src/config/environment";
import { Template } from "../src/config/template";

(async () => {

    const appDataPath = Path.resolve('./test_barksh');
    const env: Environment = Environment
        .create()
        .setConfig({
            templates: [],
            sources: [
                {
                    url: 'https://google.com',
                    lastUpdate: new Date(),
                    structure: {
                        templates: [{
                            name: 'test',
                            url: 'github://WMXPY/Ghoti-CLI-templates/master/dist/react-ssr.zip',
                            version: '1.0.0',
                        }],
                    },
                },
            ],
        })
        .setPackagePath(Path.join(appDataPath, 'package'))
        .setTemporaryPath(Path.join(appDataPath, 'temp'));
    try {
        const core: Core = Core.withEnvironment(env);

        await core.install('test');

        const template: Template | null = await core.attempt('test');

        if (!template) {
            throw new Error('no template');
        }

        await core.init(template, {
            hello: 'test hello ',
        }, Path.join(appDataPath, 'example'));

    } catch (err) {
        console.log(err);
    }
})();

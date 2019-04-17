/**
 * @author WMXPY
 * @namespace Example
 * @description Example
 */

import * as Path from "path";
import { Core, Template } from "../src";
import { Environment } from "../src/config/environment";

(async () => {

    const appDataPath = Path.resolve('./test_barksh');
    const env: Environment = Environment
        .create()
        .setConfig({
            templates: [],
            sources: [
                {
                    name: 'test',
                    url: 'http://www.mocky.io/v2/5c9a995a3500004c00d0c6f8',
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
        core.setImmutable(false);

        await core.installFromSource('test');

        const template: Template | null = await core.attemptFindTemplate('test');

        if (!template) {
            throw new Error('no template');
        }

        await core.initTemplate(template, {
            title: 'test hello',
        }, Path.join(appDataPath, 'example'));

        // console.log(await core.update());

        // console.log(await core.source('http://www.mocky.io/v2/5c9a995a3500004c00d0c6f8'));

        // console.log(await core.installFromLocal('hello', 'world', Path.join(appDataPath, 'package', '2248a1f906aab69e5ce263b9099f998d')));
    } catch (err) {
        console.log(err);
    }
})();

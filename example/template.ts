/**
 * @author WMXPY
 * @namespace Example
 * @description Template
 */

import * as Path from "path";
import { Core } from "../src";
import { Environment } from "../src/config/environment";

(async () => {

    const appDataPath = Path.resolve('./test_barksh');
    const env: Environment = Environment
        .create()
        .setConfig({
            templates: [],
            sources: [],
        })
        .setPackagePath(Path.join(appDataPath, 'package'))
        .setTemporaryPath(Path.join(appDataPath, 'temp'));

    const core: Core = Core.withEnvironment(env);
    core.setImmutable(false);
    try {

        await core.addSource('github://barksh/bark-templates/master/source.json', 'test');
        await core.installFromSource('test');

        console.log(core.environment.config.templates);

        console.log(await core.attemptFindTemplate('test'));
    } catch (err) {
        console.log(err);
    }
})();

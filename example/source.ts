/**
 * @author WMXPY
 * @namespace Core
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
            sources: [],
        })
        .setPackagePath(Path.join(appDataPath, 'package'))
        .setTemporaryPath(Path.join(appDataPath, 'temp'));
    try {
        const core: Core = Core.withEnvironment(env);

        const result = await core.addSource('github://barksh/bark-templates/master/source.json', 'test');
        console.log(result);
    } catch (err) {
        console.log(err);
    }
})();

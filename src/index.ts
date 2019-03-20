/**
 * @author WMXPY
 * @namespace Core
 * @description Index
 */

import * as Path from "path";
import { Environment } from "./config/environment";
import { fetchAndDecompressFromAnyExternal } from "./io/external";

(async () => {

    const appDataPath = Path.resolve('./test_barksh');
    const env: Environment = Environment
        .create()
        .setPackagePath(Path.join(appDataPath, 'package'))
        .setTemporaryPath(Path.join(appDataPath, 'temp'));
    try {
        console.log(await fetchAndDecompressFromAnyExternal(env, 'github://WMXPY/Ghoti-CLI-templates/master/dist/react-ssr.zip', env.packagePath));
    } catch (err) {
        console.log(err);
    }
})();

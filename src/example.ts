/**
 * @author WMXPY
 * @namespace Core
 * @description Example
 */

import * as Path from "path";
import { Environment } from "./config/environment";
import { fetchAndDecompressFromAnyExternal } from "./io/external";
import { getRandomPackagePath } from "./io/util";

(async () => {

    const appDataPath = Path.resolve('./test_barksh');
    const env: Environment = Environment
        .create()
        .setPackagePath(Path.join(appDataPath, 'package'))
        .setTemporaryPath(Path.join(appDataPath, 'temp'));
    try {
        console.log(await fetchAndDecompressFromAnyExternal(
            env,
            'github://WMXPY/Ghoti-CLI-templates/master/dist/react-ssr.zip',
        ));
    } catch (err) {
        console.log(err);
    }
})();

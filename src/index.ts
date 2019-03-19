/**
 * @author WMXPY
 * @namespace Core
 * @description Index
 */

import { fetchAndDecompressFromAnyExternal } from "./io/external";
import { getRandomPackagePath } from "./io/file";

(async () => {
    try {
        console.log(await fetchAndDecompressFromAnyExternal('github://WMXPY/Ghoti-CLI-templates/master/dist/react-ssr.zip', await getRandomPackagePath()));
    } catch (err) {
        console.log(err);
    }
})();

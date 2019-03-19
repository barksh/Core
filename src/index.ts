/**
 * @author WMXPY
 * @namespace Core
 * @description Index
 */

import * as Path from "path";
import { fetchAndDecompressFromAnyExternal } from "./io/external";

(async () => {
    try {
        console.log(await fetchAndDecompressFromAnyExternal('github://WMXPY/Ghoti-CLI-templates/master/dist/react-ssr.zip', Path.resolve('./')));
    } catch (err) {
        throw err;
    }
})();

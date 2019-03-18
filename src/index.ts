/**
 * @author WMXPY
 * @namespace Core
 * @description Index
 */

import { getOrInitConfig } from "./config/config";

(async () => {
    try {
        console.log(await getOrInitConfig());
    } catch (err) {
        throw err;
    }
})();

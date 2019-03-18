/**
 * @author WMXPY
 * @namespace Core
 * @description Index
 */

import { getConfig } from "./config/config";

const a = getConfig();
console.log(a);
setTimeout(() => {
    console.log(a);
}, 100);

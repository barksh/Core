/**
 * @author WMXPY
 * @namespace Util
 * @description DI
 */

import { getInstance, Inject } from "@sudoo/di";
import { MODULE_NAME } from "../panic/declare";

export const inject: Inject = getInstance(MODULE_NAME);
export const Injectable = inject.createServiceInjector();
export const AutoWire = inject.createServiceAutoWirer();

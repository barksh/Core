/**
 * @author WMXPY
 * @namespace Util
 * @description DI
 */

import { getInstance, Inject } from "@sudoo/di";
import { Log } from "../log/log";
import { MODULE_NAME } from "../panic/declare";

export type ServiceList = {
    readonly log: Log;
};

const inject: Inject<ServiceList> = getInstance(MODULE_NAME);
export const Injectable = inject.createServiceInjector();
export const AutoWire = inject.createServiceAutoWirer();

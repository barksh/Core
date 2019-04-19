/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { Injectable } from "../services/di";

@Injectable()
export class Log {

    public constructor(private readonly _verbose: boolean = false) { }

    public verbose(...args: any[]) {

        if (this._verbose) {
            console.log(...args);
        }
    }
}

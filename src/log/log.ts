/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { Injectable } from "../services/di";

@Injectable('log')
export class Log {

    private readonly _verbose: boolean;

    public constructor() {

        this._verbose = process.env.NODE_ENV === 'development' && process.env.LOG_LEVEL === 'verbose';
    }

    public log(...args: any[]) {
        console.log(...args);
    }
}

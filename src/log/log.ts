/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { Injectable, SERVICE_NAME } from "../services/di";

@Injectable(SERVICE_NAME.LOG)
export class Log {

    private readonly _verbose: boolean;

    public constructor() {

        this._verbose = process.env.NODE_ENV === 'development';
    }

    public log(...args: any[]) {
        console.log(...args);
    }
}

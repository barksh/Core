/**
 * @author WMXPY
 * @namespace Template
 * @description Template
 */

import { BarkConfig } from "../config/declare";
import { Environment } from "../config/environment";
import { VERSION_QUERY } from "./declare";

export const parseTemplateQuery = (query: string): {
    name: string;
    version: string | VERSION_QUERY;
} => {

    const splitedVersion: string[] = query.split('@');

    if (splitedVersion.length < 2) {
        return {
            name: query,
            version: VERSION_QUERY.ANY,
        };
    }

    return {
        name: splitedVersion[0],
        version: splitedVersion[1],
    };
};

export const analysis = (env: Environment, query: string) => {

    const config: BarkConfig = env.config;
};

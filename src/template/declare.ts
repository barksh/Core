/**
 * @author WMXPY
 * @namespace Template
 * @description Declare
 */

import * as Path from "path";
import { ERROR_CODE, panic } from "../panic/declare";

export const ConfigFileName = '.bark.config.json';

export type TemplateQueryInfo = {

    readonly scripts?: {
        beforeInstall?: string[],
        afterInstall?: string[],
    },
    readonly name: string;
    readonly version: string | VERSION_QUERY;
};

export enum VERSION_QUERY {

    LATEST = 'LATEST',
    ANY = 'ANY',
}

export enum PARSING_METHOD {

    EJS = 'EJS',
    GHOTI = 'GHOTI',
    NONE = 'NONE',
}

export type Description = string;

export type TemplateConfig = {

    readonly templateMethod: PARSING_METHOD;
    readonly replacements: Record<string, Description>;
};

export const getDefaultTemplateConfig = (): TemplateConfig => {

    return {

        templateMethod: PARSING_METHOD.EJS,
        replacements: {},
    };
};

export const getParsingMethod = (path: string): PARSING_METHOD => {

    const file: Path.ParsedPath = Path.parse(path);
    const fileExt: string = file.ext.replace('.', '').toLowerCase();

    switch (fileExt) {
        case 'ejs': return PARSING_METHOD.EJS;
        case 'ghoti': return PARSING_METHOD.GHOTI;
        default: return PARSING_METHOD.NONE;
    }
};

export const getExtNameLooksLike = (method: PARSING_METHOD): string => {

    switch (method) {
        case PARSING_METHOD.EJS: return '.ejs';
        case PARSING_METHOD.GHOTI: return '.ghoti';
        case PARSING_METHOD.NONE:
        default: throw panic.code(ERROR_CODE.NOT_IMPLEMENTED);
    }
};

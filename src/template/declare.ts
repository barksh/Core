/**
 * @author WMXPY
 * @namespace Template
 * @description Declare
 */

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

export enum TEMPLATE_METHOD {

    EJS = 'EJS',
    GHOTI = 'GHOTI',
    RELATIVE = 'RELATIVE',
}

export type Description = string;

export type TemplateConfig = {

    readonly templateMethod: TEMPLATE_METHOD;
    readonly replacements: Record<string, Description>;
};

export const getDefaultTemplateConfig = (): TemplateConfig => {

    return {

        templateMethod: TEMPLATE_METHOD.EJS,
        replacements: {},
    };
};

export const getExtNameLooksLike = (method: TEMPLATE_METHOD): string => {

    switch (method) {
        case TEMPLATE_METHOD.EJS: return '.ejs';
        case TEMPLATE_METHOD.GHOTI: return '.ghoti';
        case TEMPLATE_METHOD.RELATIVE:
        default: throw panic.code(ERROR_CODE.NOT_IMPLEMENTED);
    }
};

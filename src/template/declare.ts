/**
 * @author WMXPY
 * @namespace Template
 * @description Declare
 */

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

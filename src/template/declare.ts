/**
 * @author WMXPY
 * @namespace Template
 * @description Declare
 */

export enum VERSION_QUERY {

    LATEST = 'LATEST',
    ANY = 'ANY',
}

export enum TEMPLATE_METHOD {

    EJS = 'EJS',
}

export type TemplateConfig = {

    readonly templateMethod: TEMPLATE_METHOD;
    readonly replacements: Record<string, string>;
};

export const getDefaultTemplateConfig = (): TemplateConfig => {

    return {

        templateMethod: TEMPLATE_METHOD.EJS,
        replacements: {},
    };
};

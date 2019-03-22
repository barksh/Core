/**
 * @author WMXPY
 * @namespace Source
 * @description Declare
 */

export type ExternalTemplate = {

    readonly name: string;
    readonly url: string;
    readonly version: string;
};

export type ExternalSourceStructure = {

    readonly templates: ExternalTemplate[];
};

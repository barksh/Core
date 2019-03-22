/**
 * @author WMXPY
 * @namespace Source
 * @description Declare
 */

export type ExternalTemplate = {

    readonly name: string;
    readonly version: string;
    readonly url: string;
};

export type ExternalSourceStructure = {

    readonly templates: ExternalTemplate[];
};

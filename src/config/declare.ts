/**
 * @author WMXPY
 * @namespace Config
 * @description Declare
 */

export type BarkSource = {

    readonly lastUpdate: Date;
    readonly url: string;
};

export type BarkTemplate = {

    readonly name: string;
    readonly path: string;
    readonly version: string;
};

export type BarkConfig = {

    readonly templates: BarkTemplate[];
    readonly source: BarkSource[];
};

export const getDefaultConfig = (): BarkConfig => {

    return {

        templates: [],
        source: [],
    };
};

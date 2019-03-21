/**
 * @author WMXPY
 * @namespace Config
 * @description Declare
 */

export type BarkSource = {

    readonly lastUpdate: Date;
    readonly templates: BarkTemplate[];
    readonly url: string;
};

export type BarkTemplate = {

    readonly name: string;
    readonly path: string;
    readonly version: string;
};

export type BarkConfig = {

    readonly sources: BarkSource[];
};

export const getDefaultConfig = (): BarkConfig => {

    return {

        sources: [],
    };
};

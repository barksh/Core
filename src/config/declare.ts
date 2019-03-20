/**
 * @author WMXPY
 * @namespace Config
 * @description Declare
 */

export type BarkConfigSource = {

    readonly lastUpdate: Date;
    readonly url: string;
};

export type BarkTemplate = {

    readonly name: string;
    readonly url: string;
    readonly version: string;
};

export type BarkConfig = {

    readonly templates: BarkTemplate[];
    readonly source: BarkConfigSource[];
};

export const getDefaultConfig = (): BarkConfig => {

    return {

        templates: [],
        source: [],
    };
};

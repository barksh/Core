/**
 * @author WMXPY
 * @namespace Config
 * @description Declare
 */

export type BarkConfigSource = {

    readonly url: string;
    readonly lastUpdate: Date;
};

export type BarkConfig = {

    readonly source: BarkConfigSource[];
};

export const getDefaultConfig = (): BarkConfig => {

    return {
        source: [],
    };
};

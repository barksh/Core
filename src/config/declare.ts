/**
 * @author WMXPY
 * @namespace Config
 * @description Declare
 */

export type BarkSource = {

    readonly lastUpdate: Date;
    readonly templates: BarkTemplate[];
    readonly reachable: boolean;
    readonly url: string;
};

export type BarkTemplateBase = {

    readonly name: string;
    readonly version: string;
};

export type BarkTemplate = {

    readonly path?: string;
    readonly url?: string;
} & BarkTemplateBase;

export type BarkConfig = {

    readonly sources: BarkSource[];
};

export const getDefaultConfig = (): BarkConfig => {

    return {

        sources: [],
    };
};

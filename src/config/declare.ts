/**
 * @author WMXPY
 * @namespace Config
 * @description Declare
 */

import { ExternalSourceStructure } from "../source/declare";

export type BarkSource = {

    readonly name: string;
    readonly lastUpdate: Date | null;
    readonly structure: ExternalSourceStructure;
    readonly url: string;
};

export type BarkTemplate = {

    readonly name: string;
    readonly version: string;
    readonly folderName: string;
};

export type BarkConfig = {

    readonly sources: BarkSource[];
    readonly templates: BarkTemplate[];
};

export const getDefaultConfig = (): BarkConfig => {

    return {

        sources: [],
        templates: [],
    };
};

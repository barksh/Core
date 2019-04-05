/**
 * @author WMXPY
 * @namespace Source
 * @description Source
 */

import { BarkSource } from "../config/declare";
import { Environment } from "../config/environment";
import { TemplateQueryInfo, VERSION_QUERY } from "../template/declare";
import { getCurrentDate } from "../util/date";
import { ExternalSourceStructure, ExternalTemplate } from "./declare";

export const updateBarkSourceFromExternalSourceStructure = (source: BarkSource, structure: ExternalSourceStructure): BarkSource => {

    return {
        ...source,
        lastUpdate: getCurrentDate(),
        structure,
    };
};

export const getSourceFromUrlByEnvironment = (env: Environment, url: string): BarkSource | null => {

    const sources: BarkSource[] = env.config.sources;

    for (const source of sources) {
        if (source.url === url) {
            return source;
        }
    }
    return null;
};

export const findUrlFromSourcesByEnvironment = (env: Environment, info: TemplateQueryInfo): ExternalTemplate | null => {

    const sources: BarkSource[] = env.config.sources;

    for (const source of sources) {
        for (const template of source.structure.templates) {

            if (template.name === info.name) {
                if (template.version === info.version || info.version === VERSION_QUERY.ANY) {
                    return template;
                }
            }
        }
    }
    return null;
};

export const findSourceByName = (env: Environment, name: string): BarkSource | null => {

    const sources: BarkSource[] = env.config.sources;

    for (const source of sources) {
        if (source.name === name) {
            return source;
        }
    }
    return null;
};

export const findSourceIndexByName = (env: Environment, name: string): number | null => {

    const sources: BarkSource[] = env.config.sources;

    for (const source of Object.entries(sources)) {

        const index: number = Number(source[0]);
        const current: BarkSource = source[1];

        if (current.name === name) {
            return index;
        }
    }
    return null;
};

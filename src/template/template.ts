/**
 * @author WMXPY
 * @namespace Template
 * @description Template
 */

import { BarkConfig, BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { TemplateQueryInfo, VERSION_QUERY } from "./declare";

export const parseTemplateQuery = (query: string): TemplateQueryInfo => {

    const splitedVersion: string[] = query.split('@');

    if (splitedVersion.length < 2) {
        return {
            name: query,
            version: VERSION_QUERY.ANY,
        };
    }

    return {
        name: splitedVersion[0],
        version: splitedVersion[1],
    };
};

export const searchTemplateFromConfig = (config: BarkConfig, info: TemplateQueryInfo): BarkTemplate | null => {

    for (const template of config.templates) {
        if (template.name === info.name) {
            if (template.version === info.version || info.version === VERSION_QUERY.ANY) {
                return template;
            }
        }
    }
    return null;
};

export const searchTemplateFromEnvironmentByQuery = (env: Environment, query: string): BarkTemplate | null => {

    const templateInfo: TemplateQueryInfo = parseTemplateQuery(query);
    const searchResult: BarkTemplate | null = searchTemplateFromConfig(env.config, templateInfo);

    return searchResult;
};

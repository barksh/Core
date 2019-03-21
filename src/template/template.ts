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

    for (const source of config.sources) {
        for (const template of source.templates) {
            if (template.name === info.name && template.version === info.version) {
                return template;
            }
        }
    }
    return null;
};

export const analysis = (env: Environment, query: string) => {

    const config: BarkConfig = env.config;
    const info: TemplateQueryInfo = parseTemplateQuery(query);
    const templateFromEnv: BarkTemplate | null = searchTemplateFromConfig(config, info);
};

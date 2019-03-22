/**
 * @author WMXPY
 * @namespace Template
 * @description Analysis
 */

import { BarkConfig, BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { TemplateQueryInfo } from "./declare";
import { parseTemplateQuery, searchTemplateFromConfig } from "./template";

export const analysis = (env: Environment, query: string): BarkTemplate => {

    const config: BarkConfig = env.config;
    const info: TemplateQueryInfo = parseTemplateQuery(query);
    const templateFromEnv: BarkTemplate | null = searchTemplateFromConfig(config, info);

    if (templateFromEnv) {
        return templateFromEnv;
    }


};

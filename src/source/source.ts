/**
 * @author WMXPY
 * @namespace Source
 * @description Source
 */

import { BarkSource } from "../config/declare";
import { Environment } from "../config/environment";
import { TemplateQueryInfo, VERSION_QUERY } from "../template/declare";
import { ExternalTemplate } from "./declare";

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

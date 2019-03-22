/**
 * @author WMXPY
 * @namespace Action_Init
 * @description Init
 */

import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { TemplateQueryInfo } from "../template/declare";
import { parseTemplateQuery, searchTemplateFromConfig } from "../template/template";

export const init = async (env: Environment, query: string, target: string): Promise<void> => {

    const templateInfo: TemplateQueryInfo = parseTemplateQuery(query);
    const searchResult: BarkTemplate | null = searchTemplateFromConfig(env.config, templateInfo);

    if (!searchResult) {
        throw Panic.code(ERROR_CODE.TEMPLATE_NOT_EXIST, query);
    }

    return;
};

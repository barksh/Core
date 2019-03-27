/**
 * @author WMXPY
 * @namespace Core
 * @description Actions
 */

import { BarkTemplate } from "../config/declare";
import { Environment } from "../config/environment";
import { Template } from "../config/template";
import { getDefaultTemplateConfig, TemplateConfig } from "../template/declare";
import { getPackageTemplateConfigByBarkTemplate } from "../template/package";
import { searchTemplateFromEnvironmentByQuery } from "../template/template";

export const attemptAction = async (env: Environment, query: string): Promise<Template | null> => {

    const template: BarkTemplate | null = searchTemplateFromEnvironmentByQuery(env, query);

    if (!template) {
        return null;
    }

    const attempt: TemplateConfig | null = await getPackageTemplateConfigByBarkTemplate(env, template);
    if (attempt) {
        return Template.create(attempt, template);
    }
    return Template.create(getDefaultTemplateConfig(), template);
};


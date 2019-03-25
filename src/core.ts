/**
 * @author WMXPY
 * @namespace Core
 * @description Core
 */

import { BarkTemplate } from "./config/declare";
import { Environment } from "./config/environment";
import { getDefaultTemplateConfig, TemplateConfig } from "./template/declare";
import { getPackageTemplateConfigByBarkTemplate } from "./template/package";
import { searchTemplateFromEnvironmentByQuery } from "./template/template";

export class Core {

    public static withEnvironment(env: Environment): Core {

        return new Core(env);
    }

    private readonly _env: Environment;

    private constructor(env: Environment) {

        this._env = env;
    }

    public attempt(query: string): BarkTemplate | null {

        return searchTemplateFromEnvironmentByQuery(this._env, query);
    }

    public async read(template: BarkTemplate): Promise<TemplateConfig> {

        const attempt: TemplateConfig | null = await getPackageTemplateConfigByBarkTemplate(this._env, template);
        if (attempt) {
            return attempt;
        }
        return getDefaultTemplateConfig();
    }
}

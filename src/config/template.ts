/**
 * @author WMXPY
 * @namespace Config
 * @description Template
 */

import { TemplateConfig } from "../template/declare";
import { BarkTemplate } from "./declare";

export class Template {

    public static create(config: TemplateConfig, template: BarkTemplate) {

        return new Template(config, template);
    }

    private readonly _config: TemplateConfig;
    private readonly _template: BarkTemplate;

    private constructor(config: TemplateConfig, template: BarkTemplate) {

        this._config = config;
        this._template = template;
    }

    public get config(): TemplateConfig {

        return this._config;
    }

    public get template(): BarkTemplate {

        return this._template;
    }
}

/**
 * @author WMXPY
 * @namespace Template
 * @description Template
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkConfig, BarkTemplate } from "../../../src/config/declare";
import { TemplateQueryInfo, VERSION_QUERY } from "../../../src/template/declare";
import { parseTemplateQuery, removeTemplateFromConfig } from "../../../src/template/template";

describe('Given [template-template] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('template-template');

    it('should be able to parse template query with version', (): void => {

        const version: string = chance.age().toString();
        const name: string = chance.name();
        const query: string = `${name}@${version}`;

        const result: TemplateQueryInfo = parseTemplateQuery(query);

        expect(result).to.be.deep.equal({
            name,
            version,
        });
    });

    it('should be able to parse template query', (): void => {

        const name: string = chance.name();

        const result: TemplateQueryInfo = parseTemplateQuery(name);

        expect(result).to.be.deep.equal({
            name,
            version: VERSION_QUERY.ANY,
        });
    });

    it('should be able to remove template as any version query', (): void => {

        const name: string = chance.name();

        const result: BarkConfig = removeTemplateFromConfig({
            sources: [],
            templates: [{
                name,
                folderName: chance.string(),
                version: chance.string(),
            }],
        }, {
                name,
                version: VERSION_QUERY.ANY,
            });

        expect(result.templates).to.be.deep.equal([]);
    });

    it('should be able to remove template from version', (): void => {

        const name: string = chance.name();
        const version: string = chance.string();

        const result: BarkConfig = removeTemplateFromConfig({
            sources: [],
            templates: [{
                name,
                folderName: chance.string(),
                version,
            }],
        }, {
                name,
                version,
            });

        expect(result.templates).to.be.deep.equal([]);
    });

    it('should not remove template if version is not matched', (): void => {

        const name: string = chance.name();
        const version: string = chance.string();

        const template: BarkTemplate = {
            name,
            folderName: chance.string(),
            version,
        };

        const result: BarkConfig = removeTemplateFromConfig({
            sources: [],
            templates: [template],
        }, {
                name,
                version: chance.string(),
            });

        expect(result.templates).to.be.deep.equal([template]);
    });
});

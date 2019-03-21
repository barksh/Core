/**
 * @author WMXPY
 * @namespace Template
 * @description Template
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { TemplateQueryInfo, VERSION_QUERY } from "../../../src/template/declare";
import { parseTemplateQuery } from "../../../src/template/template";

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
});

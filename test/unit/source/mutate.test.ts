/**
 * @author WMXPY
 * @namespace Source
 * @description Mutate
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { Environment } from "../../../src/config/environment";
import { ERROR_CODE, panic } from "../../../src/panic/declare";
import { removeSourceFromEnvironment, replaceSourceFormEnvironment } from "../../../src/source/mutate";
import { createMockEnvironment } from "../../mock/environment";

describe('Given [Source-Mutate] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('source-mutate');

    it('should be able to remove source', async (): Promise<void> => {

        const name: string = chance.string();
        const env: Environment = createMockEnvironment();

        env.config.sources.push({
            name,
            url: chance.string(),
            structure: {} as any,
            lastUpdate: null,
        });

        expect(env.config.sources).to.have.lengthOf(1);

        const newEnv: Environment = removeSourceFromEnvironment(env, name);

        expect(env.config.sources).to.have.lengthOf(1);
        expect(newEnv.config.sources).to.have.lengthOf(0);
    });

    it('should throw error if name is not found while remove source', async (): Promise<void> => {

        const nameThatNotExist: string = chance.string();
        const env: Environment = createMockEnvironment();

        env.config.sources.push({
            name: chance.string(),
            url: chance.string(),
            structure: {} as any,
            lastUpdate: null,
        });

        expect(() => removeSourceFromEnvironment(env, nameThatNotExist))
            .to.throw(panic.code(ERROR_CODE.SOURCE_NAME_NOT_FOUND, nameThatNotExist).message);
    });

    it('should be able to replace source', async (): Promise<void> => {

        const name: string = chance.string();
        const env: Environment = createMockEnvironment();

        env.config.sources.push({
            name,
            url: chance.string(),
            structure: {
                templates: [],
            },
            lastUpdate: null,
        }, {
            name: chance.string(),
            url: chance.string(),
            structure: {} as any,
            lastUpdate: null,
        });

        expect(env.config.sources[0].structure.templates).to.have.lengthOf(0);

        const newEnv: Environment = replaceSourceFormEnvironment(env, name, {
            name,
            url: chance.string(),
            structure: {
                templates: ['something' as any],
            },
            lastUpdate: null,
        });

        expect(env.config.sources[0].structure.templates).to.have.lengthOf(0);
        expect(newEnv.config.sources[0].structure.templates).to.have.lengthOf(1);
    });
});

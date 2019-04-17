/**
 * @author WMXPY
 * @namespace Package
 * @description File
 * @override Scenario
 */

import { expect } from "chai";
import * as Chance from "chance";
import { Core, Environment } from "../../../src";

describe('Given -Package-File- scenario', (): void => {

    const chance: Chance.Chance = new Chance('scenario-package-file');

    const env: Environment = Environment.create()
        .setConfig({
            templates: [],
            sources: [],
        });

    it('should be able to get config information', async (): Promise<void> => {

        const core: Core = Core.withEnvironment(env);

        expect(core.getSources()).to.be.deep.equal([]);
        expect(core.getTemplates()).to.be.deep.equal([]);
    });
});

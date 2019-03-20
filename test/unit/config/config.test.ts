/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { verifyBarkConfig } from "../../../src/config/config";
import { getDefaultConfig } from "../../../src/config/declare";

describe('Given [config-config] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('config-config');

    it('should be able to verify config file', (): void => {

        const defaultConfig = getDefaultConfig();

        const result: boolean = verifyBarkConfig(defaultConfig);

        // tslint:disable-next-line
        expect(result).to.be.true;
    });
});

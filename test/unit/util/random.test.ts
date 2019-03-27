/**
 * @author WMXPY
 * @namespace Util
 * @description Random
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { unique } from "../../../src/util/random";

describe('Given [util-random] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('util-random');

    it('should be able to generate random token', (): void => {

        const token: string = unique();

        expect(token).to.be.lengthOf(8);
    });
});

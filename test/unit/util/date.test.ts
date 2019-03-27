/**
 * @author WMXPY
 * @namespace Util
 * @description Date
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { getCurrentDate } from "../../../src/util/date";

describe('Given [util-date] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('util-date');

    it('should be able to return current date', (): void => {

        const date: Date = getCurrentDate();

        expect(date).to.be.instanceOf(Date);
    });

    it('should be able to return replacement date', (): void => {

        const mockDate: Date = new Date();
        const date: Date = getCurrentDate(mockDate);

        expect(date).to.be.instanceOf(Date);
        expect(date).to.be.equal(mockDate);
    });
});

/**
 * @author WMXPY
 * @namespace Source
 * @description Refresh
 * @override
 */

import { Mock, Sandbox } from "@sudoo/mock";
import { expect } from "chai";
import * as Chance from "chance";
import { BarkSource } from "../../../src/config/declare";
import * as func_IO_EXTERNAL from "../../../src/io/external";
import * as func_SOURCE_REFRESH from "../../../src/source/refresh";
import * as func_UTIL_DATE from "../../../src/util/date";
import * as func_UTIL_SAFE from "../../../src/util/safe";

describe('Given [source-refresh] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('source-refresh');

    it('should be able to update source from external', async (): Promise<void> => {

        const mockDate: Date = new Date();

        const getExternalDataStack = Sandbox.create();
        const safeParseJSONStack = Sandbox.create();
        const verifyExternalSourceStructureStack = Sandbox.create();
        const getCurrentDateStack = Sandbox.create();

        const getExternalDataMock = Mock.create(func_IO_EXTERNAL, 'getExternalData');
        const safeParseJSONMock = Mock.create(func_UTIL_SAFE, 'safeParseJSON');
        const verifyExternalSourceStructureMock = Mock.create(func_SOURCE_REFRESH, 'verifyExternalSourceStructure');
        const getCurrentDateMock = Mock.create(func_UTIL_DATE, 'getCurrentDate');

        getExternalDataMock.mock(getExternalDataStack.func());
        safeParseJSONMock.mock(safeParseJSONStack.func({
            templates: [],
        }));
        verifyExternalSourceStructureMock.mock(verifyExternalSourceStructureStack.func(true));
        getCurrentDateMock.mock(getCurrentDateStack.func(mockDate));

        const source: BarkSource = {
            lastUpdate: mockDate,
            structure: {
                templates: [],
            },
            url: chance.string(),
        };

        const newSource: BarkSource = await func_SOURCE_REFRESH.updateSourceFromExternal(source);

        getExternalDataMock.restore();
        safeParseJSONMock.restore();
        verifyExternalSourceStructureMock.restore();
        getCurrentDateMock.restore();

        expect(getExternalDataStack).to.have.lengthOf(1);
        expect(safeParseJSONStack).to.have.lengthOf(1);
        expect(verifyExternalSourceStructureStack).to.have.lengthOf(1);
        expect(getCurrentDateStack).to.have.lengthOf(1);
        expect(newSource).to.be.deep.equal(source);
    });
});

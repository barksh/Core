/**
 * @author WMXPY
 * @namespace Config
 * @description Config
 * @override
 */

import { Mock, Sandbox } from "@sudoo/mock";
import { fail } from "assert";
import { expect } from "chai";
import * as Chance from "chance";
import * as func_CLIENT_CONFIG from "../../../src/client/config";
import { getOrInitConfig } from "../../../src/client/config";
import { BarkConfig, getDefaultConfig } from "../../../src/config/declare";
import { ERROR_CODE } from "../../../src/panic/declare";

describe('Given [client-config] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('config-config');

    it('should be able to get config', async (): Promise<void> => {

        const key: string = chance.string();
        const value: string = chance.string();

        const json: any = { [key]: value };

        const getConfigFileStack = Sandbox.create();
        const replaceConfigFileStack = Sandbox.create();

        const getConfigFileMock = Mock.create(func_CLIENT_CONFIG, 'getConfigFile');
        const replaceConfigFileMock = Mock.create(func_CLIENT_CONFIG, 'replaceConfigFile');

        getConfigFileMock.mock(getConfigFileStack.func(JSON.stringify(json)));
        replaceConfigFileMock.mock(replaceConfigFileStack.func());

        const config: BarkConfig = await getOrInitConfig();

        getConfigFileMock.restore();
        replaceConfigFileMock.restore();

        expect(config).to.be.deep.equal(json);
        expect(getConfigFileStack).to.have.lengthOf(1);
        expect(replaceConfigFileStack).to.have.lengthOf(0);
    });

    it('should be able to throw error with invalid config', async (): Promise<void> => {

        const getConfigFileStack = Sandbox.create();
        const replaceConfigFileStack = Sandbox.create();

        const getConfigFileMock = Mock.create(func_CLIENT_CONFIG, 'getConfigFile');
        const replaceConfigFileMock = Mock.create(func_CLIENT_CONFIG, 'replaceConfigFile');

        getConfigFileMock.mock(getConfigFileStack.func(chance.string()));
        replaceConfigFileMock.mock(replaceConfigFileStack.func());

        try {
            await getOrInitConfig();
            fail();
        } catch (error) {
            expect(error.code).to.be.equal(ERROR_CODE.CONFIG_PARSE_FAILED);
        } finally {
            getConfigFileMock.restore();
            replaceConfigFileMock.restore();
        }
    });

    it('should be able to replace config', async (): Promise<void> => {

        const getConfigFileStack = Sandbox.create();
        const replaceConfigFileStack = Sandbox.create();

        const getConfigFileMock = Mock.create(func_CLIENT_CONFIG, 'getConfigFile');
        const replaceConfigFileMock = Mock.create(func_CLIENT_CONFIG, 'replaceConfigFile');

        getConfigFileMock.mock(getConfigFileStack.func(null));
        replaceConfigFileMock.mock(replaceConfigFileStack.func());

        const config: BarkConfig = await getOrInitConfig();

        getConfigFileMock.restore();
        replaceConfigFileMock.restore();

        expect(config).to.be.deep.equal(getDefaultConfig());
        expect(getConfigFileStack).to.have.lengthOf(1);
        expect(replaceConfigFileStack).to.have.lengthOf(1);
    });
});

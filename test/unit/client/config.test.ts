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
import { mockReadFile, mockWriteFile } from "../../mock/fs";

describe('Given [client-config] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('config-config');

    it('should be able to get config', async (): Promise<void> => {

        const key: string = chance.string();
        const value: string = chance.string();

        const json: any = { [key]: value };

        const restoreRead: () => Array<{
            path: string;
            code: string;
        }> = mockReadFile(JSON.stringify(json));
        const restoreWrite: () => Array<{
            path: string;
            content: string;
            code: string;
        }> = mockWriteFile();

        const config: BarkConfig = await getOrInitConfig(chance.string());

        const readResult = restoreRead();
        const writeResult = restoreWrite();

        expect(config).to.be.deep.equal(json);
        expect(readResult).to.have.lengthOf(1);
        expect(writeResult).to.have.lengthOf(0);
    });

    it('should be able to throw error with invalid config', async (): Promise<void> => {

        const restoreRead: () => Array<{
            path: string;
            code: string;
        }> = mockReadFile();
        const restoreWrite: () => Array<{
            path: string;
            content: string;
            code: string;
        }> = mockWriteFile();

        try {
            await getOrInitConfig(chance.string());
            fail();
        } catch (error) {
            expect(error.code).to.be.equal(ERROR_CODE.CONFIG_PARSE_FAILED);
        } finally {
            restoreRead();
            restoreWrite();
        }
    });

    it('should be able to replace config', async (): Promise<void> => {

        const restoreRead: () => Array<{
            path: string;
            code: string;
        }> = mockReadFile(null);
        const restoreWrite: () => Array<{
            path: string;
            content: string;
            code: string;
        }> = mockWriteFile();

        const config: BarkConfig = await getOrInitConfig(chance.string());

        const readResult = restoreRead();
        const writeResult = restoreWrite();

        expect(config).to.be.deep.equal(getDefaultConfig());
        expect(readResult).to.have.lengthOf(1);
        expect(writeResult).to.have.lengthOf(1);
    });
});

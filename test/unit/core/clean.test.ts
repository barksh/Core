/**
 * @author WMXPY
 * @namespace Core
 * @description Clean
 * @override
 */

import * as SudooIO from "@sudoo/io";
import { Mock, Sandbox } from "@sudoo/mock";
import { expect } from "chai";
import * as Chance from "chance";
import * as Path from "path";
import { Environment } from "../../../src/config/environment";
import { cleanTempFiles, getInActivePackageFullPaths } from "../../../src/core/clean";
import { createMockEnvironment } from "../../mock/environment";

describe('Given [Clean] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('core-clean');

    it('should be able to clean all temp files', async (): Promise<void> => {

        const RMRFFoldersStack = Sandbox.create();
        const directoryFilesStack = Sandbox.create();

        const RMRFFoldersMock = Mock.create(SudooIO, 'RMRFFolder');
        const directoryFilesMock = Mock.create(SudooIO, 'directoryFiles');

        RMRFFoldersMock.mock(RMRFFoldersStack.func());
        directoryFilesMock.mock(directoryFilesStack.func([
            chance.string(),
            chance.string(),
        ]));

        const env: Environment = createMockEnvironment();
        await cleanTempFiles(env);

        RMRFFoldersMock.restore();
        directoryFilesMock.restore();

        expect(RMRFFoldersStack).to.have.lengthOf(2);
        expect(directoryFilesStack).to.have.lengthOf(1);
    });

    it('should be able to get in-active package full paths', async (): Promise<void> => {

        const directoryFilesStack = Sandbox.create();

        const directoryFilesMock = Mock.create(SudooIO, 'directoryFiles');

        const fakeDictionary: string[] = [
            chance.string(),
            chance.string(),
        ];

        directoryFilesMock.mock(directoryFilesStack.func(fakeDictionary));

        const env: Environment = createMockEnvironment();
        const result: string[] = await getInActivePackageFullPaths(env);

        directoryFilesMock.restore();

        expect(directoryFilesStack).to.be.lengthOf(1);
        expect(result).to.be.deep.equal(fakeDictionary.map(
            (dict: string) => Path.join(env.packagePath, dict),
        ));
    });
});

/**
 * @author WMXPY
 * @namespace Template
 * @description Install
 * @override Scenario
 */

import { expect } from "chai";
import * as Chance from "chance";
import { BarkTemplate, Core, Environment } from "../../../src";
import { mockGetRandomPackagePath } from "../../mock/io/io-mock";
import { mockCopyAllFiles } from "../../mock/template/copy-mock";

describe('Given -Template-Install- scenario', (): void => {

    const chance: Chance.Chance = new Chance('scenario-template-install');

    const env: Environment = Environment.create()
        .setConfig({
            templates: [],
            sources: [],
        });

    it('should be able to get config information', async (): Promise<void> => {

        const core: Core = Core.withEnvironment(env);

        const restoreGetRandomPackagePath = mockGetRandomPackagePath();
        const restoreCopyAllFiles = mockCopyAllFiles();

        const name: string = chance.string();
        const version: string = chance.string();
        const path: string = chance.string();

        const newEnv: Environment = await core.installFromLocal(name, version, path, path);

        expect(newEnv.templates).to.be.deep.equal([
            {
                name,
                version,
                folderName: path,
            },
        ] as BarkTemplate[]);
        expect(restoreGetRandomPackagePath()).to.have.lengthOf(1);
        expect(restoreCopyAllFiles()).to.have.lengthOf(1);
    });
});

/**
 * @author WMXPY
 * @namespace IO
 * @description File
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { readTextFile, UTF8, writeTextFile } from "../../../src/io/file";
import { mockReadFile, mockWriteFile } from "../../mock/fs";

describe('Given [file] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('io-file');

    it('should be able to read file', async (): Promise<void> => {

        const restore: () => Array<{
            path: string;
            code: string;
        }> = mockReadFile();

        const path: string = chance.string();
        const result: string = await readTextFile(path);

        expect(result).to.be.equal(path);
        expect(restore()).to.be.deep.equal([{
            path,
            code: UTF8,
        }]);
    });

    it('should be able to write file', async (): Promise<void> => {

        const restore: () => Array<{
            path: string;
            content: string;
            code: string;
        }> = mockWriteFile();

        const path: string = chance.string();
        const content: string = chance.string();
        await writeTextFile(path, content);

        expect(restore()).to.be.deep.equal([{
            path,
            content,
            code: UTF8,
        }]);
    });
});

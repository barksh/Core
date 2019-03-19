/**
 * @author WMXPY
 * @namespace IO
 * @description func_IO_EXTERNAL
 * @override
 */

import { Mock, Sandbox } from "@sudoo/mock";
import { expect } from "chai";
import * as Chance from "chance";
import * as func_IO_EXTERNAL from "../../../src/io/external";
import * as func_IO_FILE from "../../../src/io/file";
import { mockWriteStream } from "../../mock/fs";

describe('Given [external] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('io-external');

    it('should be able to download and compress', async (): Promise<void> => {

        const downloadFileStack = Sandbox.create();
        const getRandomTempFilePathStack = Sandbox.create();

        const downloadFileMock = Mock.create(func_IO_EXTERNAL, 'downloadFile');
        const getRandomTempFilePathMock = Mock.create(func_IO_FILE, 'getRandomTempFilePath');
        downloadFileMock.mock(downloadFileStack.func());
        getRandomTempFilePathMock.mock(getRandomTempFilePathStack.func());

        const path: string = chance.string();
        const targetPath: string = chance.string();
        await func_IO_EXTERNAL.downloadAndDecompress(path, targetPath);

        downloadFileMock.restore();
        getRandomTempFilePathMock.restore();

        expect(downloadFileStack).to.have.lengthOf(1);
        expect(getRandomTempFilePathStack).to.have.lengthOf(1);
    });

    it('should be able to download file', async (): Promise<void> => {

        const getHttpClientSandbox = Sandbox.create();

        const restoreWriteStream: {
            restore: () => {
                eventList: string[];
                contentList: any[];
            };
            tray: Record<string, any>;
        } = mockWriteStream();
        const getHttpClientMock = Mock.create(func_IO_EXTERNAL, 'getHttpClient');
        getHttpClientMock.mock(() => ({
            get: getHttpClientSandbox.func({
                on: Sandbox.stub(),
            }),
        }));

        const path: string = chance.string();
        const targetPath: string = chance.string();

        setImmediate(() => restoreWriteStream.tray.end());
        await func_IO_EXTERNAL.downloadFile(path, targetPath);

        getHttpClientMock.restore();
        const result: {
            eventList: string[];
            contentList: any[];
        } = restoreWriteStream.restore();

        expect(getHttpClientSandbox).to.have.lengthOf(1);
        expect(result.eventList).to.have.lengthOf(2);
    });

    it('should be able to move github protocol file', async (): Promise<void> => {

        const downloadAndDecompressStack = Sandbox.create();

        const downloadAndDecompressMock = Mock.create(func_IO_EXTERNAL, 'downloadAndDecompress');
        downloadAndDecompressMock.mock(downloadAndDecompressStack.func());

        const path: string = 'github://' + chance.string();
        const targetPath: string = chance.string();
        await func_IO_EXTERNAL.moveAnyExternalFile(path, targetPath);

        downloadAndDecompressMock.restore();

        expect(downloadAndDecompressStack).to.have.lengthOf(1);
    });
});

/**
 * @author WMXPY
 * @namespace IO
 * @description External
 * @override
 */

import { Mock, Sandbox } from "@sudoo/mock";
import { expect } from "chai";
import * as Chance from "chance";
import { Environment } from "../../../src/config/environment";
import * as func_IO_COMPRESS from "../../../src/io/compress";
import { EXTERNAL_PROTOCOL } from "../../../src/io/declare";
import * as func_IO_EXTERNAL from "../../../src/io/external";
import * as func_IO_FILE from "../../../src/io/file";
import * as func_IO_UTIL from "../../../src/io/util";
import { createMockEnvironment } from "../../mock/environment";
import { mockWriteStream } from "../../mock/fs";

describe('Given [io-external] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('io-external');

    it('should be able to download and compress', async (): Promise<void> => {

        const downloadFileStack = Sandbox.create();
        const getFileMd5Stack = Sandbox.create();
        const renameFileStack = Sandbox.create();
        const getRandomTempFilePathStack = Sandbox.create();
        const decompressZipFileStack = Sandbox.create();

        const downloadFileMock = Mock.create(func_IO_EXTERNAL, 'downloadFile');
        const getFileMd5Mock = Mock.create(func_IO_FILE, 'getFileMd5');
        const renameFileMock = Mock.create(func_IO_FILE, 'renameFile');
        const getRandomTempFilePathMock = Mock.create(func_IO_UTIL, 'getRandomTempFilePath');
        const decompressZipFileMock = Mock.create(func_IO_COMPRESS, 'decompressZipFile');

        downloadFileMock.mock(downloadFileStack.func());
        getFileMd5Mock.mock(getFileMd5Stack.func());
        renameFileMock.mock(renameFileStack.func());
        getRandomTempFilePathMock.mock(getRandomTempFilePathStack.func());
        decompressZipFileMock.mock(decompressZipFileStack.func());

        const path: string = chance.string();
        const targetPath: string = chance.string();

        const env: Environment = createMockEnvironment();
        await func_IO_EXTERNAL.downloadAndDecompress(env, path, targetPath);

        downloadFileMock.restore();
        getFileMd5Mock.restore();
        renameFileMock.restore();
        getRandomTempFilePathMock.restore();
        decompressZipFileMock.restore();

        expect(downloadFileStack).to.have.lengthOf(1);
        expect(getFileMd5Stack).to.have.lengthOf(1);
        expect(renameFileStack).to.have.lengthOf(1);
        expect(decompressZipFileStack).to.have.lengthOf(1);
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

    it('should be able to fetch github protocol file', async (): Promise<void> => {

        const downloadAndDecompressStack = Sandbox.create();

        const downloadAndDecompressMock = Mock.create(func_IO_EXTERNAL, 'downloadAndDecompress');
        downloadAndDecompressMock.mock(downloadAndDecompressStack.func());

        const path: string = 'github://' + chance.string();
        const targetPath: string = chance.string();

        const env: Environment = createMockEnvironment();
        await func_IO_EXTERNAL.fetchAndDecompressFromAnyExternalByProtocol(env, EXTERNAL_PROTOCOL.GITHUB, path, targetPath);

        downloadAndDecompressMock.restore();

        expect(downloadAndDecompressStack).to.have.lengthOf(1);
    });

    it('should be able to move any external protocol file', async (): Promise<void> => {

        const fetchAndDecompressFromAnyExternalByProtocolStack = Sandbox.create();

        const fetchAndDecompressFromAnyExternalByProtocolMock = Mock.create(func_IO_EXTERNAL, 'fetchAndDecompressFromAnyExternalByProtocol');
        fetchAndDecompressFromAnyExternalByProtocolMock.mock(fetchAndDecompressFromAnyExternalByProtocolStack.func());

        const path: string = 'github://' + chance.string();
        const targetPath: string = chance.string();

        const env: Environment = createMockEnvironment();
        await func_IO_EXTERNAL.fetchAndDecompressFromAnyExternal(env, path, targetPath);

        fetchAndDecompressFromAnyExternalByProtocolMock.restore();

        expect(fetchAndDecompressFromAnyExternalByProtocolStack).to.have.lengthOf(1);
    });
});

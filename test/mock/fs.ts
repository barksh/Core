/**
 * @author WMXPY
 * @namespace Mock
 * @description Fs
 */

import { Mock } from "@sudoo/mock";
import * as Fs from "fs";

export const mockReadFile = (): () => Array<{
    path: string;
    code: string;
}> => {

    const results: Array<{
        path: string;
        code: string;
    }> = [];
    const mock: Mock<typeof Fs> = Mock.create(Fs, 'readFile');

    mock.mock((path: string, code: string, callback: (error: any, data: string) => void) => {
        results.push({ path, code });
        callback(null, path);
    });

    return () => {
        mock.restore();
        return results;
    };
};

export const mockWriteFile = (): () => Array<{
    path: string;
    content: string;
    code: string;
}> => {

    const results: Array<{
        path: string;
        content: string;
        code: string;
    }> = [];
    const mock: Mock<typeof Fs> = Mock.create(Fs, 'writeFile');

    mock.mock((path: string, content: string, code: string, callback: (error: any) => void) => {
        results.push({ path, content, code });
        callback(null);
    });

    return () => {
        mock.restore();
        return results;
    };
};

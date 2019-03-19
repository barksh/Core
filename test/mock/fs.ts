/**
 * @author WMXPY
 * @namespace Mock
 * @description Fs
 */

import { Mock, Sandbox } from "@sudoo/mock";
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


export const mockWriteStream = (): {
    restore: () => {
        eventList: string[];
        contentList: any[];
    };
    tray: Record<string, any>;
} => {

    type eventCB = (...any: any[]) => void;

    const writeStreamMock = Mock.create(Fs, 'createWriteStream');

    const eventList: string[] = [];
    const contentList: any[] = [];

    const functionTray: Record<string, eventCB> = {
        end: null as any,
    };

    writeStreamMock.mock((path: string) => {

        return {
            writable: true,
            on: (event: string, cb: eventCB) => {
                if (event === 'finish') {
                    functionTray.end = cb;
                }
                eventList.push(event);
            },
            write: (content: any) => {
                contentList.push(content);
            },
            close: Sandbox.stub(),
            end: Sandbox.stub(),
        };
    });

    return {
        restore: (): {
            eventList: string[];
            contentList: any[];
        } => {
            writeStreamMock.restore();
            return {
                eventList,
                contentList,
            };
        },
        tray: functionTray,
    };
};

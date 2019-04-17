/**
 * @author WMXPY
 * @namespace Mock
 * @description IO
 */

import { Mock, Sandbox } from "@sudoo/mock";
import * as __IO_UTIL from "../../../src/io/util";

export const mockGetRandomPackagePath = (returnValue?: any): () => Sandbox => {

    const stack: Sandbox = Sandbox.create();
    const mock: Mock<typeof __IO_UTIL> = Mock.create(__IO_UTIL, 'getRandomPackagePath');

    mock.mock(stack.func(returnValue));

    return () => {
        mock.restore();
        return stack;
    };
};

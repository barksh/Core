/**
 * @author WMXPY
 * @namespace Mock
 * @description Template
 */

import { Mock, Sandbox } from "@sudoo/mock";
import * as __TEMPLATE_COPY from "../../../src/template/copy";

export const mockCopyAllFiles = (returnValue?: any): () => Sandbox => {

    const stack: Sandbox = Sandbox.create();
    const mock: Mock<typeof __TEMPLATE_COPY> = Mock.create(__TEMPLATE_COPY, 'copyAllFiles');

    mock.mock(stack.func(returnValue));

    return () => {
        mock.restore();
        return stack;
    };
};

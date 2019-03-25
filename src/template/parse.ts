/**
 * @author WMXPY
 * @namespace Template
 * @description Parse
 */

import { render } from "ejs";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { TEMPLATE_METHOD } from "./declare";

export const parseEjsContent = (content: string, replacement: Record<string, string>): string => {

    try {
        const result: string = render(content, replacement);
        return result;
    } catch (error) {
        throw Panic.code(ERROR_CODE.EJS_PARSE_FAILED, error.message);
    }
};

export const parseContent = (method: TEMPLATE_METHOD, content: string, replacement: Record<string, string>): string => {

    switch (method) {
        case TEMPLATE_METHOD.EJS: return parseEjsContent(content, replacement);
    }

    return content;
};

/**
 * @author WMXPY
 * @namespace Template
 * @description Parse
 */

import { _Map } from "@sudoo/bark/map";
import { render } from "ejs";
import { ERROR_CODE, panic } from "../panic/declare";
import { TEMPLATE_METHOD } from "./declare";

export const parseEjsContent = (content: string, replacement: Record<string, string>): string => {

    try {
        const result: string = render(content, replacement);
        return result;
    } catch (error) {
        throw panic.code(ERROR_CODE.EJS_PARSE_FAILED, error.message);
    }
};

export const parseGhotiContent = (content: string, replacement: Record<string, string>): string => {

    try {
        const result: string = _Map.keys(replacement).reduce((previous: string, key: string) => {
            const regexp: RegExp = new RegExp(key, 'g');
            return previous.replace(regexp, replacement[key]);
        }, content);
        return result;
    } catch (error) {
        throw panic.code(ERROR_CODE.EJS_PARSE_FAILED, error.message);
    }
};

export const parseContent = (method: TEMPLATE_METHOD, content: string, replacement: Record<string, string>): string => {

    switch (method) {
        case TEMPLATE_METHOD.EJS: return parseEjsContent(content, replacement);
        case TEMPLATE_METHOD.GHOTI: return parseGhotiContent(content, replacement);
        case TEMPLATE_METHOD.RELATIVE:
        default: throw panic.code(ERROR_CODE.NOT_IMPLEMENTED);
    }
};

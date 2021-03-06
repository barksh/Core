/**
 * @author WMXPY
 * @namespace Template
 * @description Parse
 */

import { _Map } from "@sudoo/bark/map";
import { render } from "ejs";
import { ERROR_CODE, panic } from "../panic/declare";
import { PARSING_METHOD } from "./declare";

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
            const regexp: RegExp = new RegExp('\\${\\|' + key + '\\|}', 'g');
            return previous.replace(regexp, replacement[key]);
        }, content);
        return result;
    } catch (error) {
        throw panic.code(ERROR_CODE.EJS_PARSE_FAILED, error.message);
    }
};

export const parseContentBaseOnExtName = (extName: string, content: string, replacement: Record<string, string>): string => {

    switch (extName.replace('.', '').toLowerCase()) {
        case 'ejs': return parseEjsContent(content, replacement);
        case 'ghoti': return parseGhotiContent(content, replacement);
        default: return content;
    }
};

export const parseContent = (method: PARSING_METHOD, content: string, replacement: Record<string, string>): string => {

    switch (method) {
        case PARSING_METHOD.EJS: return parseEjsContent(content, replacement);
        case PARSING_METHOD.GHOTI: return parseGhotiContent(content, replacement);
        case PARSING_METHOD.NONE:
        default: return content;
    }
};

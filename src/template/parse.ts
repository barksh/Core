/**
 * @author WMXPY
 * @namespace Template
 * @description Parse
 */

import { TEMPLATE_METHOD } from "./declare";

export const parseEjsContent = (content: string, replacement: Record<string, string>): string => {

    return content;
};

export const parseContent = (method: TEMPLATE_METHOD, content: string, replacement: Record<string, string>): string => {

    switch (method) {
        case TEMPLATE_METHOD.EJS: return parseEjsContent(content, replacement);
    }

    return content;
};

/**
 * @author WMXPY
 * @namespace Template
 * @description Parse
 */

import { render } from "ejs";
import { TEMPLATE_METHOD } from "./declare";

export const parseEjsContent = (content: string, replacement: Record<string, string>): string => {

    return render(content, replacement);
};

export const parseContent = (method: TEMPLATE_METHOD, content: string, replacement: Record<string, string>): string => {

    switch (method) {
        case TEMPLATE_METHOD.EJS: return parseEjsContent(content, replacement);
    }

    return content;
};

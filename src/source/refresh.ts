/**
 * @author WMXPY
 * @namespace Source
 * @description Refresh
 */

import { BarkSource } from "../config/declare";
import { getExternalData } from "../io/external";
import { ERROR_CODE } from "../panic/declare";
import { Panic } from "../panic/panic";
import { safeParseJSON } from "../util/safe";
import { ExternalSourceStructure } from "./declare";

export const verifyExternalSourceStructure = (structure: ExternalSourceStructure): boolean => {

    if (!structure.templates) {
        return false;
    }
    return true;
};

export const updateSourceFromExternal = async (source: BarkSource): Promise<BarkSource> => {

    const info: string = await getExternalData(source.url);
    const parsed: ExternalSourceStructure = safeParseJSON(info, Panic.code(ERROR_CODE.EXTERNAL_SOURCE_PARSE_FAILED));

    if (!verifyExternalSourceStructure(parsed)) {
        throw Panic.code(ERROR_CODE.EXTERNAL_SOURCE_VERIFY_FAILED);
    }

    return source;
};

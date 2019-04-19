/**
 * @author WMXPY
 * @namespace Internationalization
 * @description Internationalization
 */

import { LOCALE, SudooInternationalization } from "@sudoo/internationalization";
import { TEXT } from "./declare";
import { EN_US_TEXT } from "./en";

export const intl: SudooInternationalization = SudooInternationalization
    .create(LOCALE.ENGLISH_AMERICA)
    .set(LOCALE.ENGLISH_AMERICA, EN_US_TEXT);

export const fPrint = (text: TEXT, ...args: any[]) => {

    return intl.format(LOCALE.ENGLISH_AMERICA).get(text, ...args);
};

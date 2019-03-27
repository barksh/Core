/**
 * @author WMXPY
 * @namespace Util
 * @description Date
 */

export const getCurrentDate = (replace?: Date): Date => {

    if (replace) {
        return replace;
    }
    return new Date();
};

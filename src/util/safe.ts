/**
 * @author WMXPY
 * @namespace Util
 * @description Safe
 */

export const safeParseJSON = <T>(content: string, error: Error): T => {

    try {
        const result: T = JSON.parse(content);
        return result;
    } catch (err) {
        throw error;
    }
};

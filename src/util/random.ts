/**
 * @author WMXPY
 * @namespace Util
 * @description Random
 */

export const unique = (): string => '_' + Math.random().toString(36).substring(2, 9);

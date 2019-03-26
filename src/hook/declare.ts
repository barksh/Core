/**
 * @author WMXPY
 * @namespace Hook
 * @description Declare
 */

export enum HOOKS {

    PARSE_FILE = "PARSE_FILE",
}

export type HookCallbacks = {

    [HOOKS.PARSE_FILE]: (filename: string) => void;
};

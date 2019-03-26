/**
 * @author WMXPY
 * @namespace Hook
 * @description Declare
 */

export type FunctionArguments<T> = T extends (...args: infer U) => any ? U : never;
export type FunctionReturn<T> = T extends (...args: any) => infer U ? U : never;

export enum HOOKS {

    PARSE_FILE = "PARSE_FILE",
    USER_INPUT = "USER_INPUT",
}

export type HookCallbacks = {

    [HOOKS.PARSE_FILE]: (filename: string) => void;
    [HOOKS.USER_INPUT]: (input: string) => void;
};

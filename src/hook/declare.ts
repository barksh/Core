/**
 * @author WMXPY
 * @namespace Hook
 * @description Declare
 */

export type FunctionArguments<T> = T extends (...args: infer U) => any ? U : never;
export type FunctionReturn<T> = T extends (...args: any) => infer U ? U : never;

export type VoidWithArgs<Args extends any[]> = (...args: Args) => void;

export enum HOOKS {

    PACKAGE_ALREADY_INSTALLED_ABORT = "PACKAGE_ALREADY_INSTALLED_ABORT",
    PACKAGE_ALREADY_INSTALLED_REPLACE = "PACKAGE_ALREADY_INSTALLED_REPLACE",
    PARSE_FILE = "PARSE_FILE",
    EXIT = "EXIT",
}

export type HookCallbackArgs = {
    [HOOKS.PACKAGE_ALREADY_INSTALLED_ABORT]: [],
    [HOOKS.PACKAGE_ALREADY_INSTALLED_REPLACE]: [],
    [HOOKS.PARSE_FILE]: [string];
    [HOOKS.EXIT]: [];
};

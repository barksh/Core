/**
 * @author WMXPY
 * @namespace Panic
 * @description Declare
 */

export const MODULE_NAME = 'BARKSH_CORE';

export enum ERROR_CODE {

    CONFIG_PARSE_FAILED = 1500,
}

export const ERROR_LIST = {

    [ERROR_CODE.CONFIG_PARSE_FAILED]: 'Failed parsing config file',
};

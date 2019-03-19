/**
 * @author WMXPY
 * @namespace Panic
 * @description Declare
 */

export const MODULE_NAME = 'BARKSH_CORE';

export enum ERROR_CODE {

    CONFIG_PARSE_FAILED = 1500,

    DECOMPRESS_FILE_FAILED = 1645,

    INVALID_EXTERNAL_URL = 5050,
    INVALID_EXTERNAL_PROTOCOL = 5051,

    INTERNAL_ISSUE = 9000,
    NOT_IMPLEMENTED = 9001,
}

export const ERROR_LIST = {

    [ERROR_CODE.CONFIG_PARSE_FAILED]: 'Failed parsing config file',

    [ERROR_CODE.DECOMPRESS_FILE_FAILED]: 'Decompress file failed from, "{}"',

    [ERROR_CODE.INVALID_EXTERNAL_URL]: 'Invalid external url, "{}"',
    [ERROR_CODE.INVALID_EXTERNAL_PROTOCOL]: 'Invalid external protocol, "{}"',

    [ERROR_CODE.INTERNAL_ISSUE]: 'Internal error',
    [ERROR_CODE.NOT_IMPLEMENTED]: 'Not implemented',
};

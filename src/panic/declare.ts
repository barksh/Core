/**
 * @author WMXPY
 * @namespace Panic
 * @description Declare
 */

export const MODULE_NAME = 'BARKSH_CORE';

export enum ERROR_CODE {

    CONFIG_PARSE_FAILED = 1500,

    EXTERNAL_SOURCE_PARSE_FAILED = 1603,
    EXTERNAL_SOURCE_VERIFY_FAILED = 1604,

    DECOMPRESS_FILE_FAILED = 1645,

    TEMPLATE_NOT_INSTALLED = 4001,
    TEMPLATE_NOT_EXIST = 4002,

    TEMPLATE_NAME_ALREADY_EXIST = 4011,

    INVALID_EXTERNAL_URL = 5050,
    INVALID_EXTERNAL_PROTOCOL = 5051,

    INTERNAL_ISSUE = 9000,
    NOT_IMPLEMENTED = 9001,
    PATH_NOT_EXIST = 9002,

    INVALID_CONFIG = 9100,
    ENVIRONMENT_NOT_SETTLED = 9101,
}

export const ERROR_LIST = {

    [ERROR_CODE.CONFIG_PARSE_FAILED]: 'Failed parsing config file',

    [ERROR_CODE.EXTERNAL_SOURCE_PARSE_FAILED]: 'Failed parse external source file',
    [ERROR_CODE.EXTERNAL_SOURCE_VERIFY_FAILED]: 'Failed verify external source file',

    [ERROR_CODE.DECOMPRESS_FILE_FAILED]: 'Decompress file failed from, "{}"',

    [ERROR_CODE.TEMPLATE_NOT_INSTALLED]: 'Wanted template: "{}" not installed',
    [ERROR_CODE.TEMPLATE_NOT_EXIST]: 'Wanted template: "{}" not exist',

    [ERROR_CODE.TEMPLATE_NAME_ALREADY_EXIST]: 'Template: "{}" already exist',

    [ERROR_CODE.INVALID_EXTERNAL_URL]: 'Invalid external url, "{}"',
    [ERROR_CODE.INVALID_EXTERNAL_PROTOCOL]: 'Invalid external protocol, "{}"',

    [ERROR_CODE.INTERNAL_ISSUE]: 'Internal error',
    [ERROR_CODE.NOT_IMPLEMENTED]: 'Not implemented',
    [ERROR_CODE.PATH_NOT_EXIST]: 'Path "{}" Not exist',

    [ERROR_CODE.INVALID_CONFIG]: 'Invalid configuration',
    [ERROR_CODE.ENVIRONMENT_NOT_SETTLED]: 'Environment does not contain "{}" information',
};

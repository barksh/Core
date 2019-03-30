/**
 * @author WMXPY
 * @namespace Panic
 * @description Declare
 */

import { Panic } from "connor";

export const MODULE_NAME = 'BARKSH_CORE';

export enum ERROR_CODE {

    CONFIG_PARSE_FAILED = 1500,

    EXTERNAL_SOURCE_PARSE_FAILED = 1603,
    EXTERNAL_SOURCE_VERIFY_FAILED = 1604,

    TEMPLATE_CONFIG_PARSE_FAILED = 1613,
    TEMPLATE_CONFIG_VERIFY_FAILED = 1614,

    DECOMPRESS_FILE_FAILED = 1645,

    ORIGIN_FOLDER_NOT_EXIST = 2001,
    CONFIG_IS_REQUIRED_FOR_FOLDER_INIT = 2002,

    EJS_PARSE_FAILED = 2010,

    TEMPLATE_NOT_INSTALLED = 4001,
    TEMPLATE_NOT_EXIST = 4002,
    TEMPLATE_ALREADY_EXIST = 4003,

    TEMPLATE_NAME_ALREADY_EXIST = 4011,

    TEMPLATE_NOT_EXIST_FROM_EXTERNAL = 4101,

    SOURCE_ALREADY_EXIST = 4205,

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

    [ERROR_CODE.TEMPLATE_CONFIG_PARSE_FAILED]: 'Failed parse template: "{}" config file',
    [ERROR_CODE.TEMPLATE_CONFIG_VERIFY_FAILED]: 'Failed verify template: "{}" config file',

    [ERROR_CODE.DECOMPRESS_FILE_FAILED]: 'Decompress file failed from, "{}"',

    [ERROR_CODE.ORIGIN_FOLDER_NOT_EXIST]: 'Origin path: "{}" not exist',
    [ERROR_CODE.CONFIG_IS_REQUIRED_FOR_FOLDER_INIT]: 'Config file is required for init from folder, "{}"',

    [ERROR_CODE.EJS_PARSE_FAILED]: 'Ejs file parse failed, message: "{}"',

    [ERROR_CODE.TEMPLATE_NOT_INSTALLED]: 'Wanted template: "{}" not installed',
    [ERROR_CODE.TEMPLATE_NOT_EXIST]: 'Wanted template: "{}" not exist',
    [ERROR_CODE.TEMPLATE_ALREADY_EXIST]: 'Template: "{}" already exist',

    [ERROR_CODE.TEMPLATE_NAME_ALREADY_EXIST]: 'Template: "{}" already exist',

    [ERROR_CODE.TEMPLATE_NOT_EXIST_FROM_EXTERNAL]: 'Template: "{}" not exist from external',

    [ERROR_CODE.SOURCE_ALREADY_EXIST]: 'Source: "{}" already exist',

    [ERROR_CODE.INVALID_EXTERNAL_URL]: 'Invalid external url, "{}"',
    [ERROR_CODE.INVALID_EXTERNAL_PROTOCOL]: 'Invalid external protocol, "{}"',

    [ERROR_CODE.INTERNAL_ISSUE]: 'Internal error',
    [ERROR_CODE.NOT_IMPLEMENTED]: 'Not implemented',
    [ERROR_CODE.PATH_NOT_EXIST]: 'Path "{}" Not exist',

    [ERROR_CODE.INVALID_CONFIG]: 'Invalid configuration',
    [ERROR_CODE.ENVIRONMENT_NOT_SETTLED]: 'Environment does not contain "{}" information',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);

/**
 * @author WMXPY
 * @namespace Source
 * @description Declare
 */

import { BarkTemplateBase } from "../config/declare";

export type ExternalTemplate = {

    readonly url: string;
} & BarkTemplateBase;

export type ExternalSourceStructure = {

    readonly templates: ExternalTemplate[];
};

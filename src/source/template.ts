/**
 * @author WMXPY
 * @namespace Source
 * @description Template
 */

import { BarkSource } from "../config/declare";
import { getExternalData } from "../io/external";

export const getAllTemplateFromSource = async (source: BarkSource) => {

    const info = await getExternalData(source.url);
};

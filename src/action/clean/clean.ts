/**
 * @author WMXPY
 * @namespace Action_Clean
 * @description Clean
 */

import { removeConfigFile } from "../../io/file";

export const clean = async (): Promise<void> => {

    await removeConfigFile();
};

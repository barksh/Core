/**
 * @author WMXPY
 * @namespace Util
 * @description Ensure
 */

import * as Path from "path";
import { attemptMarkDir } from "../io/file";

export class Ensure {

    public static create(): Ensure {
        return new Ensure();
    }

    private readonly _cache: Set<string>;

    private constructor() {

        this._cache = new Set<string>();
    }

    public async ensure(path: string): Promise<void> {

        const splited: string[] = this._split(path);
        const ensurer: string[] = this._recursive(splited);

        for (const each of ensurer) {
            if (!this._cache.has(each)) {
                this._cache.add(each);
                await attemptMarkDir(each);
            }
        }
        return;
    }

    public async ensureFolder(path: string): Promise<void> {
        const splited: string[] = this._split(path);
        const ensurer: string[] = this._recursive(splited, true);

        for (const each of ensurer) {
            if (!this._cache.has(each)) {
                this._cache.add(each);
                await attemptMarkDir(each);
            }
        }
        return;
    }

    private _split(path: string): string[] {
        return path.split(Path.sep);
    }

    private _recursive(list: string[], includeLast?: boolean): string[] {
        return list.map((_: string, index: number): string => {
            const includedIndex: number = includeLast ? index + 1 : index;
            return list.slice(0, includedIndex).join(Path.sep);
        }).filter(Boolean);
    }
}

/**
 * @author WMXPY
 * @namespace Hook
 * @description Hook
 */

import { FunctionArguments, HookCallbacks, HOOKS } from "./declare";

export class Hook<K extends HOOKS, V extends HookCallbacks[K]> {

    public static create<K extends HOOKS, V extends HookCallbacks[K]>(when: K, then?: V) {

        const hooks = then ? [then] : [];
        return new Hook<K, V>(when, hooks);
    }

    private readonly _key: K;
    private readonly _callbacks: V[];

    private constructor(when: K, then: V[]) {

        this._key = when;
        this._callbacks = then;
    }

    public call<T extends HOOKS, Args extends FunctionArguments<HookCallbacks[T]>>(...args: Args): void {

        for (const callback of this._callbacks) {

            const fixed: any = callback as any;
            fixed(...args);
        }
        return null as any;
    }


    public addCallback(then: V): this {

        this._callbacks.push(then);
        return this;
    }

    public clone(): Hook<K, V> {

        return new Hook(this._key, [...this._callbacks]);
    }

    public match(hook: K): boolean {

        if (this._key === hook) {
            return true;
        }
        return false;
    }
}

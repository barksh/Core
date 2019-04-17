/**
 * @author WMXPY
 * @namespace Hook
 * @description Hook
 */

import { HookCallbackArgs, HOOKS, VoidWithArgs } from "./declare";

export class Hook<K extends HOOKS> {

    public static create<K extends HOOKS>(when: K, then?: VoidWithArgs<HookCallbackArgs[K]>) {

        const hooks = then ? [then] : [];
        return new Hook<K>(when, hooks);
    }

    private readonly _key: K;
    private readonly _callbacks: Array<VoidWithArgs<HookCallbackArgs[K]>>;

    private constructor(when: K, then: Array<VoidWithArgs<HookCallbackArgs[K]>>) {

        this._key = when;
        this._callbacks = then;
    }

    public call<Args extends HookCallbackArgs[K]>(...args: Args): void {

        for (const callback of this._callbacks) {

            const fixed: any = callback as any;
            fixed(...args);
        }
        return null as any;
    }


    public addCallback(then: VoidWithArgs<HookCallbackArgs[K]>): this {

        this._callbacks.push(then);
        return this;
    }

    public clone(): Hook<K> {

        return new Hook(this._key, [...this._callbacks]);
    }

    public match(hook: K): boolean {

        if (this._key === hook) {
            return true;
        }
        return false;
    }
}

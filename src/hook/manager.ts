/**
 * @author WMXPY
 * @namespace Hook
 * @description Manager
 */

import { HookCallbackArgs, HOOKS, VoidWithArgs } from "./declare";
import { Hook } from "./hook";

export class HookManager {

    public static create() {

        return new HookManager();
    }

    private readonly _hooks: Array<Hook<any>>;

    private constructor(hooks?: Array<Hook<any>>) {

        this._hooks = hooks || [];
    }

    public clone(): HookManager {

        return new HookManager(this._hooks.map((hook: Hook<any>) => hook.clone()));
    }

    public call<T extends HOOKS, Args extends HookCallbackArgs[T]>(key: T, ...args: Args): void {

        const hook: Hook<T> | null = this._match(key);

        if (hook) {
            hook.call(...args);
        }
        return;
    }

    public on<T extends HOOKS>(key: T, callback: VoidWithArgs<HookCallbackArgs[T]>): this {

        const hook: Hook<T> | null = this._match(key);

        if (hook) {
            hook.addCallback(callback);
        }

        this._hooks.push(Hook.create(key, callback));
        return this;
    }

    private _match<T extends HOOKS>(key: T): Hook<T> | null {

        for (const hook of this._hooks) {
            if (hook.match(key)) {
                return hook;
            }
        }
        return null;
    }
}

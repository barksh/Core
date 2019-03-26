/**
 * @author WMXPY
 * @namespace Hook
 * @description Manager
 */

import { FunctionArguments, HookCallbacks, HOOKS } from "./declare";
import { Hook } from "./hook";

export class HookManager {

    public static create() {

        return new HookManager();
    }

    private readonly _hooks: Array<Hook<any, any>>;

    private constructor(hooks?: Array<Hook<any, any>>) {

        this._hooks = hooks || [];
    }

    public clone(): HookManager {

        return new HookManager(this._hooks.map((hook: Hook<any, any>) => hook.clone()));
    }

    public call<T extends HOOKS, Args extends FunctionArguments<HookCallbacks[T]>>(key: T, ...args: Args): void {

        const hook: Hook<T, HookCallbacks[T]> | null = this._match(key);

        if (hook) {
            hook.call(...args);
        }
        return;
    }

    public on<T extends HOOKS>(key: T, callback: HookCallbacks[T]): this {

        const hook: Hook<T, HookCallbacks[T]> | null = this._match(key);

        if (hook) {
            hook.addCallback(callback);
        }

        this._hooks.push(Hook.create(key, callback));
        return this;
    }

    private _match<T extends HOOKS>(key: T): Hook<T, HookCallbacks[T]> | null {

        for (const hook of this._hooks) {
            if (hook.match(key)) {
                return hook;
            }
        }
        return null;
    }
}

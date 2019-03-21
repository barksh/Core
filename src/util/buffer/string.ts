/**
 * @author WMXPY
 * @namespace Util_buffer
 * @description String
 */

export class StringBuffer {

    public static create(init?: string): StringBuffer {

        return new StringBuffer(init);
    }

    private _value: string;

    private constructor(init?: string) {

        this._value = init || '';
    }

    public get value(): string {

        return this._value;
    }

    public add(value: string): this {

        this._value = this._value + value;
        return this;
    }
}

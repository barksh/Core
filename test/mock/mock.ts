/**
 * @author WMXPY
 * @namespace Mock
 * @description Mock
 */

export class Mock<T extends any> {

    public static create<T>(outer: T, functionName: keyof T) {

        return new Mock(outer, functionName);
    }

    private readonly _outer: T;
    private readonly _functionName: keyof T;

    private _temp: any;

    private constructor(outer: T, functionName: keyof T) {

        this._outer = outer;
        this._functionName = functionName;

        this.mock = this.mock.bind(this);
        this.restore = this.restore.bind(this);
    }

    public mock(func: (...args: any) => any) {

        this._temp = this._outer[this._functionName];
        this._outer[this._functionName] = func as any;
    }

    public restore() {

        this._outer[this._functionName] = this._temp;
    }
}

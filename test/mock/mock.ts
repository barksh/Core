/**
 * @author WMXPY
 * @namespace Mock
 * @description Mock
 */

export class Mock<T> {

    public static create<T>(outer: any, functionName: string) {

        return new Mock<T>(outer, functionName);
    }

    private readonly _outer: any;
    private readonly _functionName: string;

    private constructor(outer: any, functionName: string) {

        this._outer = outer;
        this._functionName = functionName;
    }
}

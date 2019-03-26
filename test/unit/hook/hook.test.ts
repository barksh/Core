/**
 * @author WMXPY
 * @namespace Hook
 * @description Hook
 * @override
 */

import { Sandbox } from "@sudoo/mock";
import { expect } from "chai";
import * as Chance from "chance";
import { HOOKS } from "../../../src/hook/declare";
import { Hook } from "../../../src/hook/hook";

describe('Given {Hook} class', (): void => {

    const chance: Chance.Chance = new Chance('hook-hook');

    it('should be able to create hook', (): void => {

        const hook: Hook<HOOKS.PARSE_FILE> = Hook.create(HOOKS.PARSE_FILE, Sandbox.stub());

        expect(hook).to.be.instanceOf(Hook);
    });

    it('should be able to trigger hook', (): void => {

        const sandbox: Sandbox = Sandbox.create();
        const value: string = chance.string();
        const hook: Hook<HOOKS.PARSE_FILE> = Hook.create(HOOKS.PARSE_FILE, sandbox.func());

        hook.call(value);
        expect(sandbox).to.have.lengthOf(1);
        expect(sandbox.calls[0].arg(0)).to.be.equal(value);
    });

    it('should be able to trigger multiple hook', (): void => {

        const sandbox: Sandbox = Sandbox.create();
        const value: string = chance.string();
        const hook: Hook<HOOKS.PARSE_FILE> = Hook.create(HOOKS.PARSE_FILE, sandbox.func());
        hook.addCallback(sandbox.func());

        hook.call(value);
        expect(sandbox).to.have.lengthOf(2);
        expect(sandbox.calls[0].arg(0)).to.be.equal(value);
        expect(sandbox.calls[1].arg(0)).to.be.equal(value);
    });
});

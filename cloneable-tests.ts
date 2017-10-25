import {expect} from 'chai';
import 'mocha';
import {Cloneable, CloneableArgs} from "./index";

class SubTest {
    readonly someArg: string;
    private privateArg: string;

    constructor(someArg: string, privateArg: string) {
        this.someArg = someArg;
        this.privateArg = privateArg;
    }

    getPrivate() {
        return this.privateArg;
    }

}

interface TestArgs {
    readonly name: string;
    readonly dateOfBirth: Date;
    readonly subs: SubTest[];
}

class Test extends Cloneable<TestArgs> implements CloneableArgs<TestArgs> {
    readonly name: string;
    readonly dateOfBirth: Date;
    readonly subs: SubTest[];

    constructor(args: TestArgs) {
        super(args);
    }

}

const firstName = 'Tim';
const secondName = 'Bob';
const someTest = 'someTest';
const otherTest = 'otherTest';
const t = new Test({
    name: firstName, dateOfBirth: new Date("1988-1-1"),
    subs: [
        new SubTest('someTest', 'otherTest')
    ]
});
const c = t.clone({name: secondName});

describe('Object is correctly initialized', () => {

    it('properties should be set according to args', () => {
        expect(t.name).to.equal(firstName);
        expect(t.subs[0].getPrivate()).to.equal(otherTest);
    });

});

describe('Object is correctly cloned', () => {

    it('Object should be correctly cloned', () => {
        expect(t.name).to.not.equal(c.name);
        expect(c.subs[0].getPrivate()).to.equal(otherTest);
        expect(t.constructor).to.equal(c.constructor);
        expect(t.dateOfBirth.getTime()).to.equal(c.dateOfBirth.getTime());
    });

});
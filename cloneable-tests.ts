import {expect} from "chai";
import "mocha";
import {Cloneable, CloneableArgs} from "./index";

class SubTest {
    public readonly someArg: string;
    private readonly privateArg: string;

    constructor(someArg: string, privateArg: string) {
        this.someArg = someArg;
        this.privateArg = privateArg;
    }

    public getPrivate() {
        return this.privateArg;
    }

}

interface TestArgs {
    readonly name: string;
    readonly dateOfBirth: Date;
    readonly subs: SubTest[];
    readonly mp: Map<number, number>;
}

class Test extends Cloneable<TestArgs> implements CloneableArgs<TestArgs> {
    public readonly name: string;
    public readonly dateOfBirth: Date;
    public readonly subs: SubTest[];
    public readonly mp: Map<number, number>;

    constructor(args: TestArgs) {
        super(args);
    }

}

const firstName = "Tim";
const secondName = "Bob";
const someTest = "someTest";
const otherTest = "otherTest";
const firstMp = new Map([[23, 45]]);
const secondMp = new Map([[32, 54]]);
const firstStrDate = "1988-1-1";

const t = new Test({
    name: firstName, dateOfBirth: new Date(firstStrDate),
    subs: [
        new SubTest("someTest", "otherTest"),
    ],
    mp: firstMp,
});
const c = t.clone({name: secondName, mp: secondMp});
const d = t.clone();

const obj: TestArgs = {
    name: firstName, dateOfBirth: new Date(firstStrDate),
    subs: [
        new SubTest("someTest", "otherTest"),
    ],
    mp: firstMp,
};
const clonedObj = Cloneable.clone(obj, {name: secondName, mp: secondMp})

describe("Object is correctly initialized", () => {

    it("properties should be set according to args", () => {
        expect(t.name).to.equal(firstName);
        expect(t.subs[0].getPrivate()).to.equal(otherTest);
        expect(t.mp.get(23)).to.equal(45);
    });

});

describe("Object is correctly cloned", () => {

    it("Object should be correctly cloned", () => {
        expect(t.name).to.not.equal(c.name);
        expect(t.name).to.equal(d.name);
        expect(c.subs[0].getPrivate()).to.equal(otherTest);
        expect(t.constructor).to.equal(c.constructor);
        expect(c instanceof Test).to.equal(true);
        expect(t.dateOfBirth.getTime()).to.equal(c.dateOfBirth.getTime());
        expect(c.mp.get(32)).to.equal(54);
        expect(d.mp.get(23)).to.equal(45);
    });

});

describe("Test Cloneable.clone helper method", () => {

    it("Object should be correctly cloned", () => {
        expect(obj.name).to.equal(firstName);
        expect(clonedObj.name).to.equal(secondName);
        expect(obj.dateOfBirth.getTime()).to.equal(clonedObj.dateOfBirth.getTime());
        expect(obj.dateOfBirth).to.not.equal(clonedObj.dateOfBirth);
        expect(obj.subs).to.not.equal(clonedObj.subs);
        expect(obj.mp.get(23)).to.equal(45);
        expect(clonedObj.mp.get(32)).to.equal(54);
    });

});

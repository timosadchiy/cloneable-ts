export abstract class Cloneable<T> {

    constructor(args: T) {
        applyArgs(<any>this, <any>args);
    }

    clone(args: CloneableOptionalArgs<T>) {
        return cloneToArgs(this, args);
    }

}

export type CloneableArgs<T> = { [P in keyof T]: T[P]; };

type CloneableOptionalArgs<T> = { [P in keyof T]?: T[P]; };

function deepClone(oldObj: any) {
    let newObj: any;

    // Handle the 3 simple types, and null or undefined
    if (null == oldObj || "object" != typeof oldObj) return oldObj;

    // Handle Date
    if (oldObj instanceof Date) {
        newObj = new Date();
        newObj.setTime(oldObj.getTime());
        return newObj;
    }

    // Handle Array
    if (oldObj instanceof Array) {
        newObj = [];
        for (let i = 0, len = oldObj.length; i < len; i++) {
            newObj[i] = deepClone(oldObj[i]);
        }
        return newObj;
    }

    // Handle Object
    if (oldObj instanceof Object) {
        newObj = Object.create(oldObj);
        for (const attr in oldObj) {
            if (oldObj.hasOwnProperty(attr)) newObj[attr] = deepClone(oldObj[attr]);
        }
        return newObj;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function cloneToArgs<T>(originalObj: T, cloneArgs: { [key: string]: any }): T {
    const constructedObj = Object.create(<Object>originalObj);
    for (const i in originalObj) {
        if (originalObj.hasOwnProperty(i)) {
            if (cloneArgs[i] != null) {
                constructedObj[i] = deepClone(cloneArgs[i]);
            } else {
                constructedObj[i] = deepClone(originalObj[i]);
            }
        }
    }
    return constructedObj;
}

function applyArgs(obj: { [key: string]: string }, args: { [key: string]: string }) {
    for (const key in args) {
        if (args.hasOwnProperty(key)) {
            obj[key] = args[key];
        }
    }
}

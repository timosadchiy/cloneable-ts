export abstract class Cloneable<T> {

    public static clone = cloneProperties;

    constructor(args: T) {
        applyArgs(this as any, args as any);
    }

    public clone(args?: CloneableOptionalArgs<T>) {
        return cloneProperties(this as any, args || {});
    }

}

export type CloneableArgs<T> = { [P in keyof T]: T[P]; };

type CloneableOptionalArgs<T> = { [P in keyof T]?: T[P]; };

function applyArgs(obj: { [key: string]: string }, args: { [key: string]: string }) {
    for (const key in args) {
        if (args.hasOwnProperty(key)) {
            obj[key] = args[key];
        }
    }
}

function deepClone(oldObj: any) {
    let newObj: any;

    // Handle the 3 simple types, and null or undefined
    if (null == oldObj || "object" !== typeof oldObj) {
        return oldObj;
    }

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

    // Handle Map
    if (oldObj instanceof Map) {
        newObj = new Map(oldObj);
        return newObj;
    }

    // Handle Object
    if (oldObj instanceof Object) {
        newObj = Object.create(oldObj);
        for (const attr in oldObj) {
            if (oldObj.hasOwnProperty(attr)) {
                newObj[attr] = deepClone(oldObj[attr]);
            }
        }
        return newObj;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function cloneProperties<T>(originalObj: T, cloneArgs?: CloneableOptionalArgs<T>): T {
    const args = cloneArgs || {};
    const constructedObj = Object.create(originalObj as any);
    for (const i in originalObj) {
        if (originalObj.hasOwnProperty(i)) {
            if (args[i] != null) {
                constructedObj[i] = deepClone(args[i]);
            } else {
                constructedObj[i] = deepClone(originalObj[i]);
            }
        }
    }
    return constructedObj;
}

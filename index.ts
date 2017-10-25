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
    let newObj: any = oldObj;
    if (oldObj && typeof oldObj === 'object') {
        newObj = Object.create(oldObj);
        for (const i in oldObj) {
            if (oldObj.hasOwnProperty(i)) {
                newObj[i] = deepClone(oldObj[i]);
            }
        }
    }
    return newObj;
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
    Object.keys(args).forEach((key, index) => {
        obj[key] = args[key];
    });
}

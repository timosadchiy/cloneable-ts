export declare abstract class Cloneable<T> {

    public static clone<T>(originalObj: T, cloneArgs?: CloneableOptionalArgs<T>): T;

    constructor(args: T)

    clone(args?: CloneableOptionalArgs<T>): this
}

export declare type CloneableArgs<T> = { [P in keyof T]: T[P]; };

type CloneableOptionalArgs<T> = { [P in keyof T]?: T[P]; };
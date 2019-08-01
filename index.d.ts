export declare abstract class Cloneable<T> {

    /**
     * @deprecated Since version 1.0.17. Use clone instead.
     */
    public static clone<T>(originalObj: T, cloneArgs?: CloneableOptionalArgs<T>): T;

    constructor(args: T)

    clone(args?: CloneableOptionalArgs<T>): this
}

export declare type CloneableArgs<T> = { [P in keyof T]: T[P]; };

export declare function clone<T>(originalObj: T, cloneArgs?: CloneableOptionalArgs<T>): T;

type CloneableOptionalArgs<T> = { [P in keyof T]?: T[P]; };

export declare abstract class Cloneable<T> {
    constructor(args: T)

    clone(args?: CloneableOptionalArgs<T>): Cloneable<T>
}

export declare type CloneableOptionalArgs<T> = { [P in keyof T]?: T[P]; };
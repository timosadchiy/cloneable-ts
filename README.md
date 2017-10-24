#About
Scala language case class copy method inspired abstract class adding similar method for Typescript classes

# How to use
    import {Cloneable} from 'cloneable-ts';
    
    interface PersonArgs {
        readonly name: string;
        readonly age: number;
    }
    
    class Person extends Cloneable<TestArgs> {
        readonly name: string;
        readonly age: number;
        
        constructor(args: TestArgs) {
            super(args);
        }
    }
    
    const a = new Person({name: 'Alice', age: 28});
    const b = a.clone({name: 'Bob'})
    b.name // Bob
    b.age // 28
    
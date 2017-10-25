#About
Abstract class inspired by the case class copy method in Scala language adding similar method for Typescript classes

# How to use
    import {Cloneable, CloneableArgs} from 'cloneable-ts';
    
    // Interface that will be used as named arguments to initialize and clone an object
    interface PersonArgs {
        readonly name: string;
        readonly age: number;
    }
    
    // Cloneable abstract class initializes the object with super method and adds the clone method
    // CloneableArgs interface ensures that all properties defined in the argument interface are defined in class
    class Person extends Cloneable<TestArgs>  implements CloneableArgs<PersonArgs> {
        readonly name: string;
        readonly age: number;
        
        constructor(args: TestArgs) {
            super(args);
        }
    }
    
    const a = new Person({name: 'Alice', age: 28});
    const b = a.clone({name: 'Bob'})
    a.name // Alice
    b.name // Bob
    b.age // 28
    
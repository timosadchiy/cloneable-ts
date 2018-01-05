# About
Abstract class that provides a deep clone method for classes in Typescript. Inspired by the copy method of a case class in Scala language. 

# How to use

## Install

    npm install cloneable-ts --save
    
## Clone object
    // Interface that will be used as named arguments to initialize and clone an object
    interface Person {
        readonly name: string;
        readonly age: number;
        readonly tags: string[];
    }
    
    const a: Person = {name: 'Alice', age: 28, tags: ['tag1']};
    const b = Cloneable.clone(a, {name: 'Bob'});
    
    a.name // Alice
    b.name // Bob
    b.age // 28
    a.tags === b.tags //false
    
## Clone instance of a class

    import {Cloneable, CloneableArgs} from 'cloneable-ts';
    
    // Interface that will be used as named arguments to initialize and clone an object
    interface PersonArgs {
        readonly name: string;
        readonly age: number;
    }
    
    // CloneableArgs interface ensures that all properties defined in the argument interface are defined in the class
    class Person extends Cloneable<TestArgs>  implements CloneableArgs<PersonArgs> {
        readonly name: string;
        readonly age: number;
        
        constructor(args: TestArgs) {
            // Cloneable abstract class initializes the object with super method and adds the clone method
            super(args);
        }
    }
    
    const a = new Person({name: 'Alice', age: 28});
    const b = a.clone({name: 'Bob'})
    a.name // Alice
    b.name // Bob
    b.age // 28
    

class Person{
    constructor(name){
        this.name=name;
    }
    hello(){
        return "Hello, I am " + this.name + ".";
    }
    static generiHello(){
        return "Hello";
    }
}
const flavio= new Person("Flavio");
// flavio.name="Flavio";
// console.log("name of person:",flavio.name);
console.log(flavio.hello());
console.log(Person.generiHello());


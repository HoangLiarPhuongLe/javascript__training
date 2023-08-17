class Person{
    hello(){
        return "Hello, I am a Person";
    }
}

class Programmer extends Person{
    hello(){
        return super.hello()+". I am also a programmer.";
    }

}

const flavio= new Programmer()
console.log(flavio.hello());
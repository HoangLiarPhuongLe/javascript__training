function Car(brand, model){
    this.brand=brand;
    this.model=model;
}

const myCar= new Car("Ford", "Fiesta")
console.log("Brand cua xe nay la:",myCar.brand);

//let
let age=36;
let myAge=37;
myAge=age;
console.log("tuoi cua toi la:",myAge);

//const
const car={
    color: "blue"
};
const anotherCar={
    color: "yellow"
};

car.color=anotherCar.color
console.log(anotherCar.color);

//use square brackets for retrive the value of property
console.log("use square brackets:",car["color"]);

//nested objects as properties
const car2={
    brand: {
      name: 'Ford'
    },
    color: 'blue'
}
console.log("ten nhan hieu cua chiec xe nay:",car2.brand.name);

//Methods
const car3 = {
    brand: 'Ford',
    model: 'Fiesta',
    start: () => {
      console.log(`Started ${car3.brand} ${car3.model}`);
  }
}
car3.start();

const car4={
    brand: "Ford",
    model: "Fiesta",
    goTo: function(destination){
        console.log(`Going to ${destination}`)
    }
}
car4.goTo("Rome");

// Base class Vehicle
class Vehicle {
    constructor(model) {
        this.model = model;
    }
    startEngine() {
        console.log(`${this.model} engine starts.`);
    }
}
// Derived class Car that extends Vehicle
class Car extends Vehicle {
    constructor(model) {
        super(model);
        console.log("Car constructor called");
    }
    startEngine() {
        console.log(`${this.model} vroom vroom!`);
    }
}
// Creating instances of Vehicle and Car
console.log("***************************");
const vehicle = new Vehicle("Vehicle");
vehicle.startEngine(); // Output: Vehicle engine starts.
const car = new Car("Scorpio N");
car.startEngine(); // Output: Scorpio N  vroom vroom!

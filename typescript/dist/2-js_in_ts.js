console.log("Hello Folks");
console.log("Happy Diwali");
// Vehicle class
class Vehicle3 {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    displayInfo() {
        console.log(`Vehicle Info: ${this.year} ${this.make} ${this.model}`);
    }
}
// Create a vehicle instance and display info
const myVehicle = new Vehicle3("Scorpio N", "Z6", 2023);
myVehicle.displayInfo();
console.log("***************************");
// npm install -g ts-node
// ts-node index.ts
// ts-node runs TypeScript directly; tsc compiles it to JavaScript.

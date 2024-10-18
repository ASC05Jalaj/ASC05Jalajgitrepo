console.log("Hello Folks");
console.log("Happy Diwali");

// Vehicle class
class Vehicle1 {
    constructor(public make: string, public model: string, public year: number) {}

    displayInfo() {
        console.log(`Vehicle Info: ${this.year} ${this.make} ${this.model}`);
    }
}

// Create a vehicle instance and display info
const myVehicle = new Vehicle1("Scorpio N", "Z6", 2023);
myVehicle.displayInfo();

console.log("***************************");

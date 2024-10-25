// Base class Vehicle
class Vehicle1 {
    constructor(type) {
        console.log("Vehicle constructor called and type is initialized");
        this.vehicleType = type;
    }
    displayDetails() {
        console.log("Vehicle type is: " + this.vehicleType);
    }
}
// Derived class SUV that extends Vehicle
class Vehicle_type extends Vehicle1 {
    constructor(type, features) {
        super(type); // Call the base class constructor
        this.type = type;
        this.features = features;
        console.log("Vehicle_type constructor completed");
    }
    displayDetails() {
        console.log("Scorpio N type is: " + this.vehicleType + " with features like " + this.features);
    }
}
// Instantiate the Vehicle
// const vehicle = new Vehicle("Generic Vehicle");
// vehicle.displayDetails();
const vehicle1 = new Vehicle_type("Sports Utility Vehicle", "2200 cc, 7 seater, sunroof, live tracking, JBL sound system");
vehicle1.displayDetails(); // Output: Vehicle_type is: Sports Utility Vehicle with features like 2200cc, 7 seater,...

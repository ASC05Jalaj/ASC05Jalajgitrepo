class Vehicle4 {
    // Constructor
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    // Method to display vehicle information
    displayInfo() {
        return `Vehicle: ${this.year} ${this.make} ${this.model}`;
    }
    // Method to calculate vehicle age
    calculateAge(currentYear) {
        return currentYear - this.year;
    }
}
// Creating an instance of Vehicle
const myCar = new Vehicle4("Scorpio N", "Z6", 2023);
// Displaying vehicle information
console.log(myCar.displayInfo()); // Output: Vehicle: 2023 Scorpio N Z6
// Calculating and displaying vehicle age
const currentYear = new Date().getFullYear();
console.log(`Vehicle Age: ${myCar.calculateAge(currentYear)} years`); // Output: Vehicle Age: 1 year (if current year is 2024)

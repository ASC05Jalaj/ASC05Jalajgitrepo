// Vehicle types
let make: string = "Scorpio N"; // string
let model: string = "Z6"; // string
let year: number = 2023; // number
let isElectric: boolean = false; // boolean
let mileage: any = 15; // any
let color: any = "White"; // any
let features: string[] = ["Air Conditioning", "Sunroof", "Live Tracking"]; // string array
let serviceHistory: { date: string; service: string }[] = [ // object array
    { date: "2024-01-15", service: "Oil Change" },
    { date: "2024-06-20", service: "Diesel Exhaust Fluid Refill" }
]; 
let owner_years_owned: [string, number] = ["Jalaj", 1]; // tuple (owner name, years owned)
let vehicleDetails: object = { // object
    registration: "XYZ1234",
    lastServiceDate: "2024-06-20",
};

// Print types of all variables
console.log(`make: ${typeof make}`);
console.log(`model: ${typeof model}`);
console.log(`year: ${typeof year}`);
console.log(`isElectric: ${typeof isElectric}`);
console.log(`mileage: ${typeof mileage}`);
console.log(`color: ${typeof color}`);
console.log(`features: ${typeof features}`);
console.log(`serviceHistory: ${typeof serviceHistory}`);
console.log(`owner: ${typeof owner_years_owned}`);
console.log(`vehicleDetails: ${typeof vehicleDetails}`);

// Print values of all variables
console.log(`make: ${make}`);
console.log(`model: ${model}`);
console.log(`year: ${year}`);
console.log(`isElectric: ${isElectric}`);
console.log(`mileage: ${mileage}`);
console.log(`color: ${color}`);
console.log(`features: ${features}`);
console.log(`serviceHistory: ${JSON.stringify(serviceHistory)}`); // converting array to string for readability
console.log(`owner: ${owner_years_owned}`);
console.log(`vehicleDetails: ${JSON.stringify(vehicleDetails)}`); // converting object to string for readability

//  Generics
// Generics enable us to develop reusable components that can operate with any data type.
function identity1<T>(arg: T): T {
    return arg;
}
const model_no = identity1<number>(6);
const vehicle_name = identity1<string>("Scorpio N");

console.log("vehicle name is :" + vehicle_name); // Output: Scorpio N
console.log("model no is :" + model_no); // Output: 6
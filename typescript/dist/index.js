console.log("hiieee");
let no1 = 69;
console.log(no1);
let no2 = 69;
console.log(no2);
let s = no2 + no1;
console.log("sum is : " + s);
function add(a, b) {
    return a + b;
}
const result = add(5, 5);
console.log("the result of addition is : " + result);
const userwa = {
    name: "Jalaj",
    age: 22,
    email: "jalajjha@example.com"
};
console.log(userwa);
// classes and inheritance
class Animal {
    constructor(name) {
        this.name = name;
    }
    makesound() {
        console.log(`${this.name} makes a sound`);
    }
}
class Dog extends Animal {
    makesound() {
        console.log(`${this.name} barks.`);
    }
}
const animal = new Animal("Cat");
animal.makesound();
const dog = new Dog("Buddy");
dog.makesound();
// generics
function identity(arg) {
    return arg;
}
const num = identity(42);
const str = identity("Hiee");
console.log(num);
console.log(str);
// enum
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
const move = Direction.Up;
console.log(move);
console.log(Direction[move]);
console.log(Direction[1]);
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 1] = "Up";
    Direction1[Direction1["Down"] = 2] = "Down";
    Direction1[Direction1["Left"] = 50] = "Left";
    Direction1[Direction1["Right"] = 51] = "Right";
})(Direction1 || (Direction1 = {}));
console.log(Direction1.Up);
console.log(Direction1.Down);
console.log(Direction1.Left);
console.log(Direction1.Right);
//modules

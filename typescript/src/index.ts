console.log("hiieee");
let no1: number = 69;
console.log(no1);
let no2: number = 69;
console.log(no2);
let s: number = no2 + no1;
console.log("sum is : " + s);
function add(a: number, b: number): number {
    return a + b;
}
const result = add(5, 5);
console.log("the result of addition is : " + result);

interface User {
    name: string;
    age: number;
    email: string;
}

const userwa: User = {
    name: "Jalaj",
    age: 22,
    email: "jalajjha@example.com"
}
console.log(userwa);

// classes and inheritance
class Animal {
    constructor(public name: string) { }
    makesound(): void {
        console.log(`${this.name} makes a sound`);
    }
}
class Dog extends Animal {
    makesound(): void {
        console.log(`${this.name} barks.`)
    }
}
const animal = new Animal("Cat");
animal.makesound();
const dog = new Dog("Buddy");
dog.makesound();

// generics
function identity<T>(arg: T): T {
    return arg;
}
const num = identity<number>(42);
const str = identity<string>("Hiee");

console.log(num);
console.log(str);

// enum
enum Direction {
    Up,
    Down,
    Left,
    Right
}
const move = Direction.Up;
console.log(move);

console.log(Direction[move]);
console.log(Direction[1]);

enum Direction1 {
    Up = 1,
    Down,
    Left = 50,
    Right,
}
console.log(Direction1.Up);
console.log(Direction1.Down);
console.log(Direction1.Left);
console.log(Direction1.Right);

//modules
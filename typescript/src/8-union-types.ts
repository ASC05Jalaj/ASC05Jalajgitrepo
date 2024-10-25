// Define interfaces for different shapes
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Triangle {
    kind: "triangle";
    base: number;
    height: number;
}

// Union type for shapes
type Shape = Circle | Square | Rectangle | Triangle;

// Function to calculate the perimeter of the shape
function getPerimeter(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return 2 * Math.PI * shape.radius;
        case "square":
            return 4 * shape.sideLength;
        case "rectangle":
            return 2 * (shape.width + shape.height);
        case "triangle":
            return shape.base + shape.height + Math.sqrt(shape.base ** 2 + shape.height ** 2);
    }
}

// Example usage
const shapes: Shape[] = [
    { kind: "circle", radius: 7 },
    { kind: "square", sideLength: 4 },
    { kind: "rectangle", width: 3, height: 6 },
    { kind: "triangle", base: 3, height: 4 },
];

shapes.forEach(shape => console.log(getPerimeter(shape)));

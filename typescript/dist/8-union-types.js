// Function to calculate the perimeter of the shape
function getPerimeter(shape) {
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
const shapes = [
    { kind: "circle", radius: 7 },
    { kind: "square", sideLength: 4 },
    { kind: "rectangle", width: 3, height: 6 },
    { kind: "triangle", base: 3, height: 4 },
];
shapes.forEach(shape => console.log(getPerimeter(shape)));

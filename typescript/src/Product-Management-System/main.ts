import * as fs from 'fs';
import * as readline from 'readline';
import { ProductManager } from "./productManager";
import { Product } from "./products";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const car = new ProductManager();

// Load products from JSON file
function loadProducts() {
    if (fs.existsSync('products.json')) {
        const rawData = fs.readFileSync('products.json', 'utf-8');
        const products: Product[] = JSON.parse(rawData);
        products.forEach(product => car.addProduct(product));
    }
}

// Save products to JSON file
function saveProducts() {
    const data = JSON.stringify(car.listProducts(), null, 2);
    fs.writeFileSync('products.json', data);
}

// Display the menu
function displayMenu() {
    console.log("\nSelect an option:");
    console.log("1: Create Product");
    console.log("2: Read Products");
    console.log("3: Update Product");
    console.log("4: Delete Product");
    console.log("5: Exit");
}

// Handle user input
function handleInput(option: string) {
    switch (option) {
        case '1':
            rl.question("Enter product details (id, name, category, price, rating, reviewscount, brand, availability, color, storage, releaseDate) separated by commas: ", (input) => {
                const details = input.split(',').map(item => item.trim());
                const newProduct: Product = {
                    id: parseInt(details[0]),
                    name: details[1],
                    category: details[2],
                    price: parseFloat(details[3]),
                    rating: parseFloat(details[4]),
                    reviewscount: parseInt(details[5]),
                    brand: details[6],
                    availability: details[7],
                    color: details[8],
                    storage: details[9],
                    releaseDate: details[10]
                };
                car.addProduct(newProduct);
                saveProducts();
                console.log("Product created successfully!");
                mainMenu();
            });
            break;
        case '2':
            console.log("All Products:", car.listProducts());
            mainMenu();
            break;
        case '3':
            rl.question("Enter product ID to update: ", (idStr) => {
                const id = parseInt(idStr);
                rl.question("Enter fields to update (e.g., price=99.99, rating=4.5): ", (updates) => {
                    const updateFields = updates.split(',').reduce((acc, field) => {
                        const [key, value] = field.split('=').map(item => item.trim());
                        const typedKey = key as keyof Product; // Use keyof Product

                        if (typedKey === "price" || typedKey === "rating" || typedKey === "reviewscount") {
                            acc[typedKey] = Number(value); // Ensure numeric fields are numbers
                        } else {
                            acc[typedKey] = value; // Treat other fields as strings
                        }

                        return acc;
                    }, {} as Partial<Product>);

                    car.updateProduct(id, updateFields);
                    saveProducts();
                    console.log("Product updated successfully!");
                    mainMenu();
                });
            });
            break;
        case '4':
            rl.question("Enter product ID to delete: ", (idStr) => {
                const id = parseInt(idStr);
                car.removeProduct(id);
                saveProducts();
                console.log("Product deleted successfully!");
                mainMenu();
            });
            break;
        case '5':
            rl.close();
            break;
        default:
            console.log("Invalid option. Please try again.");
            mainMenu();
    }
}

// Main menu function
function mainMenu() {
    displayMenu();
    rl.question("Select an option: ", handleInput);
}

// Load products and start the menu
loadProducts();
mainMenu();

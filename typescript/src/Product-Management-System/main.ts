console.log("Welcome to Product Management system App");

import { ProductManager } from "./productManager";
import { Product } from "./products";

const car = new ProductManager();

const products: Product[] = [
    {
        id: 1,
        name: "Scorpio N",
        category: "SUV",
        price: 2199999,
        rating: 4.7,
        reviewscount: 2500,
        brand: "Mahindra",
        availability: "Waiting",
        color: " Sierra Black",
        storage: "200L",
        releaseDate: "2021-03-15"
    },
    {
        id: 2,
        name: "JCB 3DX",
        category: "Earth Mover",
        price: 4000000,
        rating: 4.9,
        reviewscount: 1500,
        brand: "JCB",
        availability: "In Stock",
        color: "Yellow",
        storage: "1000L",
        releaseDate: "1999-11-10"
    },
    {
        id: 3,
        name: "Bullet",
        category: "Bike",
        price: 2500000,
        rating: 4.1,
        reviewscount: 3000,
        brand: "Royal Enfield",
        availability: "In Stock",
        releaseDate: "2016-07-22"
    },
    {
        id: 4,
        name: "Swaraj 745",
        category: "Tractor",
        price: 699999,
        rating: 3.8,
        reviewscount: 12000,
        brand: "Mahindra",
        availability: "In Stock",
        color: "Blue",
        releaseDate: "2001-05-05"
    },
    {
        id: 5,
        name: "Duster",
        category: "Compact SUV",
        price: 1300000,
        rating: 4.9,
        reviewscount: 800,
        brand: "Renault",
        availability: "Discontinued",
        color: "Brown",
        releaseDate: "2015-01-15"
    }
];

products.forEach(product => car.addProduct(product));

console.log("All Products:", car.listProducts());

car.removeProduct(1);
car.removeProduct(3);

console.log("Products after removal:", car.listProducts());

let np6: Product = {
    id: 6,
    name: "Gaming Mouse",
    category: "Accessories",
    price: 79.99,
    rating: 4.6,
    reviewscount: 200,
    brand: "Brand F",
    availability: "In Stock",
    color: "Black",
    releaseDate: "2023-08-01"
};

car.addProduct(np6);

console.log("All Products after adding id : 6:", car.listProducts());

car.updateProduct(6, { price : 89.99});

console.log("All Products after updating price of id 6 is :", car.listProducts());
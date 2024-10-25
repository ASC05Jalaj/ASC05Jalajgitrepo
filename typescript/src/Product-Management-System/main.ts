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
        reviewcounts: 2500,
        brand: "Mahindra",
        availability: "Waiting",
        color: " Sierra Black",
        storage: "200L",
        releasedate: "2021-03-15"
    },
    {
        id: 2,
        name: "JCB 3DX",
        category: "Earth Mover",
        price: 4000000,
        rating: 4.9,
        reviewcounts: 1500,
        brand: "JCB",
        availability: "In Stock",
        color: "Yellow",
        storage: "1000L",
        releasedate: "1999-11-10"
    },
    {
        id: 3,
        name: "Bullet",
        category: "Bike",
        price: 2500000,
        rating: 4.1,
        reviewcounts: 3000,
        brand: "Royal Enfield",
        availability: "In Stock",
        releasedate: "2016-07-22"
    },
    {
        id: 4,
        name: "Swaraj 745",
        category: "Tractor",
        price: 699999,
        rating: 3.8,
        reviewcounts: 12000,
        brand: "Mahindra",
        availability: "In Stock",
        color: "Blue",
        releasedate: "2001-05-05"
    },
    {
        id: 5,
        name: "Duster",
        category: "Compact SUV",
        price: 1300000,
        rating: 4.9,
        reviewcounts: 800,
        brand: "Renault",
        availability: "Discontinued",
        color: "Brown",
        releasedate: "2015-01-15"
    }
];

products.forEach(product => car.addProduct(product));

console.log("All Products:", car.listProducts());

car.removeProduct(1);
car.removeProduct(3);

console.log("Products after removal:", car.listProducts());

let np6: Product = {
    id: 6,
    name: "Speed 400",
    category: "Cruiser Bike",
    price: 2840000,
    rating: 4.9,
    reviewcounts: 120,
    brand: "Triumph",
    availability: "In Stock",
    color: "Black",
    releasedate: "2021-08-01"
};

car.addProduct(np6);

console.log("All Products after adding id : 6:", car.listProducts());

car.updateProduct(6, { price : 290000});

console.log("All Products after updating price of id 6 is :", car.listProducts());
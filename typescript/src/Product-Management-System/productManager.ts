import {Product} from './products';
export class ProductManager {
    private products : Product[] = [];

    addProduct(product : Product):void {
        this.products.push(product);
    }
    listProducts():Product[] {
        return this.products;
    };

    removeProduct(id:number):void {
        this.products = this.products.filter(product => product.id !== id);
    }

    //Try it : Implementing search methods.

}
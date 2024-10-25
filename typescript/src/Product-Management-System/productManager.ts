import { Product } from "./products";
export class ProductManager{
    private products: Product[] = [];

    addProduct(product : Product):void {
        this.products.push(product);
    }

    listProducts():Product[]{
        return this.products;
    };

    removeProduct(id:number):void{
        this.products = this.products.filter(product => product.id !==id);
    }
    updateProduct(id: number, updates: Partial<Product>): void {
        const prodIndex = this.products.findIndex(products => products.id === id);
        this.products[prodIndex] = { ...this.products[prodIndex], ...updates };
      }
}
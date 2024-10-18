export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviewcounts: number;
    brand: string;
    availability: string;
    //? makes the property optional
    color?: string;
    storage?: string;
    releasedate: string;
}
export interface Product{
    id:number;
    name: any;
    category: any;
    price: number;
    rating: number;
    reviewscount: number;
    brand: string;
    availability: string;
    //? makes the property optional
    color?: string;
    storage?: string;
    releaseDate: string;
}
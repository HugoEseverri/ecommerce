import { StaticImageData } from "next/image";

export interface ProductsCategory{
    id: number;
    name: string;
}

export interface IProducts{
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string | StaticImageData;
    categoryId: number;
    category: ProductsCategory;
}
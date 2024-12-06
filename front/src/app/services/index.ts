import { IProducts } from "@/interfaces/products.interface";


const apiURL = process.env.NEXT_PUBLIC_API_URL;


export async function getProducts () {
    try {
        const res = await fetch(`${apiURL}/products`,{
            method:"GET",
            cache: "no-cache"
        });
        const products: IProducts[] = await res.json();
        return products;
    } catch (error) {
        throw new Error(error as string);
    }
}



export async function getProductById(productID: string): Promise<IProducts | null> {
    try {
        const response = await fetch(`${apiURL}/product/${productID}`);
        if (!response.ok) {
            throw new Error("Error al obtener el producto");
        }
        return response.json();
    } catch (error) {
        console.error("Error al cargar el producto:", error);
        return null;
    }
}

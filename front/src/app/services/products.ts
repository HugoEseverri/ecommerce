import { IProducts } from "@/interfaces/products.interface";


const apiURL = process.env.NEXT_PUBLIC_API_URL;


export async function getProducts(): Promise<IProducts[]> {
    try {
        const res = await fetch(`${apiURL}/products`, {
            method: "GET",
            cache: "no-cache",
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(`Error en la solicitud: ${res.status} - ${errorMessage}`);
        }

        const products: IProducts[] = await res.json();
        return products;
    } catch (error) {
        console.error("Error en getProducts:", error);
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
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









// src/app/services.ts
// src/app/services.ts


import { IProducts } from "@/interfaces/products.interface";


const apiURL = process.env.NEXT_PUBLIC_API_URL;


export async function getProducts() {
    try {
        const res = await fetch(`${apiURL}/products`, {
            method: "GET",
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


export async function userLogin(email: string, password: string): Promise<any> {

    try {
        const response = await fetch(`${apiURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el inicio de sesión");
        }

        const data = await response.json();

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}


export const registerUser = async (
    email: string,
    password: string,
    name: string,
    address: string,
    phone: string
): Promise<void> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                name,
                address,
                phone,
            }),
        });

        if (!response.ok) {
            throw new Error("Error al registrar el usuario.");
        }

        const data = await response.json();

        localStorage.setItem("authToken", data.token); // Si el backend no devuelve un token aquí, puedes omitirlo.
        localStorage.setItem("userData", JSON.stringify(data));

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
};

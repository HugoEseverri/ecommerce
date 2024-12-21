import { IProducts } from "@/interfaces/products.interface";
import { useCart } from "../context/cartContext";
import { CartProduct } from "../context/cartContext";

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

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el inicio de sesión");
        }

        // Si la respuesta es exitosa, obtener los datos del usuario y el token
        const data = await response.json();

        // Guardar el token de autenticación en el localStorage
        localStorage.setItem("authToken", data.token);

        // Guardar los datos del usuario (opcional, si quieres guardar más datos del usuario)
        localStorage.setItem("userData", JSON.stringify(data.user));

        // Guardar el userId en el localStorage
        localStorage.setItem("userId", data.userId);

        // Retornar los datos de la respuesta (si es necesario)
        return data;
    } catch (error) {
        // Si ocurre un error, lanzar una excepción con un mensaje adecuado
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


// src/app/services.ts
// src/app/services.ts
export const fetchOrders = async (token: string) => {
    // Verificar si el token está presente y no es vacío
    if (!token) {
        console.error("Token no encontrado");
        throw new Error("Token no encontrado");  // Lanza un error si el token no está presente
    }

    try {
        // Verificamos si el token es válido, si hay algún método para validarlo en el frontend
        // Ejemplo: Si tienes la fecha de expiración del token, puedes validarlo aquí

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/orders`, {
            method: "GET",
            headers: {
                Authorization: token,  // Se asegura de que el token se envíe correctamente
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            // Si la respuesta no es OK, capturamos el código de estado y el mensaje
            const errorMessage = await response.text();  // Captura el mensaje de error de la respuesta
            console.error(`Error al obtener las órdenes - Código: ${response.status}: ${errorMessage}`);
            
            // Puedes manejar diferentes códigos de error de manera más detallada:
            if (response.status === 401) {
                throw new Error("Token no válido o ha expirado. Inicia sesión nuevamente.");
            } else if (response.status === 400) {
                throw new Error("Solicitud incorrecta. Verifica los datos enviados.");
            } else if (response.status === 500) {
                throw new Error("Error en el servidor. Intenta nuevamente más tarde.");
            } else {
                throw new Error(`Error desconocido: ${errorMessage}`);
            }
        }

        // Si la respuesta es válida, procesamos los datos
        const data = await response.json(); 
        return data;

    } catch (error) {
        console.error("Error al obtener las órdenes:", error);  // Captura cualquier error
        throw error;  // Reenvía el error para manejarlo en el componente
    }
};


// service.ts

// export const finishBuy = async (cart: Array<CartProduct>) => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//         alert("No estás autenticado. Por favor, inicia sesión.");
//         return;
//     }

//     const purchaseDetails = {
//         products: number[],
//         userId: Number,
//         token: string, // Incluye el token en el cuerpo de la solicitud
//     };

//     try {
//         const response = await fetch(`${apiURL}/orders`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: token,
//             },
//             body: JSON.stringify(purchaseDetails),
//         });

//         if (!response.ok) {
//             throw new Error("Error al procesar la compra.");
//         }

//         const data = await response.json();
//         console.log("Compra registrada correctamente:", data);

//         // Mostrar mensaje de éxito y limpiar el carrito
//         alert("Compra realizada con éxito");

//         // Llamar a la función `clearCart` desde tu CartContext
//         const { clearCart } = useCart();
//         clearCart();  // Esto limpiará el carrito desde tu contexto

//     } catch (error) {
//         console.error("Error al realizar la compra:", error);
//         alert("Hubo un problema al procesar tu compra. Intenta nuevamente.");
//     }
// };

export async function createOrderService(
    products: number[],
    userID: number,
    token: string
) {
    try {
        const res = await fetch(`${apiURL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ products, userID }),
        });

        if (res.ok) {
            return res.json();
        } else {
            console.error("Error en la respuesta del servidor:", await res.text());
            return null;
        }
    } catch (error) {
        console.error("Error al crear la orden:", error);
        throw new Error(error as string);
    }
}

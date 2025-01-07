const apiURL = process.env.NEXT_PUBLIC_API_URL;


export const fetchOrders = async (token: string) => {
    // Verificar si el token está presente y no es vacío
    if (!token) {
        console.error("Token no encontrado");
        throw new Error("Token no encontrado");  // Lanza un error si el token no está presente
    }

    try {

        const response = await fetch(`${apiURL}/users/orders`, {
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

        const data = await response.json(); 
        return data;

    } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        throw error;
    }
};


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
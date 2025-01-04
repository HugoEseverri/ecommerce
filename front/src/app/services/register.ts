const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (
    email: string,
    password: string,
    name: string,
    address: string,
    phone: string
): Promise<void> => {
    try {
        const response = await fetch(`${apiURL}/users/register`, {
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

        // Eliminar estas líneas para evitar guardar el token automáticamente
        // localStorage.setItem("authToken", data.token);
        // localStorage.setItem("userData", JSON.stringify(data));

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
};

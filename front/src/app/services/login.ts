const apiURL = process.env.NEXT_PUBLIC_API_URL;


interface User {
    id: string;
    email: string;
    name: string;
    
}

interface LoginResponse {
    token: string;
    user: User;
    userId: string;
}


export async function userLogin(email: string, password: string): Promise<LoginResponse> {
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

        const data: LoginResponse = await response.json();

        // Guardar el token de autenticación en el localStorage
        localStorage.setItem("authToken", data.token);

        // Guardar los datos del usuario
        localStorage.setItem("userData", JSON.stringify(data.user));

        // Guardar el userId en el localStorage
        localStorage.setItem("userId", data.userId);

        // Retornar los datos de la respuesta
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}

"use client";

import React, { useState, useEffect } from "react";
import { validateField, validateLogin } from "@/app/utils/validations";
import { userLogin } from "@/app/services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/AuthContext"; // Asegúrate de importar el hook

function Login() {
    const { setIsAuthenticated, setUserName } = useAuth(); // Desestructura setIsAuthenticated y setUserName desde el contexto

    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    // Verificación del token al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            // Si el token ya existe, redirigimos al dashboard
            router.push("/dashboard");
        }
    }, [router]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setLoginError("");

        const formErrors = validateLogin(userData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }

        try {
            const data = await userLogin(userData.username, userData.password);
            console.log("Usuario autenticado con éxito:", data);

            if (data && data.token) {
                // Guardamos el token y los datos del usuario
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userData", JSON.stringify(data.user));

                // Actualizar el estado en el AuthContext
                setIsAuthenticated(true); // Actualiza el estado de autenticación
                setUserName(data.user.name); // Actualiza el nombre del usuario

                alert("Sesión iniciada con éxito");

                // Redirige al dashboard o home
                router.push("/dashboard");
            } else {
                setLoginError("No se recibió un token válido.");
            }
        } catch (error) {
            setLoginError(error instanceof Error ? error.message : "Error desconocido");
            alert("Usuario no registrado");
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="flex  items-center justify-center bg-gray-100">
            <div className=" bg-white rounded-lg shadow-md p-8 w-[500px]">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Iniciar Sesión</h1>
                <form onSubmit={handleOnSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Usuario
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                            placeholder="Ejemplo: ejemplo123"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block text-black mb-1">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={userData.password}
                                name="password"
                                placeholder="******"
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                            <button
                                type="button"
                                onClick={toggleShowPassword}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                        )}
                    </div>
                    {loginError && (
                        <p className="text-sm text-red-500">{loginError}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

"use client"

import React, { useState } from "react";
import { registerUser } from "@/app/services/register";
import { useRouter } from "next/navigation";
import { validateRegister } from "@/app/utils/validations";
import Swal from "sweetalert2";

const Register = () => {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        name: "",
        address: "",
        phone: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        const fieldError = validateRegister({ ...userData, [name]: value })[name];
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldError,
        }));
    };

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setRegisterError("");


        const formErrors = validateRegister(userData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }

        try {

            const data = await registerUser(
                userData.email,
                userData.password,
                userData.name,
                userData.address,
                userData.phone
            );

            Swal.fire({
                title: "Felicitaciones!",
                text: "Cuenta registrada con éxito. Ahora, por favor, inicia sesión",
                icon: "success"
            });



            router.push("/login");

        } catch (error) {
            setRegisterError(
                error instanceof Error ? error.message : "Error desconocido"
            );
            Swal.fire({
                title: "Ocurrió un problema",
                text: "Error al registrar un nuevo usuario",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex  items-center justify-center bg-gray-100">
            <div className="max-w-md bg-white rounded-lg shadow-md p-8 w-[500px]">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Crear Cuenta</h1>
                <form onSubmit={handleOnSubmit} className="space-y-4">
                    
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            placeholder="Ejemplo: usuario@correo.com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            placeholder="Nombre completo"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Dirección
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            placeholder="Dirección"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            placeholder="Teléfono"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-black mb-1">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={userData.password}
                                onChange={handleInputChange}
                                placeholder="******"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                        )}
                    </div>

                    {registerError && (
                        <p className="text-sm text-red-500">{registerError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {loading ? "Cargando..." : "Registrarse"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;

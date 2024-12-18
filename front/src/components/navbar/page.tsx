"use client";
import React from "react";
import { useAuth } from "@/auth/AuthContext";
import carrocompra from "@/assets/img/carrocompra.png";

const Navbar: React.FC = () => {
    const { isAuthenticated, userName, login, logout } = useAuth();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        // Llamada a login con los datos introducidos
        if (username && password) {
            await login(username, password); // Aquí deberías hacer una llamada real al backend
        } else {
            console.log("Nombre de usuario y contraseña son necesarios.");
        }
    };

    return (
        <div className="bg-white flex justify-center p-9 items-center">
            <a href="/" className="text-black text-4xl m-6">
                MUNDO | TECH
            </a>
            <nav>
                <ul className="flex justify-around m-6">
                    <li>
                        <a className="text-black text-[18px] m-3 hover:text-[#c7114a]" href="/">
                            INICIO
                        </a>
                    </li>
                    <li>
                        <a className="text-black text-[18px] m-3 hover:text-[#c7114a]" href="/home">
                            PRODUCTOS
                        </a>
                    </li>
                    <li>
                        <a className="text-black text-[18px] m-3 hover:text-[#c7114a]" href="/dashboard">
                            CONTACTO
                        </a>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            <>
                                <span className="text-black text-[18px] m-3 hover:text-[#c7114a]">
                                    Hola, {userName}
                                </span>
                                <button
                                    className="text-black text-[18px] m-3 hover:text-[#c7114a]"
                                    onClick={logout}
                                >
                                    CERRAR SESIÓN
                                </button>
                            </>
                        ) : (
                            <button
                                className="text-black text-[18px] m-3 hover:text-[#c7114a]"
                                onClick={handleLogin}
                            >
                                INICIAR SESIÓN
                            </button>
                        )}
                    </li>
                    <li>
                        <a className="text-black text-[18px] m-3 hover:text-[#c7114a]" href="/cart">
                            CARRITO
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="pl-10">
                <img className="w-10 h-10" src={carrocompra.src} alt="Carrito de Compra" />
            </div>
        </div>
    );
};

export default Navbar;

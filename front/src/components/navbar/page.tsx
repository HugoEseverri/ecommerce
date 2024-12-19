"use client";
import React from "react";
import { useAuth } from "@/auth/AuthContext";
import carrocompra from "@/assets/img/carrocompra.png";

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

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
                                <span className="text-black text-[18px] m-3 hover:text-[#c7114a]" >
                                    <a href="/dashboard">MI CUENTA</a>

                                </span>
                                <button
                                    className="text-black text-[18px] m-3 hover:text-[#c7114a]"
                                    onClick={logout}
                                >
                                    CERRAR SESIÓN
                                </button>
                            </>
                        ) : (
                            <a
                                className="text-black text-[18px] m-3 hover:text-[#c7114a]"
                                href="/login"
                            >
                                INICIAR SESIÓN
                            </a>
                        )}
                    </li>
                    <li>
                        <a className="text-black text-[18px] m-3 hover:text-[#c7114a]" href="/carrito">
                            CARRITO
                        </a>
                    </li>
                    <li>
                        <a className="text-black text-[18px] m-3 hover:text-[#c7114a]" href="/register">
                            REGISTRARSE
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

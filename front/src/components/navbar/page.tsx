"use client";
import React from "react";
import { useAuth } from "@/auth/AuthContext";
import carrocompra from "@/assets/img/carrocompra.png";


const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="bg-white flex justify-center p-9 items-center">
            <a
                href="/"
                className="text-black text-4xl m-6  transform transition-transform duration-500 group"
            >
                MUNDO | <span className="text-black group-hover:text-[#0071E3] transition-colors duration-200">TECH</span>
            </a>

            <nav className="flex items-center">
                <ul className="flex justify-around items-center m-6">
                    <li className="hover:scale-110 transform motion-safe:transition-transform">
                        <a className="text-black text-[18px] m-3 hover:text-[#0071E3] transform motion-safe:hover:scale-110" href="/">
                            INICIO
                        </a>
                    </li>
                    <li className="hover:scale-110 transform motion-safe:transition-transform">
                        <a className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/product">
                            PRODUCTOS
                        </a>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            <>
                                <a
                                    href="/dashboard"
                                    className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
                                >
                                    MI CUENTA
                                </a>

                                <button
                                    className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
                                    onClick={logout}
                                >
                                    CERRAR SESIÓN
                                </button>

                                <a className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block" href="/carrito">
                                    CARRITO
                                </a>

                            </>
                        ) : (
                            <a
                                className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
                                href="/login"
                            >
                                INICIAR SESIÓN
                            </a>
                        )}
                    </li>
                    <li className="hover:scale-110 transform motion-safe:transition-transform">
                        <a className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/register">
                            REGISTRARSE
                        </a>
                    </li>
                    <li className="hover:scale-110 transform motion-safe:transition-transform">
                        <a className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/contacto">
                            CONTACTO
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

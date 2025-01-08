"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import carrocompra from "@/assets/img/carrocompra.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    return (
        <div className="bg-white flex justify-center p-9 items-center">
            <Link
                href="/"
                className="text-black text-4xl m-6 transform transition-transform duration-500 group"
            >
                MUNDO | <span className="text-black group-hover:text-[#0071E3] transition-colors duration-200">TECH</span>
            </Link>

            <nav className="flex items-center">
                <ul className="flex justify-around items-center m-6">
                    <li className="hover:scale-110 transform motion-safe:transition-transform">
                        <Link className="text-black text-[18px] m-3 hover:text-[#0071E3] transform motion-safe:hover:scale-110" href="/">
                            INICIO
                        </Link>
                    </li>
                    <li className="hover:scale-110 transform motion-safe:transition-transform">
                        <Link className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/product">
                            PRODUCTOS
                        </Link>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
                                >
                                    MI CUENTA
                                </Link>

                                <button
                                    className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
                                    onClick={() => {
                                        logout();
                                        router.push("/");
                                        
                                    }}

                                >
                                    CERRAR SESIÓN
                                </button>

                                <Link
                                    href="/carrito"
                                    className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
                                >
                                    CARRITO
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
                            >
                                INICIAR SESIÓN
                            </Link>
                        )}
                    </li>
                    <li className="hover:scale-110 transform motion-safe:transition-transform">
                        <Link className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/register">
                            REGISTRARSE
                        </Link>
                    </li>
                    <li className="hover:scale-110 transform motion-safe:transition-transform">
                        <Link className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/contacto">
                            CONTACTO
                        </Link>
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

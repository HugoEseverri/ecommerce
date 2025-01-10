"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/cartContext";
import carrocompra from "@/assets/img/carrocompra.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const { cartCount, clearCart } = useCart();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className="bg-white flex justify-around 2xl:justify-center p-9 items-center relative">
            <Link
                href="/"
                className="text-black text-4xl m-6 transform transition-transform duration-500 group"
            >
                <h1 className="flex flex-col md:flex-row xl:text-left">
                    MUNDO |
                    <span className="text-black group-hover:text-[#0071E3] transition-colors duration-200">
                        TECH
                    </span>
                </h1>
            </Link>
            <div className="flex items-center relative">
                <div
                    className="2xl:hidden flex items-center z-50" 
                    onClick={toggleMenu}
                >
                    <div className="w-6 h-6 flex flex-col justify-between items-center space-y-1">
                        <div className="bg-black w-full h-1"></div>
                        <div className="bg-black w-full h-1"></div>
                        <div className="bg-black w-full h-1"></div>
                    </div>
                </div>

                {/* Menú Hamburguesa - Visible solo en pantallas pequeñas */}
                {isMenuOpen && (
                    <div className="absolute top-12 right-10 bg-white shadow-lg rounded-md w-48 p-4 z-40 border border-gray-300 2xl:hidden">
                        <ul className="flex flex-col justify-around space-y-4 h-[400px] font-semibold">
                            <li className="m-2">
                                <Link
                                    className="text-black text-[18px] hover:text-[#0071E3]"
                                    href="/"
                                >
                                    INICIO
                                </Link>
                            </li>
                            <li className="m-2">
                                <Link
                                    className="text-black text-[18px] hover:text-[#0071E3]"
                                    href="/product"
                                >
                                    PRODUCTOS
                                </Link>
                            </li>
                            <li className="m-2 flex flex-col">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            className="text-black text-[18px] hover:text-[#0071E3]"
                                        >
                                            MI CUENTA
                                        </Link>

                                        <button
                                            className="text-black text-[18px] hover:text-[#0071E3] text-left mt-4 mb-4"
                                            onClick={() => {
                                                logout();
                                                clearCart();
                                                router.push("/");
                                            }}
                                        >
                                            CERRAR SESIÓN
                                        </button>

                                        <Link
                                            href="/carrito"
                                            className="text-black text-[18px] hover:text-[#0071E3]"
                                        >
                                            CARRITO
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="text-black text-[18px] hover:text-[#0071E3] m-2"
                                    >
                                        INICIAR SESIÓN
                                    </Link>
                                )}
                            </li>
                            <li className="m-2">
                                <Link
                                    className="text-black text-[18px] hover:text-[#0071E3]"
                                    href="/register"
                                >
                                    REGISTRARSE
                                </Link>
                            </li>
                            <li className="m-2">
                                <Link
                                    className="text-black text-[18px] hover:text-[#0071E3]"
                                    href="/contacto"
                                >
                                    CONTACTO
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Navbar normal - Visible solo en pantallas grandes */}
                <nav
                    className={`hidden 2xl:block ${isMenuOpen ? "hidden" : "block"}`}
                >
                    <ul className="flex justify-around items-center m-6">
                        <li className="hover:scale-110 transform motion-safe:transition-transform">
                            <Link
                                className="text-black text-[18px] m-3 hover:text-[#0071E3] transform motion-safe:hover:scale-110"
                                href="/"
                            >
                                INICIO
                            </Link>
                        </li>
                        <li className="hover:scale-110 transform motion-safe:transition-transform">
                            <Link
                                className="text-black text-[18px] m-3 hover:text-[#0071E3]"
                                href="/product"
                            >
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
                                            clearCart();
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
                            <Link
                                className="text-black text-[18px] m-3 hover:text-[#0071E3]"
                                href="/register"
                            >
                                REGISTRARSE
                            </Link>
                        </li>
                        <li className="hover:scale-110 transform motion-safe:transition-transform">
                            <Link
                                className="text-black text-[18px] m-3 hover:text-[#0071E3]"
                                href="/contacto"
                            >
                                CONTACTO
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Icono del carrito - Visible siempre */}
                <div className="relative pl-10 z-40">
                    <Link href="/carrito">
                        <img
                            className="w-10 h-10"
                            src={carrocompra.src}
                            alt="Carrito de Compra"
                        />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;



// "use client";
// import React from "react";
// import { useAuth } from "@/context/AuthContext";
// import carrocompra from "@/assets/img/carrocompra.png";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const Navbar: React.FC = () => {
//     const { isAuthenticated, logout } = useAuth();
//     const router = useRouter();

//     return (
//         <div className="bg-white flex justify-center p-9 items-center">
//             <Link
//                 href="/"
//                 className="text-black text-4xl m-6 transform transition-transform duration-500 group"
//             >
//                 MUNDO | <span className="text-black group-hover:text-[#0071E3] transition-colors duration-200">TECH</span>
//             </Link>

//             <nav className="flex items-center">
//                 <ul className="flex justify-around items-center m-6">
//                     <li className="hover:scale-110 transform motion-safe:transition-transform">
//                         <Link className="text-black text-[18px] m-3 hover:text-[#0071E3] transform motion-safe:hover:scale-110" href="/">
//                             INICIO
//                         </Link>
//                     </li>
//                     <li className="hover:scale-110 transform motion-safe:transition-transform">
//                         <Link className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/product">
//                             PRODUCTOS
//                         </Link>
//                     </li>
//                     <li>
//                         {isAuthenticated ? (
//                             <>
//                                 <Link
//                                     href="/dashboard"
//                                     className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
//                                 >
//                                     MI CUENTA
//                                 </Link>

//                                 <button
//                                     className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
//                                     onClick={() => {
//                                         logout();
//                                         router.push("/");

//                                     }}

//                                 >
//                                     CERRAR SESIÓN
//                                 </button>

//                                 <Link
//                                     href="/carrito"
//                                     className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
//                                 >
//                                     CARRITO
//                                 </Link>
//                             </>
//                         ) : (
//                             <Link
//                                 href="/login"
//                                 className="text-black text-[18px] m-3 hover:text-[#0071E3] hover:scale-110 transform transition-transform duration-300 inline-block"
//                             >
//                                 INICIAR SESIÓN
//                             </Link>
//                         )}
//                     </li>
//                     <li className="hover:scale-110 transform motion-safe:transition-transform">
//                         <Link className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/register">
//                             REGISTRARSE
//                         </Link>
//                     </li>
//                     <li className="hover:scale-110 transform motion-safe:transition-transform">
//                         <Link className="text-black text-[18px] m-3 hover:text-[#0071E3]" href="/contacto">
//                             CONTACTO
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//             <div className="pl-10">
//                 <img className="w-10 h-10" src={carrocompra.src} alt="Carrito de Compra" />
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import React from "react";
import facebook from "@/assets/img/facebook.png";
import instagram from "@/assets/img/instagram.png";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#132f52] min-h-[250px]">
            {/* Grid principal para pantallas grandes */}
            <div className="hidden xl:grid grid-cols-4 gap-5 p-12 pl-[200px]">
                {/* Columna 1: Exclusivo */}
                <div className="flex flex-col">
                    <h3 className="p-3 text-[22px]">EXCLUSIVO</h3>
                    <h4 className="p-3">Registrate y obtené</h4>
                    <p className="p-3">10% en tu primer compra</p>
                </div>

                {/* Columna 2: Contacto */}
                <div className="flex flex-col">
                    <Link href={`/contacto`}>
                        <h3 className="p-3 text-[22px] hover:text-gray-300 hover:underline">CONTACTO</h3>
                    </Link>
                    <p className="p-3">123 Calle Falsa, Buenos Aires, Argentina.</p>
                    <p className="p-3 hover:text-gray-100">+059456123789</p>
                </div>

                {/* Columna 3: Cuenta */}
                <div className="flex flex-col">
                    <Link href={`/dashboard`}>
                        <h3 className="p-3 text-[22px] hover:text-gray-300 hover:underline">CUENTA</h3>
                    </Link>
                    <Link href={`/login`}>
                        <p className="p-3 hover:text-gray-300 hover:underline">Iniciar sesión</p>
                    </Link>
                    <Link href={`/register`}>
                        <p className="p-3 hover:text-gray-300 hover:underline">Registrarse</p>
                    </Link>
                </div>

                {/* Columna 4: Redes sociales */}
                <div className="flex flex-col">
                    <Link href={"https://www.facebook.com"}>
                        <Image
                            src={facebook}
                            alt={"Facebook"}
                            width={900}
                            height={650}
                            className="w-16 m-2 transform transition duration-300 hover:scale-110"
                        />
                    </Link>
                    <Link href={"https://www.instagram.com"}>
                        <Image
                            src={instagram}
                            alt={"Instagram"}
                            width={900}
                            height={650}
                            className="w-16 m-2 transform transition duration-300 hover:scale-110"
                        />
                    </Link>
                </div>
            </div>

            {/* Grid secundario para pantallas menores a 1280px */}
            <div className="grid grid-cols-2 gap-5 xl:hidden p-12">
                {/* Columna 1: Contacto */}
                <div className="flex flex-col">
                    <Link href={`/contacto`}>
                        <h3 className="p-3 text-[22px] hover:text-gray-300 hover:underline">CONTACTO</h3>
                    </Link>
                    <p className="p-3">123 Calle Falsa, Buenos Aires, Argentina.</p>
                    <p className="p-3 hover:text-gray-100">+059456123789</p>
                </div>

                {/* Columna 2: Redes sociales */}
                <div className="flex flex-col">
                    <Link href={"https://www.facebook.com"}>
                        <Image
                            src={facebook}
                            alt={"Facebook"}
                            width={900}
                            height={650}
                            className="w-16 m-2 transform transition duration-300 hover:scale-110"
                        />
                    </Link>
                    <Link href={"https://www.instagram.com"}>
                        <Image
                            src={instagram}
                            alt={"Instagram"}
                            width={900}
                            height={650}
                            className="w-16 m-2 transform transition duration-300 hover:scale-110"
                        />
                    </Link>
                </div>
            </div>

            <p className="text-center">© 2024 Mi Aplicación. Todos los derechos reservados.</p>
        </footer>
    );
};





export default Footer;

import React from "react";
import facebook from "@/assets/img/facebook.png";
import instagram from "@/assets/img/instagram.png";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#132f52] min-h-[250px] ">
            <div className="grid grid-cols-4 p-12 pl-[200px]">
                <div className="flex flex-col">
                    <h3 className="p-3 text-[22px]">EXCLUSIVO</h3>
                    <h4 className="p-3">Registrate y obtené</h4>
                    <p className="p-3">10% en tu primer compra</p>
                </div>
                <div className="flex flex-col ">
                    <h3 className="p-3 text-[22px]">SOPORTE</h3>
                    <p className="p-3">123 Calle Falsa, Buenos Aires, Argentina.</p>
                    <p className="p-3">+059456123789</p>
                </div>
                <div className="flex flex-col">
                    <Link href={`/dashboard`}>
                    <h3 className="p-3 text-[22px]">CUENTA</h3>
                    </Link>
                    <Link href={`/login`}>
                    <p className="p-3">Iniciar sesión</p>
                    </Link>
                    <Link href={`/register`}>
                    <p className="p-3">Registrarse</p>
                    </Link>
                </div>
                
                <div className="flex flex-col">
                    <img className="w-16 m-2" src={facebook.src} alt="Facebook" />
                    <img className="w-16 m-2" src={instagram.src} alt="Instagram" />
                </div>
            </div>
            <p className="text-center">© 2024 Mi Aplicación. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;

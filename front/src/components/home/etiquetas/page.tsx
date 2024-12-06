import React from 'react';
import televisores from "@/assets/img/television.png"
import celulares from "@/assets/img/telefono-inteligente.png"
import gaming from "@/assets/img/juego.png"
import hogar from "@/assets/img/articulos-para-el-hogar.png"
import computadoras from "@/assets/img/computadora.png"
import consolas from "@/assets/img/estacion-de-juegos.png"

const Etiquetas: React.FC = () => {
    return (
        <div>
            <ul className="grid grid-cols-3 grid-rows-2 gap-5 p-5">
                <li className="etiqueta-base flex items-center justify-center text-center bg-[white] text-gray m-[20px] h-[80px]">
                    <img src={gaming.src} alt="Gaming" className="w-6 h-6 mr-2" /> GAMING
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center bg-[white] text-gray m-[20px] h-[80px]">
                    <img src={celulares.src} alt="Celulares" className="w-6 h-6 mr-2" /> CELULARES
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center bg-[white] text-gray m-[20px] h-[80px]">
                    <img src={televisores.src} alt="Televisores" className="w-6 h-6 mr-2" /> TELEVISORES
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center bg-[white] text-gray m-[20px] h-[80px]">
                    <img src={hogar.src} alt="Hogar" className="w-6 h-6 mr-2" /> HOGAR
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center bg-[white] text-gray m-[20px] h-[80px]">
                    <img src={computadoras.src} alt="Computadoras" className="w-6 h-6 mr-2" /> COMPUTADORAS
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center bg-[white] text-gray m-[20px] h-[80px]">
                    <img src={consolas.src} alt="Consolas" className="w-6 h-6 mr-2" /> CONSOLAS
                </li>
            </ul>
        </div>
    );
};

export default Etiquetas;

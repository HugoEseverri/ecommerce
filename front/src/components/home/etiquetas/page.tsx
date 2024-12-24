import React from 'react';
import airpods from "@/assets/img/airpods.png"
import celulares from "@/assets/img/telefono-inteligente.png"
import ipad from "@/assets/img/tableta.png"
import reloj from "@/assets/img/reloj.png"
import macbook from "@/assets/img/macbook-pro.png"
import homepod from "@/assets/img/homepod.png"

const Etiquetas: React.FC = () => {
    return (
        <div>
            <ul className="grid grid-cols-3 grid-rows-2 gap-5 p-5">
                <li className="etiqueta-base flex items-center justify-center text-center  bg-gray-100 text-gray m-[20px] h-[80px]">
                    <img src={celulares.src} alt="Gaming" className="w-6 h-6 mr-2" /> iPhone
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center  bg-gray-100 text-gray m-[20px] h-[80px]">
                    <img src={macbook.src} alt="Celulares" className="w-6 h-6 mr-2" /> MacBook
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center  bg-gray-100 text-gray m-[20px] h-[80px]">
                    <img src={airpods.src} alt="Televisores" className="w-6 h-6 mr-2" /> AirPods
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center  bg-gray-100 text-gray m-[20px] h-[80px]">
                    <img src={reloj.src} alt="Hogar" className="w-6 h-6 mr-2" /> iWatch
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center  bg-gray-100 text-gray m-[20px] h-[80px]">
                    <img src={ipad.src} alt="Computadoras" className="w-6 h-6 mr-2" /> iPad
                </li>
                <li className="etiqueta-base flex items-center justify-center text-center  bg-gray-100 text-gray m-[20px] h-[80px]">
                    <img src={homepod.src} alt="Consolas" className="w-6 h-6 mr-2" /> HomePod
                </li>
            </ul>
        </div>
    );
};

export default Etiquetas;

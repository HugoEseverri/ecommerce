'use client';

import React, { useState, useEffect } from 'react';
import banner from "@/assets/img/iPhone 11 iPhone 11 PRO Max.jpg";
import bannerDos from "@/assets/img/bannerDos.jpg";
import bannerTres from "@/assets/img/Add a heading.jpg";
import Image from 'next/image';
import Link from 'next/link';

// Lista de imágenes y enlaces
const images = [banner, bannerDos, bannerTres];
const productLinks = [
    '/product/productID1', // Enlace al producto 1
    '/product/productID2', // Enlace al producto 2
    '/product/productID3', // Enlace al producto 3
];

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[500px] overflow-hidden">
            {/* Contenedor principal con las imágenes */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    width: `${images.length * 100}%`,
                }}
            >
                {images.map((src, index) => (
                    
                    <div key={index} className="flex-shrink-0 w-full h-full relative ">
                        
                        <Link href={productLinks[index]}>
                            <div className="absolute inset-0 z-10" />
                        </Link>
                        
                        <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            width={0}
                            height={0}
                            className=''
                        />
                    </div>
                ))}
            </div>

            <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-500'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
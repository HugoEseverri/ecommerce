'use client';

import React, { useState, useEffect } from 'react';
import banner from "@/assets/img/BANNER-HOME.webp"
import bannerDos from "@/assets/img/BANNER-HOME-DOS.webp"
import bannerTres from "@/assets/img/BANNER-HOME-TRES.webp"
const images =[banner, bannerDos, bannerTres];

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
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src.src}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                ))}
            </div>

            <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            currentIndex === index ? 'bg-white' : 'bg-gray-500'
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;

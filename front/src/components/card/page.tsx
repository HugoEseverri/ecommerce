"use client";

import React from "react";
import { IProducts } from "../../interfaces/products.interface";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/auth/AuthContext";
import { useCart } from "@/app/context/cartContext";

interface CardProps {
    product: IProducts;
}

const Card: React.FC<CardProps> = ({ product }) => {
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart(); // Usa el hook para agregar al carrito

    // Función que maneja el clic para agregar al carrito
    const handleAddToCart = () => {

        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1, // Siempre inicia con cantidad 1 al agregar
        };

        addToCart(cartProduct); // Llama a addToCart pasando el producto
    };

    return (
        <div className="w-[400px] h-[650px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center m-[50px] p-10 hover:border-[#0071E3] transition-colors duration-300">
            <Link href={`/product/${product.id}`}>
                <div className="cursor-pointer w-[350px] h-[270px] relative mb-4 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={350}
                    height={270}
                    className="w-full h-full object-cover" // Usamos las clases de Tailwind para object-fit
                />


                </div>

                <h3 className="cursor-pointer text-xl text-center text-gray-800 p-[15px] font-semibold">
                    {product.name}
                </h3>
                <p className="text-black">{product.description}</p>
            </Link>

            <div className="flex items-center">
                <p className="text-2xl text-gray-900 p-[25px] font-semibold">
                    ${product.price}
                </p>
                {isAuthenticated ? (
                    <button
                        onClick={handleAddToCart}
                        className="text-lg text-white p-[10px]  rounded-lg bg-blue-500 border-opacity-100 m-[15px]"
                    >
                        Agregar al Carrito
                    </button>
                ) : (
                    <Link href="/login">
                        <button className="text-lg text-white p-[10px]  rounded-lg bg-blue-500 border-opacity-100">
                            Agregar al Carrito
                        </button>
                    </Link>
                )}
            </div>
        </div>

    );
};

export default Card;

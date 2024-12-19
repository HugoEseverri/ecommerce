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
        <div className="w-[350px] h-[550px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center m-[50px] p-10">
            {/* Redirige a la página de detalles del producto */}
            <Link href={`/product/${product.id}`}>
                <div className="cursor-pointer w-[350px] h-[330px] relative mb-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={300}
                        layout="responsive"
                        className="h-[330px]"
                    />
                </div>
                <h3 className="cursor-pointer text-xl font-semibold text-center text-gray-800">
                    {product.name}
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                    Precio: ${product.price}
                </p>
            </Link>

            
            {isAuthenticated ? (
                <button
                    onClick={handleAddToCart} 
                    className="text-lg text-white p-[10px] border-4 rounded-lg bg-blue-500 border-opacity-100"
                >
                    Agregar al Carrito
                </button>
            ) : (
                <Link href="/login">
                    <button className="text-lg text-white p-[10px] border-4 rounded-lg bg-blue-500 border-opacity-100">
                        Agregar al Carrito
                    </button>
                </Link>
            )}
        </div>
    );
};

export default Card;

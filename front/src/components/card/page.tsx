"use client";

import React from "react";
import { IProducts } from "../../interfaces/products.interface";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../addToCart/AddToCartButton";


interface CardProps {
    product: IProducts;
}

const Card: React.FC<CardProps> = ({ product }) => {

    return (
        <div className="w-[400px] h-[650px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center m-[50px] p-10 hover:border-2 hover:border-[#0071e38f] transition-colors duration-300">
            <Link href={`/product/${product.id}`}>
                <div className="cursor-pointer w-[350px] h-[270px] relative mb-4 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={350}
                        height={270}
                        className="w-full h-full object-cover"
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
                <div>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>

    );
};

export default Card;

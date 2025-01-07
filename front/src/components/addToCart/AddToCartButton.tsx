"use client";

import React from "react";
import { useCart } from "@/context/cartContext";
import { StaticImageData } from "next/image";
import { useAuth } from "@/context/AuthContext";
import Router from "next/router";

interface AddToCartButtonProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string | StaticImageData;
        description: string;
        stock: number;
        categoryId: number;
    };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    const handleAddToCart = () => {
        if (isAuthenticated) {
            
            const cartProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
                stock: product.stock,
                categoryId: product.categoryId,
            };

            addToCart(cartProduct);
        } else {
            
            alert("Debe estar Logueado para agregar productos");
            
            Router.push("/login");
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            className="text-lg text-white p-3 rounded-lg bg-blue-500 border-opacity-100 mt-5 hover:bg-[#0035e3d3] transition-colors duration-300"
        >
            Agregar al Carrito
        </button>
    );
};

export default AddToCartButton;

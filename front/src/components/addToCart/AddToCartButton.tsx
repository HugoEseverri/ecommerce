"use client";

import React from "react";
import { useCart } from "@/app/context/cartContext";
import { StaticImageData } from "next/image";
import { useAuth } from "@/auth/AuthContext";
import Link from "next/link";

interface AddToCartButtonProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string | StaticImageData;
    };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación

    const handleAddToCart = () => {
        if (isAuthenticated) {
            // Si el usuario está autenticado, agregar al carrito
            const cartProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
            };

            addToCart(cartProduct); // Llama a la función addToCart
        } else {
            // Si el usuario no está autenticado, muestra un alert y redirige al login
            alert("Debe estar registrado para agregar productos");
            // Después del alert, redirige al login
            window.location.href = "/login"; // Redirige al login de manera programática
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            className="text-lg text-white p-3 rounded-lg bg-blue-500 border-opacity-100 mt-5"
        >
            Agregar al Carrito
        </button>
    );
};

export default AddToCartButton;

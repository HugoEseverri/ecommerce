"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { StaticImageData } from "next/image";
import { createOrderService } from "../services/orders";


export interface CartProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string | StaticImageData;
    categoryId: number;
}


export interface Order {
    id: number;
    status: string;
    date: Date;
    userId: number;
    products: { id: number }[];
}


interface CartContextProps {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: number) => void;
    getTotalPrice: () => number;
    clearCart: () => void;
    handleFinishBuy: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            setCart(savedCart ? JSON.parse(savedCart) : []);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log("Guardando carrito en localStorage", cart);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (product: CartProduct) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if (existingProduct) {
                if (existingProduct.stock > 1) {
                    return prevCart.map((item) =>
                        item.id === product.id
                            ? { ...item, stock: item.stock - 1 }
                            : item
                    );
                }
                alert("No hay más stock disponible");
                return prevCart;
            }
            return [...prevCart, { ...product, stock: product.stock - 1 }];
        });

        alert("Producto agregado al carrito");
    };

    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    const handleFinishBuy = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("No se encontró un token de autenticación.");
            }
    
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("No se encontró un ID de usuario.");
            }
    
            if (cart.length === 0) {
                throw new Error("El carrito está vacío.");
            }
    

            const productIds = cart.map((item) => item.id);
    
            const order: Order = await createOrderService(productIds, parseInt(userId, 10), token);
            alert(`Compra realizada con éxito. Número de orden: ${order.id}`);
            clearCart();
        } catch (error) {
            console.error("Error al finalizar la compra:", error);
            alert("Hubo un problema al procesar la compra. Intenta nuevamente.");
        }
    };
    

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                handleFinishBuy,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

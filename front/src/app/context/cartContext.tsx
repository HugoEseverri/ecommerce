"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { StaticImageData } from "next/image";
import { createOrderService } from "../services";

// Interfaz para los productos del carrito
export interface CartProduct {
    id: number;
    name: string;
    price: number;
    image: string | StaticImageData;
    quantity: number;
}

// Contexto y proveedor
interface CartContextProps {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: number) => void;
    getTotalPrice: () => number;
    clearCart: () => void;
    handleFinishBuy: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Hook para usar el contexto
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe ser usado dentro de CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);

    // Cargar el carrito desde localStorage cuando el componente se monta en el cliente
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            setCart(savedCart ? JSON.parse(savedCart) : []);
        }
    }, []); // Este efecto se ejecuta solo una vez después del primer renderizado

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
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        alert("Producto agregado al Carrito")
    };

    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    const handleFinishBuy = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("No se encontró un token de autenticación.");
            }
    
            console.log("Token de autenticación:", token); // Log para verificar el token
    
            // Obtener el userId desde localStorage
            const userId = localStorage.getItem("userId");
            if (!userId) {
                throw new Error("No se encontró un ID de usuario.");
            }
    
            // Verificar si el carrito tiene productos
            if (cart.length === 0) {
                throw new Error("El carrito está vacío.");
            }
    
            // Llamar a la función createOrderService
            await createOrderService(cart.map((item) => item.id), parseInt(userId), token);
    
            clearCart();  // Limpiar el carrito después de la compra exitosa
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
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, handleFinishBuy, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

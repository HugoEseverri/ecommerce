"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { StaticImageData } from "next/image";

// Interfaz para los productos del carrito
interface CartProduct {
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
    clearCart: () => void;
    finishBuy: () => void;
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


    const finishBuy = () => {
        const purchaseDetails = {
            items: cart,
            date: new Date().toISOString(),
        };
    
        // Guardar los detalles en el localStorage
        localStorage.setItem("purchaseDetails", JSON.stringify(purchaseDetails));
    
        // Mostrar el alert y limpiar el carrito
        alert("Compra realizada con éxito");
        clearCart();
    };
    

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, finishBuy }}>
            {children}
        </CartContext.Provider>
    );
};

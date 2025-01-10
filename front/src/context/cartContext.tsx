"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { StaticImageData } from "next/image";
import { createOrderService } from "../app/services/orders";
import Swal from "sweetalert2";


export interface CartProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string | StaticImageData;
    categoryId: number;
    quantity: number;
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
    cartCount: number;
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
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId && typeof window !== "undefined") {
            const savedCart = localStorage.getItem(`cart_${userId}`);
            const parsedCart = savedCart ? JSON.parse(savedCart) : [];
            setCart(parsedCart);
            setCartCount(parsedCart.reduce((count: number, item: CartProduct) => count + item.quantity, 0));
        }
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId && typeof window !== "undefined") {
            console.log("Guardando carrito para el usuario:", userId);
            localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        }

        setCartCount(cart.reduce((count: number, item: CartProduct) => count + item.quantity, 0));
    }, [cart]);

    const addToCart = (product: CartProduct) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            Swal.fire({
                title: "Ocurrió un problema",
                text: "Debe iniciar sesión para agregar un producto",
                icon: "error"
            });
            return;
        }
    
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
    
            if (existingProduct) {
                const newQuantity = existingProduct.quantity + 1;
                if (newQuantity <= product.stock) {
                    return prevCart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: newQuantity }
                            : item
                    );
                } else {
                    Swal.fire({
                        title: "No hay suficiente stock",
                        text: `Solo hay ${product.stock} unidades disponibles.`,
                        icon: "error"
                    });
                    return prevCart;
                }
            }
    
            if (product.stock > 0) {
                return [...prevCart, { ...product, quantity: 1 }];
            }
    
            return prevCart;
        });
    
        Swal.fire({
            title: "Éxito",
            text: "¡Producto agregado al carrito!",
            icon: "success"
        });
    };
    

    const getTotalPrice = () => {
        // Calculamos el precio total multiplicando la cantidad por el precio de cada producto
        return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
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

            Swal.fire({
                title: "Compra realizada con éxito",
                text: "",
                icon: "success"
            });

            clearCart();
        } catch (error) {
            console.error("Error al finalizar la compra:", error);

            Swal.fire({
                title: "Ocurrió un problema",
                text: "Por favor, intente nuevamente",
                icon: "error"
            });
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
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




// "use client";

// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { StaticImageData } from "next/image";
// import { createOrderService } from "../app/services/orders";
// import Swal from "sweetalert2";


// export interface CartProduct {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     image: string | StaticImageData;
//     categoryId: number;
// }


// export interface Order {
//     id: number;
//     status: string;
//     date: Date;
//     userId: number;
//     products: { id: number }[];
// }


// interface CartContextProps {
//     cart: CartProduct[];
//     addToCart: (product: CartProduct) => void;
//     removeFromCart: (productId: number) => void;
//     getTotalPrice: () => number;
//     clearCart: () => void;
//     handleFinishBuy: () => void;
//     cartCount: number;

// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);



// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error("useCart debe ser usado dentro de CartProvider");
//     }
//     return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//     const [cart, setCart] = useState<CartProduct[]>([]);
//     const [cartCount, setCartCount] = useState<number>(0);

//     useEffect(() => {
//         const userId = localStorage.getItem("userId");
//         if (userId && typeof window !== "undefined") {
//             const savedCart = localStorage.getItem(`cart_${userId}`);
//             const parsedCart = savedCart ? JSON.parse(savedCart) : [];
//             setCart(parsedCart);
//             setCartCount(parsedCart.reduce((count: number, item: CartProduct) => count + 1, 0));
//         }
//     }, []);

//     useEffect(() => {
//         const userId = localStorage.getItem("userId");
//         if (userId && typeof window !== "undefined") {
//             console.log("Guardando carrito para el usuario:", userId);
//             localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
//         }
//         setCartCount(cart.length);
//     }, [cart]);


//     const addToCart = (product: CartProduct) => {
//         const userId = localStorage.getItem("userId");
//         if (!userId) {
//             Swal.fire({
//                             title: "Ocurrió un problema",
//                             text: "Debe iniciar sesión para agregar un producto",
//                             icon: "error"
//                         });
            
//             return;
//         }

//         setCart((prevCart) => {
//             const existingProduct = prevCart.find((item) => item.id === product.id);

//             if (existingProduct) {
//                 if (existingProduct.stock > 1) {
//                     return prevCart.map((item) =>
//                         item.id === product.id
//                             ? { ...item, stock: item.stock - 1 }
//                             : item
//                     );
//                 }
//                 Swal.fire({
//                     title: "Ocurrió un problema",
//                     text: "No hay más stock disponible",
//                     icon: "error"
//                 });

//                 return prevCart;
//             }
//             return [...prevCart, { ...product, stock: product.stock - 1 }];
//         });

//         Swal.fire({
//             title: "Éxito",
//             text: "¡Producto agregado al carrito!",
//             icon: "success"
//         });


//     };

//     const getTotalPrice = () => {
//         return cart.reduce((total, product) => total + product.price, 0);
//     };

//     const handleFinishBuy = async () => {
//         try {
//             const token = localStorage.getItem("authToken");
//             if (!token) {
//                 throw new Error("No se encontró un token de autenticación.");
//             }

//             const userId = localStorage.getItem("userId");
//             if (!userId) {
//                 throw new Error("No se encontró un ID de usuario.");
//             }

//             if (cart.length === 0) {
//                 throw new Error("El carrito está vacío.");
//             }


//             const productIds = cart.map((item) => item.id);

//             const order: Order = await createOrderService(productIds, parseInt(userId, 10), token);

//             Swal.fire({
//                 title: "Compra realizada con éxito",
//                 text: "",
//                 icon: "success"
//             });

//             clearCart();
//         } catch (error) {
//             console.error("Error al finalizar la compra:", error);

//             Swal.fire({
//                 title: "Ocurrió un problema",
//                 text: "Por favor, intente nuevamente",
//                 icon: "error"
//             });

//         }
//     };


//     const removeFromCart = (productId: number) => {
//         setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//     };

//     const clearCart = () => {
//         setCart([]);
//     };

//     return (
//         <CartContext.Provider
//             value={{
//                 cart,
//                 cartCount,
//                 addToCart,
//                 removeFromCart,
//                 clearCart,
//                 handleFinishBuy,
//                 getTotalPrice,
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

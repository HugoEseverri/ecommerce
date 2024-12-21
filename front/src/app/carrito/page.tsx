"use client";

import React from "react";
import { useCart } from "@/app/context/cartContext";
import Image from "next/image";

const CartPage = () => {
    const { cart, removeFromCart, handleFinishBuy, clearCart, getTotalPrice } = useCart();
    console.log("Contenido del carrito en CartPage:", cart);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold text-black">Carrito de Compras</h1>
            {cart.length === 0 ? (
                <div className="mt-4">
                    <p className="text-xl text-black">Productos agregados al carrito:</p>
                    <p className="mt-2 text-black">El carrito está vacío.</p>
                </div>
            ) : (
                <>
                    <div className="mt-4">
                        <p className="text-xl text-black">Productos agregados al carrito:</p>
                    </div>
                    <p>Contenido del carrito: {JSON.stringify(cart)}</p>
                    <ul className="mt-4">
                        {cart.map((product) => (
                            <li
                                key={product.id}
                                className="flex items-center justify-between border-b p-4"
                            >
                                <div className="flex items-center w-[650px]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={80}
                                        height={80}
                                        className="mr-4"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                                        <p className="text-lg font-semibold text-black">Precio: ${product.price}</p>
                                        <p className="text-lg font-semibold text-black">Cantidad: {product.quantity}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="text-red-500"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 text-xl font-bold text-black">
                        Total: ${getTotalPrice()}
                    </div>
                    <button
                        onClick={handleFinishBuy}
                        className="mt-6 p-2 bg-red-500 text-white rounded">
                        Finalizar Compra
                    </button>
                    <button
                        onClick={clearCart}
                        className="mt-6 p-2 bg-red-500 text-white rounded"
                    >
                        Vaciar Carrito
                    </button>
                </>
            )}
        </main>
    );
};

export default CartPage;

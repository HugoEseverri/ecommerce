"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchOrders } from "@/app/services"; // Importa fetchOrders desde services.ts

const Dashboard = () => {
    const [userData, setUserData] = useState<any>(null); // Estado para almacenar los datos del usuario
    const [orders, setOrders] = useState<any[]>([]); // Estado para almacenar las órdenes
    const [loadingOrders, setLoadingOrders] = useState<boolean>(false); // Estado para saber si estamos cargando las órdenes
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const router = useRouter();

    // Cargar los datos del usuario desde el localStorage si hay un token
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        console.log("Token:", token);

        if (!token) {
            router.push("/login");
        } else {
            const user = JSON.parse(localStorage.getItem("userData") || "{}");
            setUserData(user);

            // Llamar a fetchOrders desde services.ts
            setLoadingOrders(true); // Inicia el estado de carga de órdenes
            fetchOrders(token)
                .then((data) => {
                    console.log("Órdenes recibidas:", data); // Verifica la estructura de los datos
                    setOrders(data); // Guardar las órdenes en el estado
                })
                .catch((error) => {
                    console.error("Error al cargar órdenes:", error);
                    setError("No se pudieron cargar las órdenes. Por favor, intenta nuevamente."); // Mostrar un mensaje de error
                    if (error.message.includes("Invalid token")) {
                        localStorage.removeItem("authToken"); // Eliminar token inválido
                        localStorage.removeItem("userData");
                        router.push("/login"); // Redirigir al login
                    }
                })
                .finally(() => {
                    setLoadingOrders(false); // Termina el estado de carga
                });
        }
    }, [router]);

    if (!userData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="max-w-md bg-white rounded-lg shadow-md p-8 w-[500px]">
                <h1 className="text-2xl font-semibold text-black mb-6">
                    Bienvenido, {userData.name}!
                </h1>

                <div className="space-y-4">
                    <p className="text-black">Email: {userData.email}</p>
                    <p className="text-black">Dirección: {userData.address}</p>
                    <p className="text-black">Teléfono: {userData.phone}</p>
                </div>

                {/* Mostrar órdenes */}
                {loadingOrders ? (
                    <p className="mt-6 text-black text-center">Cargando tus órdenes...</p>
                ) : error ? (
                    <p className="mt-6 text-red-600 text-center">{error}</p> // Mostrar error si hay problemas con la carga
                ) : orders.length > 0 ? (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">
                            Detalles de tus compras
                        </h2>
                        {orders.map((order: any) => (
                            <div key={order.id} className="mb-4">
                                <h3 className="text-lg font-semibold text-black">
                                    Orden #{order.id}
                                </h3>
                                <ul className="space-y-2">
                                    {order.products.map((product: any) => (
                                        <li key={product.id} className="text-black">
                                            {product.quantity} x {product.name} - $
                                            {product.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-6 text-black text-center">
                        No se registran compras en esta cuenta.
                    </p>
                )}

                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                    onClick={() => {
                        // Limpiar el localStorage y redirigir al login
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("userData");
                        router.push("/login");
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Dashboard;

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchOrders } from "@/app/services";
import { useAuth } from "@/auth/AuthContext"; // Importa el contexto de autenticación

const Dashboard = () => {
    const { logout } = useAuth(); // Obtén la función logout del contexto de autenticación
    const [userData, setUserData] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            router.push("/login");
        } else {
            const user = JSON.parse(localStorage.getItem("userData") || "{}");
            setUserData(user);

            setLoadingOrders(true);
            fetchOrders(token)
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    setError("No se pudieron cargar las órdenes.");
                    if (error.message.includes("Invalid token")) {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("userData");
                        router.push("/login");
                    }
                })
                .finally(() => {
                    setLoadingOrders(false);
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
        <div className="flex flex-col items-center justify-center bg-gray-100 p-9">
            <div className="bg-white rounded-lg shadow-md p-8 w-[700px] m-9">
                <h1 className="text-2xl font-semibold text-black mb-6">
                    Bienvenid@, {userData.name}!
                </h1>
                <hr className="h-[20px]" />
                <div className="space-y-4">
                    <p className="text-black">Nombre: {userData.name}</p>
                    <p className="text-black">Email: {userData.email}</p>
                    <p className="text-black">Dirección: {userData.address}</p>
                    <p className="text-black">Teléfono: {userData.phone}</p>
                </div>
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                    onClick={() => {
                        logout(); // Llamar a logout del contexto
                        router.push("/login"); // Redirigir al login
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 w-[700px]">
                {loadingOrders ? (
                    <p className="mt-6 text-black text-center">Cargando tus órdenes...</p>
                ) : error ? (
                    <p className="mt-6 text-red-600 text-center">{error}</p>
                ) : orders.length > 0 ? (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            Detalles de tus compras
                        </h2>
                        <hr className="h-[20px]" />
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
            </div>
        </div>
    );
};

export default Dashboard;

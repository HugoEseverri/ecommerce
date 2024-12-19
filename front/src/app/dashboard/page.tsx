"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const [userData, setUserData] = useState<any>(null); // Estado para almacenar los datos del usuario
    const router = useRouter();

    // Cargar los datos del usuario desde el localStorage si hay un token
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            router.push("/login");
        } else {
            const user = JSON.parse(localStorage.getItem("userData") || "{}");
            const purchaseDetails = JSON.parse(localStorage.getItem("purchaseDetails") || "null");
            setUserData({ ...user, purchaseDetails });
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
                <h1 className="text-2xl font-semibold text-black mb-6">Bienvenido, {userData.name}!</h1>

                <div className="space-y-4">
                    <p className="text-black">Email: {userData.email}</p>
                    <p className="text-black">Dirección: {userData.address}</p>
                    <p className="text-black">Teléfono: {userData.phone}</p>
                </div>
                {userData.purchaseDetails && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-black mb-4">
                            Detalles de tu última compra
                        </h2>
                        <ul className="space-y-2">
                            {userData.purchaseDetails.items.map((item: any) => (
                                <li key={item.id} className="text-black">
                                    {item.quantity} x {item.name} - ${item.price}
                                </li>
                            ))}
                        </ul>
                        <p className="text-black mt-2">
                            Fecha: {new Date(userData.purchaseDetails.date).toLocaleString()}
                        </p>
                    </div>
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

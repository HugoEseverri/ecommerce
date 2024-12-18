"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { userLogin } from "@/app/services"; // Asegúrate de importar el servicio de login

// Definimos la interfaz para el tipo del contexto
interface AuthContextType {
    isAuthenticated: boolean;
    userName: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

// Inicializamos el contexto como `null`
const AuthContext = createContext<AuthContextType | null>(null);

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};

// Componente proveedor que envuelve la aplicación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        // Revisar si hay un token en localStorage al montar el componente
        const token = localStorage.getItem("authToken");
        if (token) {
            const userData = JSON.parse(localStorage.getItem("userData") || "{}");
            setIsAuthenticated(true);
            setUserName(userData.name || null);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            // Llamamos al servicio de login, el cual devuelve el token y los datos del usuario
            const data = await userLogin(username, password);
            
            if (data && data.token) {
                // Guardamos el token y los datos reales del usuario
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userData", JSON.stringify(data.user)); // Cambia esto si el backend devuelve más datos
                setIsAuthenticated(true);
                setUserName(data.user.name); // Guarda el nombre del usuario
            } else {
                console.error("Error de autenticación: No se recibió un token.");
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error);
        }
    };

    const logout = () => {
        // Al cerrar sesión, limpiar los datos de localStorage y resetear el estado
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        setIsAuthenticated(false);
        setUserName(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

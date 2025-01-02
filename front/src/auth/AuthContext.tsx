"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { userLogin } from "@/app/services/login";

// Definimos la interfaz para el tipo del contexto
interface AuthContextType {
    isAuthenticated: boolean;
    userName: string | null;
    authError: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}


const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    

    useEffect(() => {
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
            const data = await userLogin(username, password);

            if (data && data.token) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userData", JSON.stringify(data.user));
                setIsAuthenticated(true);
                setUserName(data.user.name);
                setAuthError(null);
            } else {
                setAuthError("No se recibió un token válido.");
            }
        } catch (error) {
            setAuthError("Error al iniciar sesión. Verifica tus credenciales.");
            console.error("Error al intentar iniciar sesión:", error);
        }
    };

    const logout = () => {

        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
        setUserName(null);
        setAuthError(null);
        
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userName,
            authError,
            login,
            logout,
            setIsAuthenticated,
            setUserName
        }}>
            {children}
        </AuthContext.Provider>
    );
};

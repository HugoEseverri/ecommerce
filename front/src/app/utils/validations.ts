// utils/validation.ts

export const validateField = (name: string, value: string): string => {
    switch (name) {
        case "username":
            if (value.trim() === "") {
                return "El usuario es obligatorio.";
            }
            break;
        case "password":
            if (value.length < 6) {
                return "La contraseña debe tener al menos 6 caracteres.";
            }
            break;
        default:
            return "";
    }
    return "";
};

export const validateLogin = (userData: { username: string; password: string }): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    if (userData.username.trim() === "") {
        errors.username = "El usuario es obligatorio.";
    }
    if (userData.password.trim() === "") {
        errors.password = "La contraseña es obligatoria.";
    }

    return errors;
};



export const validateRegister = (data: {
    email: string;
    password: string;
    name: string;
    address: string;
    phone: string;
}) => {
    const errors: { [key: string]: string } = {};

    if (!data.email) {
        errors.email = "El correo electrónico es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "El correo electrónico no es válido.";
    }

    if (!data.password) {
        errors.password = "La contraseña es obligatoria.";
    } else if (data.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }


    if (!data.name) {
        errors.name = "El nombre es obligatorio.";
    }


    if (!data.address) {
        errors.address = "La dirección es obligatoria.";
    }


    if (!data.phone) {
        errors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d{10}$/.test(data.phone)) {
        errors.phone = "El teléfono debe tener 10 dígitos.";
    }

    return errors;
};

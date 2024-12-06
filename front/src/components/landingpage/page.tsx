import React from "react";
import Card from "../card/page"; // Asegúrate de que la ruta sea correcta
import { Products } from "../../interfaces/products.interface";

const HomePage: React.FC = () => {
    // Ejemplo de un producto
    const product: Products = {
        id: 1,
        name: "Producto de ejemplo",
        description: "Este es un producto de ejemplo",
        price: 99.99,
        stock: 10,
        image: "https://via.placeholder.com/150",
        categoryId: 1,
        category: {
            id: 1,
            name: "Categoría de ejemplo",
        },
    };

    return (
        <main>
            <h1>Bienvenido a Home</h1>
            <Card product={product} />
        </main>
    );
};

export default HomePage;

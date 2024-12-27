import React from "react";
import Card from "@/components/card/page";
import { getProducts } from "@/app/services";


export default async function pageProduct() {
    try {
        const products = await getProducts();

        return (
            <main className=" bg-gray-100">
                
                <div className="flex flex-col justify-center w-[1440px] ml-[230px]">
                    <p className="text-black text-xl my-10 text-center">Encontrá lo último en tecnología en Mundo Tech, vendedor oficial de productos Apple. Disfrutá de nuestros Productos Destacados</p>
                    <h1 className="text-black text-2xl mb-10">PRODUCTOS</h1>
                    <hr className=" h-1 bg-gradient-to-r from-blue-800 to-transparent rounded" />
                </div>
                <div className="flex justify-center flex-wrap gap-4">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Card key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No hay productos disponibles</p>
                    )}
                </div>
            </main>
        );
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        return (
            <main>
                <h1>Productos</h1>
                <p>Error al cargar los productos. Inténtalo más tarde.</p>
            </main>
        );
    }
}
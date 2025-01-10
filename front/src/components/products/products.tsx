import React from "react";
import Card from "@/components/card/page";
import { getProducts } from "@/app/services/products";
import productsBanner from "@/assets/img/productos.jpg"
import Image from "next/image";


export default async function pageProduct() {
    try {
        const products = await getProducts();

        return (
            <main className=" bg-gray-100">
                <div>
                    <Image
                        src={productsBanner}
                        alt="Productos Apple"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-cover h-[250px] sm:h-[300px]  md:h-full"
                    />

                </div>
                <div className="flex flex-col justify-center mt-[40px]">
                    <h1 className="text-black text-5xl text-center">Productos</h1>
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
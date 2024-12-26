import React from "react";
import Card from "../../components/card/page";
import Etiquetas from "@/components/home/etiquetas/page";
import Carousel from "@/components/home/carousel/page";
import banner from "@/assets/img/novedadess.jpg";
import { getProducts } from "../services";
import Image from "next/image";

export default async function HomePage() {
    try {
        const products = await getProducts();

        return (
            <main className=" bg-gray-100">
                <Carousel />
                <h1>Productos</h1>
                <Etiquetas />
                <div className="flex justify-center">
                    <Image
                        className="w-[1000px]"
                        src={banner}
                        alt="Banner novedades"
                    />

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
import React from "react";
import Card from "@/components/card/page";
import Etiquetas from "@/components/home/etiquetas/page";
import Carousel from "@/components/home/carousel/page";
import { getProducts } from "@/app/services/products";
import Link from "next/link";

export default async function HomePage() {
    try {
        const products = await getProducts();

        return (
            <main className=" bg-gray-100">
                <Carousel />
                <h1>Productos</h1>
                <Etiquetas />
                <Link href={`/product`} >
                    <div className="flex flex-col justify-center items-start ml-[230px] hover:text-blue-700 group">
                        <h2 className="text-black text-3xl group-hover:text-blue-700">Productos</h2>
                        <hr className="w-[1440px] h-1 bg-black group-hover:bg-blue-600" />
                    </div>
                </Link>
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
import React from "react";
import Card from "@/components/card/page";
import Etiquetas from "@/components/home/etiquetas/page";
import Carousel from "@/components/home/carousel/page";
import { getProducts } from "@/app/services/products";
import Link from "next/link";
import Image from "next/image";
import bannerHome from "@/assets/img/productosHome.png"

export default async function HomePage() {
    try {
        const products = await getProducts();

        return (
            <main className=" bg-gray-100">
                <div className="hidden 2xl:block">
                    <Carousel />
                </div>


                <div className="block 2xl:hidden">
                    <Link href={`/product`}>
                        <Image
                            src={bannerHome}
                            alt="Productos Apple"
                            width={1800}
                            height={500}
                            className="object-cover w-full h-auto"
                        />
                    </Link>
                </div>
                <Etiquetas />
                <Link href={`/product`} >
                    <div className="flex flex-col justify-center items-center hover:text-blue-700 group w-full xl:w-full lg:w-full px-4">
                        <h1 className="text-black text-4xl group-hover:text-blue-700 transform transition hover:scale-110">
                            Productos
                        </h1>
                        <hr className="h-1 bg-black group-hover:bg-blue-600 w-full sm:w-[100%] md:w-[1240px] hidden 2xl:block" />
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
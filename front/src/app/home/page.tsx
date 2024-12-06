import React from "react";
import Card from "../../components/card/page";
import Etiquetas from "@/components/home/etiquetas/page";
import Carousel from "@/components/home/carousel/page";
import banner from "@/assets/img/BANNER-NOVEDADES.webp";
import { getProducts } from "../services";
import Link from "next/link";

export default async function HomePage() {
    try {
        const products = await getProducts();

        return (
            <main>
                <Carousel />
                <h1>Productos</h1>
                <Etiquetas />
                <div className="flex justify-center">
                    <img
                        className="w-[1175px]"
                        src={banner.src}
                        alt="Banner novedades"
                    />
                </div>
                <div className="flex justify-center flex-wrap gap-4">
                    {products && products.length > 0 ? (
                        products.map((product) => (

                            <Link href={`/product/${product.id}`} key={product.id}>

                                <Card product={product} />

                            </Link>
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







// import React from "react";
// import Card from "../../components/card/page";
// import { Products } from "../../interfaces/products.interface";
// import Etiquetas from "@/components/home/etiquetas/page";
// import Carousel from "@/components/home/carousel/page";
// import play5 from "@/assets/img/play5.jpg"
// import iphone from "@/assets/img/iphone15.jpg"
// import banner from "@/assets/img/BANNER-NOVEDADES.webp"



// async function fetchProducts() {
//     const response = await fetch("http://localhost:3002/products", {
//         cache: "no-store", // Garantiza que se haga siempre una petición nueva al servidor
//     });
//     if (!response.ok) {
//         throw new Error("Failed to fetch products");
//     }
// }



// const HomePage: React.FC = async () => {
//     const products: Products[] = await fetchProducts();
//     return (
//         <main>
//             <Carousel />
//             <h1>Productos</h1>
//             <Etiquetas />
//             <div className="flex justify-center">
//                 <img className=" w-[1175px]" src={banner.src} alt="Banner novedades" />
//             </div>
//             <div className="flex justify-center">
//                 {products.map((product) => (
//                     <Card key={product.id} product={product} />
//                 ))}
//             </div>
//         </main>
//     );
// };

// export default HomePage;

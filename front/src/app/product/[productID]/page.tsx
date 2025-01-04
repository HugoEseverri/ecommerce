import React from "react";
import { getProducts } from "@/app/services/products";
import AddToCartButton from "@/components/addToCart/AddToCartButton";
import Image from "next/image";

const Page = async ({ params }: { params: { productID: string } }) => {
    const { productID } = await params;
    const products = await getProducts();
    const foundProduct = products.find(
        (product) => product.id === Number(productID)
    );

    if (!foundProduct) {
        return (
            <div>
                <h1>Error</h1>
                <p>No se puede cargar el producto.</p>
            </div>
        );
    }

    return (
        <div className="h-[850px] flex flex-col items-center p-10 justify-center bg-gray-100">
                    <div className="flex items-center w-[1400px] border bg-white border-gray-300 rounded-lg shadow-lg overflow-hidden">
                        <div className="relative m-4 w-[900px] h-[650px] overflow-hidden">
                            <Image
                                src={foundProduct.image}
                                alt={foundProduct.name}
                                width={900}
                                height={650}
                                className="object-cover w-full h-full"
                            />
                        </div>
                <div className="flex flex-col items-center w-[600px] min-w-[600px]">
                    <h3 className="text-3xl text-center text-gray-800 mb-8">{foundProduct.name}</h3>
                    <p className="text-xl text-center text-gray-500 m-5">{foundProduct.description}</p>
                    <p className="text-xl font-semibold text-gray-900">Precio: ${foundProduct.price}</p>
                    <AddToCartButton product={foundProduct} />
                </div>
            </div>
        </div>
    );
};

export default Page;

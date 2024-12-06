import React from "react";
import { getProductById } from "@/app/services";

async function page({ params }: { params: { productID: string } }) {
    const { productID } = params;
    const product = await getProductById(productID);

    if (!product) {
        return (
            <div>
                <h1>Error</h1>
                <p>No se puede cargar el producto.</p>
            </div>
        );
    }

    return (
        <div className="w-[350px] h-[650px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center m-[50px] p-10">
            <div className="w-[350px] h-[330px] relative mb-4">
                <img src={product.image as string} alt={product.name} className="h-[330px]" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800">{product.name}</h3>
            <p className="text-sm text-center text-gray-500 mt-2 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-gray-900">Precio: ${product.price}</p>
        </div>
    );
}

export default page;

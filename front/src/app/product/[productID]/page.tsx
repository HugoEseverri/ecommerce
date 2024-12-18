import React from "react";
import { getProducts } from "@/app/services";

const Page = async ({ params }: { params: { productID: string } }) => {
    const { productID } = params;
    
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
        <div className="w-[350px] h-[650px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center m-[50px] p-10">
            <div className="w-[350px] h-[330px] relative mb-4">
                <img src={foundProduct.image as string} alt={foundProduct.name} className="h-[330px]" />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800">{foundProduct.name}</h3>
            <p className="text-sm text-center text-gray-500 mt-2 mb-4">{foundProduct.description}</p>
            <p className="text-lg font-semibold text-gray-900">Precio: ${foundProduct.price}</p>
        </div>
    );
};

export default Page;

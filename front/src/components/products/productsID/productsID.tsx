import React from "react";
import { StaticImageData } from "next/image";
import Image from "next/image"; // Asegúrate de importar el componente Image de Next.js
import AddToCartButton from "@/components/addToCart/AddToCartButton";

interface ProductDetailsProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string | StaticImageData;
        stock: number;
        categoryId: number;
    };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <div className="h-[850px] flex flex-col items-center p-10 justify-center bg-gray-100">
            <div className="flex items-center w-[1400px] border bg-white border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <div className="relative m-4 w-[900px] h-[650px] overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={900}
                        height={650}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex flex-col items-center w-[600px] min-w-[600px]">
                    <h3 className="text-3xl text-center text-gray-800 mb-8">{product.name}</h3>
                    <p className="text-xl text-center text-gray-500 m-5">{product.description}</p>
                    <p className="text-xl font-semibold text-gray-900">Precio: ${product.price}</p>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

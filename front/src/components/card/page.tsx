import React from "react";
import { IProducts } from "../../interfaces/products.interface";
import Image from "next/image";


interface CardProps {
    product: IProducts;
}

const Card: React.FC<CardProps> = ({ product }) => {
    return (
            
            <div className="w-[350px] h-[650px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center m-[50px] p-10">

                <div className="w-[350px] h-[330px] relative mb-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={300}
                        layout="responsive"
                        className=" h-[330px] "
                    />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800">{product.name}</h3>
                <p className="text-sm text-center text-gray-500 mt-2 mb-4">{product.description}</p>
                <p className="text-lg font-semibold text-gray-900">Precio: ${product.price}</p>
            </div>
        
    );
};

export default Card;

import React from "react";
import { getProducts } from "@/app/services";
import ProductDetails from "@/components/products/productsID/productsID";

const Page = async () => {
    const products = await getProducts();
    const foundProduct = products.find((product) => product.id === 2);

    if (!foundProduct) {
        return (
            <div>
                <h1>Error</h1>
                <p>No se puede cargar el producto.</p>
            </div>
        );
    }

    return <ProductDetails product={foundProduct} />;
};

export default Page;
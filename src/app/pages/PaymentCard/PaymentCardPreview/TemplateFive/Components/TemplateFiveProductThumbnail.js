import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TemplateOneProductThumbnail = ({ data, productVariant }) => {

    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        /* Set Current Image */
        const productImage =
            data?.product_variant && data?.product_variant.length > 0
                ? data?.product_variant[0].image
                : data?.product_image;
        setCurrentImage(productImage);
        /* Set Current Image */

        /* END: Set Thumbnails */
    }, [data]);

    useEffect(() => {
        const imagePath = productVariant && productVariant?.image
        setCurrentImage(imagePath);
    }, [productVariant])

    return (
        <>
            <div className="flex justify-center ">
                <img src={currentImage || data?.product_image} className="object-contain object-center w-full drop-shadow-lg cursor-pointer md:max-h-[300px] lg:max-h-[350px] t5-product-image shadow-lg bg-white" />
            </div>
            
        </>
    );
};

export default TemplateOneProductThumbnail;

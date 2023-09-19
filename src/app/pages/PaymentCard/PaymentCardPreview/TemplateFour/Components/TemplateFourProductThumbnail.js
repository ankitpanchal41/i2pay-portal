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
            <div className="t4-product-image">
                <img src={currentImage || data?.product_image} className="object-contain object-center w-full drop-shadow-lg rounded-lg cursor-pointer md:max-h-[250px] lg:max-h-[300px] t4-bg-dark shadow-xl" />
            </div>
            
        </>
    );
};

export default TemplateOneProductThumbnail;

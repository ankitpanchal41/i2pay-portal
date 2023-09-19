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
            {productVariant && productVariant.options ? (
                <div className="flex flex-grow h-[200px] w-full object-cover t3-product-image">
                    <img src={currentImage || data?.product_image} className="object-contain object-center w-full drop-shadow-lg rounded-lg cursor-pointer md:max-h-[250px] lg:max-h-[300px]" />
                </div>
            ): (
                <div className="flex flex-grow h-[250px] w-full object-cover t3-product-image">
                    <img src={currentImage || data?.product_image} className="object-contain object-center w-full drop-shadow-lg rounded-lg cursor-pointer" />
                </div>
            )}

        </>
    );
};

export default TemplateOneProductThumbnail;

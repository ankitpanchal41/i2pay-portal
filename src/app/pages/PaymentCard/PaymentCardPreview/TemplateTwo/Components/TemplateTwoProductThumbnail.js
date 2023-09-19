import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const TemplateOneProductThumbnail = ({data, productVariant}) => {

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
                <div
                    className="flex justify-center item-center relative t2-product-image-container shadow-2xl">
                    <img src={currentImage || data?.product_image}
                         className="object-contain object-center w-full drop-shadow-lg rounded-lg cursor-pointer md:max-h-[250px] lg:max-h-[300px] t2-product-image bg-white"/>
                </div>
            ): (
                <div
                    className="flex justify-center item-center relative t2-product-image-container shadow-2xl">
                    <img src={currentImage || data?.product_image}
                         className="object-contain object-center drop-shadow-lg rounded-lg cursor-pointer w-full t2-product-image bg-white"/>
                </div>
            )}

        </>
    );
};

export default TemplateOneProductThumbnail;

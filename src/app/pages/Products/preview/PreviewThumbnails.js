import React, { useEffect, useState } from "react";

const PreviewThumbnails = ({ productDetails, productVariant }) => {
    const [currentImage, setCurrentImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        /* Set Current Image */
        const productImage =
            productDetails?.product_variant && productDetails?.product_variant.length > 0
                ? productDetails?.product_variant[0].image
                : productDetails?.product_image;
        setCurrentImage(productImage);
        /* Set Current Image */

        /* Set Thumbnails */
        if (productDetails && productDetails?.product_variant && productDetails?.product_variant.length > 0) {
            const thumbnails = [];
            productDetails?.product_variant.map((item) => {
                if (item?.image) thumbnails.push({ src: item?.image });
            });
            setThumbnails(thumbnails);
        }
        /* END: Set Thumbnails */
    }, [productDetails]);

    useEffect(() => {
        const imagePath = productVariant && productVariant?.image;
        setCurrentImage(imagePath);
    }, [productVariant]);

    const handleImageClick = (clickedIndex, imagePath) => {
        setCurrentIndex(clickedIndex);
        setCurrentImage(imagePath);
    };

    const findActiveImageIndexFromThumbnail = thumbnails.findIndex((item) => item?.src === currentImage);

    return (
        <>
            <div className="flex flex-wrap w-full">
                <div className="w-full p-1 md:p-2">
                    <img
                        alt={productDetails?.name}
                        className="block object-contain object-center w-full h-full rounded-lg p-1 border cursor-pointer md:max-h-[400px] lg:max-h-[500px]"
                        src={currentImage || productDetails?.product_image}
                    />
                </div>
            </div>
            <div className="flex items-center overflow-hidden overflow-x-auto mx-2">
                {thumbnails.map((item, index) => (
                    <img
                        alt="Thumbnail Image"
                        className={`block object-contain h-full object-center rounded-lg p-1 border cursor-pointer h-[120px] w-[120px] mr-3 mb-3 ${
                            findActiveImageIndexFromThumbnail === index ? `border-blue-500 shadow-xl` : ``
                        }`}
                        src={item?.src}
                        onClick={() => handleImageClick(index, item?.src)}
                    />
                ))}
            </div>
        </>
    );
};

export default PreviewThumbnails;

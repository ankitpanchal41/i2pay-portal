import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { getProductDetailsStart } from "../../../redux/actions/Product";
import ProductSpecifications from "./ProductSpecifications";
import { decode } from "html-entities";
import { Currency } from "../../../utils/currency";
import * as Icon from "react-feather";

import PreviewOptionButtonGroup from "./PreviewOptionButtonGroup";

const Heading = React.lazy(() => import("../../../components/common/Heading"));
const PreviewThumbnails = React.lazy(() => import("./PreviewThumbnails"));

const PreviewProduct = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { productDetails } = useSelector((state) => state?.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { storeId, productId } = useParams();

    const [productVariant, setProductVariant] = useState(null);
    const onChangeSetProductVariant = (selectedOptions) => {
        if (!selectedOptions) return;
        if (!productDetails?.product_variant) return;
        const variants = [];
        Object.values(selectedOptions).map((variant) => {
            variants.push(variant);
        });

        const variantDetails =
            productDetails?.product_variant &&
            productDetails?.product_variant.filter((detail) => {
                if (JSON.stringify(variants) === JSON.stringify(detail?.variant_values)) {
                    return detail;
                }
            });

        setProductVariant(variantDetails[0]);
    };

    // useEffect(() => {
    //     /* Set Current Image */
    //     const productImage =
    //         productDetails?.product_variant && productDetails?.product_variant.length > 0
    //             ? productDetails?.product_variant[0].price
    //             : productDetails?.price;
    //     setProductPrice(productImage);
    //     /* Set Current Image */

    //     /* Set Current Image */
    //     const productQuantity =
    //         productDetails?.product_variant && productDetails?.product_variant.length > 0 ? productDetails?.product_variant[0].quantity : 0;
    //     setProductQuantity(productQuantity);
    //     /* Set Current Image */
    // }, [productDetails]);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };
        const payload = {
            product_id: productId,
            store_id: storeId,
        };
        dispatch(getProductDetailsStart(payload, callBack));
    }, []);

    const onClickBack = () => {
        navigate(`/products/${storeId}`);
    };

    const _renderHeading = () => {
        return <Heading title={"Product Preview"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    return (
        <>
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="intro-y">
                    {isLoading ? (
                        <div className="flex justify-center h-48 items-center">
                            <ClipLoader
                                loading={true}
                                color="#1e3a8a"
                                size={55}
                                css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                            />
                        </div>
                    ) : (
                        <div className="overflow-x-auto scrollbar-hidden">
                            <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                                <div className="intro-y box-without-margin">
                                    <section className="grid grid-cols-12 text-gray-700 lg:p-15 gap-2 md:gap-6">
                                        {/* THUMBNAILS */}
                                        <div className="col-span-12 xl:col-span-5">
                                            <PreviewThumbnails productDetails={productDetails} productVariant={productVariant} />
                                        </div>
                                        {/* THUMBNAILS */}

                                        {/* PRODUCT OPTION GROUP */}
                                        <div className="p-1 md:p-2 col-span-12 xl:col-span-7">
                                            <div className="text-[18px] text-[#3B4863] font-medium dark:text-white max-2-line mb-2 md:mb-4">
                                                {productDetails?.name}
                                            </div>
                                            <div className="mt-6">
                                                <div className="flex items-center my-3 gap-2">
                                                    <div className="flex justify-center items-center">
                                                        <span className="text-[30px] text-[#001737] dark:text-white">
                                                            {decode(Currency.find((c) => c?.value === productDetails?.currency)?.symbol)}
                                                            {(productVariant && productVariant.price) || productDetails?.price}
                                                        </span>
                                                        {productDetails?.compare_price ? (
                                                            <span className="ml-2 text-lg text-slate-400 line-through dark:text-white">
                                                                {decode(
                                                                    Currency.find((c) => c?.value === productDetails?.currency)?.symbol,
                                                                )}
                                                                {productDetails?.compare_price}
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="text-big text-slate-600 dark:text-white mb-1 relative top-[2px]">
                                                    {((productVariant && productVariant?.quantity) || productDetails?.quantity) > 0 ? (
                                                        <div className="text-[#0C8842] flex items-center">
                                                            <div className="mr-1">
                                                                <Icon.CheckCircle size={16} />
                                                            </div>
                                                            <div>
                                                                <span className="font-bold">
                                                                    {productVariant?.quantity || productDetails?.quantity}
                                                                </span>{" "}
                                                                Quantity available
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-danger flex items-center">
                                                            <div className="mr-1">
                                                                <Icon.XCircle size={16} />
                                                            </div>
                                                            <div>Out of stock</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col w-full rounded-lg">
                                                <div className="md:mt-5">
                                                    <PreviewOptionButtonGroup
                                                        productDetails={productDetails}
                                                        onChangeSetProductVariant={onChangeSetProductVariant}
                                                    />
                                                </div>
                                            </div>
                                            <div className="border-b border-[#E3E7ED]" />
                                            <div className="text-big text-slate-400 dark:text-white mt-2 md:mt-5">
                                                <div className="text-[18px] text-[#3B4863] font-medium mb-1 relative top-[2px]">
                                                    Description:
                                                </div>
                                                <div className="text-[#3B4863] text-[14px] font-normal mt-2">
                                                    {productDetails?.description}
                                                </div>
                                            </div>
                                            <div className="border-b border-[#E3E7ED] mt-5" />
                                            <div className="text-big mt-5">
                                                {productDetails?.specifications && productDetails?.specifications.length ? (
                                                    <ProductSpecifications specifications={productDetails?.specifications} />
                                                ) : null}
                                            </div>
                                        </div>
                                        {/* PRODUCT OPTION GROUP */}
                                    </section>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* END: Content */}
        </>
    );
};
export default PreviewProduct;

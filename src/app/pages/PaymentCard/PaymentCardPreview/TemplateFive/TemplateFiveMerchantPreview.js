import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import * as Icon from "react-feather";

const MiniLoader = React.lazy(() => import("../../../../components/common/MiniLoader"));
const TemplateFiveOptionGroup = React.lazy(() => import("./Components/TemplateFiveOptionGroup"));
const TemplateFiveProductThumbnail = React.lazy(() => import("./Components/TemplateFiveProductThumbnail"));
const TemplateFiveQuantityAndPrice = React.lazy(() => import("./Components/TemplateFiveQuantityAndPrice"));
const TemplateFiveSpecifications = React.lazy(() => import("./Components/TemplateFiveSpecifications"));

const TemplateFiveMerchantPreview = ({ data, onClickSave, isSubmiting }) => {
    const [productVariant, setProductVariant] = useState(null);
    const onChangeSetProductVariant = (selectedOptions) => {
        if (!selectedOptions) return;
        if (!data?.product_variant) return;
        const variants = [];
        Object.values(selectedOptions).map((variant) => {
            variants.push(variant);
        });

        const variantDetails =
            data?.product_variant &&
            data?.product_variant.filter((detail) => {
                if (JSON.stringify(variants) === JSON.stringify(detail?.variant_values)) {
                    return detail;
                }
            });

        setProductVariant(variantDetails[0]);
    };

    return (
        <div className="bg-white h-full md:h-[100vh] flex justify-center items-center template-five-background">
            <div className="box bg-white md:w-[800px] shadow-2xl m-2">
                <div className="grid grid-cols-12 justify-between" style={{ backgroundColor: "#d3bcc0" }}>
                    <div className="intro-x col-span-12 justify-center item-center">
                        <div className="text-center flex flex-col shadow">
                            <div
                                className="text-lg px-3 t5-product-title flex py-3 max-1-line shadow max-1-line"
                                style={{ textOverflow: "ellipsis" }}>
                                {data?.name}
                            </div>

                            {data && data.specifications ? (
                                <div style={{ maxHeight: 100, overflowY: "auto" }}>
                                    <div className="flex items-center t5-description p-5">
                                        <div className="max-3-line ">{data?.description}</div>
                                    </div>

                                    <TemplateFiveSpecifications data={data} />
                                </div>
                            ) : (
                                <div className="flex items-center t5-description p-5">
                                    <div className="max-3-line ">{data?.description}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Left Content */}
                    <div className="intro-x col-span-12 md:col-span-6 justify-center item-center">
                        <div className="text-center flex flex-col t5-product-left-container">
                            <TemplateFiveProductThumbnail data={data} productVariant={productVariant} />
                        </div>
                        <TemplateFiveQuantityAndPrice data={data} productVariant={productVariant} />
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-12 md:col-span-6  flex-grow w-full py-3 px-2" style={{ backgroundColor: "#d3bcc0" }}>
                        <div className="flex flex-col w-full rounded-lg">
                            <TemplateFiveOptionGroup productDetails={data} onChangeSetProductVariant={onChangeSetProductVariant} />
                        </div>

                        <form className="mx-8 flex flex-col items-center h-full">
                            <div className="py-3 w-full">
                                <label htmlFor="" className="t5-label">
                                    Email Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 text-sm pl-3 bg-grey t5-input"
                                    placeholder={"customer@example.com"}
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="py-2 mb-2 w-full">
                                <label htmlFor="" className="t5-label">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 text-sm pl-3 bg-grey t5-input"
                                    placeholder={"+91 9988778855"}
                                    disabled
                                    readOnly
                                />
                            </div>

                            <div
                                className="w-full px-2 py-4 text-white rounded-full t5-pay-button mb-2 flex justify-center items-center cursor-pointer"
                                onClick={() => {
                                    if (!isSubmiting) {
                                        onClickSave();
                                    }
                                }}>
                                <MiniLoader size={20} css={"margin-right:10px"} isLoading={isSubmiting} />
                                {!isSubmiting && <Icon.Save size="18" className="mr-2" />}
                                <span className="t5-pay"> Save Payment Card </span>
                            </div>
                        </form>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>{" "}
        </div>
    );
};

export default TemplateFiveMerchantPreview;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import * as Icon from "react-feather";
import { decode } from "html-entities";
import { Currency } from "../../../../utils/currency";

const MiniLoader = React.lazy(() => import("../../../../components/common/MiniLoader"));
const TemplateFourOptionGroup = React.lazy(() => import("./Components/TemplateFourOptionGroup"));
const TemplateFourProductThumbnail = React.lazy(() => import("./Components/TemplateFourProductThumbnail"));
const TemplateFourQuantityAndPrice = React.lazy(() => import("./Components/TemplateFourQuantityAndPrice"));
const TemplateFourSpecifications = React.lazy(() => import("./Components/TemplateFourSpecifications"));

const TemplateFourMerchantPreview = ({ data, onClickSave, isSubmiting }) => {
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
        <div className="bg-white object-cover h-[100%] flex justify-center items-center template-four-background">
            <div className="bg-white md:w-[780px] m-2 shadow-2xl h-full md:h-auto">
                <div className="grid grid-cols-12 justify-between">
                    {/* Left Content */}
                    <div className="intro-x col-span-12 md:col-span-7  flex-grow w-full py-3 px-2 bg-white left-content">
                        <div className="p-5">
                            <h2 className="mb-4 text-xl antialiased font-semibold text-center text-gray-800 max-2-line t4-product-detail-title">
                                PRODUCT DETAIL
                            </h2>

                            <div className="intro-x col-span-12 md:col-span-12 justify-center item-center max-2-line t4-product-title break-all">
                                <div
                                    className="text-lg lg:text-2xl px-2 mb-2 text-center break-all text-slate-600"
                                    style={{ textOverflow: "ellipsis" }}>
                                    {data?.name}
                                </div>
                            </div>

                            <form className="mx-4 space-y-4 flex flex-col justify-between h-full mt-3">
                                {data && data.specifications ? (
                                    <div style={{ maxHeight: 150, overflowY: "auto" }}>
                                        <div className="min-h-[100px] flex flex-col">
                                            <div className="text-slate-600 mb-2 justify-start">Description:</div>
                                            <div className="t4-description text-slate-500 max-h-[100px] flex items-center justify-center max-4-line break-normal">
                                                {data?.description}
                                            </div>
                                        </div>
                                        <TemplateFourSpecifications data={data} />
                                    </div>
                                ) : (
                                    <div className="min-h-[100px] flex flex-col">
                                        <div className="text-slate-600 mb-2 justify-start">Description:</div>
                                        <div className="t4-description text-slate-500 max-h-[100px] flex items-center justify-center max-4-line break-normal">
                                            {data?.description}
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col mt-3">
                                    <div className="mb-3 mt-1">
                                        <label htmlFor="" className="t4-label">
                                            Email Address
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 text-sm border-b border-gray-400 pl-3 bg-grey t4-input"
                                            placeholder={"customer@example.com"}
                                            disabled
                                            readOnly
                                            style={{ borderColor: "grey" }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="t4-label">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 text-sm border-b border-gray-400 pl-3 bg-grey t4-input"
                                            placeholder={"+91 9988778855"}
                                            disabled
                                            readOnly
                                            style={{ borderColor: "grey" }}
                                        />
                                    </div>
                                    <div
                                        className="w-full px-2 py-1 mt-5 text-white rounded-full t4-pay-button min-w-[100px] flex items-center justify-center cursor-pointer"
                                        onClick={() => {
                                            if (!isSubmiting) {
                                                onClickSave();
                                            }
                                        }}>
                                        <MiniLoader size={20} css={"margin-right:10px"} isLoading={isSubmiting} />
                                        {!isSubmiting && <Icon.Save size="18" className="mr-2" />}
                                        <span className="">Save Payment Card</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-12 md:col-span-5 t4-bg-dark flex flex-col items-center shadow-md right-content">
                        <TemplateFourProductThumbnail data={data} productVariant={productVariant} />
                        <div className="flex flex-col justify-end items-center my-3 t4-price-section">
                            <TemplateFourQuantityAndPrice data={data} productVariant={productVariant} />

                            <div className="flex flex-col w-full rounded-lg">
                                <TemplateFourOptionGroup productDetails={data} onChangeSetProductVariant={onChangeSetProductVariant} />
                            </div>
                        </div>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>{" "}
        </div>
    );
};

export default TemplateFourMerchantPreview;

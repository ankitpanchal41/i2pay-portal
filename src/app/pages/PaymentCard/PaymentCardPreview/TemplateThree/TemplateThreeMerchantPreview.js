import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import * as Icon from "react-feather";
import { truncateString } from "../../../../utils/helper";

const MiniLoader = React.lazy(() => import("../../../../components/common/MiniLoader"));
const TemplateThreeOptionGroup = React.lazy(() => import("./Components/TemplateThreeOptionGroup"));
const TemplateThreeProductThumbnail = React.lazy(() => import("./Components/TemplateThreeProductThumbnail"));
const TemplateThreeQuantityAndPrice = React.lazy(() => import("./Components/TemplateThreeQuantityAndPrice"));
const TemplateThreeSpecifications = React.lazy(() => import("./Components/TemplateThreeSpecifications"));

const TemplateThreeMerchantPreview = ({ data, onClickSave, isSubmiting }) => {
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
        <div className="object-cover h-[100%] flex justify-center items-center template-three-background">
            <div className="md:w-[800px] flex flex-col mx-3 md:h-[100vh] justify-center">
                {/* HEADER */}
                <div className="flex flex-col px-5 t3-product-title">
                    <div className="color-teal text-big">You are purchasing:</div>
                    <div
                        className="text-lg mb-2 max-1-line font-bold break-all whitespace-nowrap overflow-hidden"
                        style={{ color: "#685d5d", textOverflow: "ellipsis" }}>
                        {truncateString(data?.name, 35)}
                    </div>
                </div>
                {/* HEADER */}
                <div className="shadow-lg m-2 box-bg">
                    <div className="flex justify-between t3-blocks-container">
                        {/* Left Content */}
                        <div className="intro-x">
                            <TemplateThreeProductThumbnail data={data} productVariant={productVariant} />
                            {/*<div className="text-lg px-5 mb-2 max-2-line">{data?.name}</div>*/}

                            <TemplateThreeQuantityAndPrice data={data} productVariant={productVariant} />

                            <div className="flex flex-col w-full rounded-lg">
                                <TemplateThreeOptionGroup productDetails={data} onChangeSetProductVariant={onChangeSetProductVariant} />
                            </div>
                        </div>
                        {/* End: Left Content */}
                        {/* Middle Content */}
                        <div className="intro-x flex-grow w-full bg-white shadow-2xl border-l max-w-[350px] md:w-[100%]">
                            {/*Floating Header*/}
                            <div className="absolute flex justify-center items-center header-floating-container">
                                <div className="text-xl floating-box-header-title letter-spacing-5 uppercase text-center ml-[10px]">
                                    {" "}
                                    Payment Detail
                                </div>
                            </div>
                            {/*Floating Header*/}

                            {/*Floating Body*/}
                            <div className="mx-5 space-y-6 pt-3  flex-col justify-between">
                                {data && data.specifications ? (
                                    <div style={{ maxHeight: 250, overflowY: "auto" }}>
                                        <div className="text-slate-500 max-h-[120px] justify-center  pt-3 flex flex-col">
                                            <div className="text-left color-teal font-extrabold mb-2">Description:</div>
                                            <div className="max-4-line color-teal">{data?.description}</div>
                                        </div>
                                        <TemplateThreeSpecifications data={data} />
                                    </div>
                                ) : (
                                    <div className="text-slate-500 max-h-[120px] justify-center  pt-3 flex flex-col">
                                        <div className="text-left color-teal font-extrabold mb-2">Description:</div>
                                        <div className="max-4-line color-teal">{data?.description}</div>
                                    </div>
                                )}

                                <div className="flex flex-col flex-grow h-full">
                                    <div>
                                        <label htmlFor="" className="template-3-label">
                                            Email Address
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 text-sm template-3-input"
                                            placeholder={"customer@example.com"}
                                            disabled
                                            readOnly
                                        />
                                    </div>
                                    <div className="mt-5 mb-3">
                                        <label htmlFor="" className="template-3-label">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 text-sm template-3-input"
                                            placeholder={"+91 9988778855"}
                                            disabled
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*Floating Body*/}

                            {/*Floating Footer*/}
                            <div
                                className="absolute flex justify-center items-center footer-floating-container cursor-pointer"
                                onClick={() => {
                                    if (!isSubmiting) {
                                        onClickSave();
                                    }
                                }}>
                                <div className="flex text-white/90 floating-box-footer items-center letter-spacing-5 uppercase">
                                    {/*<div className="text-xl mr-3">Pay</div>*/}
                                    <MiniLoader size={20} css={"margin-right:10px"} isLoading={isSubmiting} />
                                    {!isSubmiting && <Icon.Save size="18" className="mr-2" />}
                                    <div className="">SAVE PAYMENT CARD</div>
                                </div>
                            </div>
                            {/*Floating Footer*/}
                        </div>
                        {/* End: Middle Content */}

                        {/* Right Content */}
                        <div className="intro-x py-3 px-2 w-[0px] box-bg md:flex template-3-blank-area"></div>
                        {/* End: Right Content */}
                    </div>
                </div>
            </div>{" "}
        </div>
    );
};

export default TemplateThreeMerchantPreview;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import * as Icon from "react-feather";

const MiniLoader = React.lazy(() => import("../../../../components/common/MiniLoader"));
const TemplateTwoOptionGroup = React.lazy(() => import("./Components/TemplateTwoOptionGroup"));
const TemplateTwoProductThumbnail = React.lazy(() => import("./Components/TemplateTwoProductThumbnail"));
const TemplateTwoQuantityAndPrice = React.lazy(() => import("./Components/TemplateTwoQuantityAndPrice"));
const TemplateTwoSpecifications = React.lazy(() => import("./Components/TemplateTwoSpecifications"));

const TemplateTwoMerchantPreview = ({ data, onClickSave, isSubmiting }) => {
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
        <div
            className="object-cover h-[100vh] flex flex-col justify-center items-center template-two-background"
            style={{ backgroundImage: `url("/images/payment-card/template-two.png")`, backgroundPosition: "bottom" }}>
            {/*  Center Box  */}
            <div className="box md:w-[750px] h-auto shadow-2xl p-2 m-2 mx-5 md:mx-3" style={{ background: "#5f6876" }}>
                <div className="grid grid-cols-12">
                    {/* Left Content */}
                    <div className="intro-x col-span-12 md:col-span-6 items-center flex flex-col">
                        <div className="block md:hidden">
                            <h2 className="mb-2 text-xl antialiased font-semibold text-center text-white">You are purchasing: </h2>
                            <div className="text-lg lg:text-2xl px-5 mb-2 max-1-line text-center text-orange-500">{data?.name}</div>
                        </div>

                        <TemplateTwoProductThumbnail data={data} productVariant={productVariant} />

                        <TemplateTwoQuantityAndPrice data={data} productVariant={productVariant} />

                        <div className="flex flex-col w-full rounded-lg px-3">
                            <TemplateTwoOptionGroup productDetails={data} onChangeSetProductVariant={onChangeSetProductVariant} />
                        </div>
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-12 md:col-span-6 py-3 px-2 relative">
                        <div className="">
                            <div className="hidden md:block">
                                <h2 className="mb-2 text-xl antialiased font-semibold text-center text-white">You are purchasing: </h2>
                                <div
                                    className="text-lg lg:text-2xl px-5 mb-2 text-center text-orange-500 break-all whitespace-nowrap overflow-hidden"
                                    style={{ textOverflow: "ellipsis" }}>
                                    {data?.name}
                                </div>
                            </div>
                            <div className="mx-1 flex flex-col">
                                {data && data.specifications ? (
                                    <div style={{ maxHeight: 190, overflowY: "auto" }}>
                                        <div className="text-white mb-1">Description:</div>
                                        <div className="max-h-[100px] flex items-center break-word justify-center max-3-line text-slate-200">
                                            <em>{data?.description}</em>
                                        </div>

                                        <TemplateTwoSpecifications data={data} />
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-white mb-1">Description:</div>
                                        <div className="max-h-[100px] flex items-center break-word justify-center max-4-line text-slate-200">
                                            <em>{data?.description}</em>
                                        </div>
                                    </>
                                )}

                                <div className="space-y-1 relative">
                                    <div className=" mt-5">
                                        <input
                                            type="text"
                                            className="w-full p-2 text-sm border-b-2 border-gray-400 rounded pl-3 bg-grey t2-input"
                                            placeholder={"customer@example.com"}
                                            disabled
                                            readOnly
                                            style={{ borderColor: "grey" }}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            className="w-full p-2 text-sm border-b-2 border-gray-400 rounded pl-3 bg-grey t2-input mb-10"
                                            placeholder={"+91 9988778855"}
                                            disabled
                                            readOnly
                                            style={{ borderColor: "grey" }}
                                        />
                                    </div>

                                    <div
                                        className="w-full px-2 py-4 mt-2 text-white bg-orange-500 flex items-center justify-center cursor-pointer absolute b-[-20px]"
                                        style={{ boxShadow: "0px 3px 10px #c07c00", bottom: "-45px" }}
                                        onClick={() => {
                                            if (!isSubmiting) {
                                                onClickSave();
                                            }
                                        }}>
                                        {/*<span className="mr-2">Pay</span>*/}
                                        {/*<span className="text-xl">*/}
                                        {/*    {decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}*/}
                                        {/*    {data.amount}*/}
                                        {/*</span>*/}
                                        <MiniLoader size={20} css={"margin-right:10px"} isLoading={isSubmiting} />
                                        {!isSubmiting && <Icon.Save size="18" className="mr-2" />}
                                        <span className="">Save Payment Card</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>
            {/* Save Button */}

            {/*  END: Center Box  */}
        </div>
    );
};

export default TemplateTwoMerchantPreview;

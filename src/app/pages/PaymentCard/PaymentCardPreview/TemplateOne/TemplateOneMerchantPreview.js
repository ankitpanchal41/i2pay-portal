import React, { useEffect, useState } from "react";
import "./styles.css";
import * as Icon from "react-feather";

const MiniLoader = React.lazy(() => import("../../../../components/common/MiniLoader"));
const TemplateOneOptionGroup = React.lazy(() => import("./Components/TemplateOneOptionGroup"));
const TemplateOneProductThumbnail = React.lazy(() => import("./Components/TemplateOneProductThumbnail"));
const TemplateOneQuantityAndPrice = React.lazy(() => import("./Components/TemplateOneQuantityAndPrice"));
const TemplateOneSpecifications = React.lazy(() => import("./Components/TemplateOneSpecifications"));

const TemplateOneMerchantPreview = ({ data, onClickSave, isSubmiting }) => {
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
            className="bg-white flex justify-center items-center template-one-background object-cover h-[100vh]"
            style={{ backgroundImage: `url("/images/payment-card/template-one.png")` }}>
            <div
                className="box w-[100%] h-[100%] md:h-auto overflow-scroll shadow-lg p-4 m-10 md:m-20 lg:m-35 lg:max-w-[998px]"
                style={{ borderRadius: 20 }}>
                <div className="intro-x col-span-12 md:col-span-12 justify-center item-center">
                    <div
                        className="text-lg lg:text-2xl px-5 mb-2 text-center break-all whitespace-nowrap overflow-hidden"
                        style={{ textOverflow: "ellipsis" }}>
                        {data?.name}
                    </div>
                </div>

                <div className="grid md:grid-cols-5">
                    {/* Left Content */}
                    <div className="intro-x col-span-5 md:col-span-2 justify-center item-center p-3 lg:p-5">
                        <div className="text-center flex flex-col justify-between">
                            <TemplateOneProductThumbnail data={data} productVariant={productVariant} />

                            <TemplateOneQuantityAndPrice data={data} productVariant={productVariant} />

                            <TemplateOneOptionGroup productDetails={data} onChangeSetProductVariant={onChangeSetProductVariant} />
                        </div>
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-5 md:col-span-3 flex flex-col w-full p-3 justify-between">
                        {data && data.specifications ? (
                            <div style={{ maxHeight: 250, overflowY: "auto" }}>
                                <div className="text-slate-500">
                                    <div className="text-slate-600 mb-2">Description:</div>
                                    <div className="max-3-line">{data?.description}</div>
                                </div>
                                <TemplateOneSpecifications data={data} />
                            </div>
                        ) : (
                            <div className="text-slate-500">
                                <div className="text-slate-600 mb-2">Description:</div>
                                <div className="max-4-line">{data?.description}</div>
                            </div>
                        )}

                        <form
                            className={`mx-8 align-baseline mt-2 ${
                                data.specifications && productVariant && productVariant?.options ? "space-y-2" : "space-y-4"
                            }`}>
                            <h2 className="mb-2 text-xl antialiased font-semibold text-center text-gray-800">Payment Details</h2>

                            <div>
                                <input
                                    type="text"
                                    className="w-full p-2 text-sm border-b-2 border-gray-400 rounded pl-3 bg-grey t1-input"
                                    placeholder={"customer@example.com"}
                                    disabled
                                    readOnly
                                    style={{ borderColor: "grey" }}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="w-full p-2 text-sm border-b-2 border-gray-400 rounded pl-3 bg-white t1-input"
                                    placeholder={"+91 9988778855"}
                                    disabled
                                    readOnly
                                    style={{ borderColor: "grey" }}
                                />
                            </div>

                            <div
                                className="w-full px-2 py-4 mt-2 text-white bg-success rounded-full flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                    if (!isSubmiting) {
                                        onClickSave();
                                    }
                                }}>
                                <MiniLoader size={20} css={"margin-right:10px"} isLoading={isSubmiting} />
                                {!isSubmiting && <Icon.Save size="18" className="mr-2" />}
                                Save Payment Card
                            </div>
                        </form>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>{" "}
        </div>
    );
};

export default TemplateOneMerchantPreview;

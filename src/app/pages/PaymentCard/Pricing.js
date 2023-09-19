import React from "react";
import Input from "../../components/common/forms/Input";
import { messages } from "../../messages/merchantRegister";

const Pricing = ({ values, disableFields }) => {
    return (
        <>
            {values?.pricing_option === "0" && (
                <div className="border border-[#e3e7ed] p-10 mt-5 mx-2">
                    <h2 className="text-lg font-medium mr-auto">Pricing</h2>
                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                readOnly={disableFields}
                                type="number"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.productTitles.price}
                                name="price"
                                label={messages.productTitles.price}
                                isRequiredField
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                readOnly={disableFields}
                                type="number"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.productTitles.compare_at_price}
                                name="compare_price"
                                label={messages.productTitles.compare_at_price}
                                // isRequiredField
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                readOnly={disableFields}
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.productTitles.sku}
                                name="sku"
                                label={messages.productTitles.sku}
                                isRequiredField
                            />
                        </div>
                        <div className="intro-y col-span-12 sm:col-span-6">
                            <Input
                                readOnly={disableFields}
                                type="number"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={messages.productTitles.quantity}
                                name="quantity"
                                label={messages.productTitles.quantity}
                                isRequiredField
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Pricing;

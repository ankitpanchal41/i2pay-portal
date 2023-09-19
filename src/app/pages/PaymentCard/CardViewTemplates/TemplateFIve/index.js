import { decode } from "html-entities";
import React from "react";
import { Currency } from "../../../../utils/currency";
import "./styles.css";

const CardViewTemplateFive = ({ data }) => {
    return (
        <div className="bg-white flex justify-center items-center template-five-background h-[400px]">
            <div className="box bg-white w-[350px] shadow-2xl m-2">
                <div className="grid grid-cols-12 justify-between" style={{ backgroundColor: "#d3bcc0" }}>
                    <div className="intro-x col-span-12 justify-center item-center">
                        <div className="text-center flex flex-col shadow">
                            <div className="text-sm px-5 max-2-line t5-product-title-view flex flex-grow py-3 shadow">{data?.title}</div>
                            <div className="flex items-center t5-description p-5 text-xs">
                                <div className="max-3-line ">{data?.description}</div>
                            </div>
                        </div>
                    </div>

                    {/* Left Content */}
                    <div className="intro-x col-span-12 md:col-span-6 justify-center item-center">
                        <div className="text-center flex flex-col t5-product-left-container">
                            <div className="flex justify-center ">
                                <img src={data?.logo} className="t5-product-image-view shadow-lg bg-white" />
                            </div>
                        </div>
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-12 md:col-span-6  flex-grow w-full px-2" style={{ backgroundColor: "#d3bcc0" }}>
                        <form className="flex flex-col justify-around items-center h-full">
                            <div className="pt-2">
                                <label htmlFor="" className="t5-label text-xs">
                                    Email Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 text-xs pl-3 bg-grey t5-input"
                                    placeholder={"customer@example.com"}
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="pt-2 mb-2">
                                <label htmlFor="" className="t5-label text-xs">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 text-xs pl-3 bg-grey t5-input"
                                    placeholder={"+91 9988778855"}
                                    disabled
                                    readOnly
                                />
                            </div>

                            <div className="block w-full px-2 py-2 text-white rounded-full t5-pay-button mb-2 flex justify-center items-center">
                                <span className="mr-2 md">Pay</span>
                                <span className="t5-pay-view text-md">
                                    {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}{" "}
                                </span>
                                <span className="t5-amount-view text-md"> {data?.price || 0}.00 </span>
                            </div>
                        </form>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>{" "}
        </div>
    );
};

export default CardViewTemplateFive;

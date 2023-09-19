import React, { useEffect, useState } from "react";
import "./styles.css";
import { decode } from "html-entities";
import { Currency } from "../../../../utils/currency";

const CardViewTemplateTwo = ({ data }) => {
    return (
        <div
            className="flex flex-col justify-center items-center template-two-background h-[400px]"
            style={{ backgroundImage: `url("/images/payment-card/template-two.png")`, backgroundPosition: "bottom" }}>
            {/*  Center Box  */}
            <form action="">
                <div className="box w-[350px] shadow-2xl p-2 m-2" style={{ background: "#5f6876" }}>
                    <div className="grid grid-cols-12">
                        {/* Left Content */}
                        <div className="intro-x col-span-12 md:col-span-5 items-center flex">
                            <div className="flex justify-center item-center relative t2-product-image-container-view shadow-2xl">
                                <img src={data?.logo} className="t2-product-image-view bg-white" />
                            </div>
                        </div>
                        {/* End: Left Content */}
                        {/* Right Content */}
                        <div className="intro-x col-span-12 md:col-span-7 py-3 px-2 relative">
                            <div className="">
                                <h2 className="mb-4 text-sm antialiased font-semibold text-center text-white">You are purchasing: </h2>
                                <div className="mx-1 flex flex-col justify-between">
                                    <div className="max-2-line font-bold text-sm text-center text-orange-500">{data?.title}</div>
                                    <div className="mb-1 text-xs flex items-center break-word justify-center max-3-line text-slate-200">
                                        <em>{data?.description}</em>
                                    </div>
                                    <div className="space-y-4 relative">
                                        <div>
                                            <input
                                                type="text"
                                                className="w-full p-2 text-xs border-b-2 border-gray-400 rounded pl-3 bg-grey mt-3"
                                                placeholder={"customer@example.com"}
                                                disabled
                                                readOnly
                                                style={{ borderColor: "grey" }}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                className="w-full p-2 text-xs border-b-2 border-gray-400 rounded pl-3 bg-grey mb-10"
                                                placeholder={"+91 9988778855"}
                                                disabled
                                                readOnly
                                                style={{ borderColor: "grey" }}
                                            />
                                        </div>

                                        <div
                                            className="block w-full px-2 py-4 mt-2 text-white bg-orange-500 flex items-center justify-center absolute b-[-45px]"
                                            style={{ boxShadow: "0px 3px 10px #c07c00", bottom: "-45px" }}>
                                            <span className="mr-2 md">Pay</span>
                                            <span className="text-md">
                                                {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}
                                                {data?.price || 0}.00
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End: Right Content */}
                    </div>
                </div>
                {/* Save Button */}
            </form>
            {/*  END: Center Box  */}
        </div>
    );
};

export default CardViewTemplateTwo;

import React, { useEffect, useState } from "react";
import "./styles.css";
import { decode } from "html-entities";
import { Currency } from "../../../../utils/currency";

const CardViewTemplateOne = ({ data }) => {
    return (
        <div
            className="bg-white flex justify-center items-center template-one-background h-[400px]"
            style={{ backgroundImage: `url("/images/payment-card/template-one.png")` }}>
            <div className="box bg-white w-[350px] shadow-lg p-2 m-2" style={{ borderRadius: 20 }}>
                <div className="grid grid-cols-12 justify-between">
                    {/* Left Content */}
                    <div className="intro-x col-span-12 md:col-span-5 justify-center item-center">
                        <div className="text-center flex flex-col justify-between flex-grow">
                            <div className="p-2 flex justify-center min-h-[100px] relative">
                                <img src={data?.logo} />
                            </div>
                            <div className="text-xs px-5 mb-2 max-2-line">{data?.title}</div>
                            <div className="text-sm text-center">
                                {decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}
                                {data.price}
                            </div>
                        </div>
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-12 md:col-span-7  flex-grow w-full px-2 bg-white">
                        <div className="">
                            <h2 className="mb-4 text-sm antialiased font-semibold text-center text-gray-800">Payment Details</h2>
                            <form className="">
                                <div className="description text-xs text-slate-500 mb-1 flex items-center justify-center max-4-line">
                                    {data?.description}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="w-full p-2 text-xs border-b-2 border-gray-400 rounded pl-3 bg-grey t1-input"
                                        placeholder={"customer@example.com"}
                                        disabled
                                        readOnly
                                        style={{ borderColor: "grey" }}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="w-full p-2 text-xs border-b-2 border-gray-400 rounded pl-3 bg-white t1-input"
                                        placeholder={"+91 9988778855"}
                                        disabled
                                        readOnly
                                        style={{ borderColor: "grey" }}
                                    />
                                </div>

                                <div className="block w-full px-2 py-1 mt-3 text-white bg-success rounded-full flex items-center justify-center">
                                    Pay
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>{" "}
        </div>
    );
};

export default CardViewTemplateOne;

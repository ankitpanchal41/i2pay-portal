import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { decode } from "html-entities";
import { Currency } from "../../../../utils/currency";

const CardViewTemplateFour = ({ data }) => {
    const { mode } = useSelector((state) => state.persist);

    return (
        <div className="bg-white flex justify-center items-center template-four-background h-[400px]">
            <div className="bg-white w-[350px] m-2 shadow-2xl">
                <div className="grid grid-cols-12 justify-between">
                    {/* Left Content */}
                    <div className="intro-x col-span-12 md:col-span-7  flex-grow w-full py-3 px-2 bg-white left-content">
                        <div className="">
                            <h2 className="mb-4 text-md antialiased font-semibold text-center text-gray-800 max-2-line t4-product-detail-title">
                                PRODUCT DETAIL
                            </h2>
                            <form className="mx-4 space-y-4 flex flex-col justify-between h-full">
                                <div className=" items-center flex">
                                    <div className="text-xs t4-description text-slate-500 max-h-[100px] flex items-center justify-center max-4-line break-normal">
                                        {data?.description}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <div className="mb-1">
                                        <label htmlFor="" className="t4-label text-xs">
                                            Email Address
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 text-xs border-b border-gray-400 pl-3 bg-grey t4-input"
                                            placeholder={"customer@example.com"}
                                            disabled
                                            readOnly
                                            style={{ borderColor: "grey" }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="t4-label text-xs">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 text-xs border-b border-gray-400 pl-3 bg-grey t4-input"
                                            placeholder={"+91 9988778855"}
                                            disabled
                                            readOnly
                                            style={{ borderColor: "grey" }}
                                        />
                                    </div>
                                    <div className=" block w-full py-2 text-white rounded-full t4-pay-button min-w-[100px] flex items-center justify-center cursor-pointer">
                                        <span className="">Pay</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-12 md:col-span-5 t4-bg-dark flex justify-around flex-col items-center shadow-md right-content">
                        <div className="t4-product-image">
                            <img src={data?.logo} className="t4-bg-dark shadow-xl" />
                        </div>
                        <div className="flex flex-col justify-end items-center my-3 t4-price-section">
                            <h2 className="mb-4 text-xs antialiased font-semibold text-center  max-2-line t4-product-title-view">
                                {data?.title}
                            </h2>

                            <div className="t4-total-title-view text-sm">Total</div>
                            <div className="flex flex-row items-center justify-center mb-2 text-sm">
                                <span className="t4-currency-view mr-1">
                                    {decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}
                                </span>
                                <span className="t4-price-view">{data.price}</span>
                            </div>
                        </div>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>{" "}
        </div>
    );
};

export default CardViewTemplateFour;

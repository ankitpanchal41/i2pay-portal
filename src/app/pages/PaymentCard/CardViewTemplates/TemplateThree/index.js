import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { decode } from "html-entities";
import { Currency } from "../../../../utils/currency";
import { truncateString } from "../../../../utils/helper";

const CardViewTemplateThree = ({ data }) => {
    const { mode } = useSelector((state) => state.persist);

    return (
        <div className="flex justify-center items-center template-three-background-view h-[400px]">
            <div className="w-[512px] flex flex-col ">
                {/* HEADER */}
                <div className="flex flex-col px-5 t3-product-title">
                    <div className="color-teal text-xs text-big">You are purchasing:</div>
                    <div className="text-xs mb-2 max-1-line font-bold" style={{ color: "#685d5d" }}>
                        {truncateString(data?.title, 30)}
                    </div>
                </div>
                {/* HEADER */}
                <div className="shadow-lg m-2 box-bg">
                    <div className="flex justify-between t3-blocks-container">
                        {/* Left Content */}
                        <div className="intro-x">
                            <div className="flex flex-grow h-[200px] w-[200px] t3-product-image">
                                <img src={data?.logo} />
                            </div>
                        </div>
                        {/* End: Left Content */}
                        {/* Middle Content */}
                        <div className="intro-x flex-grow w-full bg-white shadow-2xl border-l">
                            <form>
                                <div className="flex flex-col relative">
                                    {/*Floating Header*/}
                                    <div className="absolute flex justify-center items-center header-floating-container-view">
                                        <div className="text-md floating-box-header-title letter-spacing-5 uppercase text-center ml-[10px]">
                                            {" "}
                                            Payment Detail
                                        </div>
                                    </div>
                                    {/*Floating Header*/}

                                    {/*Floating Body*/}
                                    <div className="pt-1 h-[200px] flex flex-col justify-around px-2">
                                        <div className="text-slate-500 max-h-[120px] flex justify-center flex flex-col">
                                            <div className="text-left color-teal font-extrabold mb-1 text-xs mt-1">Description:</div>
                                            <div className="max-3-line color-teal text-xs mb-1">{data?.description}</div>
                                        </div>

                                        <div>
                                            <div>
                                                <label htmlFor="" className="template-3-label">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full p-1 text-xs template-3-input"
                                                    placeholder={"customer@example.com"}
                                                    disabled
                                                    readOnly
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label htmlFor="" className="template-3-label">
                                                    Mobile Number
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full p-1 text-xs template-3-input"
                                                    placeholder={"+91 9988778855"}
                                                    disabled
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/*Floating Body*/}

                                    {/*Floating Footer*/}
                                    <div className="absolute flex justify-center items-center footer-floating-container-view ">
                                        <div className="flex text-white/90 floating-box-footer items-center letter-spacing-5 uppercase">
                                            <div className="text-md mr-3">Pay</div>
                                            <div className="text-md">
                                                {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}
                                                {data?.price || 0}.00
                                            </div>
                                        </div>
                                    </div>
                                    {/*Floating Footer*/}
                                </div>
                            </form>
                        </div>
                        {/* End: Middle Content */}

                        {/* Right Content */}
                        <div className="intro-x flex-grow w-full py-3 px-2 w-[50px] box-bg md:flex template-3-blank-area"></div>
                        {/* End: Right Content */}
                    </div>
                </div>
            </div>{" "}
        </div>
    );
};

export default CardViewTemplateThree;

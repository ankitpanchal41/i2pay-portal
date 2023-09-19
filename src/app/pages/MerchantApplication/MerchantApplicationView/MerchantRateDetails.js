import React from "react";
import * as Icon from "react-feather";
import Box from "../../../components/common/Box";

const MerchantRateDetails = ({ data }) => {
    return (
        <div className="intro-y">
            <Box header={`Merchant Partners Rate`}>
                <div className="p-1 grid md:grid-cols-12 gap-2">
                    <div className={`mt-5 md:mt-0 col-span-12 md:col-span-6 lg:col-span-${data?.volumes?.length > 0 ? "4" : "6"}`}>
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <span className="text-[14px] text-[#3B4863] font-bold">MDR/TDR</span>
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Credit Cards(Domestic) :{" "}
                                <span className="font-semibold">{data?.credit_cards_domestic} %</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Credit Card(International) :{" "}
                                <span className="font-semibold">{data?.credit_card_international} %</span>
                                <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Debit Cards :{" "}
                                <span className="font-semibold">{data?.debit_cards} %</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Debit Cards (Rupay Cards) :{" "}
                                <span className="font-semibold">{data?.debit_cards_rupay_cards} %</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Net Banking :{" "}
                                <span className="font-semibold">{data?.net_banking}</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> UPI : <span className="font-semibold">{data?.upi}</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Wallet : <span className="font-semibold">{data?.wallet} %</span>{" "}
                                <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Prepaid Cards/Virtual Cards :{" "}
                                <span className="font-semibold">{data?.prepaid_virtual_cards} %</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> EMI : <span className="font-semibold">{data?.emi} %</span>
                                <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> BNPL : <span className="font-semibold">{data?.bnpl} %</span>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className={`mt-5 md:mt-0 col-span-12 md:col-span-6 lg:col-span-${data?.volumes?.length > 0 ? "4" : "6"}`}>
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <span className="text-[14px] text-[#3B4863] font-bold">Fees</span>
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Transaction Fee :{" "}
                                <span className="font-semibold">₹ {data?.transaction_fee}</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Setup Fee :{" "}
                                <span className="font-semibold">₹ {data?.setup_fee}</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Gateway Direct Fee :{" "}
                                <span className="font-semibold">₹ {data?.gateway_direct_fee}</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Gateway Monthly Fee :{" "}
                                <span className="font-semibold">₹ {data?.gateway_monthly_fee}</span> <br />
                            </div>
                            <div className="col-span-12 lg:col-span-12 text-[14px]">
                                <i className="fa fa-check text-info"></i> Gateway Transaction Fee :{" "}
                                <span className="font-semibold">₹ {data?.gateway_transaction_fee}</span> <br />
                            </div>
                        </div>
                    </div>
                    {data?.volumes?.length > 0 && (
                        <div className="mt-5 md:mt-0 col-span-12 md:col-span-6 lg:col-span-4">
                            <div className="grid grid-cols-12 gap-2">
                                <div className="col-span-12 lg:col-span-12 text-[14px]">
                                    <span className="text-[14px] text-[#3B4863] font-bold">Volume Dependent Transaction charge</span>
                                </div>
                                {data?.volumes?.map((item, index) => {
                                    return (
                                        <div key={index} className="col-span-12 lg:col-span-12 text-[14px]">
                                            <i className="fa fa-check text-info"></i> {item?.volume} :{" "}
                                            <span className="font-semibold">{item?.volume_description}</span> <br />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </Box>
        </div>
    );
};

export default MerchantRateDetails;

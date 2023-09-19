import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Heading from "../../../components/common/Heading";
import { useNavigate, useParams } from "react-router-dom";
import { settlementsPreviewData } from "../../../redux/services/MidAPI";
import { Currency } from "../../../utils/currency";
import { decode } from "html-entities";

const DefaultPayoutPreview = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [pageData, setPageData] = useState(false);

    const { connectorId, settlementId } = useParams();

    useEffect(() => {
        settlements();
    }, []);

    const settlements = async () => {
        setIsLoading(true);
        const data = await settlementsPreviewData(connectorId, settlementId);

        if (data?.responseCode === 200) {
            setPageData(data?.data);
        }

        setIsLoading(false);
    };

    const onClickBack = () => {
        navigate(`/default-payout-report/${connectorId}`);
    };

    const _renderHeading = () => {
        return <Heading title={"Default Payout Preview"} onClickBack={onClickBack} />;
    };

    return (
        <div className="content">
            {/* BEGIN: Heading */}
            {_renderHeading()}
            {/* END: Heading */}
            <div className="overflow-x-auto scrollbar-hidden">
                <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                    <div className="intro-y box-without-margin-padding">
                        {isLoading ? (
                            <div className="flex justify-center min-h-[300px] items-center col-span-12">
                                <ClipLoader
                                    loading={true}
                                    color="#1e3a8a"
                                    size={55}
                                    css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                />
                            </div>
                        ) : (
                            <div className="min-h-[300px]">
                                <div className="grid grid-cols-12 border-b border-[#e3e7ed] p-10">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="text-[#677793] text-[16px] mb-2">Sattlement ID</div>
                                        <div className="text-[16px]">{pageData?.settlement_id}</div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 md:flex flex-col items-end mt-5 md:mt-0">
                                        {pageData?.settlement_status === "Success" ? (
                                            <span className="py-1 px-4 rounded-full text-xs bg-success text-white cursor-pointer font-medium mb-2">
                                                {pageData?.settlement_status}
                                            </span>
                                        ) : (
                                            <span className="py-1 px-4 rounded-full text-xs bg-danger text-white cursor-pointer font-medium  mb-2">
                                                {pageData?.settlement_status}
                                            </span>
                                        )}

                                        <div className="text-[16px]">
                                            {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                            {pageData?.settled_amount}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-[#e3e7ed] p-10">
                                    <div className="text-[16px] mb-4 font-semibold">Sattlement Details</div>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="text-[#677793] text-[16px] mb-2">
                                                Type: <span className="text-[#3B4863]">{pageData?.settlement_type}</span>
                                            </div>
                                            <div className="text-[#677793] text-[16px] mb-2">
                                                UTR No: <span className="text-[#3B4863]">{pageData?.utr_no}</span>
                                            </div>
                                            <div className="text-[#677793] text-[16px] mb-2">
                                                Settled on: <span className="text-[#3B4863]">{pageData?.settlement_time}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6"></div>
                                    </div>
                                </div>
                                <div className="border border-[#e3e7ed] p-10">
                                    <div className="text-[16px] mb-4 font-semibold">Net Settlement Break-Up</div>
                                    <div className="border border-[#e3e7ed] rounded-lg">
                                        <div className="grid grid-cols-12 p-5 border-b border-[#e3e7ed] bg-[#1E3A8A] text-[#FFFFFF]">
                                            <div className="col-span-6">Event</div>
                                            <div className="col-span-3">Event Type</div>
                                            <div className="col-span-3">Amount</div>
                                        </div>
                                        <div className="grid grid-cols-12 p-5 border-b border-[#e3e7ed]">
                                            <div className="col-span-6">Payment</div>
                                            <div className="col-span-3">Credit</div>
                                            <div className="col-span-3 text-success">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.payment_amount}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 p-5 border-b border-[#e3e7ed]">
                                            <div className="col-span-6">Service Charges)</div>
                                            <div className="col-span-3">Debit</div>
                                            <div className="col-span-3 text-danger">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.service_charge}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 p-5 bg-[#00B8D4] text-[#FFFFFF]">
                                            <div className="col-span-9">Net Settled Amount</div>
                                            <div className="col-span-3">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.settled_amount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultPayoutPreview;

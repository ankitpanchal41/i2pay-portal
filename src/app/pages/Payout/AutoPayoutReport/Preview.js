import React, { useEffect, useState } from "react";
import Images from "../../../../assets/images";
import { getAutoPayoutDetailData } from "../../../redux/services/AutoPayoutReports";
import { useNavigate, useParams } from "react-router";
import PlaceholderLoading from "react-placeholder-loading";
import { Currency } from "../../../utils/currency";
import { decode } from "html-entities";
import moment from "moment";
import Heading from "../../../components/common/Heading";

const AutoPayoutPreview = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [pageData, setPageData] = useState({});
    const { payoutId } = useParams();

    useEffect(() => {
        getPayoutDetail();
    }, []);

    const getPayoutDetail = async () => {
        setIsLoading(true);
        const data = await getAutoPayoutDetailData(payoutId);

        if (data?.responseCode === 200) {
            setPageData(data?.data);
        } else {
            navigate("/auto-payout-report");
        }
        setIsLoading(false);
    };

    const _renderHeading = () => {
        return (
            <Heading
                onClickBack={() => {
                    navigate(`/auto-payout-report`);
                }}
                title={"Auto Payout"}
                // onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton
            />
        );
    };

    return (
        <div className="content">
            <div className="flex justify-center">
                <div className="w-full max-w-[1000px] p-0">
                    {/* BEGIN: Heading */}
                    {_renderHeading()}
                    {/* END: Heading */}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="border border-[#e3e7ed] w-full max-w-[1000px] mb-12 p-0 rounded shadow-lg">
                    <div className="h-[10px] bg-primary w-full"></div>
                    <div className="m-6 flex items-center justify-between">
                        <img src={Images.LogoPrimary} className="h-[60px]" />
                        {pageData?.payout_payment_data?.length > 0 && Number(pageData?.amount) > 0 ? (
                            <button
                                onClick={() => {
                                    navigate(`/retry-payout/${pageData?.id}`);
                                }}
                                className="bg-primary py-2 px-4 text-sm font-medium text-white bg--[#FFFFFF] max-h-[38px] rounded-l flex items-center">
                                <span className="hidden md:block lg:block text-[14px]">Retry Payout</span>
                            </button>
                        ) : null}

                        {/* {pageData?.status && (
                        <div>
                            {pageData?.status === 0 ? (
                                <span className="py-1 px-4 rounded-full text-md bg-warning text-white cursor-pointer font-medium">
                                    Pending
                                </span>
                            ) : pageData?.status === 1 ? (
                                <span className="py-1 px-4 rounded-full text-md bg-success text-white cursor-pointer font-medium">
                                    Success
                                </span>
                            ) : pageData?.status === 2 ? (
                                <span className="py-1 px-4 rounded-full text-md bg-danger text-white cursor-pointer font-medium">
                                    Failed
                                </span>
                            ) : pageData?.status === 3 ? (
                                <span className="py-1 px-4 rounded-full text-md bg-warning text-white cursor-pointer font-medium">
                                    Inprogress
                                </span>
                            ) : null}
                        </div>
                    )} */}
                    </div>
                    <div className="p-6 my-6 flex justify-between items-end bg-[#1E3A8A] text-[#FFFFFF] ">
                        <div>
                            {isLoading ? (
                                <>
                                    <div className="mb-1">
                                        <PlaceholderLoading colorStart="#FFFFFF" shape="rect" width={200} height={10} />
                                    </div>
                                    {/* <div className="mb-1">
                                    <PlaceholderLoading colorStart="#FFFFFF" shape="rect" width={200} height={10} />
                                </div> */}
                                    <PlaceholderLoading colorStart="#FFFFFF" shape="rect" width={200} height={10} />
                                </>
                            ) : (
                                <>
                                    <div className="text-[16px]">TO</div>
                                    <div className="text-[16px] font-bold uppercase">{pageData?.company_name}</div>
                                    {/* <div className="text-[16px] font-bold uppercase">122279059</div> */}
                                </>
                            )}
                        </div>
                        <div>
                            {isLoading ? (
                                <>
                                    <div className="mb-1">
                                        <PlaceholderLoading colorStart="#FFFFFF" shape="rect" width={200} height={10} />
                                    </div>
                                    <PlaceholderLoading colorStart="#FFFFFF" shape="rect" width={200} height={10} />
                                </>
                            ) : (
                                <>
                                    <div className="text-[16px] font-bold">
                                        Settlement Date:{" "}
                                        <span className="font-normal">
                                            {pageData?.start_date} TO {pageData?.end_date}
                                        </span>
                                    </div>
                                    <div className="text-[16px] font-bold">
                                        Settlement No: <span className="font-normal">{pageData?.invoice_no}</span>
                                    </div>
                                    {pageData?.payout_gateway_id ? (
                                        <div className="text-[16px] font-bold">
                                            Payout Gateway ID: <span className="font-normal">{pageData?.payout_gateway_id}</span>
                                        </div>
                                    ) : null}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mx-4 mb-6">
                        <div className="mb-4">
                            {pageData?.payout_payment_data?.map((item, index) => {
                                const fields = JSON.parse(item?.payout_mode_data);
                                return (
                                    <div
                                        className={`flex justify-between min-h-[100px] px-[20px] ${
                                            pageData?.payout_payment_data?.length === index + 1 ? "" : "border-b"
                                        }`}>
                                        <div className="flex">
                                            <div className="w-[100px] mt-[20px]">
                                                {moment(item?.created_at).format("Do MMM YYYY")} <br />
                                                {moment(item?.created_at).format("hh:MM A")}
                                            </div>
                                            <div
                                                className={`border-r mx-8 border-[#a6a7b0] relative ${index === 0 ? "mt-[20px]" : ""} ${
                                                    pageData?.payout_payment_data?.length === index + 1 ? "h-[50px]" : ""
                                                }`}>
                                                <div
                                                    className={`w-[14px] h-[14px] bg-[#a6a7b0] rounded-full absolute left-[-7px]  ${
                                                        index === 0 ? "top-[0px]" : "top-[20px]"
                                                    } ${pageData?.payout_payment_data?.length === index + 1 ? "top-[50px]" : ""}`}
                                                />
                                            </div>
                                            <div className="my-[20px]">
                                                <div className="font-black text-[16px]">{item?.connector_name}</div>
                                                <div className="mt-1">
                                                    {Object.keys(fields)?.map((key) => {
                                                        if (key === "connector_id" || key === "mode_type") {
                                                            return null;
                                                        } else {
                                                            return (
                                                                <div>
                                                                    <span className="uppercase">{key?.replace("_", " ")}</span>:{" "}
                                                                    {fields?.[key]}
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                    {/* <div className="">ACCOUNT NUMBER: 900900900900</div>
                                                <div className="">IFSC CODE: UTIB0002951</div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-[20px] flex">
                                            <div
                                                className={`mr-4 font-black text-[16px] mt-[5px] ${
                                                    item?.status === 1
                                                        ? "text-[#38b15d]"
                                                        : item?.status === 2
                                                        ? "text-[#ce505d]"
                                                        : item?.status === 3 || item?.status === 0
                                                        ? "text-[#fbb014]"
                                                        : ""
                                                }`}>
                                                ₹{item?.amount}
                                            </div>
                                            {item?.status === 1 ? (
                                                <div className="bg-[#38b15d40] px-3 py-1 rounded text-[#38b15d] font-black h-fit">
                                                    Success
                                                </div>
                                            ) : item?.status === 2 ? (
                                                <div className="bg-[#ce505d40] px-3 py-1 rounded text-[#ce505d] font-black h-fit">
                                                    Failed
                                                </div>
                                            ) : item?.status === 3 || item?.status === 0 ? (
                                                <div className="bg-[#fbb01440] px-3 py-1 rounded text-[#fbb014] font-black h-fit">
                                                    In Progress
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <table className="table table-report">
                            <thead>
                                <tr>
                                    <th className="font-bold">Summary</th>
                                    <th className="font-bold">Tally</th>
                                    <th className="font-bold">Capital</th>
                                </tr>
                            </thead>
                            <tbody className="font-normal">
                                {isLoading ? (
                                    <>
                                        <tr className="h-[45px]">
                                            <td>
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                        <tr className="h-[45px]">
                                            <td>
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                        <tr className="h-[45px]">
                                            <td>
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                        <tr className="h-[45px]">
                                            <td>
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                        <tr className="h-[45px]">
                                            <td>
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                        <tr className="h-[45px]">
                                            <td>
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                        <tr className="h-[45px]">
                                            <td>
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                        <tr className="h-[45px]">
                                            <td>
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                            <td>
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                        <tr className="h-[45px]">
                                            <td className="payout-success">
                                                <PlaceholderLoading shape="rect" width={200} height={10} />
                                            </td>
                                            <td className="payout-success"></td>
                                            <td className="payout-success">
                                                <PlaceholderLoading shape="rect" width={50} height={10} />
                                            </td>
                                        </tr>
                                    </>
                                ) : (
                                    <>
                                        <tr>
                                            <td>Successful Transactions</td>
                                            <td>{pageData?.approve_transaction_count}</td>
                                            <td>
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.approve_transaction_sum || "0.00"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Decline Transactions</td>
                                            <td>{pageData?.declined_transaction_count}</td>
                                            <td>
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.declined_transaction_sum || "0.00"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Refunds Transactions</td>
                                            <td>{pageData?.refund_transaction_count}</td>
                                            <td className="text-danger">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.refund_transaction_sum || "0.00"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Chargeback Transactions</td>
                                            <td>{pageData?.chargeback_transaction_count}</td>
                                            <td className="text-danger">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.chargeback_transaction_sum || "0.00"}
                                            </td>
                                        </tr>
                                        {/* <tr>
                                        <td>Suspicious Transactions</td>
                                        <td>{pageData?.flagged_transaction_count}</td>
                                        <td className="text-danger">
                                            {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                            {pageData?.flagged_transaction_sum || "0.00"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Retrieval Transactions</td>
                                        <td>{pageData?.retrieval_transaction_count}</td>
                                        <td className="text-danger">
                                            {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                            {pageData?.retrieval_transaction_sum || "0.00"}
                                        </td>
                                    </tr> */}
                                        <tr>
                                            <td>Total Transactions</td>
                                            <td>{pageData?.total_transaction_count}</td>
                                            <td>
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.total_transaction_sum || "0.00"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Total Transactions Fee</td>
                                            <td>{pageData?.transaction_fee_paercentage}</td>
                                            <td className="text-danger">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.transaction_fee || "0.00"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Refund Fee</td>
                                            <td>{pageData?.refund_fee_paercentage}</td>
                                            <td className="text-danger">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.refund_fee || "0.00"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Chargeback Fee</td>
                                            <td>{pageData?.chargebacks_fee_paercentage}</td>
                                            <td className="text-danger">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.chargeback_fee || "0.00"}
                                            </td>
                                        </tr>
                                        {/* <tr>
                                        <td>Suspicious Fee</td>
                                        <td>{pageData?.flagged_fee_paercentage}</td>
                                        <td className="text-danger">
                                            {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                            {pageData?.flagged_fee || "0.00"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Retrieval Fee</td>
                                        <td>{pageData?.retrieval_fee_paercentage}</td>
                                        <td className="text-danger">
                                            {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                            {pageData?.retrieval_fee || "0.00"}
                                        </td>
                                    </tr> */}
                                        {/* <tr>
                                        <td>Rolling Reserve Fee</td>
                                        <td>{pageData?.rolling_reserve_paercentage}</td>
                                        <td className="text-danger">
                                            {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                            {pageData?.rolling_reserve || "0.00"}
                                        </td>
                                    </tr> */}
                                        <tr>
                                            <td className="payout-success font-bold">Total Payout</td>
                                            <td className="payout-success"></td>
                                            <td className="payout-success font-bold">
                                                {decode(Currency.find((c) => c?.value === pageData?.currency)?.symbol)}
                                                {pageData?.net_settlement_amount || "0.00"}
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoPayoutPreview;

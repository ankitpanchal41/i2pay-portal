import React, { useEffect, useState } from "react";
import Heading from "../../../components/common/Heading";
import { useNavigate, useParams } from "react-router";
import { settlementsData } from "../../../redux/services/MidAPI";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import { decode } from "html-entities";
import { Currency } from "../../../utils/currency";
import * as Icon from "react-feather";

const DefaultPayoutReportsDetail = () => {
    const navigate = useNavigate();
    const { connectorId } = useParams();

    const [isLoading, setIsLoading] = useState("");
    const [pageData, setPageData] = useState([]);

    const onClickBack = () => {
        navigate(`/default-payout-report`);
    };

    const _renderHeading = () => {
        return <Heading title={"Default Payout Report Detail"} onClickBack={onClickBack} />;
    };

    useEffect(() => {
        settlements();
    }, []);

    const settlements = async () => {
        setIsLoading(true);
        const data = await settlementsData(connectorId);

        if (data?.responseCode === 200) {
            setPageData(data?.data);
        }

        setIsLoading(false);
    };

    const onClickPreview = (id) => {
        navigate(`/default-payout-preview/${connectorId}/${id}`);
    };

    const _renderTable = () => {
        return (
            <>
                {/* START: IP whitelist Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Settlement Id</th>
                            <th className="whitespace-nowrap">Settled Amount</th>
                            <th className="whitespace-nowrap">Service Charge</th>
                            <th className="whitespace-nowrap">Service Tax</th>
                            <th className="whitespace-nowrap">Payment From</th>
                            <th className="whitespace-nowrap">Payment Till</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={7}>
                                    <div className="flex justify-center h-48 items-center">
                                        <ClipLoader
                                            loading={true}
                                            color="#1e3a8a"
                                            size={55}
                                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="font-normal">
                            {pageData?.map((item, index) => {
                                return (
                                    <tr
                                        className="intro-x cursor-pointer"
                                        key={index}
                                        onClick={() => {
                                            onClickPreview(item?.settlement_id);
                                        }}>
                                        <td className="w-20">{index + 1}</td>
                                        <td>
                                            {item?.settlement_id ? (
                                                item?.settlement_id
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            {item?.settlement_charge ? (
                                                `${decode(Currency.find((c) => c?.value === item?.currency)?.symbol)} ${
                                                    item?.settlement_charge
                                                }`
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            {item?.service_charge ? (
                                                `${decode(Currency.find((c) => c?.value === item?.currency)?.symbol)} ${
                                                    item?.service_charge
                                                }`
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            {item?.service_tax ? (
                                                `${decode(Currency.find((c) => c?.value === item?.currency)?.symbol)} ${item?.service_tax}`
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>

                                        <td>
                                            {item?.payment_from ? (
                                                moment(item?.payment_from).format("DD/MM/YYYY hh:MM A")
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            {item?.payment_till ? (
                                                moment(item?.payment_till).format("DD/MM/YYYY hh:MM A")
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            <div
                                                className={
                                                    "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5"
                                                }>
                                                <Icon.Eye
                                                    onClick={() => {
                                                        onClickPreview(item?.settlement_id);
                                                    }}
                                                    size={15}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {!isLoading && pageData?.length === 0 && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: IP whitelist Table */}
            </>
        );
    };

    return (
        <div className="content">
            {/* BEGIN: Heading */}
            {_renderHeading()}
            {/* END: Heading */}
            <div className="intro-y grid grid-cols-12 gap-5">
                <div className="intro-y col-span-12">{_renderTable()}</div>
            </div>
        </div>
    );
};

export default DefaultPayoutReportsDetail;

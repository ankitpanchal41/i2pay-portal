import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { getWebhookLogsRequest } from "../../../redux/actions/Webhook";
import * as Icon from "react-feather";
import WebhookTest from "./WebhookTest";
import ReactJson from "react-json-view";
import PrintWebhookTopicsLabels from "../../../components/common/status/PrintWebhookTopicsLabels";
import WebhookTestReloadLogs from "./WebhookTestReloadLogs";

const WebhookLogsTable = ({ isLogsLoading = false, subscribedEventOptions }) => {
    const dispatch = useDispatch();
    const { webhookId } = useParams();
    const { webhookLogs, totalPage } = useSelector((state) => state.webhook);
    const [isLogsLoadingState, setIsLogsLoadingState] = useState(false);
    const [isVisibleReloadLogs, setIsVisibleReloadLogs] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    const [logDetails, setLogDetails] = useState({});
    const { mode } = useSelector((state) => state.persist);

    const onChangePage = () => {
        setCurrentPage(currentPage + 1);
        setIsLogsLoadingState(true);
        dispatch(
            getWebhookLogsRequest(
                currentPage + 1,
                perPage,
                () => {
                    setIsLogsLoadingState(false);
                },
                { id: webhookId },
            ),
        );
    };

    useEffect(() => {
        if (webhookLogs.length > 0) {
            const newLogDetail = webhookLogs[0];
            setLogDetails(newLogDetail);
        }
    }, [webhookLogs]);

    const onRefetchLogs = () => {
        setIsVisibleReloadLogs(true);
    };

    const onReloadDataRefetchLogs = () => {
        setIsLogsLoadingState(true);
        dispatch(
            getWebhookLogsRequest(
                currentPage,
                perPage,
                () => {
                    setIsLogsLoadingState(false);
                },
                { id: webhookId },
            ),
        );
    };

    return (
        <>
            {/* BEGIN: Content */}
            {isLogsLoading ? (
                <div className="flex justify-center h-48 items-center">
                    <ClipLoader
                        loading={true}
                        color="#1e3a8a"
                        size={35}
                        css="border-width: 3px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                    />
                </div>
            ) : (
                <>
                    {webhookLogs && webhookLogs.length ? (
                        <>
                            <div className="grid grid-cols-2 mt-4">
                                {/* Topics Table */}
                                <div className="overflow-hidden rounded">
                                    <table className="min-w-full border">
                                        <thead className="border-b">
                                            <tr className="bg-[#1E3A8A]">
                                                <th scope="col" className="text-[#FFFFFF] text-[14px] font-medium px-6 py-2 text-left">
                                                    #
                                                </th>
                                                <th scope="col" className="text-[#FFFFFF] text-[14px] font-medium px-6 py-2 text-left">
                                                    Name
                                                </th>
                                                <th scope="col" className="text-[#FFFFFF] text-[14px] font-medium px-6 py-2 text-left">
                                                    Created At
                                                </th>
                                                <th scope="col" className="text-[#FFFFFF] text-[14px] font-medium px-6 py-2 text-center">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {webhookLogs?.map((item, index) => {
                                                return (
                                                    <tr
                                                        className={`border-b cursor-pointer ${
                                                            logDetails?.id === item?.id ? "bg-[#F4F5F8]" : ""
                                                        }`}
                                                        key={index}>
                                                        <td
                                                            onClick={() => setLogDetails(item)}
                                                            className="px-6 py-3 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                            {index + 1}
                                                        </td>
                                                        <td
                                                            onClick={() => setLogDetails(item)}
                                                            className="px-6 py-3 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                            {item.topic}
                                                        </td>
                                                        <td
                                                            onClick={() => setLogDetails(item)}
                                                            className="px-6 py-3 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                            {item.request_time}
                                                        </td>
                                                        <td onClick={() => setLogDetails(item)}>
                                                            {item.test_mode == 1 ? (
                                                                <div className="flex items-center justify-center py-0.5 px-2 rounded-full text-white bg-slate-500 max-w-[60px] m-auto">
                                                                    <div className="text-xs">Test</div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center justify-center py-0.5 px-2 rounded-full text-white bg-success max-w-[60px] m-auto">
                                                                    <div className="text-xs">Live</div>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                    {isLogsLoadingState && (
                                        <div
                                            className="flex justify-center text-primary dark:text-white w-full items-center py-3 border-b border-slate-200/60 dark:border-darkmode-400 cursor-pointer"
                                            onClick={onChangePage}>
                                            <ClipLoader
                                                loading={true}
                                                color="#1e3a8a"
                                                size={15}
                                                css="margin-right: 5px; border-width: 1px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                            />
                                            Load More
                                        </div>
                                    )}

                                    {!isLogsLoadingState &&
                                        webhookLogs &&
                                        webhookLogs?.length !== 0 &&
                                        currentPage < totalPage &&
                                        typeof webhookLogs !== "undefined" && (
                                            <div
                                                className="flex justify-center text-primary dark:text-white w-full items-center py-3 border-b border-slate-200/60 dark:border-darkmode-400 cursor-pointer"
                                                onClick={onChangePage}>
                                                <Icon.ArrowDown size={14} className="mr-2" />
                                                Load More
                                            </div>
                                        )}
                                </div>
                                {/* Topics Table */}
                                {/* Response Table */}
                                <div className="border mx-4 rounded flex flex-col">
                                    <div className="flex items-center justify-between border-b p-5">
                                        <div className="flex flex-row items-center">
                                            <div className="text-[#001737] text-[14px]">Event :</div>
                                            <div className="ml-2 py-0.5 px-2 rounded-full text-white bg-primary custom-badge">
                                                <div className="">{logDetails?.request_body?.event}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center mt-2">
                                            <div className="text-[#001737] text-[14px]">Mode :</div>
                                            {logDetails.test_mode == 1 ? (
                                                <div className="ml-2 py-0.5 px-2 rounded-full text-white bg-slate-500 max-w-[60px] m-auto">
                                                    <div className="text-xs">Test</div>
                                                </div>
                                            ) : (
                                                <div className="ml-2 py-0.5 px-2 rounded-full text-white bg-success max-w-[60px] m-auto">
                                                    <div className="text-xs">Live</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="border-b p-5 mb-4">
                                            <div className="pb-2 text-lg flex flex-row justify-between items-center">
                                                <div>Response</div>
                                                <div>
                                                    {logDetails?.status == "success" ? (
                                                        <div className="py-0.5 px-2 rounded-full text-white bg-success">
                                                            <div className="text-xs flex flex-row">
                                                                <Icon.Check size="15" className="mr-2" />
                                                                <span>
                                                                    {logDetails?.response_status_code} {logDetails?.response_message}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="py-0.5 px-2 rounded-full text-white bg-danger">
                                                            <div className="text-xs flex flex-row">
                                                                <Icon.X size="15" className="mr-2" />
                                                                <span>
                                                                    {logDetails?.response_status_code} {logDetails?.response_message}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div>{logDetails?.response_body}</div>
                                        </div>

                                        <div className="px-5 mt-8 mb-4 pb-2 text-[14px] text-[#3B4863]">Request</div>
                                        <div className="overflow-x-auto overflow-auto p-5 mx-5 bg-[#F4F5F880]">
                                            <ReactJson
                                                src={logDetails?.request_body}
                                                theme={mode === "dark" ? "ashes" : "rjv-default"}
                                                style={{ backgroundColor: "transparent" }}
                                                displayDataTypes={false}
                                                displayObjectSize={false}
                                                enableClipboard={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Response Table */}
                            </div>
                        </>
                    ) : isVisibleReloadLogs ? (
                        <WebhookTestReloadLogs setRefetchLogs={onReloadDataRefetchLogs} isSubmiting={isLogsLoadingState} />
                    ) : (
                        // When no webhook logs found
                        <WebhookTest setRefetchLogs={onRefetchLogs} subscribedEventOptions={subscribedEventOptions} />
                    )}

                    {/* <WebhookTest setRefetchLogs={onRefetchLogs} subscribedEventOptions={subscribedEventOptions} /> */}
                </>
            )}

            {/* END: Content */}
        </>
    );
};

export default WebhookLogsTable;

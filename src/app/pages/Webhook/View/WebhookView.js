import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../../components/common/Heading";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { DETAIL_WEBHOOK_REQUEST, getWebhookLogsRequest } from "../../../redux/actions/Webhook";
import PrintWebhookTopicsLabels from "../../../components/common/status/PrintWebhookTopicsLabels";
import * as Icon from "react-feather";
import WebhookLogsTable from "./WebhookLogsTable";
import { subscribedEventWebhookData } from "../../../redux/services/Webhook";

const WebhookLog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { webhookId } = useParams();
    const { detailWebhook } = useSelector((state) => state.webhook);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogsLoading, setIsLogsLoading] = useState(false);
    const [subscribedEventOptions, setSubscribedEventOptions] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const callBack = () => {
            setIsLoading(false);
        };
        dispatch({ type: DETAIL_WEBHOOK_REQUEST, payload: { id: webhookId }, callBack });
    }, []);

    useEffect(() => {
        setIsLogsLoading(true);
        dispatch(
            getWebhookLogsRequest(
                1,
                10,
                () => {
                    setIsLogsLoading(false);
                },
                { id: webhookId },
            ),
        );
    }, []);

    useEffect(() => {
        getSubscribedEventTypes();
    }, []);

    const getSubscribedEventTypes = async () => {
        const data = await subscribedEventWebhookData({ id: webhookId });

        if (data?.data) {
            setSubscribedEventOptions(data?.data);
        }
    };

    // console.log("Webhook Detail", { detailWebhook });

    const onClickBack = () => {
        navigate(`/webhook`);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Webhook Preview"}
                // isLoadingExport={isLoadingExport}
                displayBackButton={true}
                onClickBack={onClickBack}
                addButton={" "}
            />
        );
    };

    return (
        <>
            {/* BEGIN: Content */}

            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                {isLoading ? (
                    <div className="flex justify-center h-48 items-center">
                        <ClipLoader
                            loading={true}
                            color="#1e3a8a"
                            size={55}
                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                        />
                    </div>
                ) : (
                    <div className="intro-y">
                        <div className="overflow-x-auto scrollbar-hidden">
                            {/* Test */}
                            <div className="flex">
                                {/* Listing Box */}
                                <div className="box shadow-lg w-full border-b">
                                    {/* Box Header */}
                                    <div className="p-5 bg-[#F4F5F8]">
                                        <div className="flex">
                                            <Icon.Globe size={24} color="#C0CCDA" className="mr-6 mt-[5px]" />
                                            <div className="flex flex-col w-full">
                                                <div className="flex flex-row justify-between">
                                                    <div className="font-medium text-[18px] text-primary mr-2">
                                                        {detailWebhook?.endpoint_url}
                                                    </div>
                                                    {detailWebhook?.status == "1" ? (
                                                        <div className="flex items-center justify-center py-0.5 px-2 rounded-full text-white bg-success">
                                                            <Icon.CheckSquare size={15} className="mr-1" />
                                                            <div className="text-xs">Enabled</div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-center py-0.5 px-2 rounded-full text-white bg-danger">
                                                            <Icon.XCircle size={15} className="mr-1" />
                                                            <div className="text-xs">Disabled</div>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="dark:text-white mt-2">
                                                    <em>{detailWebhook?.description}</em>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Box Header */}
                                    {/* Topics */}

                                    <div className="p-5 border-t-0 border border-[#E3E7ED]">
                                        <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row items-center justify-center">
                                                    <span className="text-[#001737] text-[14px] mr-2">Listening for: </span>
                                                    <PrintWebhookTopicsLabels topics={detailWebhook?.topics} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Topics */}

                                    {/* Content */}

                                    <WebhookLogsTable isLogsLoading={isLogsLoading} subscribedEventOptions={subscribedEventOptions} />

                                    {/* Content */}
                                </div>
                            </div>
                            {/* Test */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default WebhookLog;

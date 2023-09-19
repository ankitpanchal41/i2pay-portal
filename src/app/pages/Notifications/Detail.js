import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Icon from "react-feather";
import { getNotificationDetail } from "../../redux/services/Notification";
import moment from "moment";
import { ClipLoader } from "react-spinners";

const NotificationDetail = () => {
    const navigate = useNavigate();
    const { notificationId } = useParams();
    // const merchantId = store.getState()?.persist?.userData?.data?.id;

    const [isLoading, setIsLoading] = useState(false);
    const [notificationDetail, setNotificationDetail] = useState({});

    const onClickBack = () => {
        navigate(`/notifications`);
    };

    const getData = async () => {
        setIsLoading(true);
        const data = await getNotificationDetail({ id: notificationId });

        if (data?.responseCode === 200) {
            setNotificationDetail(data?.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, [notificationId]);

    return (
        <>
            {/* BEGIN: Content */}
            <div className="content pt-10">
                <div class="intro-y box col-span-12 lg:col-span-6">
                    <div class="flex items-center px-5 py-5 sm:py-0 border-b border-slate-200/60 dark:border-darkmode-400">
                        <div className="inline-flex">
                            <div className="flex items-center">
                                <Icon.ChevronLeft className="mr-2 cursor-pointer" size={30} onClick={onClickBack} />
                                <h2 class="font-medium text-base mr-auto my-5">Notification Detail</h2>
                            </div>
                        </div>
                    </div>
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
                        <div class="p-5">
                            <div class="tab-content">
                                <div id="latest-tasks-new" class="tab-pane active" role="tabpanel" aria-labelledby="latest-tasks-new-tab">
                                    <div class="px-5 tns-item" id="announcement-item0" aria-hidden="true" tabindex="-1">
                                        <div class="font-medium text-lg">{notificationDetail?.notification_title}</div>
                                        <div class="text-slate-600 dark:text-slate-500 mt-2">{notificationDetail?.notification_msg}</div>
                                        <div class="flex items-center mt-5">
                                            <div class="px-3 py-2 text-primary bg-primary/10 dark:bg-darkmode-400 dark:text-slate-300 rounded font-medium">
                                                {/* 02 June 2021 */}
                                                {/* {notificationDetail?.notification_time} */}
                                                {moment(notificationDetail?.notification_time).format("DD-MM-YYYY")} /{" "}
                                                {moment(notificationDetail?.notification_time).format("HH:mm:ss")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* END: Content */}
        </>
    );
};

export default NotificationDetail;

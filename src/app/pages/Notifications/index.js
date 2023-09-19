import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import moment from "moment";
import { getNotificationRequest } from "../../redux/actions/Notification";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const Notifications = () => {
    const dispatch = useDispatch();
    // const merchantId = store.getState()?.persist?.userData?.data?.id;

    const [, setListingType] = useState("");
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const { notificationList, totalPage } = useSelector((state) => state.notifications);
    const state = useSelector((state) => state);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getNotificationRequest(currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getNotificationRequest(1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    // Set Listing Type
    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    const pagination = {
        totalPage: notificationList?.length === 0 ? 1 : totalPage,
    };

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const onChangePerPage = (page) => {
        setPerPage(page);
    };

    const onChangeSearchQuery = (value) => {
        setSearchQuery(value);
    };

    const _renderHeading = () => {
        return <Heading title={"All Notifications"} displayBackButton={false} />;
    };

    const _renderTable = () => {
        return (
            <>
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
                    <div class="tab-pane active" role="tabpanel" aria-labelledby="latest-tasks-new-tab">
                        {notificationList?.map((item, index) => {
                            return (
                                <Link
                                    to={`/notification/detail/${item?.id}`}
                                    class={`flex intro-x items-center box p-3 my-1 ${index === 0 ? "mt-0" : "mt-5"}`}>
                                    <div class={`border-l-2 ${item?.is_read === 0 ? "border-success dark:border-success" : ""}  pl-1`}>
                                        <div className="flex items-center">
                                            <div className="ml-2 overflow-hidden">
                                                <div className="flex items-center">
                                                    <a href="#" className="font-medium truncate mr-5 dark:text-white">
                                                        {item?.notification_title}
                                                    </a>
                                                </div>
                                                <div className="w-full truncate text-slate-500 mt-0.5 pr-12">{item?.notification_msg}</div>
                                                <div className="text-xs text-slate-400 ml-auto whitespace-nowrap mt-1">
                                                    {moment(item?.notification_time).format("DD-MM-YYYY")} /{" "}
                                                    {moment(item?.notification_time).format("HH:mm:ss")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* START: Table Not Found */}
                {notificationList?.length === 0 && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
            </>
        );
    };

    return (
        <>
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">{_renderTable()}</div>
                        </div>
                    </div>
                </div>

                {!isLoading && notificationList?.length !== 0 && typeof notificationList !== "undefined" && (
                    <Pagination
                        pagination={pagination}
                        currentPage={currentPage}
                        perPage={perPage}
                        onChangePage={onChangePage}
                        onChangePerPage={onChangePerPage}
                    />
                )}
            </div>
            {/* END: Content */}
        </>
    );
};

export default Notifications;

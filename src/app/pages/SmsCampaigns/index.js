import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { downloadConnectorExcel } from "../../redux/services/DownloadExcel";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_SMS_CAMPAIGN_REQUEST, getSmsCampaignRequest, SMS_CAMPAIGN_SEND_SMS_REQUEST } from "../../redux/actions/SmsCampaign";
import { campaignStatusLabels } from "../../utils/helper";
import NotAvailable from "../../components/common/status/NotAvailable";

const Heading = React.lazy(() => import("../../components/common/Heading"));
const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));

const SmsCampaigns = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { smsCampaign, totalPage } = useSelector((state) => state.smsCampaign);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [listingType, setListingType] = useState("");
    const [sendSmsLoading, setSendSmsLoading] = useState("");

    const state = useSelector((state) => state);

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getSmsCampaignRequest(currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getSmsCampaignRequest(1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const pagination = {
        totalPage: smsCampaign?.length === 0 ? 1 : totalPage,
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

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const data = await downloadConnectorExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onClickDelete = () => {
        const callBack = () => {
            setIsLoadingDelete(false);
            onHandleDeleteModal();
        };

        setIsLoadingDelete(true);
        dispatch({ type: DELETE_SMS_CAMPAIGN_REQUEST, payload: { id: deleteModalDetails }, callBack });
    };

    const onClickEdit = (item) => {
        navigate(`/sms-campaigns/update/${item?.id}`);
    };

    const onClickPreview = (item) => {
        navigate(`/sms-campaigns/preview/${item?.id}`);
    };

    const onClickSendSMS = (campaignId) => {
        setSendSmsLoading(campaignId);

        const callBack = () => {
            setSendSmsLoading(false);
        };

        setIsLoadingDelete(true);
        dispatch({ type: SMS_CAMPAIGN_SEND_SMS_REQUEST, payload: { id: campaignId }, callBack });
    };

    const _renderHeading = () => {
        return (
            <Heading
                onClickBack={() => {
                    navigate(`/sms-campaigns`);
                }}
                title={"SMS Campaigns"}
                onChangeSearchQuery={onChangeSearchQuery}
                // onClickExport={onClickExport}
                // isLoadingExport={isLoadingExport}
                displayBackButton={false}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <Link to={"/sms-campaigns/create"} className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add Campaign</span>
                        </Link>
                    </div>
                }
            />
        );
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const _renderTable = () => {
        return (
            <>
                {/* BEGIN: Connector Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Name</th>
                            <th className="whitespace-nowrap">Content</th>
                            <th className="whitespace-nowrap">Status</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={5}>
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
                            {smsCampaign?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-10">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.content || <NotAvailable />}</td>
                                        <td>
                                            <div className="text-slate-500 text-xs mt-0.5"> {campaignStatusLabels(item?.status)} </div>
                                        </td>
                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                    }>
                                                    {sendSmsLoading === item?.id ? (
                                                        <ClipLoader
                                                            loading={sendSmsLoading === item?.id}
                                                            color="#1e3a8a"
                                                            size={15}
                                                            css="border-width: 1px;border-bottom-color: white !important;"
                                                        />
                                                    ) : (
                                                        <Icon.Send onClick={() => onClickSendSMS(item?.id)} size={15} />
                                                    )}
                                                </div>

                                                <div
                                                    onClick={() => {
                                                        onClickPreview(item);
                                                    }}
                                                    className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                    <Icon.Eye size={15} /> &nbsp;
                                                </div>

                                                <div
                                                    onClick={() => {
                                                        onClickEdit(item);
                                                    }}
                                                    className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                    <Icon.Edit size={15} /> &nbsp;
                                                </div>

                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                    }>
                                                    <Icon.Trash2 onClick={() => onHandleDeleteModal(item?.id)} size={15} stroke={"red"} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Connector Table */}

                {/* START: Table Not Found */}
                {smsCampaign?.length === 0 && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
            </>
        );
    };

    const _renderBoxTable = () => {
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
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        {smsCampaign?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6" key={index}>
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <span className="font-medium text-primary dark:text-white">{item?.name}</span>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="dropdown ml-auto sm:ml-0 flex items-center">
                                                    <div
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        {sendSmsLoading === item?.id ? (
                                                            <ClipLoader
                                                                loading={sendSmsLoading === item?.id}
                                                                color="#1e3a8a"
                                                                size={15}
                                                                css="border-width: 1px;border-bottom-color: white !important;"
                                                            />
                                                        ) : (
                                                            <Icon.Send onClick={() => onClickSendSMS(item?.id)} size={15} />
                                                        )}
                                                    </div>

                                                    <div
                                                        onClick={() => {
                                                            onClickPreview(item);
                                                        }}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Eye size={15} /> &nbsp;
                                                    </div>

                                                    <div
                                                        onClick={() => {
                                                            onClickEdit(item);
                                                        }}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Edit size={15} /> &nbsp;
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            onHandleDeleteModal(item?.id);
                                                        }}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Trash2 size={15} stroke={"red"} strokeWidth={2} /> &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-0 lg:justify-end mt-3 lg:mt-0  border-b border-slate-200/60 dark:border-darkmode-400 p-5">
                                            <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                <div className="text-slate-500 text-xs col-span-12">
                                                    <span className="mt-0.5 font-bold text-slate-800 dark:text-white"> Content:&nbsp;</span>
                                                    <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                        {item?.content || <NotAvailable />}
                                                    </span>
                                                </div>
                                                <div className="text-slate-500 text-xs col-span-2 mt-3">
                                                    <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                        <div className="text-slate-500 text-xs mt-0.5">
                                                            {" "}
                                                            {campaignStatusLabels(item?.status)}{" "}
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!smsCampaign?.length && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            {/* BEGIN: Content */}
            <DeleteModal
                isLoading={isLoadingDelete}
                visible={visibleDeleteModal}
                onClose={onHandleDeleteModal}
                onDelete={() => {
                    onClickDelete();
                }}
            />
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {listingType === "box" ? _renderBoxTable() : _renderTable()}
                            </div>
                        </div>
                    </div>
                </div>

                {!isLoading && smsCampaign?.length !== 0 && typeof smsCampaign !== "undefined" && (
                    <Pagination
                        pagination={pagination}
                        currentPage={currentPage}
                        perPage={perPage}
                        onChangePage={onChangePage}
                        onChangePerPage={onChangePerPage}
                    />
                )}
            </div>
        </>
    );
};

export default SmsCampaigns;

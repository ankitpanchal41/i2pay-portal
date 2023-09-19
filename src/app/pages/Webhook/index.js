import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";

import MiniLoader from "../../components/common/MiniLoader";
import DeleteModal from "../../components/common/DeleteModal";
import Pagination from "../../components/common/Pagination";
import Heading from "../../components/common/Heading";
import { downloadWebhookExcel } from "../../redux/services/DownloadExcel";
import NotAvailable from "../../components/common/status/NotAvailable";

import { DELETE_WEBHOOK_REQUEST, getWebhookRequest } from "../../redux/actions/Webhook";
import PrintWebhookTopicsLabels from "../../components/common/status/PrintWebhookTopicsLabels";
import { updateWebhookStatus } from "../../redux/services/Webhook";
import { truncateString } from "../../utils/helper";

const Webhook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [listingType, setListingType] = useState("");
    const [currentDeleteProducts, setCurrentDeleteProducts] = useState([]);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [loadingId, setLoadingId] = useState(false);

    const { webhook, totalPage } = useSelector((state) => state.webhook);

    const state = useSelector((state) => state);

    // Set Listing Type
    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getWebhookRequest(currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getWebhookRequest(1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const onClickDelete = () => {
        const callBack = async () => {
            onHandleDeleteModal();
            setIsLoading(false);
            setIsLoadingDelete(false);
        };

        setIsLoadingDelete(true);
        dispatch({ type: DELETE_WEBHOOK_REQUEST, payload: { id: deleteModalDetails }, callBack });
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const pagination = {
        totalPage: webhook?.length === 0 ? 1 : totalPage,
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

    const onChangeSwitch = async (item) => {
        setLoadingId(item?.id);

        let updatePayload = { id: item?.id };

        const { data } = await updateWebhookStatus(updatePayload);

        if (data) {
            setIsLoading(true);
            dispatch(
                getWebhookRequest(currentPage, perPage, searchQuery, () => {
                    setIsLoading(false);
                    setIsPerPage(true);
                }),
            );
        }
        setLoadingId(false);
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const data = await downloadWebhookExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onClickCreate = async () => {
        navigate(`/webhook/create`);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Webhooks"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <div onClick={onClickCreate} className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add Webhook</span>
                        </div>
                    </div>
                }
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* START: IP whitelist Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Endpoint URL</th>
                            <th className="whitespace-nowrap">Description</th>
                            <th className="whitespace-nowrap text-center">Status</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={6}>
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
                            {webhook?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-10">{(currentPage - 1) * perPage + index + 1}</td>
                                        {/* <td>{JSON.stringify(item?.topics)}</td> */}

                                        <td>
                                            {item?.endpoint_url ? (
                                                <div className="flex">
                                                    <a
                                                        href={void 0}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="font-medium   dark:text-slate-400 whitespace-nowrap text-primary truncate cursor-pointer">
                                                        {item?.endpoint_url}
                                                    </a>
                                                </div>
                                            ) : (
                                                <NotAvailable />
                                            )}
                                        </td>

                                        <td>{truncateString(item?.description, 90)}</td>

                                        <td className="min-w-[200px]">
                                            <div className="flex justify-center align-center ">
                                                <div
                                                    className={
                                                        item?.status == "1"
                                                            ? "flex items-center justify-center text-success"
                                                            : "flex items-center justify-center text-danger"
                                                    }>
                                                    {item?.status == "1" ? (
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
                                                <div className="form-switch ">
                                                    <input
                                                        onChange={() => {
                                                            onChangeSwitch(item);
                                                        }}
                                                        // id="show-example-5"
                                                        className="show-code form-check-input mr-0 ml-3"
                                                        type="checkbox"
                                                        checked={item?.status == "1" ? true : false}
                                                    />
                                                </div>
                                                <div className="ml-2 flex items-center border-slate-900">
                                                    <ClipLoader
                                                        loading={loadingId === item?.id}
                                                        color="#1e3a8a"
                                                        size={15}
                                                        css="border-width: 1px;border-bottom-color: white !important;"
                                                    />
                                                </div>
                                            </div>
                                        </td>

                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                <Link
                                                    to={`/webhook/view/${item?.id}`}
                                                    className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                    <Icon.Eye size={15} /> &nbsp;
                                                </Link>

                                                <Link
                                                    to={`/webhook/update/${item?.id}`}
                                                    className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                    <Icon.Edit size={15} /> &nbsp;
                                                </Link>

                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                    }>
                                                    {currentDeleteProducts?.includes(item?.id) ? (
                                                        <MiniLoader isLoading={true} color="red" />
                                                    ) : (
                                                        <Icon.Trash2
                                                            onClick={() => onHandleDeleteModal(item?.id)}
                                                            size={15}
                                                            stroke={"red"}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: IP whitelist Table */}

                {/* START: Table Not Found */}
                {webhook?.length === 0 && !isLoading && (
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
                        {webhook?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6" key={index}>
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex flex-col text-slate-500 text-xs">
                                                        <div>
                                                            <span className="text-slate-900 dark:text-white text-xs font-bold">
                                                                {" "}
                                                                Endpoint URL:&nbsp;{" "}
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs">
                                                                {" "}
                                                                {item?.endpoint_url ? (
                                                                    <a
                                                                        href={void 0}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="font-medium   dark:text-slate-400 whitespace-nowrap text-primary truncate cursor-pointer">
                                                                        {item?.endpoint_url}
                                                                    </a>
                                                                ) : (
                                                                    <NotAvailable />
                                                                )}{" "}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="flex">
                                                    <Link
                                                        to={`/webhook/view/${item?.id}`}
                                                        className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                        <Icon.Eye size={15} /> &nbsp;
                                                    </Link>

                                                    <Link
                                                        to={`/webhook/update/${item?.id}`}
                                                        className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                        <Icon.Edit size={15} /> &nbsp;
                                                    </Link>

                                                    <div
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900"
                                                        }>
                                                        {currentDeleteProducts?.includes(item?.id) ? (
                                                            <MiniLoader isLoading={true} color="red" />
                                                        ) : (
                                                            <Icon.Trash2
                                                                onClick={() => onHandleDeleteModal(item?.id)}
                                                                size={15}
                                                                stroke={"red"}
                                                            />
                                                        )}
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="flex justify-between items-center">
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs relative top-[6px]">
                                                        <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                            Description: &nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                            {truncateString(item?.description, 80)}
                                                        </span>
                                                    </div>

                                                    <div className="flex text-slate-500 text-xs items-center mt-3">
                                                        <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white mr-3">
                                                            Topics: &nbsp;
                                                        </span>

                                                        <PrintWebhookTopicsLabels topics={item?.topics} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row lg:flex-nowrap items-center justify-center p-5">
                                            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 mr-auto">
                                                <div className="flex text-slate-500 text-xs">
                                                    <div className="form-switch ">
                                                        <input
                                                            onChange={() => {
                                                                onChangeSwitch(item);
                                                            }}
                                                            // id="show-example-5"
                                                            className="show-code form-check-input mr-0"
                                                            type="checkbox"
                                                            checked={item?.status == "1" ? true : false}
                                                        />
                                                    </div>
                                                    <div className="ml-2 flex items-center border-slate-900">
                                                        <ClipLoader
                                                            loading={loadingId === item?.id}
                                                            color="#1e3a8a"
                                                            size={15}
                                                            css="border-width: 1px;border-bottom-color: white !important;"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-slate-500 text-xs mt-0.5">
                                                <div
                                                    className={
                                                        item?.status == "1"
                                                            ? "flex items-center justify-center text-success"
                                                            : "flex items-center justify-center text-danger"
                                                    }>
                                                    {item?.status == "1" ? (
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {webhook?.length === 0 && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <DeleteModal
                isLoading={isLoadingDelete}
                visible={visibleDeleteModal}
                onClose={onHandleDeleteModal}
                onDelete={() => {
                    onClickDelete();
                }}
            />
            {/* END: Modal */}

            {/* BEGIN: Content */}
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

                {!isLoading && webhook?.length !== 0 && typeof webhook !== "undefined" && (
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

export default Webhook;

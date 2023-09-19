import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { DELETE_PAY_BUTTON_REQUEST } from "../../redux/types/PayButton";
import { ClipLoader } from "react-spinners";
import { getPayButtonsRequest } from "../../redux/actions/PayButton";
import { downloadPayButtonExcel } from "../../redux/services/DownloadExcel";
import { showToastMessage } from "../../utils/methods";
import { store } from "../../redux/store";
import { Interweave } from "interweave";
import { decode } from "html-entities";
import { Currency } from "../../utils/currency";

const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const PayButtonList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [listingType, setListingType] = useState("");
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const { payButtonList, totalPage } = useSelector((state) => state.payButton);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    const state = useSelector((state) => state);

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    const { userData } = store.getState()?.persist;

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getPayButtonsRequest(currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getPayButtonsRequest(1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const onClickEdit = (item) => {
        navigate(`/pay-button/edit/${item?.id}`);
    };

    // Handle Delete Modal
    const onHandleDeleteModal = (id = false) => {
        setVisibleDeleteModal(!visibleDeleteModal);
        setDeleteId(id);
    };

    // Delete API call
    const onDeleteModal = () => {
        const callBack = () => {
            onHandleDeleteModal();
            setIsLoadingDelete(false);
        };

        setIsLoadingDelete(true);
        dispatch({ type: DELETE_PAY_BUTTON_REQUEST, payload: { payButton_id: deleteId }, callBack });
    };

    const pagination = {
        totalPage: payButtonList?.length === 0 ? 1 : totalPage,
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
        const data = await downloadPayButtonExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onCopyText = () => {
        showToastMessage(`Your button text is copied.`, 200);
    };

    console.clear();

    const _renderHeading = () => {
        return (
            <Heading
                title={"Pay Button List"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <Link to="/pay-button/add" className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add Button</span>
                        </Link>
                    </div>
                }
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* BEGIN: Pay buttons Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Name</th>
                            <th className="whitespace-nowrap">Button Preview</th>
                            <th className="whitespace-nowrap">Copy Button</th>
                            <th className="whitespace-nowrap">No Of Transactions</th>
                            <th className="whitespace-nowrap">Total Transactions</th>
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
                            {payButtonList?.map((item, index) => {
                                let buttonView = item?.buttonString;

                                buttonView = buttonView.replace(
                                    `<img src="https://admin.payomatix.com/storage/theme/assets/dist/images/logo-sm.png"`,
                                    `<img src="${item?.image}"`,
                                );

                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-10">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td>{item?.name}</td>

                                        <td>
                                            <Interweave content={buttonView} />
                                        </td>
                                        <td className="w-30">
                                            <CopyToClipboard
                                                text={buttonView}
                                                onCopy={() => {
                                                    onCopyText();
                                                }}>
                                                <div className="source-code block flex">
                                                    <button
                                                        data-target="#copy-basic-dropdown"
                                                        className="copy-code btn py-1 px-2 btn-outline-secondary">
                                                        <Icon.File size={15} className="mr-2" />
                                                        Copy Button
                                                    </button>
                                                </div>
                                            </CopyToClipboard>
                                        </td>

                                        <td>{item?.noOfTransactions}</td>
                                        <td>
                                            {decode(Currency.find((c) => c?.value === item?.transactionCurrency)?.symbol)}{" "}
                                            {item?.totalTransactions}
                                        </td>
                                        <td className="table-report__action text-center">
                                            <div className="flex justify-center">
                                                <div
                                                    onClick={() => {
                                                        onClickEdit(item);
                                                    }}
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                    }>
                                                    <Icon.Edit size={15} />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        onHandleDeleteModal(item?.id);
                                                    }}
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-red-600 dark:text-red-600"
                                                    }>
                                                    <Icon.Trash2 size={15} strokeWidth={2} stroke={"red"} /> &nbsp;
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Pay buttons Table */}

                {/* START: Table Not Found */}
                {!isLoading && !payButtonList?.length && (
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
                        {payButtonList?.map((item, index) => {
                            let buttonView = item?.buttonString;
                            buttonView = buttonView.replace(
                                `<img src="https://admin.payomatix.com/storage/theme/assets/dist/images/logo-sm.png"`,
                                `<img src="${item?.image}"`,
                            );

                            return (
                                <div className="intro-y col-span-12 md:col-span-6">
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <span className="font-medium text-primary dark:text-white">{item?.name}</span>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="dropdown ml-auto sm:ml-0 flex items-center">
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
                                                <div className="text-slate-500 text-xs col-span-6">
                                                    <span className="mt-0.5 font-bold text-slate-800 dark:text-white">
                                                        {" "}
                                                        No Of Transactions:&nbsp;
                                                    </span>
                                                    <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                        {item?.noOfTransactions}
                                                    </span>
                                                </div>
                                                <div className="text-slate-500 text-xs col-span-6 text-right">
                                                    <span className="mt-0.5 font-bold text-slate-800 dark:text-white">
                                                        Total Transactions:&nbsp;
                                                    </span>
                                                    <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                        {item?.totalTransactions}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center p-5">
                                            <div className="md:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div className="mt-2">
                                                    <Interweave content={buttonView} />
                                                </div>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <CopyToClipboard text={buttonView}>
                                                    <div className="source-code block flex justify-end">
                                                        <button
                                                            data-target="#copy-basic-dropdown"
                                                            className="copy-code btn py-1 px-2 btn-outline-secondary">
                                                            <Icon.File size={15} className="mr-2" />
                                                            Copy Button
                                                        </button>
                                                    </div>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* END: Box Not Found */}

                {!isLoading && payButtonList?.length === 0 && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Box Not Found */}
            </>
        );
    };

    return (
        <>
            {/* BEGIN: Delete Modal */}
            <DeleteModal isLoading={isLoadingDelete} visible={visibleDeleteModal} onClose={onHandleDeleteModal} onDelete={onDeleteModal} />
            {/* END: Delete Modal */}

            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {userData?.data?.is_secretKey == "1" && userData?.data?.is_active_connector == "1" && _renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {userData?.data?.is_secretKey != "1" ? (
                                    <div className="flex flex-col justify-center h-48 items-center">
                                        <div className="text-primary dark:text-white text-xl -mt-3">
                                            You can't access pay button functionality without API key you need to generate API key.
                                        </div>
                                        <Link to="/api-key" className="btn btn-primary mt-2">
                                            Generate API Key here
                                        </Link>
                                    </div>
                                ) : userData?.data?.is_active_connector != "1" ? (
                                    <div className="flex flex-col justify-center h-48 items-center">
                                        <div className="text-primary dark:text-white text-xl -mt-3">
                                            You need to active connector after that you can access pay button functionality.
                                        </div>
                                        <Link to="/connector" className="btn btn-primary mt-2">
                                            Active Connector here
                                        </Link>
                                    </div>
                                ) : (
                                    <>{listingType === "box" ? _renderBoxTable() : _renderTable()}</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {userData?.data?.is_secretKey == "1" &&
                    userData?.data?.is_active_connector == "1" &&
                    !isLoading &&
                    payButtonList?.length !== 0 &&
                    typeof payButtonList !== "undefined" && (
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

export default PayButtonList;

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdvanceSearchModal from "../../components/common/AdvanceSearchModal";
import { changeTransactionStatus, getTransactionsStart } from "../../redux/actions/Transactions";
import { ClipLoader } from "react-spinners";
import Pagination from "../../components/common/Pagination";
import Heading from "../../components/common/Heading";
import { transactionsConnectorAccountStatusLabels, transactionsStatusLabels } from "../../utils/transactions";
import { Currency } from "../../utils/currency";
import { downloadTransactionsExcel } from "../../redux/services/DownloadExcel";
import Modal from "../../components/common/Modal";
import $ from "jquery";
import { transactionRefundSchema } from "../../utils/validationSchema";
import Input from "../../components/common/forms/Input";
import TransactionTypes from "../../components/common/TransactionTypes";
import * as Icon from "react-feather";
import { Menu, Transition } from "@headlessui/react";
import TransactionDetails from "../../components/common/TransactionDetails";
import { decode } from "html-entities";
import NotAvailable from "../../components/common/status/NotAvailable";
import Images from "../../../assets/images";

const initialValues = {
    reason: "",
};

const Home = () => {
    const dispatch = useDispatch();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const { transactions, totalPage } = useSelector((state) => state.transactions);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [advanceSearchPayload, setAdvanceSearchPayload] = useState("");
    const [isParPage, setIsParPage] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [visibleDetailModal, setVisibleDetailModal] = useState(false);
    const [singleDetails, setSingleDetails] = useState(false);
    const [activeTab, setActiveTab] = useState("billing");
    const [visibleSuspiciousModal, setVisibleSuspiciousModal] = useState(false);
    const [visibleChargeBackModal, setVisibleChargeBackModal] = useState(false);
    const [visibleRefundModal, setVisibleRefundModal] = useState(false);
    const [visibleRetrievalModal, setVisibleRetrievalModal] = useState(false);
    const [type, setType] = useState(null);
    const [orderId, setOrderId] = useState(null);
    // const [refundDate, setRefundDate] = useState(null);
    const [changeStatusLoading, setChangeStatusLoading] = useState(false);
    const [listingType, setListingType] = useState("");
    const state = useSelector((state) => state);

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoading(true);
        setIsReset(false);
        dispatch(
            getTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 0, ...advanceSearchPayload }, () => {
                setIsLoading(false);
                setIsParPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isParPage) {
            setCurrentPage(1);
            setIsLoading(true);
            setIsReset(false);
            dispatch(getTransactionsStart(1, perPage, searchQuery, { test_mode: 0, ...advanceSearchPayload }, () => setIsLoading(false)));
        }
    }, [perPage]);

    const changeMode = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const pagination = {
        totalPage: transactions?.length === 0 ? 1 : totalPage,
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

    const advanceSearchSubmit = (values) => {
        setIsOpenMenu(!isOpenMenu);
        setIsLoading(true);
        setAdvanceSearchPayload(values);
        setIsReset(false);
        setCurrentPage(1);
        dispatch(
            getTransactionsStart(1, perPage, searchQuery, { test_mode: 0, ...values }, () => {
                setIsLoading(false);
                setIsParPage(true);
            }),
        );
    };

    const resetFilter = () => {
        setIsOpenMenu(false);
        setIsLoading(true);
        setAdvanceSearchPayload("");
        setSearchQuery("");
        setIsReset(true);
        setCurrentPage(1);
        dispatch(
            getTransactionsStart(1, perPage, "", { test_mode: 0 }, () => {
                setIsLoading(false);
                setIsParPage(true);
            }),
        );
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const payload = {
            ...advanceSearchPayload,
            search: searchQuery,
        };
        const data = await downloadTransactionsExcel(payload);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onCloseDetailModal = (item) => {
        setActiveTab("billing");
        setSingleDetails(item);
        setVisibleDetailModal(!visibleDetailModal);
    };

    const formatArea = (val) => {
        return val.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Manual Transactions"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex rounded-none ml-2" role="group">
                        <button
                            onClick={changeMode}
                            className="py-2 px-4 text-sm font-medium text-white bg--[#FFFFFF] border border-[#B4BDCE] max-h-[38px] rounded-l flex items-center">
                            <span className="hidden md:block lg:block text-[#1E3A8A] text-[14px]">Advance Filters</span>
                            <img src={Images.Filter} className="h-[21px] w-[21px] ml-3" />
                        </button>
                        <button
                            onClick={resetFilter}
                            className="py-2 px-4 text-sm font-medium text-white bg-[#E8E8E9] max-h-[38px] border border-[#B4BDCE] border-l-0 rounded-r">
                            <Icon.RefreshCw size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block text-[#1E3A8A] text-[#1E3A8A] text-[14px]">Reset</span>
                        </button>
                    </div>
                }
            />
        );
    };

    const handleSuspiciousModal = (type) => {
        setVisibleSuspiciousModal(!visibleSuspiciousModal);
        setType(type);
    };

    const onChangeSuspiciousStatus = async (value) => {
        const payload = {
            txn_status: "suspicious",
            order_id: orderId,
        };

        setChangeStatusLoading(true);
        dispatch(
            changeTransactionStatus(
                payload,
                () => {
                    setChangeStatusLoading(false);
                    handleSuspiciousModal();
                },
                () => {
                    setIsLoading(true);
                    dispatch(
                        getTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 0, ...advanceSearchPayload }, () =>
                            setIsLoading(false),
                        ),
                    );
                },
            ),
        );
    };

    const handleChargeBackModal = (type) => {
        setVisibleChargeBackModal(!visibleChargeBackModal);
        setType(type);
    };

    const onChangeChargeBackStatus = async (value) => {
        const payload = {
            txn_status: "chargeback",
            order_id: orderId,
        };

        setChangeStatusLoading(true);
        dispatch(
            changeTransactionStatus(
                payload,
                () => {
                    setChangeStatusLoading(false);
                    handleChargeBackModal();
                },
                () => {
                    setIsLoading(true);
                    dispatch(
                        getTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 0, ...advanceSearchPayload }, () =>
                            setIsLoading(false),
                        ),
                    );
                },
            ),
        );
    };

    const handleRefundModal = (type) => {
        setVisibleRefundModal(!visibleRefundModal);
        setType(type);
    };

    const onChangeRefundStatus = async (value) => {
        const payload = {
            txn_status: "refund",
            refund_reason: value.reason,
            // refund_date: refundDate,
            order_id: orderId,
        };

        setChangeStatusLoading(true);
        dispatch(
            changeTransactionStatus(
                payload,
                () => {
                    setChangeStatusLoading(false);
                    handleRefundModal();
                },
                () => {
                    setIsLoading(true);
                    dispatch(
                        getTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 0, ...advanceSearchPayload }, () =>
                            setIsLoading(false),
                        ),
                    );
                },
            ),
        );
    };

    const handleRetrievalModal = (type) => {
        setVisibleRetrievalModal(!visibleRetrievalModal);
        setType(type);
    };

    const onChangeRetrievalStatus = async (value) => {
        const payload = {
            txn_status: "retrieval",
            order_id: orderId,
        };

        setChangeStatusLoading(true);
        dispatch(
            changeTransactionStatus(
                payload,
                () => {
                    setChangeStatusLoading(false);
                    handleRetrievalModal();
                },
                () => {
                    setIsLoading(true);
                    dispatch(
                        getTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 0, ...advanceSearchPayload }, () =>
                            setIsLoading(false),
                        ),
                    );
                },
            ),
        );
    };

    const _renderTransactionTable = () => {
        return (
            <>
                {/* START: Transactions Table */}
                <table class="table table-report sm:mt-2 pb-10">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">Order ID</th>
                            <th className="whitespace-nowrap">Email</th>
                            <th className="whitespace-nowrap">Amount</th>
                            <th className="whitespace-nowrap">Currency</th>
                            <th className="whitespace-nowrap">Status</th>
                            <th className="lg:justify-left items-left">Connector</th>
                            {/* <th className="lg:justify-left items-left">Connector Account</th> */}
                            <th className="lg:justify-left items-left">Transaction Date</th>
                            {/* <th className="lg:justify-left items-left">Action</th> */}
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={11}>
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
                        <tbody className="font-normal ">
                            {transactions?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="text-primary">
                                            <span
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    onCloseDetailModal(item);
                                                }}>
                                                {item.order_id}
                                            </span>
                                            <TransactionTypes item={item} />
                                        </td>
                                        <td>{item.email || <NotAvailable />}</td>
                                        <td className="whitespace-pre">
                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span> {item.amount}
                                        </td>
                                        <td>{item.currency}</td>
                                        <td>
                                            <div className="text-slate-500 text-xs mt-0.5">
                                                {transactionsStatusLabels(Number(item.status))}
                                            </div>
                                        </td>
                                        <td>{item.connector_name ? item.connector_name : <NotAvailable />}</td>
                                        {/* <td>
                                            <div className="text-slate-500 text-md mt-0.5">
                                                {item?.connector_account === 0 || item?.connector_account === 1 ? (
                                                    transactionsConnectorAccountStatusLabels(item?.connector_account)
                                                ) : (
                                                    <NotAvailable />
                                                )}
                                            </div>
                                        </td> */}
                                        <td>{item.created_at}</td>
                                        {/* <td className="table-report__action">
                                            {item.status !== 1 ||
                                            item?.is_refund === 1 ||
                                            item?.is_chargeback === 1 ||
                                            item?.is_remove_retrieval === 1 ||
                                            item?.is_remove_suspicious === 1 ||
                                            item?.is_retrieval === 1 ||
                                            item?.is_suspicious === 1 ? (
                                                <div className="text-slate-500 text-xs mt-0.5 text-center"> - </div>
                                            ) : (
                                                <Menu as="div" className="relative">
                                                    <Menu.Button
                                                        type="buttons"
                                                        className="dropdown-toggle btn btn-elevated-rounded-secondary px-2">
                                                        <span className="w-5 h-5 flex items-center justify-center">
                                                            {" "}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="feather feather-plus w-4 h-4">
                                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                            </svg>{" "}
                                                        </span>
                                                    </Menu.Button>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95">
                                                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <div className="p-2">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => {
                                                                                setOrderId(item?.order_id);
                                                                                handleRefundModal("Refund");
                                                                            }}
                                                                            className={
                                                                                active
                                                                                    ? "dropdown-item bg-slate-200 w-full text-left rounded-md p-2"
                                                                                    : "dropdown-item w-full text-left p-2"
                                                                            }>
                                                                            <a className="dropdown-item flex items-center">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="24"
                                                                                    height="24"
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-settings h-4 w-4 mr-2">
                                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                                                                </svg>{" "}
                                                                                Mark as Refund
                                                                            </a>
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            )}
                                        </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Transactions Table */}

                {/* START: Table Not Found */}
                {!isLoading && (!transactions?.length || typeof transactions === "undefined") && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
            </>
        );
    };
    const _renderTransactionBoxTable = () => {
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
                        {transactions?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6">
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400 items-center">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0 flex">
                                                <span className="font-medium text-primary dark:text-white">
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            onCloseDetailModal(item);
                                                        }}>
                                                        {item.order_id}
                                                    </span>
                                                </span>
                                                <TransactionTypes item={item} className="inline-block" />
                                            </div>

                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                {item.status !== 1 ||
                                                item?.is_refund === 1 ||
                                                item?.is_chargeback === 1 ||
                                                item?.is_remove_retrieval === 1 ||
                                                item?.is_remove_suspicious === 1 ||
                                                item?.is_retrieval === 1 ||
                                                item?.is_suspicious === 1 ? (
                                                    <div className="text-slate-500 text-xs mt-0.5 text-center"> - </div>
                                                ) : (
                                                    <Menu as="div" className="relative">
                                                        <Menu.Button
                                                            type="buttons"
                                                            className="dropdown-toggle btn btn-elevated-rounded-secondary px-2">
                                                            <span className="w-5 h-5 flex items-center justify-center">
                                                                {" "}
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="feather feather-plus w-4 h-4">
                                                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                </svg>{" "}
                                                            </span>
                                                        </Menu.Button>

                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95">
                                                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div className="p-2">
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                onClick={() => {
                                                                                    handleRefundModal("Refund");
                                                                                }}
                                                                                className={
                                                                                    active
                                                                                        ? "dropdown-item bg-slate-200 w-full text-left rounded-md p-2"
                                                                                        : "dropdown-item w-full text-left p-2"
                                                                                }>
                                                                                <a className="dropdown-item flex items-center">
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="24"
                                                                                        height="24"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="1.5"
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        className="feather feather-settings h-4 w-4 mr-2">
                                                                                        <circle cx="12" cy="12" r="3"></circle>
                                                                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                                                                    </svg>{" "}
                                                                                    Mark as Refund
                                                                                </a>
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                )}
                                            </div>
                                        </div>

                                        {/* BOX BODY */}
                                        <div className="flex flex-col lg:flex-row p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="cursor-pointer lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div className="cursor-pointer flex text-slate-500 text-xs">
                                                    <div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Email :&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item.email || <NotAvailable />}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Amount: &nbsp; &nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                <span>
                                                                    {decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}
                                                                </span>{" "}
                                                                {item.amount}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Currency:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.currency}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Status:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                <div className="text-slate-500 text-xs mt-0.5">
                                                                    {" "}
                                                                    {transactionsStatusLabels(item.status)}
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="cursor-pointer flex text-slate-500 text-xs">
                                                    <div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Transaction Date:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.created_at}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Connector:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.connector_name}
                                                            </span>
                                                        </div>
                                                        {/* <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Connector Account:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                <div className="text-slate-500 text-md mt-0.5">
                                                                    {item?.connector_account === 0 || item?.connector_account === 1 ? (
                                                                        transactionsConnectorAccountStatusLabels(item?.connector_account)
                                                                    ) : (
                                                                        <NotAvailable />
                                                                    )}
                                                                </div>
                                                            </span>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* BOX BODY */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!isLoading && (!transactions?.length || typeof transactions === "undefined") && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    const _renderSuspiciousModal = () => {
        return (
            <>
                <Modal
                    heading={`Change ${type} Status`}
                    visible={visibleSuspiciousModal}
                    onClose={handleSuspiciousModal}
                    onClickSave={onChangeSuspiciousStatus}
                    onClickCancel={handleSuspiciousModal}
                    buttonLoading={changeStatusLoading}
                    modalMinWidth={"50%"}>
                    <div>Are you sure to mark this transaction as suspicious?</div>
                </Modal>
            </>
        );
    };

    const _renderRetrievalBackModal = () => {
        return (
            <>
                <Modal
                    heading={`Change ${type} Status`}
                    visible={visibleRetrievalModal}
                    onClose={handleRetrievalModal}
                    onClickSave={onChangeRetrievalStatus}
                    onClickCancel={handleRetrievalModal}
                    buttonLoading={changeStatusLoading}
                    modalMinWidth={"50%"}>
                    <div>Are you sure to mark this transaction as retrieval?</div>
                </Modal>
            </>
        );
    };

    const _renderChargeBackModal = () => {
        return (
            <>
                <Modal
                    heading={`Change ${type} Status`}
                    visible={visibleChargeBackModal}
                    onClose={handleChargeBackModal}
                    onClickSave={onChangeChargeBackStatus}
                    onClickCancel={handleChargeBackModal}
                    buttonLoading={changeStatusLoading}
                    modalMinWidth={"50%"}>
                    <div>Are you sure to mark this transaction as chargeback?</div>
                </Modal>
            </>
        );
    };

    const _renderRefundModal = () => {
        return (
            <>
                <Modal
                    heading={`Change ${type} Status`}
                    visible={visibleRefundModal}
                    onClose={handleRefundModal}
                    func
                    onClickSave={onChangeRefundStatus}
                    onClickCancel={handleRefundModal}
                    modalMinWidth={"50%"}
                    useFormik
                    buttonLoading={changeStatusLoading}
                    initialValues={initialValues}
                    validationState={transactionRefundSchema}>
                    {(setFieldValue, values, errors) => {
                        return (
                            <>
                                <Input
                                    type="text"
                                    className="login__input form-control py-3 px-4 block"
                                    placeholder={"Refund Reason"}
                                    name={"reason"}
                                    label="Refund Reason"
                                    isRequiredField
                                />
                            </>
                        );
                    }}
                </Modal>
            </>
        );
    };

    return (
        <>
            <AdvanceSearchModal
                removeConnector
                removeIPAddress
                title="Transactions Search"
                visible={isOpenMenu}
                onClose={changeMode}
                advanceSearchSubmit={advanceSearchSubmit}
                resetFilter={resetFilter}
                resetState={isReset}
            />

            {_renderSuspiciousModal()}
            {_renderRefundModal()}
            {_renderChargeBackModal()}
            {_renderRetrievalBackModal()}

            <Modal fullWidth visible={visibleDetailModal} removeFooter={false} onClose={onCloseDetailModal} heading="Transaction Details">
                <TransactionDetails singleDetails={singleDetails} />
            </Modal>

            {/* BEGIN: Content */}
            <div className="content">
                {_renderHeading()}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {listingType === "box" ? _renderTransactionBoxTable() : _renderTransactionTable()}
                            </div>
                        </div>
                    </div>
                </div>

                {!isLoading && transactions?.length !== 0 && typeof transactions !== "undefined" && (
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

export default Home;

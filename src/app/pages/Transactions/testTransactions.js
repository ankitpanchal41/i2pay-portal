import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdvanceSearchModal from "../../components/common/AdvanceSearchModal";
import { changeTransactionStatus, getTestTransactionsStart } from "../../redux/actions/Transactions";
import { ClipLoader } from "react-spinners";
import Pagination from "../../components/common/Pagination";
import Heading from "../../components/common/Heading";
import { transactionsConnectorAccountStatusLabels, transactionsStatusLabels } from "../../utils/transactions";
import { Currency } from "../../utils/currency";
import { downloadTransactionsExcel, downloadTransactionsLiveExcel } from "../../redux/services/DownloadExcel";
import Modal from "../../components/common/Modal";
import $ from "jquery";
import { transactionRefundSchema } from "../../utils/validationSchema";
import Input from "../../components/common/forms/Input";
import TransactionTypes from "../../components/common/TransactionTypes";
import TransactionDetails from "../../components/common/TransactionDetails";
import * as Icon from "react-feather";
import { decode } from "html-entities";
import NotAvailable from "../../components/common/status/NotAvailable";
import Images from "../../../assets/images";

const initialValues = {
    reason: "",
};

const TestTransactions = () => {
    const dispatch = useDispatch();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const { transactions, totalPage } = useSelector((state) => state.transactionsTest);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [advanceSearchPayload, setAdvanceSearchPayload] = useState("");
    const [isParPage, setIsParPage] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [visibleDetailModal, setVisibleDetailModal] = useState(false);
    const [singleDetails, setSingleDetails] = useState(false);
    const [visibleSuspiciousModal, setVisibleSuspiciousModal] = useState(false);
    const [visibleChargeBackModal, setVisibleChargeBackModal] = useState(false);
    const [visibleRefundModal, setVisibleRefundModal] = useState(false);
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
            getTestTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 1, ...advanceSearchPayload }, () => {
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
            dispatch(
                getTestTransactionsStart(1, perPage, searchQuery, { test_mode: 1, ...advanceSearchPayload }, () => setIsLoading(false)),
            );
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
            getTestTransactionsStart(1, perPage, searchQuery, { test_mode: 1, ...values }, () => {
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
            getTestTransactionsStart(1, perPage, "", { test_mode: 1 }, () => {
                setIsLoading(false);
                setIsParPage(true);
                setIsReset(false);
            }),
        );
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const payload = {
            ...advanceSearchPayload,
            search: searchQuery,
            test_mode: 1,
        };
        const data = await downloadTransactionsLiveExcel(payload);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onCloseDetailModal = (item) => {
        setSingleDetails(item);
        setVisibleDetailModal(!visibleDetailModal);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Test Transactions"}
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
            refund_reason: "",
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
                        getTestTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 1, ...advanceSearchPayload }, () =>
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
            refund_reason: "",
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
                        getTestTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 1, ...advanceSearchPayload }, () =>
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
                        getTestTransactionsStart(currentPage, perPage, searchQuery, { test_mode: 1, ...advanceSearchPayload }, () =>
                            setIsLoading(false),
                        ),
                    );
                },
            ),
        );
    };

    useEffect(() => {
        $(document).on("click", ".transaction-actions", function (e) {
            console.log("Inside it");
            let type = $(this).data("name");
            let orderId = $(this).data("id");
            let date = $(this).data("date");
            setOrderId(orderId);
            console.log({ type, orderId });
            // setRefundDate(date);
            type === "Refund" ? handleRefundModal(type) : type === "Suspicious" ? handleSuspiciousModal(type) : handleChargeBackModal(type);
            e.preventDefault();
            $(".dropdown-menu").removeClass("show");
        });
    }, []);

    console.log({ state });

    const _renderTransactionTable = () => {
        return (
            <>
                {/* START: Transactions Table */}
                <table class="table table-report sm:mt-2">
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
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={8}>
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
                                        <td>{item.email}</td>
                                        <td className="whitespace-pre">
                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span> {item.amount}
                                        </td>
                                        <td>{item.currency}</td>
                                        <td>
                                            <div className="text-slate-500 text-xs mt-0.5"> {transactionsStatusLabels(item.status)}</div>
                                        </td>
                                        <td>{item.connector_name}</td>
                                        {/* <td>
                                        <div
                                            className="text-slate-500 text-md mt-0.5">

                                            {item?.connector_account === 0 || item?.connector_account === 1 ? transactionsConnectorAccountStatusLabels(item?.connector_account) :
                                                <NotAvailable/>}
                                        </div>
                                    </td> */}
                                        <td>{item.created_at}</td>
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
                                                {item.status !== 1 || item?.is_refund === 1 ? (
                                                    <div className="text-slate-500 text-xs mt-0.5 text-center"> - </div>
                                                ) : (
                                                    <div className="dropdown ml-auto sm:ml-0">
                                                        <button
                                                            className="dropdown-toggle btn btn-elevated-rounded-secondary px-2"
                                                            aria-expanded="false"
                                                            data-tw-toggle="dropdown">
                                                            <span className="w-3 h-3 flex items-center justify-center">
                                                                <Icon.Plus size="16" />
                                                            </span>
                                                        </button>
                                                        <div className="dropdown-menu w-48">
                                                            <ul className="dropdown-content">
                                                                <li>
                                                                    <a
                                                                        data-name="Refund"
                                                                        data-id={item.order_id}
                                                                        data-date={item.refund_date}
                                                                        href="javascript:void(0);"
                                                                        className="dropdown-item transaction-actions">
                                                                        <Icon.Settings size="14" className="mr-1" /> Mark as Refund
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
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
                                                            <span
                                                                className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Connector Account:&nbsp;
                                                            </span>
                                                            <span
                                                                className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                <div
                                                                    className="text-slate-500 text-md mt-0.5">
                                                                    {item?.connector_account === 0 || item?.connector_account === 1 ? transactionsConnectorAccountStatusLabels(item?.connector_account) :
                                                                        <NotAvailable/>}
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
                    <div>Are you sure to mark this transaction as suspicious.?</div>
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
                    <div>Are you sure to mark this transaction as chargeback.?</div>
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

export default TestTransactions;

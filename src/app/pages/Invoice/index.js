import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getInvoiceRequest, setSendInvoice } from "../../redux/actions/Invoice";
import { DELETE_INVOICE_REQUEST } from "../../redux/types/Invoice";
import { ClipLoader } from "react-spinners";
import { GET_API_KEY_REQUEST } from "../../redux/actions/APIKey";
import { invoiceSendSchema } from "../../utils/validationSchema";
import { MonthSelect, Timeline, WeekSelect } from "../../utils/staticDropdown";
import { downloadInvoiceExcel } from "../../redux/services/DownloadExcel";
import { downloadInvoice, sendInvoice } from "../../redux/services/Invoice";
import { store } from "../../redux/store";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import "react-datepicker/dist/react-datepicker.css";

const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Modal = React.lazy(() => import("../../components/common/Modal"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Select = React.lazy(() => import("../../components/common/forms/Select"));
const DatePicker = React.lazy(() => import("react-datepicker"));

const initialValues = {
    email: "",
    subject: "",
    body: "",
    timeline: "",
    timeline_type: "",
};

const Invoice = () => {
    const { invoiceList, totalPage } = useSelector((state) => state.invoice);
    const { userData } = store.getState()?.persist;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const printRef = React.useRef(null);

    // const handleDownloadPdf = async () => {
    //     printRef.current.save();
    // };

    const [listingType, setListingType] = useState("");
    const [deleteModalDetails, setDeleteModalDetails] = useState({ visible: false, id: null });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [invoiceSendLoading, setInvoiceSendLoading] = useState(false);
    const [invoiceDownloadLoading, setInvoiceDownloadLoading] = useState(false);
    const [visibleSendModal, setVisibleSendModal] = useState(false);
    const [invoiceId, setInvoiceId] = useState(false);
    const [sendInvoiceDetail, setSendInvoiceDetail] = useState(false);
    const state = useSelector((state) => state);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    const handleDeleteInvoice = () => {
        if (deleteModalDetails?.visible) {
            // dispatch(deleteInvoice(deleteModalDetails?.id, handleCloseDeleteModal));
            const callBack = () => {
                handleCloseDeleteModal();
                setIsLoadingDelete(false);
            };

            setIsLoadingDelete(true);
            dispatch({ type: DELETE_INVOICE_REQUEST, payload: { invoice_id: deleteModalDetails?.id }, callBack });
        }
    };

    const handleCloseDeleteModal = React.useCallback(() => {
        setDeleteModalDetails({ visible: false, id: null });
    }, []);

    useEffect(() => {
        if (deleteModalDetails.visible || visibleSendModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return true;
    }, [deleteModalDetails, visibleSendModal]);

    const onClickDetails = (value) => {
        navigate(`/invoice/detail/${value?.id}`);
        // setInvoiceDetailsVisible(true);
        // setInvoiceDetails({ ...value, productList: JSON.parse(value?.productList) });
    };

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
        return true;
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getInvoiceRequest(currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
        return true;
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getInvoiceRequest(1, perPage, searchQuery, () => setIsLoading(false)));
        }
        return true;
    }, [perPage]);

    useEffect(() => {
        const callBack = () => {
            // setIsLoading(false);
        };

        // setIsLoading(true);
        dispatch({ type: GET_API_KEY_REQUEST, callBack });
        return true;
    }, []);

    const pagination = {
        totalPage: invoiceList?.length === 0 ? 1 : totalPage,
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

    const handleSendModal = (item) => {
        setVisibleSendModal(!visibleSendModal);
        setInvoiceId(item?.id);
        setSendInvoiceDetail(item?.invoiceEmailCount);
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const data = await downloadInvoiceExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onSendMail = async (value) => {
        const payload = {
            invoice_id: invoiceId,
            body: value.body,
            subject: value.subject,
            email_to: value.email,
        };
        setInvoiceSendLoading(true);
        const data = await sendInvoice(payload);
        if (data) {
            setInvoiceSendLoading(false);
            handleSendModal();
            let findValue = invoiceList?.find((i) => i?.id === invoiceId);
            findValue = { ...findValue?.invoiceEmailCount };
            if (findValue[value.email] === undefined) {
                findValue[value.email] = 1;
            } else {
                findValue[value.email] = findValue[value.email] + 1;
            }
            dispatch(setSendInvoice({ id: invoiceId, value: findValue }));
        }
    };

    const onDownloadPDF = async (item) => {
        setInvoiceDownloadLoading(item?.id);
        const payload = {
            invoice_id: item?.id,
        };

        const data = await downloadInvoice(payload);
        setInvoiceDownloadLoading(false);
        if (data?.responseCode === 200) {
            window.location.href = data?.data?.invoice_path;
        }
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Invoice List"}
                displayBackButton={false}
                onChangeSearchQuery={onChangeSearchQuery}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <Link to="/invoice/add" className="btn text-sm font-medium text-white bg-primary max-h-[38px] ml-2">
                        <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                        <span className="hidden md:block lg:block">Add Invoice</span>
                    </Link>
                }
            />
        );
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
                            <th className="whitespace-nowrap">Invoice Number</th>
                            <th className="whitespace-nowrap">Total Amount</th>
                            <th className="whitespace-nowrap">Currency</th>
                            {/* <th className="whitespace-nowrap">Total Products</th> */}
                            <th className="whitespace-nowrap">No Of Transactions</th>
                            <th className="whitespace-nowrap">Total Transactions</th>
                            {/* <th className="whitespace-nowrap">Price Editable</th> */}
                            <th className="whitespace-nowrap text-center">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={9}>
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
                            {invoiceList?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-20">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.invoiceNumber}</td>
                                        <td>
                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span>
                                            {item?.totalAmount}
                                        </td>
                                        <td>
                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span>(
                                            {item?.currency})
                                        </td>
                                        <td>{item?.noOfTransactions || 0}</td>
                                        <td>
                                            <span>{decode(Currency.find((c) => c?.value === item?.transactionCurrency)?.symbol)}</span>
                                            {item?.totalTransactions || 0}
                                        </td>
                                        <td className="table-report__action text-center">
                                            <div className="flex justify-center">
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-5"
                                                    }>
                                                    <Icon.Eye onClick={() => onClickDetails(item)} size={15} /> &nbsp;
                                                </div>
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-5"
                                                    }>
                                                    {invoiceDownloadLoading === item?.id ? (
                                                        <ClipLoader
                                                            loading={invoiceDownloadLoading === item?.id}
                                                            color="#1e3a8a"
                                                            size={15}
                                                            css="border-width: 1px;border-bottom-color: white !important;"
                                                        />
                                                    ) : (
                                                        <Icon.Download onClick={() => onDownloadPDF(item)} size={15} />
                                                    )}
                                                </div>
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-5"
                                                    }>
                                                    <Icon.Send onClick={() => handleSendModal(item)} size={15} /> &nbsp;
                                                </div>
                                                {/* <PDFExport ref={printRef} paperSize="A3"></PDFExport> */}
                                                {/* <div
                                                className={
                                                    "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 mr-5"
                                                }>
                                                <Icon.Download size={15} /> &nbsp;
                                            </div> */}
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-5"
                                                    }>
                                                    <Icon.Edit onClick={() => navigate(`/invoice/edit/${item?.id}`)} size={15} /> &nbsp;
                                                </div>
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-red-600 dark:text-red-600"
                                                    }>
                                                    <Icon.Trash2
                                                        onClick={() =>
                                                            setDeleteModalDetails({
                                                                visible: true,
                                                                id: item?.id,
                                                            })
                                                        }
                                                        size={15}
                                                        stroke={"red"}
                                                        strokeWidth={2}
                                                    />
                                                    &nbsp;
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>

                {/* END: Table Not Found */}
                {!isLoading && !invoiceList?.length && (
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
                {/* START: Box Table */}
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
                        {invoiceList?.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="intro-y col-span-12 md:col-span-6 cursor-pointer"
                                    onClick={() => onClickDetails(item)}>
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <span className="font-medium text-primary dark:text-white">{item?.name}</span>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="dropdown ml-auto sm:ml-0 flex items-center">
                                                    <div
                                                        onClick={() => onDownloadPDF(item?.id)}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Download size={15} /> &nbsp;
                                                    </div>
                                                    <div
                                                        onClick={() => navigate(`/invoice/edit/${item?.id}`)}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Edit size={15} /> &nbsp;
                                                    </div>
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDeleteModalDetails({ visible: true, id: item?.id });
                                                        }}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-red-600 dark:text-red-600"
                                                        }>
                                                        <Icon.Trash2 size={15} strokeWidth={2} /> &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-0 lg:justify-end mt-3 lg:mt-0  border-b border-slate-200/60 dark:border-darkmode-400 p-5">
                                            <div className="mr-auto text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                <div className="text-slate-500 text-xs col-span-6">
                                                    <span className="mt-0.5 font-bold text-slate-800 dark:text-white">
                                                        {" "}
                                                        No Of Transactions:&nbsp;
                                                    </span>
                                                    <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                        {item?.noOfTransactions || 0}
                                                    </span>
                                                </div>
                                                <div className="text-slate-500 text-xs col-span-6 text-right">
                                                    <span className="mt-0.5 font-bold text-slate-800 dark:text-white">
                                                        Total Transactions:&nbsp;
                                                    </span>
                                                    <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                        <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span>
                                                        {item?.totalOfTransactions || 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-0 lg:justify-end mt-3 lg:mt-0  border-b border-slate-200/60 dark:border-darkmode-400 p-5">
                                            <div className="mr-auto text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                <div className="text-slate-500 text-xs col-span-6">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold dark:text-white">
                                                        Amount:&nbsp;
                                                    </span>
                                                    <span className="text-slate-900 text-xs mt-0.5 dark:text-slate-400">
                                                        <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span>
                                                        {item?.totalAmount}
                                                    </span>
                                                </div>
                                                <div className="text-slate-500 text-xs col-span-6 text-right">
                                                    <span className="mt-0.5 font-bold text-slate-800 dark:text-white">Currency:&nbsp;</span>
                                                    <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                        <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span>(
                                                        {item?.currency})
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

                {/* END: Box Table */}

                {/* START: Box Not Found */}
                {!invoiceList?.length && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Box Not Found */}
            </>
        );
    };

    const _renderSendModal = () => {
        return (
            <>
                <Modal
                    heading={"Send Mail"}
                    visible={visibleSendModal}
                    onClose={handleSendModal}
                    func
                    onClickSave={onSendMail}
                    onClickCancel={handleSendModal}
                    modalMinWidth={"50%"}
                    useFormik
                    buttonLoading={invoiceSendLoading}
                    initialValues={initialValues}
                    validationState={invoiceSendSchema}>
                    {(setFieldValue, values, errors) => {
                        const sendInvoiceList = [];
                        for (const property in sendInvoiceDetail) {
                            sendInvoiceList.push({ email: property, count: sendInvoiceDetail[property] });
                        }

                        return (
                            <>
                                {sendInvoiceList?.length > 0 && (
                                    <>
                                        <div className="ml-auto text-primary truncate">Sent Mails</div>
                                        <div className="mb-4 mt-2">
                                            {sendInvoiceList?.map((item, index) => {
                                                return (
                                                    <span key={index}>
                                                        {index + 1}. {item?.email}{" "}
                                                        <span className="text-slate-500 text-xs">({item?.count})</span>
                                                        {sendInvoiceList?.length - 1 === index ? "" : ", "}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}

                                <div></div>
                                <Input
                                    type="text"
                                    className="login__input form-control py-3 px-4 block"
                                    placeholder={"To Email"}
                                    name={"email"}
                                    label="To Email"
                                    isRequiredField
                                />
                                <Input
                                    type="text"
                                    className="login__input form-control py-3 px-4 block"
                                    placeholder={"Subject"}
                                    name={"subject"}
                                    label="Subject"
                                    isRequiredField
                                    containerClassName="mt-2"
                                />
                                <Input
                                    textarea="true"
                                    type="text"
                                    className="login__input form-control py-3 px-4 block"
                                    placeholder={"Body"}
                                    name={"body"}
                                    label="Body"
                                    isRequiredField
                                    containerClassName="mt-2"
                                />
                                <Select
                                    // isRequiredField
                                    name="timeline"
                                    className="login__input form-control py-3 px-4 block"
                                    firstEnableLabel={"Select Timeline"}
                                    label={"Select Timeline"}
                                    data={Timeline}
                                    containerClassName="mt-2"
                                    value={values?.timeline}
                                    onChange={(e) => {
                                        setFieldValue("timeline", e.target.value);
                                        setFieldValue("timeline_type", "");
                                    }}
                                    // errorEnabled
                                />
                                {values?.timeline != "" && values?.timeline != "1" && values?.timeline != "4" && (
                                    <Select
                                        isRequiredField
                                        name="timeline_type"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        firstDisableLabel={"Select Days"}
                                        label={"Select Days"}
                                        data={values?.timeline == 2 ? WeekSelect : values?.timeline == 3 ? MonthSelect : []}
                                        containerClassName="mt-2"
                                    />
                                )}

                                {values?.timeline == "4" && (
                                    <>
                                        <label htmlFor="modal-form-5" className="form-label mt-2">
                                            End Date <span className="text-danger">*</span>
                                        </label>
                                        <div className="relative mx-auto">
                                            <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
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
                                                    className="feather feather-calendar w-4 h-4">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>{" "}
                                            </div>
                                            <DatePicker
                                                dateFormat="dd MMMM"
                                                selected={values?.timeline_type}
                                                className="form-control pl-12"
                                                name="timeline_type"
                                                // maxDate={new Date()}
                                                // minDate={addDaysInDate(startDate, 1) !== null ? addDaysInDate(startDate, 1) : startDate}
                                                onChange={(date) => setFieldValue("timeline_type", date)}
                                                placeholderText="Select End Date"
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        );
                    }}
                </Modal>
            </>
        );
    };

    return (
        <>
            <DeleteModal
                isLoading={isLoadingDelete}
                onClose={handleCloseDeleteModal}
                visible={deleteModalDetails?.visible}
                onDelete={handleDeleteInvoice}
            />
            <div className="content">
                {/* BEGIN: Heading */}
                {userData?.data?.is_active_connector == "1" && _renderHeading()}
                {/* END: Heading */}

                {_renderSendModal()}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {userData?.data?.is_active_connector != "1" ? (
                                    <div className="flex flex-col justify-center h-48 items-center">
                                        <div className="text-primary dark:text-white text-xl -mt-3">
                                            You need to active connector after that you can access invoice functionality.
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

                {userData?.data?.is_active_connector == "1" && invoiceList?.length !== 0 && typeof invoiceList !== "undefined" && (
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

export default Invoice;

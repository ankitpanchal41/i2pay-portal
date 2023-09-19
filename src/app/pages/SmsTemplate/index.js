import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { getSmsTemplateRequest, setSendSMS } from "../../redux/actions/SmsTemplate";
import { DELETE_SMS_TEMPLATE_REQUEST, SEND_PAYMENT_SMS_REQUEST } from "../../redux/types/SmsTemplate";
import { smsSendSchema, templateSendSchema } from "../../utils/validationSchema";
import { downloadSMSPaymentExcel } from "../../redux/services/DownloadExcel";
import { decode } from "html-entities";
import { Currency } from "../../utils/currency";
import PhoneInput from "../../components/common/forms/PhoneInput";

const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Modal = React.lazy(() => import("../../components/common/Modal"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));

const initialValues = {
    mobile_number: "",
    countryCode: {
        name: "India",
        value: "+91",
        code: "IN",
        flag: "🇮🇳",
    },
};

const SmsTemplateList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.persist);

    // const {storeId} = useParams();
    // const storeId = 2;

    const [listingType, setListingType] = useState("");
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [imageModal, setImageModal] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [visibleSendModal, setVisibleSendModal] = useState(false);
    const [smsId, setSMSId] = useState(false);
    const [smsSendLoading, setSMSSendLoading] = useState(false);
    // const [sendSMSDetail, setSendSMSDetail] = useState(false);

    const { smsTemplateList, totalPage } = useSelector((state) => state.sms);
    const [sendSMSDetail, setSendSMSDetail] = useState(false);

    // const [visibleSendModal, setVisibleSendModal] = useState(false);
    // const [contentId, setContentId] = useState(false);
    // const [sendContentDetail, setSendContentDetail] = useState(false);
    // const [templateSendLoading, setTemplateSendLoading] = useState(false);

    const state = useSelector((state) => state);

    // const onCloseModal = (e) => {
    //     setImageModal(false);
    // };

    // Set Listing Type
    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        console.clear();

        setIsLoading(true);
        dispatch(
            getSmsTemplateRequest(currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getSmsTemplateRequest(1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const onClickDelete = () => {
        const callBack = () => {
            setIsLoadingDelete(false);
            onHandleDeleteModal();
        };

        setIsLoadingDelete(true);
        dispatch({
            type: DELETE_SMS_TEMPLATE_REQUEST,
            payload: { merchant_payment_sms_content_id: deleteModalDetails },
            callBack,
        });
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const pagination = {
        totalPage: smsTemplateList?.length === 0 ? 1 : totalPage,
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

    const displayContent = (content) => {
        return content.replace(/[{}]/g, "");
    };

    // const onSendMail = async (value) => {
    //     const payload = {
    //         merchant_payment_sms_content_id: contentId,
    //         email: value.email,
    //     };
    //     setTemplateSendLoading(true);
    //     const data = await sendPaymentSMSData(payload);
    //     setTemplateSendLoading(false);
    //     handleSendModal();
    // };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const data = await downloadSMSPaymentExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const handleSendModal = (item) => {
        setVisibleSendModal(!visibleSendModal);
        setSMSId(item?.id);
        setSendSMSDetail(item?.smsCount);
    };

    const onSendMail = async (value) => {
        setSMSSendLoading(true);

        const callback = () => {
            setSMSSendLoading(false);
            setVisibleSendModal(!visibleSendModal);
        };

        const navigateState = () => {};

        const sendSMSPayload = {
            merchant_payment_sms_content_id: smsId,
            phone_number: value?.phone_number,
            country_code: value?.countryCode?.value,
        };

        dispatch({ type: SEND_PAYMENT_SMS_REQUEST, payload: sendSMSPayload, callback, navigateState });

        let findValue = smsTemplateList?.find((i) => i?.id === smsId);
        findValue = { ...findValue?.smsCount };
        if (findValue[value.phone_number] === undefined) {
            findValue[value.phone_number] = 1;
        } else {
            findValue[value.phone_number] = findValue[value.phone_number] + 1;
        }
        dispatch(setSendSMS({ id: smsId, value: findValue }));

        // setInvoiceSendLoading(true);
        // const data = await sendInvoice(payload);
        // if (data) {
        //     setInvoiceSendLoading(false);
        //     handleSendModal();

        //     let findValue = invoiceList?.find((i) => i?.id === invoiceId);
        //     findValue = { ...findValue?.invoiceEmailCount };
        //     if (findValue[value.email] === undefined) {
        //         findValue[value.email] = 1;
        //     } else {
        //         findValue[value.email] = findValue[value.email] + 1;
        //     }
        //     dispatch(setSendInvoice({ id: invoiceId, value: findValue }));
        // }
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"SMS Payment"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <Link to={"/sms-payment/create"} className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add SMS Payment</span>
                        </Link>
                    </div>
                }
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* START: IP whitelist Table */}
                <table class="table table-report">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Name</th>
                            <th className="whitespace-nowrap">Content</th>
                            <th className="whitespace-nowrap">No Of Transactions</th>
                            <th className="whitespace-nowrap">Total Transactions</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody>
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
                        <tbody>
                            {smsTemplateList?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-20">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>
                                            {displayContent(item?.content)}
                                            <span className="text-primary underline ml-2"> https://example.com</span>
                                        </td>
                                        <td>{item?.noOfTransactions}</td>
                                        <td>
                                            {decode(Currency.find((c) => c?.value === item?.transactionCurrency)?.symbol)}
                                            {item?.totalTransactions}
                                        </td>
                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-5"
                                                    }>
                                                    <Icon.Send onClick={() => handleSendModal(item)} size={15} /> &nbsp;
                                                </div>
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-5"
                                                    }>
                                                    <Icon.Edit onClick={() => navigate(`/sms-payment/edit/${item?.id}`)} size={15} /> &nbsp;
                                                </div>
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-red-600 dark:text-red-600"
                                                    }>
                                                    <Icon.Trash2
                                                        onClick={() => onHandleDeleteModal(item?.id)}
                                                        size={15}
                                                        stroke={"red"}
                                                        strokeWidth={2}
                                                    />{" "}
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
                {/* END: IP whitelist Table *   /}

                {/* START: Table Not Found */}
                {smsTemplateList?.length === 0 && !isLoading && (
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
                        {smsTemplateList?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6">
                                    <div className="box">
                                        <div className="flex flex-col lg:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 dark:text-white text-xs font-bold">
                                                            Name:&nbsp;
                                                        </span>
                                                        {item?.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="flex">
                                                    <div
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-5"
                                                        }>
                                                        <Icon.Send onClick={() => handleSendModal(item)} size={15} /> &nbsp;
                                                    </div>
                                                    <div
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-slate-300 mr-5"
                                                        }>
                                                        <Icon.Edit onClick={() => navigate(`/sms-payment/edit/${item?.id}`)} size={15} />{" "}
                                                        &nbsp;
                                                    </div>
                                                    <div
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-red-600 dark:text-red-600"
                                                        }>
                                                        <Icon.Trash2
                                                            onClick={() => onHandleDeleteModal(item?.id)}
                                                            size={15}
                                                            stroke={"red"}
                                                            strokeWidth={2}
                                                        />{" "}
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center p-5">
                                            <div className="grid grid-cols-12 md:gap-1 gap-0">
                                                <div className="col-span-12 md:col-span-6 flex flex-col justify-start">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                            {" "}
                                                            No Of Transactions:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                            {item?.noOfTransactions}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 md:col-span-6 flex flex-col justify-end justify-start md:justify-end">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                            Total Transactions:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                            {item?.totalTransactions}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-span-12 flex flex-col justify-start">
                                                    {/*<div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">*/}
                                                    {/*    <div className="flex text-slate-500 text-xs">*/}
                                                    {/*        <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">*/}
                                                    {/*            Subject:&nbsp;*/}
                                                    {/*        </span>*/}
                                                    {/*        <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">*/}
                                                    {/*            {item?.subject}*/}
                                                    {/*        </span>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}

                                                    <div className="lg:mr-auto text-center lg:text-left lg:mt-0">
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                                Content:&nbsp;
                                                            </span>
                                                            <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                                {displayContent(item?.content)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {smsTemplateList?.length === 0 && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    const _renderSendModal = () => {
        const smsTemplateList = [];
        for (const property in sendSMSDetail) {
            smsTemplateList.push({ phone_number: property, count: sendSMSDetail[property] });
        }

        return (
            <>
                <Modal
                    func
                    heading={"Send SMS"}
                    visible={visibleSendModal}
                    onClose={handleSendModal}
                    onClickSave={onSendMail}
                    onClickCancel={handleSendModal}
                    modalMinWidth={"50%"}
                    useFormik
                    initialValues={initialValues}
                    validationState={smsSendSchema}
                    buttonLoading={smsSendLoading}>
                    {(setFieldValue, values, errors, touched) => {
                        return (
                            <>
                                {smsTemplateList?.length > 0 && (
                                    <>
                                        <div className="ml-auto text-primary truncate">Sent SMS</div>
                                        <div className="mb-4 mt-2">
                                            {smsTemplateList?.map((item, index) => {
                                                return (
                                                    <span key={index}>
                                                        {index + 1}. {item?.phone_number}{" "}
                                                        <span className="text-slate-500 text-xs">({item?.count})</span>
                                                        {smsTemplateList?.length - 1 === index ? "" : ", "}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}

                                <div className="mt-4 mb-[-12px]">
                                    Mobile No <span className="text-danger">*</span>
                                </div>
                                <PhoneInput
                                    countryCodeValue={values.countryCode}
                                    setFieldValue={setFieldValue}
                                    error={errors.phone_number}
                                    touched={touched.phone_number}
                                    name="phone_number"
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
            <DeleteModal
                isLoading={isLoadingDelete}
                visible={visibleDeleteModal}
                onClose={onHandleDeleteModal}
                onDelete={() => {
                    onClickDelete();
                }}
            />
            {/* END: Modal */}
            {_renderSendModal()}
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {userData?.data?.is_active_connector == "1" && _renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {userData?.data?.is_active_connector != "1" ? (
                                    <div className="flex flex-col justify-center h-48 items-center">
                                        <div className="text-primary dark:text-white text-xl -mt-3">
                                            You need to active connector after that you can access SMS templates functionality.
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

                {userData?.data?.is_active_connector == "1" &&
                    !isLoading &&
                    smsTemplateList?.length !== 0 &&
                    typeof smsTemplateList !== "undefined" && (
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

export default SmsTemplateList;

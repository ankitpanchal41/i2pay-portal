import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { transactionsFallBackStatusLabel, transactionsStatusLabels } from "../../utils/transactions";
import NotAvailable from "./status/NotAvailable";
import { Formik, Form } from "formik";
import { vendorsSelectSchema } from "../../utils/validationSchema";
import MiniLoader from "./MiniLoader";
import Input from "./forms/Input";
import { addSplitPaymentData, getSplitTransactionsData, getVendorListData } from "../../redux/services/Transactions";
import { decode } from "html-entities";
import { Currency } from "../../utils/currency";

const initialValues = {
    vendors: [],
    amounts: [],
    amount_type: 0,
};

function TransactionDetails({ singleDetails, onClose, isSpitEnable = false }) {
    const [activeTab, setActiveTab] = useState("billing");
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [vendorList, setVendorList] = useState([]);
    const [allVendorList, setAllVendorList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [isLoadingPage, setIsLoadingPage] = useState([]);

    useEffect(() => {
        if (singleDetails?.is_transaction_splitted === 1) {
            getSplitTransactions();
        } else {
            getVendorList();
        }
    }, []);

    const getVendorList = async () => {
        const payload = {
            connector_id: singleDetails?.connector_id,
        };

        setIsLoadingPage(true);
        const data = await getVendorListData(payload);

        if (data?.responseCode === 200) {
            setVendorList(data?.data);
            setAllVendorList(data?.data);
        }
        setIsLoadingPage(false);
    };

    const getSplitTransactions = async () => {
        const payload = {
            transaction_id: singleDetails?.id,
        };

        setIsLoadingPage(true);
        const data = await getSplitTransactionsData(payload);

        if (data?.responseCode === 200) {
            setPaymentList(data?.data);
        }

        setIsLoadingPage(false);
    };

    const onTabChange = (tab) => {
        setActiveTab(tab);
    };

    const onSubmit = async (values) => {
        const customizeTotalAmount = values?.amounts.reduce((a, b) => Number(a) + Number(b), 0);

        if (Number(customizeTotalAmount?.toFixed(2)) !== 0 && Number(customizeTotalAmount?.toFixed(2)) !== Number(singleDetails?.amount)) {
            return false;
        }

        const vendor_data = [];

        values?.vendors?.map((item, index) => {
            vendor_data.push({ id: item, amount: Number(values?.amounts?.[index]) });
        });

        const payload = {
            session_id: singleDetails?.session_id,
            gateway_id: singleDetails?.gateway_id,
            vendor_data: JSON.stringify(vendor_data),
        };

        setIsSubmiting(true);

        const data = await addSplitPaymentData(payload);

        if (data?.responseCode === 200) {
            onClose();
        }

        setIsSubmiting(false);
    };

    const onChangeVendors = (e, values, setFieldValue) => {
        // setVendorValue(e.target.value);
        const customizeVendors = [...values?.vendors];
        customizeVendors.push(e.target.value);
        setFieldValue("vendors", customizeVendors);

        console.log({ customizeVendors });
        const customizeVendorList = allVendorList?.filter((vendor) => !customizeVendors?.includes(vendor?.gateway_vendor_id?.toString()));
        console.log({ customizeVendorList });
        setVendorList(customizeVendorList);

        const customizeAmount = [];
        if (values?.amount_type === 0) {
            const amount = Number(singleDetails?.amount) / customizeVendors?.length;
            let totalAmount = 0;
            customizeVendors?.map((vendor, index) => {
                if (customizeVendors?.length > 1 && customizeVendors?.length === index + 1) {
                    const amount = Number(singleDetails?.amount) - Number(totalAmount);
                    customizeAmount.push(amount.toFixed(2));
                } else {
                    customizeAmount.push(amount.toFixed(2));
                }
                totalAmount += Number(amount.toFixed(2));
            });
        } else {
            values?.vendors?.map((vendor, index) => {
                customizeAmount.push(values?.amounts?.[index] ? values?.amounts?.[index] : "");
            });
        }

        setFieldValue("amounts", customizeAmount);
    };

    const onChangeAmount = (onChange, i, e, values) => {
        let customizeAmount = [...values];
        customizeAmount[i] = e.target.value;
        onChange("amounts", customizeAmount);
    };

    const onDeleteVendor = (gateway_vendor_id, values, setFieldValue, index) => {
        const customizeVendors = values?.vendors?.filter((v) => v?.toString() !== gateway_vendor_id);
        setFieldValue("vendors", customizeVendors);

        const customizeVendorList = allVendorList?.filter((vendor) => !customizeVendors?.includes(vendor?.gateway_vendor_id?.toString()));
        setVendorList(customizeVendorList);

        if (values?.amount_type === 0) {
            let customizeAmount = [];
            const amount = Number(singleDetails?.amount) / customizeVendors?.length;
            let totalAmount = 0;
            customizeVendors?.map((vendor, index) => {
                if (customizeVendors?.length > 1 && customizeVendors?.length === index + 1) {
                    const amount = Number(singleDetails?.amount) - Number(totalAmount);
                    customizeAmount.push(amount.toFixed(2));
                } else {
                    customizeAmount.push(amount.toFixed(2));
                }
                totalAmount += Number(amount.toFixed(2));
            });
            setFieldValue("amounts", customizeAmount);
        } else {
            let customizeAmount = values?.amounts?.filter((_, i) => i !== index);
            setFieldValue("amounts", customizeAmount);
        }
    };

    const onChangeAmountType = (values, value, setFieldValue) => {
        setFieldValue("amount_type", value);

        let customizeAmount = [];
        if (value === 0) {
            const amount = Number(singleDetails?.amount) / values?.vendors?.length;
            let totalAmount = 0;
            values?.vendors?.map((vendor, index) => {
                if (values?.vendors?.length > 1 && values?.vendors?.length === index + 1) {
                    const amount = Number(singleDetails?.amount) - Number(totalAmount);
                    customizeAmount.push(amount.toFixed(2));
                } else {
                    customizeAmount.push(amount.toFixed(2));
                }
                totalAmount += Number(amount.toFixed(2));
            });
        } else {
            values?.vendors?.map((vendor) => {
                customizeAmount.push("");
            });
        }

        setFieldValue("amounts", customizeAmount);
    };

    return (
        <div className="col-md-12">
            <div className="custom-tab-1">
                <ul className="nav nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center" role="tablist">
                    <li id="billing-tab" className="nav-item" role="presentation">
                        <a
                            className={`nav-link py-4 ${activeTab === "billing" ? "active" : ""}`}
                            data-tw-target="#billing"
                            aria-controls="billing"
                            role="tab"
                            onClick={() => onTabChange("billing")}>
                            Billing Info
                        </a>
                    </li>
                    <li id="extra-tab" className="nav-item" role="presentation">
                        <a
                            className={`nav-link py-4 ${activeTab === "extra" ? "active" : ""}`}
                            data-tw-target="#extra"
                            aria-controls="extra"
                            role="tab"
                            onClick={() => onTabChange("extra")}>
                            Extra Info
                        </a>
                    </li>
                    {singleDetails?.is_split_payment_enabled && isSpitEnable ? (
                        <li id="extra-tab" className="nav-item" role="presentation">
                            <a
                                className={`nav-link py-4 ${activeTab === "split-payment" ? "active" : ""}`}
                                data-tw-target="#extra"
                                aria-controls="extra"
                                role="tab"
                                onClick={() => onTabChange("split-payment")}>
                                Split Payment
                            </a>
                        </li>
                    ) : null}
                </ul>
                <div className="tab-content">
                    <h4 className="text-success mt-2 mb-2 ml-2"> Order No. : {singleDetails?.order_id}</h4>
                    <div
                        className={`tab-pane ${activeTab === "billing" ? "active" : ""}`}
                        id="billiing"
                        role="tabpanel"
                        aria-labelledby="billing-tab">
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Merchant Name</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.merchant_name || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Session Id</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.session_id || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Gateway Id</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.gateway_id || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Source Type</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.source_type || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Source Name</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.source || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>IP Address</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.ip_address || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Email</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.email || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Amount</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.amount || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Amount in USD</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.amount_in_usd || <NotAvailable />}</div>
                        </div>

                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Currency</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.currency || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Connector</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.connector_name || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Notify URL</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.notify_url || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Return URL</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.return_url || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Descriptor</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.descriptor || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Notify Status</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.notify_status || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Status</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <div className="text-slate-500 text-xs mt-0.5">
                                    {" "}
                                    {transactionsStatusLabels(Number(singleDetails?.status))}
                                </div>
                            </div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Reason</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.reason || <NotAvailable />}</div>
                        </div>
                        <div className="p-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-3">
                                <strong>Transaction Date</strong>
                            </div>
                            <div className="col-span-12 lg:col-span-6">{singleDetails?.created_at || <NotAvailable />}</div>
                        </div>
                    </div>
                    <div
                        id="extra"
                        className={`tab-pane ${activeTab === "extra" ? "active" : ""}`}
                        role="tabpanel"
                        aria-labelledby="extra-tab">
                        {singleDetails?.is_refund ? (
                            <>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Refund</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="text-slate-500 text-xs mt-0.5">
                                            {transactionsFallBackStatusLabel(singleDetails?.is_refund)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Refund Date</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">{singleDetails?.refund_date || <NotAvailable />}</div>
                                </div>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Refund Reason</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">{singleDetails?.refund_reason || <NotAvailable />}</div>
                                </div>
                            </>
                        ) : null}

                        {singleDetails?.is_chargeback ? (
                            <>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Chargeback</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="text-slate-500 text-xs mt-0.5">
                                            {" "}
                                            {transactionsFallBackStatusLabel(singleDetails?.is_chargeback)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Chargeback Date</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">{singleDetails?.chargeback_date || <NotAvailable />}</div>
                                </div>
                            </>
                        ) : null}

                        {singleDetails?.is_suspicious ? (
                            <>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Suspicious</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="text-slate-500 text-xs mt-0.5">
                                            {" "}
                                            {transactionsFallBackStatusLabel(singleDetails?.is_suspicious)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Suspicious Date</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">{singleDetails?.suspicious_date || <NotAvailable />}</div>
                                </div>
                            </>
                        ) : null}

                        {singleDetails?.is_remove_suspicious ? (
                            <>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Remove Suspicious</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="text-slate-500 text-xs mt-0.5">
                                            {" "}
                                            {transactionsFallBackStatusLabel(singleDetails?.is_remove_suspicious)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Remove Suspicious Date</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        {singleDetails?.remove_suspicious_date || <NotAvailable />}
                                    </div>
                                </div>
                            </>
                        ) : null}

                        {singleDetails?.is_retrieval ? (
                            <>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Retrieval</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="text-slate-500 text-xs mt-0.5">
                                            {" "}
                                            {transactionsFallBackStatusLabel(singleDetails?.is_retrieval)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Retrieval Date</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">{singleDetails?.retrieval_date || <NotAvailable />}</div>
                                </div>
                            </>
                        ) : null}

                        {singleDetails?.is_remove_retrieval ? (
                            <>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Remove Retrieval</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        <div className="text-slate-500 text-xs mt-0.5">
                                            {" "}
                                            {transactionsFallBackStatusLabel(singleDetails?.is_remove_retrieval)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 grid grid-cols-12 gap-6">
                                    <div className="col-span-12 lg:col-span-3">
                                        <strong>Remove Retrieval Date</strong>
                                    </div>
                                    <div className="col-span-12 lg:col-span-6">
                                        {singleDetails?.remove_retrieval_date || <NotAvailable />}
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                    <div
                        id="split-payment"
                        className={`tab-pane ${activeTab === "split-payment" ? "active" : ""}`}
                        role="tabpanel"
                        aria-labelledby="split-payment-tab">
                        <h4 className="text-success mt-2 mb-2 ml-2">
                            Amount. : {singleDetails?.currency} {singleDetails?.amount}
                        </h4>

                        {isLoadingPage ? (
                            <div className="h-[200px] flex justify-center items-center">
                                <MiniLoader css="border-width: 3px;" size={30} color="#1d3a8a" isLoading={isLoadingPage} />
                            </div>
                        ) : singleDetails?.is_transaction_splitted === 1 ? (
                            <>
                                <div className="text-[16px] font-semibold mb-5 mt-4">Vendors Splitted Amount</div>
                                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-4">
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <span className="text-[16px] font-semibold mb-5">Name</span>
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-3">
                                        <span className="text-[16px] font-semibold mb-3">Amount</span>
                                    </div>
                                    <div className="intro-y col-span-12 sm:col-span-3"></div>
                                    {paymentList?.map((item) => {
                                        return (
                                            <>
                                                <div className="intro-y col-span-12 sm:col-span-6">
                                                    <span className="text-[16px] mb-5">
                                                        {item?.receiver_name} ({item?.receiver_email})
                                                    </span>
                                                </div>
                                                <div className="intro-y col-span-12 sm:col-span-3">
                                                    <span className="text-[16px] mb-3">
                                                        {decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}{" "}
                                                        {item?.amount_sent}
                                                    </span>
                                                </div>
                                                <div className="intro-y col-span-12 sm:col-span-3"></div>
                                            </>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={vendorsSelectSchema}
                                onSubmit={onSubmit}
                                enableReinitialize>
                                {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => {
                                    const customizeTotalAmount = values?.amounts.reduce((a, b) => Number(a) + Number(b), 0);

                                    return (
                                        <Form className="mt-5">
                                            <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                <div className="intro-y col-span-12 sm:col-span-6">
                                                    <label className="form-label">
                                                        Vendors
                                                        <span className="text-danger"></span>
                                                    </label>
                                                    <select
                                                        onChange={(e) => {
                                                            onChangeVendors(e, values, setFieldValue);
                                                        }}
                                                        value=""
                                                        name="vendors"
                                                        className="form-select intro-x login__input form-control py-2 px-3 block">
                                                        <option value="" disabled>
                                                            Select Venders
                                                        </option>
                                                        {vendorList?.map((vendor) => {
                                                            return (
                                                                <option value={vendor?.gateway_vendor_id}>
                                                                    {vendor?.name} ({vendor?.email})
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                    {touched?.vendors && errors?.vendors ? (
                                                        <p className="text-red-500 text-[12px] mt-2">{errors?.vendors}</p>
                                                    ) : null}
                                                </div>
                                                <div className="intro-y col-span-12 sm:col-span-6">
                                                    <label className="form-label">
                                                        Amount Type
                                                        <span className="text-danger"></span>
                                                    </label>
                                                    <div className="flex items-center mt-2">
                                                        <div className="form-check mr-4">
                                                            <input
                                                                id="radio-switch-1"
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="amount_type"
                                                                value="0"
                                                                checked={values?.amount_type === 0}
                                                                onChange={() => {
                                                                    onChangeAmountType(values, 0, setFieldValue);
                                                                }}
                                                            />
                                                            <label className="form-check-label" htmlFor="radio-switch-1">
                                                                Equal Amount
                                                            </label>
                                                        </div>
                                                        <div className="form-check mr-2">
                                                            <input
                                                                id="radio-switch-2"
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="amount_type"
                                                                value="1"
                                                                checked={values?.amount_type === 1}
                                                                onChange={() => {
                                                                    onChangeAmountType(values, 1, setFieldValue);
                                                                }}
                                                            />
                                                            <label className="form-check-label" htmlFor="radio-switch-2">
                                                                Customize Amount
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {touched?.amount_type && errors?.amount_type ? (
                                                        <p className="text-red-500 text-[12px] mt-2">{errors?.amount_type}</p>
                                                    ) : null}
                                                </div>
                                                {console.log({ values })}
                                                {values?.vendors?.length > 0 && (
                                                    <div className="intro-y col-span-12 sm:col-span-6 mt-10">
                                                        <div className="text-[16px] font-semibold mb-5">Vendors Amount Selection</div>
                                                        <div className="grid grid-cols-12 gap-4 gap-y-5 flex items-center">
                                                            {values?.vendors?.map((vendor, index) => {
                                                                const name = allVendorList?.find(
                                                                    (v) => v?.gateway_vendor_id?.toString() === vendor,
                                                                )?.name;
                                                                return (
                                                                    <>
                                                                        <div className="col-span-12 md:col-span-4">{name}</div>
                                                                        <div className="col-span-10 md:col-span-7">
                                                                            <Input
                                                                                onChange={(e) =>
                                                                                    onChangeAmount(setFieldValue, index, e, values?.amounts)
                                                                                }
                                                                                disabled={values?.amount_type === 0}
                                                                                value={values.amounts?.[index] || ""}
                                                                                name="value"
                                                                                type="number"
                                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                                placeholder="Amount"
                                                                            />
                                                                            {touched?.amounts?.[index] && errors?.amounts?.[index] ? (
                                                                                <p className="text-red-500 text-[12px] mt-2">
                                                                                    {errors?.amounts?.[index]}
                                                                                </p>
                                                                            ) : null}
                                                                        </div>
                                                                        <div className="col-span-2 md:col-span-1">
                                                                            <div
                                                                                className="btn btn-danger remove"
                                                                                onClick={() => {
                                                                                    onDeleteVendor(vendor, values, setFieldValue, index);
                                                                                }}>
                                                                                <Icon.Trash2 size="20" />
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="intro-y col-span-12">
                                                            <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                                <div className="col-span-12 md:col-span-4"></div>
                                                                <div className="col-span-12 md:col-span-8">
                                                                    {Number(customizeTotalAmount?.toFixed(2)) !== 0 &&
                                                                    Number(customizeTotalAmount?.toFixed(2)) !==
                                                                        Number(singleDetails?.amount) ? (
                                                                        <p className="text-red-500 text-[12px] mt-2">
                                                                            Transaction amount and vendor divided amount are not match.
                                                                        </p>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-10">
                                                            <button
                                                                className="btn btn-primary w-24 ml-2"
                                                                onClick={handleSubmit}
                                                                disabled={isSubmiting}>
                                                                Save <MiniLoader isLoading={isSubmiting} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionDetails;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { paymentLinkSchema } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import { DETAIL_PAYMENT_LINK_REQUEST, UPDATE_PAYMENT_LINK_REQUEST } from "../../redux/actions/PaymentLinkAction";
import * as Icon from "react-feather";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import { countryCodes } from "../../utils/countryCode";
import moment from "moment";
import { ClipLoader } from "react-spinners";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const PhoneInput = React.lazy(() => import("../../components/common/forms/PhoneInput"));
const Select = React.lazy(() => import("react-select"));
const DatePicker = React.lazy(() => import("react-datepicker"));

const PaymentLinkEdit = () => {
    const initialValuesObj = {
        title: "",
        description: "",
        amount: "",
        email: "",
        mobile_no: "",
        payment_type: "single",
        expiry_date: "",
        countryCode: {
            name: "India",
            value: "+91",
            code: "IN",
            flag: "🇮🇳",
        },
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { payment_link_id } = useParams();
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const { detailPaymentLink } = useSelector((state) => state.paymentLink);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [expiryDate, setExpiryDate] = useState(null);

    const handleExpiryDate = (date, setFieldValue) => {
        setFieldValue("expiry_date", date);
        setExpiryDate(date);
    };

    const onSubmit = (values) => {
        console.log({ values });
        if (isSubmiting) return;

        setIsSubmiting(true);

        const callBack = () => {
            setIsSubmiting(false);
        };

        const navigateState = () => {
            navigate(`/payment-links`);
        };

        const payload = {
            ...values,
            payment_link_id: payment_link_id,
            country_code: values?.countryCode?.value,
            expiry_date: values?.expiry_date ? moment(values?.expiry_date).format("YYYY-MM-DD") : "",
            countryCode: undefined,
        };

        dispatch({ type: UPDATE_PAYMENT_LINK_REQUEST, payload, callBack, navigateState });
    };

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateListing = () => {
            navigate("/payment-links");
        };
        setIsLoading(true);
        dispatch({ type: DETAIL_PAYMENT_LINK_REQUEST, payload: { payment_link_id: payment_link_id }, callBack, navigateListing });
    }, []);

    useEffect(() => {
        setInitialValues({
            title: detailPaymentLink?.title,
            currency: detailPaymentLink?.currency,
            amount: detailPaymentLink?.amount,
            email: detailPaymentLink?.email,
            mobile_no: detailPaymentLink?.mobile_no,
            countryCode: countryCodes?.find((c) => c?.value === detailPaymentLink?.country_code),
            payment_type: detailPaymentLink?.payment_type,
            expiry_date: detailPaymentLink?.expiry_date,
            description: detailPaymentLink?.description,
        });
    }, [detailPaymentLink]);

    const onClickBack = () => {
        navigate(`/payment-links`);
    };

    const _renderHeading = () => {
        return <Heading title={"Edit Payment Link"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
            borderColor: "#e2e8f0",
            color: mode === "dark" ? "#FFFFFF" : "#384252",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,

                cursor: isDisabled ? "not-allowed" : "default",
                border: isFocused ? "0px" : "0px",

                ":active": {
                    ...styles[":active"],
                },
                ":hover": {
                    ...styles[":hover"],
                    backgroundColor: mode === "dark" ? "#0f1d36" : "#b1d7ff",
                },
            };
        },
        input: (styles, { isFocused }) => ({
            ...styles,
            ":active": {
                border: "none",
            },
            border: 0,
            // This line disable the blue border
        }),
        placeholder: (styles, { isFocused }) => ({
            ...styles,
            boxShadow: "none",
            // This line disable the blue border
        }),

        singleValue: (styles, { data }) => ({ ...styles, color: mode === "dark" ? "#FFFFFF" : "#384252" }),
        menu: (styles, { data }) => ({ ...styles, backgroundColor: mode === "dark" ? "#1b253b" : "white" }),
        menuList: (styles, { data }) => ({ ...styles, maxHeight: 150 }),
    };

    return (
        <>
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="intro-y">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
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
                                    <>
                                        {/* BEGIN: Connector Table */}
                                        <div className="intro-y box p-5 mt-5">
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={paymentLinkSchema}
                                                onSubmit={onSubmit}
                                                validateOnMount
                                                enableReinitialize>
                                                {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                                    <Form className="">
                                                        <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <Input
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.paymentLink.title}
                                                                    name="title"
                                                                    label={messages.paymentLink.title}
                                                                    isRequiredField
                                                                />
                                                            </div>

                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <label className="form-label">Payment Type</label>
                                                                <select
                                                                    value={values.payment_type}
                                                                    name="payment_type"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    onChange={(e) => setFieldValue("payment_type", e.target.value)}>
                                                                    <option value="single">Single</option>
                                                                    <option value="multiple">Multiple</option>
                                                                </select>
                                                            </div>

                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <label className="form-label">
                                                                    {messages.paymentLink.currency} <span className="text-danger"> *</span>
                                                                </label>
                                                                <Select
                                                                    defaultValue={{ value: "INR", label: "India Rupee" }}
                                                                    value={Currency?.find((item) => item?.value === values?.currency)}
                                                                    styles={colourStyles}
                                                                    style={{ boxShadow: "none" }}
                                                                    options={Currency}
                                                                    onChange={(e) => {
                                                                        setFieldValue("currency", e?.value);
                                                                    }}
                                                                    className="intro-x login__input form-control block shadow-none"
                                                                    getOptionLabel={(e) => (
                                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                                            <span style={{ marginLeft: 5 }}>
                                                                                <span>{decode(e.symbol)}</span> ({e?.value})
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                />
                                                            </div>

                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <Input
                                                                    type="number"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.paymentLink.amount}
                                                                    name="amount"
                                                                    label={messages.paymentLink.amount}
                                                                    isRequiredField
                                                                />
                                                            </div>

                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <Input
                                                                    isRequiredField
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.paymentLink.email}
                                                                    label={messages.paymentLink.email}
                                                                    name="email"
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <div className="mb-[-12px]">
                                                                    Mobile No <span className="text-danger">*</span>
                                                                </div>
                                                                <PhoneInput
                                                                    countryCodeValue={values.countryCode}
                                                                    setFieldValue={setFieldValue}
                                                                    error={errors.mobile_no}
                                                                    touched={touched.mobile_no}
                                                                    name="mobile_no"
                                                                />
                                                            </div>

                                                            <div className="col-span-12 sm:col-span-6">
                                                                <label htmlFor="modal-form-5" className="form-label">
                                                                    {messages.paymentLink.expiryDate}{" "}
                                                                </label>
                                                                <div className="relative mx-auto">
                                                                    <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                                                        {" "}
                                                                        <Icon.Calendar size="15" />{" "}
                                                                    </div>
                                                                    <DatePicker
                                                                        dateFormat="dd-MM-yyyy"
                                                                        selected={expiryDate}
                                                                        className="form-control pl-12 py-2"
                                                                        name="expiry_date"
                                                                        minDate={new Date()}
                                                                        value={
                                                                            values.expiry_date
                                                                                ? moment(values.expiry_date).format("DD-MM-YYYY")
                                                                                : ""
                                                                        }
                                                                        onChange={(date) => handleExpiryDate(date, setFieldValue)}
                                                                        placeholderText="Select End Date"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <label className="form-label">{messages.paymentLink.description}</label>
                                                                <textarea
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.paymentLink.description}
                                                                    name="description"
                                                                    value={values.description}
                                                                    onChange={(e) => setFieldValue("description", e.target.value)}
                                                                    onBlur={() => setFieldTouched("description", true)}
                                                                    rows={"6"}></textarea>
                                                            </div>

                                                            <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                                <button
                                                                    type="buttons"
                                                                    className="btn btn-primary w-24 ml-2"
                                                                    onClick={handleSubmit}
                                                                    disabled={isSubmiting}
                                                                >
                                                                    Save <MiniLoader isLoading={isSubmiting} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                        {/* END: Connector Table */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END: Content */}
        </>
    );
};

export default PaymentLinkEdit;

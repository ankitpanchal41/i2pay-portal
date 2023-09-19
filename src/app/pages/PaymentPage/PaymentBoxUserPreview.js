import React, { useCallback, useEffect } from "react";
import { paymentPageUserSchema } from "../../utils/validationSchema";
import { Form, Formik } from "formik";
import { messages } from "../../messages/merchantRegister";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import { useSelector } from "react-redux";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Select = React.lazy(() => import("react-select"));
const PhoneInput = React.lazy(() => import("../../components/common/forms/PhoneInput"));

const PaymentBoxUserPreview = ({ data }) => {
    const initialValues = {
        amount: data?.amount,
        currency: data?.currency || "INR",
        mobile_no: "",
        email: "",
        countryCode: {
            name: "India",
            value: "+91",
            code: "IN",
            flag: "🇮🇳",
        },
    };

    const onSubmit = async (values) => {};

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles, { isDisabled }) => ({
            ...styles,
            backgroundColor: mode === "dark" ? (isDisabled ? "#202a41" : "#1b253b") : isDisabled ? "#f1f5f9" : "white",
            padding: "1px",
            borderRadius: ".375rem",
            borderColor: "#E2E8F0",
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
        <Formik initialValues={initialValues} validationSchema={paymentPageUserSchema} onSubmit={onSubmit} validateOnMount>
            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                <Form>
                    <div className="bg-white mx-10 mt-10">
                        {/* HEADER & FORM */}
                        <div className="">
                            <div className="bg-[#1E3A8A] text-[14px] text-[#FFFFFF] font-medium h-[54px] flex items-center px-5">
                                Payment Details
                            </div>

                            {/*  FORM  */}
                            <div className="p-8">
                                {/*{JSON.stringify(values)}*/}

                                {data.amount_type !== "multiple" && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="intro-x form-group mb-6">
                                            <label className="form-label inline-block mb-2 text-gray-700">
                                                Currency <span className="text-danger"> *</span>
                                            </label>

                                            <Select
                                                isDisabled={true}
                                                defaultValue={{ value: "INR", label: "India Rupee" }}
                                                value={Currency?.find((item) => item?.value === data?.currency)}
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
                                                            {e?.value === "" ? (
                                                                <span style={{ color: "#a0aec1" }}>
                                                                    {messages.paymentPlaceHolder.currency}
                                                                </span>
                                                            ) : (
                                                                <>
                                                                    <span>{decode(e.symbol)}</span> ({e?.value})
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        <div className="intro-x form-group mb-6">
                                            <label htmlFor="amount" className="form-label inline-block mb-2 text-gray-700">
                                                Amount
                                                <span className="text-danger"> *</span>
                                            </label>

                                            <Input
                                                type="text"
                                                className="intro-x login__input form-control py-2 block"
                                                name="amount"
                                                readOnly
                                                value={data?.amount}
                                                placeholder="1200"
                                                errorEnabled={false}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="intro-x form-group mb-6">
                                    <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">
                                        Email <span className="text-danger"> *</span>
                                    </label>

                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 block"
                                        name="email"
                                        placeholder={"customer@example.com"}
                                        isRequiredField
                                        errorEnabled={false}
                                        readOnly
                                    />
                                </div>

                                <div className="intro-x form-group mb-6">
                                    <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">
                                        Mobile <span className="text-danger"> *</span>
                                    </label>

                                    {/* <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 block"
                                        name="mobile"
                                        placeholder={"+91 9988778855"}
                                        isRequiredField
                                    /> */}
                                    <PhoneInput
                                        countryCodeValue={values.countryCode}
                                        setFieldValue={setFieldValue}
                                        error={errors.mobile_no}
                                        touched={touched.mobile_no}
                                        name="mobile_no"
                                        marginTopNull
                                        placeholder={"9979931298"}
                                        readOnly
                                        errorEnabled={false}
                                    />
                                </div>

                                {data.amount_type === "multiple" && (
                                    <>
                                        <div className="grid grid-cols">
                                            <div className="intro-x form-group">
                                                <label className="form-label inline-block mb-2 text-gray-700 dark:text-white">
                                                    Currency <span className="text-danger"> *</span>
                                                </label>
                                                <Select
                                                    isDisabled
                                                    defaultValue={{ value: "INR", label: "India Rupee" }}
                                                    value={Currency?.find((item) => item?.value === data?.currency)}
                                                    styles={colourStyles}
                                                    style={{ boxShadow: "none" }}
                                                    options={Currency}
                                                    onChange={(e) => {
                                                        setFieldValue("currency", e?.value);
                                                    }}
                                                    // placeholder={messages.paymentPlaceHolder.currency}
                                                    className="intro-x login__input form-control block shadow-none"
                                                    getOptionLabel={(e) => (
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <span style={{ marginLeft: 5 }}>
                                                                {e?.value === "" ? (
                                                                    messages.paymentPlaceHolder.currency
                                                                ) : (
                                                                    <>
                                                                        <span>{decode(e.symbol)}</span> ({e?.value})
                                                                    </>
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        {data?.amount_array?.map((item, index) => {
                                            return (
                                                <div className="flex justify-between mt-3 items-center">
                                                    <div>
                                                        <div>{item?.label}</div>
                                                        <p>
                                                            {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}
                                                            {item?.amount || 0}.00
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <button
                                                            disabled
                                                            onClick={handleSubmit}
                                                            type="buttons"
                                                            className="btn btn-primary px-6 py-1 rounded-1">
                                                            Pay
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                                <div className="flex justify-between">
                                    <div className="py-3 pl-8 flex items-center">
                                        <img src={"images/accepted_cards.png"} className="h-[15px]" />
                                    </div>
                                    {data.amount_type !== "multiple" && (
                                        <button
                                            disabled
                                            onClick={handleSubmit}
                                            type="buttons"
                                            className="btn btn-primary px-5 py-3 rounded-none">
                                            Pay &nbsp; {decode(Currency?.find((item) => item?.value === values?.currency)?.symbol)}
                                            {data?.amount || 0}.00
                                        </button>
                                    )}
                                </div>

                                {/* FOOTER */}
                            </div>
                            {/*  FORM  */}
                        </div>
                        {/* HEADER & FORM */}

                        {/* FOOTER */}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default PaymentBoxUserPreview;

import React, { useCallback, useEffect, useState } from "react";
import { paymentPageUserSchema } from "../../utils/validationSchema";
import { Form, Formik } from "formik";
import { messages } from "../../messages/merchantRegister";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import { useSelector } from "react-redux";
import { generatePaymentPageData } from "../../redux/services/PaymentPage";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Select = React.lazy(() => import("react-select"));
const PhoneInput = React.lazy(() => import("../../components/common/forms/PhoneInput"));

const PaymentBoxUser = ({ data }) => {
    const initialValues = {
        amount: data?.amount_type == "fixed" ? data?.amount : "",
        currency: data?.currency || "INR",
        mobile_no: "",
        email: "",
        amount_type: data?.amount_type,
        countryCode: {
            name: "India",
            value: "+91",
            code: "IN",
            flag: "🇮🇳",
        },
    };

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            payment_page_id: data?.id,
            country_code: values?.countryCode?.value,
            countryCode: undefined,
        };

        if (values?.amount_type === "multiple") {
            payload["label"] = data?.amount_array[values?.value]?.label;
            payload["amount"] = data?.amount_array[values?.value]?.amount;
            payload["value"] = undefined;
        }

        payload["amount_type"] = undefined;

        const linkData = await generatePaymentPageData(payload);

        if (linkData?.data?.link) {
            // const nextURL = linkData?.data?.link;
            // const nextTitle = "My new page title";
            // const nextState = { additionalInformation: "Updated the URL with JS" };

            // This will create a new entry in the browser's history, without reloading
            // window.history.pushState(nextState, nextTitle, nextURL);
            window.location.href = linkData?.data?.link;
        }
    };

    // useEffect(() => {
    //
    // }, [])

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
                    <div className="xl:bg-white xl:shadow-md">
                        {/* HEADER & FORM */}
                        <div className="p-8">
                            <div className="text-xl">
                                Payment Details
                                <div className="border-t-[3px] border-blue-900 w-[120px] mt-2"> </div>
                            </div>

                            {/*  FORM  */}
                            <div className="mt-5">
                                {/*{JSON.stringify(values)}*/}
                                <Input
                                    type="hidden"
                                    className="intro-x login__input form-control py-2 block"
                                    name="amount_type"
                                    readOnly
                                    errorEnabled={false}
                                />
                                {data.amount_type !== "multiple" && (
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="intro-x form-group mb-6">
                                            <label className="form-label inline-block mb-2 text-gray-700">
                                                Currency <span className="text-danger"> *</span>
                                            </label>

                                            <Select
                                                isDisabled={data.amount_type == "fixed" ? true : false}
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
                                                type="number"
                                                className="intro-x login__input form-control py-2 block"
                                                name="amount"
                                                placeholder="1200"
                                                errorEnabled={data.amount_type == "fixed" ? true : false}
                                                readOnly={data.amount_type == "fixed" ? true : false}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="intro-x form-group mb-6">
                                    <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">
                                        Email
                                    </label>

                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 block"
                                        name="email"
                                        placeholder={"customer@example.com"}
                                        isRequiredField
                                    />
                                </div>

                                <div className="intro-x form-group mb-6">
                                    <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">
                                        Mobile
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
                                                            onClick={() => {
                                                                setFieldValue("value", index);
                                                                handleSubmit(values);
                                                            }}
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
                            </div>
                            {/*  FORM  */}
                        </div>
                        {/* HEADER & FORM */}

                        {/* FOOTER */}
                        <div className="flex justify-between bg-slate-100">
                            <div className="py-3 pl-8 flex items-center">
                                <img src={"images/accepted_cards.png"} className="h-[15px]" />
                            </div>
                            {data.amount_type !== "multiple" && (
                                <button
                                    onClick={() => {
                                        handleSubmit(values);
                                    }}
                                    type="buttons"
                                    className="btn btn-primary px-5 py-3 rounded-none">
                                    Pay &nbsp; {decode(Currency?.find((item) => item?.value === values?.currency)?.symbol)}
                                    {values?.amount || 0}.00
                                </button>
                            )}
                        </div>
                        {/* FOOTER */}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default PaymentBoxUser;

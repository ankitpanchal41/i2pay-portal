import React, { useCallback, useEffect, useState } from "react";
import { paymentPageSchema } from "../../utils/validationSchema";
import { Form, Formik } from "formik";
import * as Icon from "react-feather";
import { messages } from "../../messages/merchantRegister";
import { messages as errorMessage } from "../../messages/validations";
import Select from "react-select";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import { useSelector } from "react-redux";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const NormalInput = React.lazy(() => import("../../components/common/forms/NormalInput"));

const PaymentBox = ({ values, setFieldValue, errors, isValid, touched }) => {
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
        menuList: (styles, { data }) => ({ ...styles }),
    };

    const addAmountField = (setFieldValue) => {
        setFieldValue({ label: "", amount: "" });
    };

    const removeAmountField = (values, index) => {
        setFieldValue(
            "amount_array",
            values.amount_array.filter((_, i) => i !== index),
            true,
        );
    };

    const onChangeLabel = (value, index) => {
        const labelArr = [...values?.amount_array];
        labelArr[index].label = value;
        setFieldValue("amount_array", labelArr);
    };

    const onChangeAmount = (value, index) => {
        const labelArr = [...values?.amount_array];
        labelArr[index].amount = value;
        setFieldValue("amount_array", labelArr);
    };

    return (
        <div className="bg-white mx-10 mt-10">
            {/* HEADER & FORM */}
            <div className="">
                <div className="bg-[#1E3A8A] text-[14px] text-[#FFFFFF] font-medium h-[54px] flex items-center px-5">Payment Details</div>

                {/*  FORM  */}
                <div className="p-8">
                    <div className="intro-x form-group mb-6">
                        <label className="form-label inline-block mb-2 text-gray-700  ">Amount Type</label>
                        <select
                            value={values.amount_type}
                            name="amount_type"
                            className="intro-x login__input form-control py-2 px-4 block"
                            onChange={(e) => {
                                setFieldValue("amount_type", e.target.value);
                                setFieldValue("amount_array", [{ amount: "", label: "" }]);
                                setFieldValue("amount", "");
                                if (e.target.value === "fixed" || e.target.value === "multiple") {
                                    setFieldValue("currency", "INR");
                                } else {
                                    setFieldValue("currency", "");
                                }
                            }}>
                            <option value="fixed">Fixed Amount</option>
                            <option value="customer">Let Customer Decide</option>
                            <option value="multiple">Multiple Price (Fixed)</option>
                        </select>
                    </div>

                    {values.amount_type === "multiple" ? (
                        <>
                            <div className="grid grid-cols">
                                <div className="intro-x form-group">
                                    <label className="form-label inline-block mb-2 text-gray-700 dark:text-white">
                                        Currency <span className="text-danger"> *</span>
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
                            {values?.amount_array?.map((item, index) => {
                                return (
                                    <div className={index ? "grid grid-cols-2 gap-2" : "grid grid-cols-2 gap-2 mt-5"}>
                                        <div className="intro-x form-group mb-6 z-index-48">
                                            <NormalInput
                                                isRequiredField
                                                type="text"
                                                className="intro-x z-index-48 login__input form-control py-2 block"
                                                placeholder={messages.paymentPlaceHolder.label}
                                                errorEnabled
                                                label="Label"
                                                value={item?.label}
                                                onChange={(e) => {
                                                    onChangeLabel(e.target.value, index);
                                                }}
                                            />

                                            {item?.label === "" ? (
                                                <p className="text-red-500 mt-2 ml-1">{errorMessage.paymentPage.label.required}</p>
                                            ) : null}
                                        </div>

                                        <div className="intro-x z-index-48 form-group mb-6">
                                            <NormalInput
                                                isRequiredField
                                                type="number"
                                                className="intro-x z-index-48 login__input form-control py-2 block"
                                                placeholder={messages.paymentPlaceHolder.amount}
                                                errorEnabled
                                                label="Amount"
                                                extraItem={
                                                    <div className="flex items-center">
                                                        {values?.amount_array?.length > 1 && (
                                                            <button
                                                                className="btn btn-danger btn-sm mb-1 ml-1"
                                                                type="button"
                                                                onClick={() => {
                                                                    removeAmountField(values, index);
                                                                }}
                                                                style={{ backgroundColor: "rgb(30,58,138)" }}>
                                                                <Icon.Minus size={14} />
                                                            </button>
                                                        )}

                                                        {values?.amount_array?.length === index + 1 && (
                                                            <button
                                                                className="btn btn-primary bg-primary btn-sm mb-1 ml-1"
                                                                type="button"
                                                                onClick={() => {
                                                                    addAmountField((value) =>
                                                                        setFieldValue("amount_array", [...values?.amount_array, value]),
                                                                    );
                                                                }}
                                                                style={{ backgroundColor: "rgb(30,58,138)" }}>
                                                                <Icon.Plus size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                }
                                                value={item?.amount}
                                                onChange={(e) => {
                                                    onChangeAmount(e.target.value, index);
                                                }}
                                            />
                                            {item?.amount === "" ? (
                                                <p className="text-red-500 mt-2 ml-1">{errorMessage.paymentPage.amount.required}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <div className="intro-x form-group mb-6">
                                <label className="form-label inline-block mb-2 text-gray-700 dark:text-white">
                                    Currency <span className="text-danger"> *</span>
                                </label>
                                <Select
                                    isDisabled={values.amount_type == "fixed" ? false : true}
                                    defaultValue={{ value: "INR", label: "India Rupee" }}
                                    value={Currency?.find((item) => item?.value === values?.currency)}
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
                                                    <span style={{ color: "#a0aec1" }}>{messages.paymentPlaceHolder.currency}</span>
                                                ) : (
                                                    <>
                                                        <span>{decode(e.symbol)}</span> ({e?.value})
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    )}
                                />
                                {values.amount_type != "fixed" ? (
                                    <small className="block mt-1 text-xs text-warning flex items-center">
                                        <Icon.Info size={12} className={"mr-1"} />
                                        <em> Currency field to be filled by the user.</em>
                                    </small>
                                ) : null}
                            </div>

                            <div className="intro-x form-group mb-6">
                                <label htmlFor="amount" className="form-label inline-block mb-2 text-gray-700 dark:text-white">
                                    Amount
                                    <span className="text-danger"> *</span>
                                </label>

                                <Input
                                    type="number"
                                    className="intro-x login__input form-control py-2 block"
                                    name="amount"
                                    placeholder={messages.paymentPlaceHolder.amount}
                                    readOnly={values.amount_type == "fixed" ? false : true}
                                    errorEnabled={values.amount_type !== "fixed" ? false : true}
                                    // errors={errors}
                                    // isValid={isValid}
                                    // touched={touched}
                                />

                                {values.amount_type != "fixed" ? (
                                    <small className="block mt-1 text-xs text-warning flex items-center">
                                        <Icon.Info size={12} className={"mr-1"} />
                                        <em> Amount field to be filled by the user.</em>
                                    </small>
                                ) : null}
                            </div>
                        </div>
                    )}

                    <div className="intro-x form-group mb-6">
                        <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700 dark:text-white">
                            Email
                        </label>

                        <NormalInput
                            type="text"
                            className="intro-x login__input form-control py-2 block"
                            // name="email"
                            placeholder={"customer@example.com"}
                            readOnly
                        />

                        <small className="block mt-1 text-xs text-warning flex items-center">
                            <Icon.Info size={12} className={"mr-1"} />
                            <em> Email address field to be filled by the user.</em>
                        </small>
                    </div>

                    <div className="intro-x form-group mb-6">
                        <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700 dark:text-white">
                            Mobile
                        </label>

                        <NormalInput
                            type="text"
                            className="intro-x login__input form-control py-2 block"
                            // name="mobile"
                            placeholder={"+91 9988778855"}
                            readOnly
                        />
                        <small className="block mt-1 text-xs text-warning flex items-center">
                            <Icon.Info size={12} className={"mr-1"} />
                            <em> Mobile number field to be filled by the user.</em>
                        </small>
                    </div>
                    {/* FOOTER */}
                    <div className="flex justify-between bg-slate-100 " style={{ backgroundColor: mode === "dark" ? "#28334e" : "white" }}>
                        <div className="flex items-center">
                            <img src={"images/accepted_cards.png"} className="h-[15px]" />
                        </div>
                        {values.amount_type !== "multiple" && (
                            <button disabled className="btn btn-primary px-5 py-3 rounded-none">
                                Pay &nbsp; {decode(Currency?.find((item) => item?.value === values?.currency)?.symbol)}
                                {values?.amount || 0}.00
                            </button>
                        )}
                    </div>
                    {/* FOOTER */}
                </div>
                {/*  FORM  */}
            </div>
            {/* HEADER & FORM */}
        </div>
    );
};

export default PaymentBox;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { decode } from "html-entities";
import { paymentCardUserSchema } from "../../../../utils/validationSchema";
import "./styles.css";
import { countryCodes } from "../../../../utils/countryCode";
import { Currency } from "../../../../utils/currency";
import { generatePaymentCardLink } from "../../../../redux/services/PaymentCard";
import { truncateString } from "../../../../utils/helper";
const Select = React.lazy(() => import("react-select"));

const TemplateThreeUserPreview = ({ data }) => {
    const { mode } = useSelector((state) => state.persist);
    const [isSubmiting, setIsSubmiting] = useState(false);

    const initialValues = {
        mobile_no: "",
        email: "",
        country_code: {
            name: "India",
            value: "+91",
            code: "IN",
            flag: "🇮🇳",
        },
    };

    const onSubmit = async (values) => {
        if (isSubmiting) return;

        setIsSubmiting(true);

        const payload = {
            ...values,
            country_code: values?.country_code?.value,
            amount: data?.amount,
            currency: data?.currency,
            card_payment_id: data?.id,
        };

        const linkData = await generatePaymentCardLink(payload);

        setIsSubmiting(false);

        if (linkData?.data?.link) {
            window.location.href = linkData?.data?.link;
        }
    };

    return (
        <>
            <div className="flex justify-center items-center template-three-background h-full">
                <div className="w-[800px] flex flex-col ">
                    {/* HEADER */}
                    <div className="flex flex-col px-5 t3-product-title">
                        <div className="color-teal text-big">You are purchasing:</div>
                        <div className="text-lg mb-2 max-1-line font-bold" style={{ color: "#685d5d" }}>
                            {truncateString(data?.title, 42)}
                        </div>
                    </div>
                    {/* HEADER */}
                    <div className="shadow-lg m-2 box-bg">
                        <div className="flex justify-between t3-blocks-container">
                            {/* Left Content */}
                            <div className="intro-x">
                                <div className="flex flex-grow h-[400px] w-[400px] t3-product-image">
                                    <img src={data?.logo} />
                                </div>
                            </div>
                            {/* End: Left Content */}
                            {/* Middle Content */}
                            <div className="intro-x flex-grow w-full bg-white shadow-2xl border-l z-index-49">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={paymentCardUserSchema}
                                    onSubmit={onSubmit}
                                    enableReinitialize>
                                    {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                        <Form>
                                            <div className="flex flex-col relative">
                                                {/*Floating Header*/}
                                                <div className="absolute flex justify-center items-center header-floating-container">
                                                    <div className="text-xl floating-box-header-title letter-spacing-5 uppercase text-center ml-[10px]">
                                                        {" "}
                                                        Payment Detail
                                                    </div>
                                                </div>
                                                {/*Floating Header*/}

                                                {/*Floating Body*/}

                                                <div className="mx-5 space-y-6 pt-3 h-[400px] flex flex-col justify-around">
                                                    <div className="text-slate-500 max-h-[120px] flex justify-center  items-start pt-3 flex flex-col">
                                                        <div className="text-left color-teal font-extrabold mb-3">Description:</div>
                                                        <div className="max-4-line color-teal">{data?.description}</div>
                                                    </div>

                                                    <div>
                                                        <div>
                                                            <label htmlFor="" className="template-3-label">
                                                                Email Address
                                                            </label>
                                                            <input
                                                                value={values?.email}
                                                                type="text"
                                                                className="w-full p-2 text-sm template-3-input"
                                                                placeholder="Your Email"
                                                                style={{ borderColor: "grey" }}
                                                                onChange={(e) => {
                                                                    setFieldValue("email", e.target.value);
                                                                }}
                                                            />
                                                            {errors.email && touched.email ? (
                                                                <span className="text-xs text-red-600">{errors.email}</span>
                                                            ) : null}
                                                        </div>
                                                        {/* <div className="mt-5">
                                                        <label htmlFor="" className="template-3-label">
                                                            Mobile Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 text-sm template-3-input"
                                                            placeholder="Your Mobile Number"
                                                            style={{ borderColor: "grey" }}
                                                        />
                                                        <span className="text-xs text-red-600">Please enter your mobile number</span>
                                                    </div> */}
                                                        <div className="mt-5">
                                                            <label htmlFor="" className="template-3-label">
                                                                Mobile Number
                                                            </label>
                                                            <div className="flex items-center">
                                                                <div className="flex items-center">
                                                                    <Select
                                                                        value={values?.country_code}
                                                                        styles={{
                                                                            input: (styles) => ({
                                                                                ...styles,
                                                                                border: "none",
                                                                                ":active": {
                                                                                    ...styles[":active"],
                                                                                    outline: "none",
                                                                                },
                                                                                width: "70px",
                                                                                marginLeft: "0px",
                                                                                marginRight: "0px",
                                                                            }),
                                                                            control: (styles, { isDisabled }) => ({
                                                                                ...styles,
                                                                                border: "none",
                                                                                padding: "0px",
                                                                                marginLeft: "0px",
                                                                                marginRight: "0px",
                                                                                margin: "0px",
                                                                                fontSize: "13px",
                                                                                boxShadow: "none",
                                                                                color: mode === "dark" ? "#FFFFFF" : "#384252",
                                                                                // backgroundColor: mode === "dark" ? "#1b253b" : "white",
                                                                                backgroundColor:
                                                                                    mode === "dark"
                                                                                        ? isDisabled
                                                                                            ? "#202a41"
                                                                                            : "#1b253b"
                                                                                        : isDisabled
                                                                                        ? "#f1f5f9"
                                                                                        : "white",
                                                                                borderRadius: 0,
                                                                                borderTopLeftRadius: "0.25rem",
                                                                                borderBottomLeftRadius: "0.25rem",
                                                                                minHeight: "36px",
                                                                            }),
                                                                            singleValue: (styles, { data }) => ({
                                                                                ...styles,
                                                                                color: mode === "dark" ? "#FFFFFF" : "#384252",
                                                                            }),
                                                                            indicatorSeparator: () => null,
                                                                            menu: (styles) => ({
                                                                                ...styles,
                                                                                width: "130px",
                                                                                backgroundColor: mode === "dark" ? "#1b253b" : "white",
                                                                            }),
                                                                            menuList: (styles, { data }) => ({ ...styles, maxHeight: 200 }),
                                                                            dropdownIndicator: () => null,
                                                                        }}
                                                                        options={countryCodes}
                                                                        className="w-full text-sm template-3-input-number-left"
                                                                        onChange={(e) => {
                                                                            setFieldValue("country_code", e);
                                                                        }}
                                                                        // className="py-0 pl-0 pr-3 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                                                        getOptionLabel={(e) => (
                                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                                <span style={{ marginLeft: 5 }}>
                                                                                    <span>{decode(e.symbol)}</span> {e.flag} {e.value}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <input
                                                                    value={values?.mobile_no}
                                                                    type="text"
                                                                    className="w-full p-2 text-sm template-3-input-number-right"
                                                                    placeholder="Your Mobile Number"
                                                                    style={{ borderColor: "grey", borderLeftWidth: 0 }}
                                                                    onChange={(e) => {
                                                                        setFieldValue("mobile_no", e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors.mobile_no && touched.mobile_no ? (
                                                                <span className="text-xs text-red-600">{errors.mobile_no}</span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*Floating Body*/}

                                                {/*Floating Footer*/}
                                                <div
                                                    className="absolute flex justify-center items-center footer-floating-container cursor-pointer"
                                                    onClick={handleSubmit}>
                                                    <div className="flex text-white/90 floating-box-footer items-center letter-spacing-5 uppercase">
                                                        <div className="text-xl mr-3">Pay</div>
                                                        <div className="text-2xl">
                                                            {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}
                                                            {data?.amount || 0}.00
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*Floating Footer*/}
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            {/* End: Middle Content */}

                            {/* Right Content */}
                            <div className="intro-x flex-grow w-full py-3 px-2 w-[150px] box-bg md:flex template-3-blank-area"></div>
                            {/* End: Right Content */}
                        </div>
                    </div>
                </div>{" "}
            </div>
        </>
    );
};

export default TemplateThreeUserPreview;

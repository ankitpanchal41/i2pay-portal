import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { decode } from "html-entities";
import { paymentCardUserSchema } from "../../../../utils/validationSchema";
import "./styles.css";
import { countryCodes } from "../../../../utils/countryCode";
import { Currency } from "../../../../utils/currency";
import { generatePaymentCardLink } from "../../../../redux/services/PaymentCard";
const Select = React.lazy(() => import("react-select"));

const TemplateFourUserPreview = ({ data }) => {
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
        <div className="bg-white md:h-[100vh] flex justify-center items-center template-four-background">
            <div className="bg-white w-[750px] m-2 shadow-2xl">
                <div className="grid grid-cols-12 justify-between">
                    {/* Left Content */}
                    <div className="intro-x col-span-12 md:col-span-7  flex-grow w-full py-3 px-2 bg-white left-content">
                        <div className="p-5">
                            <h2 className="mb-4 text-xl antialiased font-semibold text-center text-gray-800 max-2-line t4-product-detail-title">
                                PRODUCT DETAIL
                            </h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={paymentCardUserSchema}
                                onSubmit={onSubmit}
                                enableReinitialize>
                                {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                    <Form>
                                        <div className="mx-4 space-y-4 flex flex-col justify-between h-full">
                                            <div className="min-h-[100px] items-center flex">
                                                <div className="t4-description text-slate-500 max-h-[100px] flex items-center justify-center max-4-line break-normal">
                                                    {data?.description}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-end">
                                                <div className="mb-3">
                                                    <label htmlFor="" className="t4-label">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        value={values?.email}
                                                        type="text"
                                                        className="w-full p-2 text-sm border-b border-gray-400 pl-3 bg-grey t4-input"
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
                                                <div className="mb-3">
                                                    <label htmlFor="" className="t4-label">
                                                        Mobile Number
                                                    </label>
                                                    {/* <input
                                                        type="text"
                                                        className="w-full p-2 text-sm border-b border-gray-400 pl-3 bg-grey t4-input"
                                                        placeholder="Your Mobile Number"
                                                        style={{ borderColor: "grey" }}
                                                    /> */}
                                                    {/* <span className="text-xs text-red-600">Please enter your mobile number</span> */}
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
                                                                className="w-full text-sm border-b border-gray-400 bg-grey t4-input"
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
                                                            className="w-full p-2 text-sm border-b border-gray-400 pl-3 bg-grey t4-input"
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
                                                <button
                                                    onClick={handleSubmit}
                                                    className=" block w-full px-2 py-2 mt-5 text-white rounded-full t4-pay-button min-w-[100px]">
                                                    Pay
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-12 md:col-span-5 t4-bg-dark flex justify-around flex-col items-center shadow-md right-content">
                        <div className="t4-product-image">
                            <img src={data?.logo} className="t4-bg-dark shadow-xl" />
                        </div>
                        <div className="flex flex-col justify-end items-center my-3 t4-price-section">
                            <h2 className="mb-4 text-base antialiased font-semibold text-center  max-2-line t4-product-title">
                                {data?.title}
                            </h2>

                            <div className="t4-total-title">Total</div>
                            <div className="flex flex-row items-center justify-center mb-2">
                                <span className="t4-currency mr-1">
                                    {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}
                                </span>
                                <span className="t4-price">{data?.amount || 0}.00</span>
                            </div>
                        </div>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>{" "}
        </div>
    );
};

export default TemplateFourUserPreview;

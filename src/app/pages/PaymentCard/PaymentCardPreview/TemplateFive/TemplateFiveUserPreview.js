import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { decode } from "html-entities";
import { paymentCardUserSchema } from "../../../../utils/validationSchema";
import "./styles.css";
import { countryCodes } from "../../../../utils/countryCode";
import { Currency } from "../../../../utils/currency";
import { generatePaymentCardLink } from "../../../../redux/services/PaymentCard";
const Select = React.lazy(() => import("react-select"));

const TemplateFiveUserPreview = ({ data }) => {
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
        <div className="bg-white md:h-[100vh] flex justify-center items-center template-five-background">
            <div className="box bg-white w-[700px] shadow-2xl m-2">
                <div className="grid grid-cols-12 justify-between" style={{ backgroundColor: "#d3bcc0" }}>
                    <div className="intro-x col-span-12 justify-center item-center">
                        <div className="text-center flex flex-col shadow">
                            <div className="text-lg px-5 max-2-line t5-product-title flex flex-grow py-3 shadow">{data?.title}</div>
                            <div className="flex items-center t5-description p-5">
                                <div className="max-3-line ">{data?.description}</div>
                            </div>
                        </div>
                    </div>

                    {/* Left Content */}
                    <div className="intro-x col-span-12 md:col-span-6 justify-center item-center">
                        <div className="text-center flex flex-col t5-product-left-container">
                            <div className="flex justify-center ">
                                <img src={data?.logo} className="t5-product-image shadow-lg bg-white" />
                            </div>
                        </div>
                    </div>
                    {/* End: Left Content */}
                    {/* Right Content */}
                    <div className="intro-x col-span-12 md:col-span-6  flex-grow w-full py-3 px-2" style={{ backgroundColor: "#d3bcc0" }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={paymentCardUserSchema}
                            onSubmit={onSubmit}
                            enableReinitialize>
                            {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                <Form>
                                    <div className="mx-8 flex flex-col justify-around items-center h-full">
                                        <div className="py-3">
                                            <label htmlFor="" className="t5-label">
                                                Email Address
                                            </label>
                                            <input
                                                value={values?.email}
                                                type="text"
                                                className="w-full p-2 text-sm pl-3 bg-grey t5-input"
                                                placeholder="Your Email"
                                                onChange={(e) => {
                                                    setFieldValue("email", e.target.value);
                                                }}
                                            />
                                            {errors.email && touched.email ? (
                                                <span className="text-xs text-red-600">{errors.email}</span>
                                            ) : null}
                                        </div>
                                        <div className="py-2 mb-2">
                                            <label htmlFor="" className="t5-label">
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
                                                                        : "#f2efef",
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
                                                        className="w-full text-sm bg-grey t5-input"
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
                                                    className="w-full p-2 text-sm pl-3 bg-grey t5-input"
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
                                            {/* <input
                                                type="text"
                                                className="w-full p-2 text-sm pl-3 bg-grey t5-input"
                                                placeholder="Your Mobile Number"
                                            />
                                            <span className="text-xs text-red-600">Please enter your mobile number</span> */}
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            className="block w-full px-2 py-4 text-white rounded-full t5-pay-button mb-2 flex justify-center items-center">
                                            <span className="t5-pay mr-2">Pay</span>
                                            <span className="t5-pay">
                                                {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}{" "}
                                            </span>
                                            <span className="t5-amount"> {data?.amount || 0}.00 </span>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {/* End: Right Content */}
                </div>
            </div>{" "}
        </div>
    );
};

export default TemplateFiveUserPreview;

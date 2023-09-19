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

const TemplateTwoUserPreview = ({ data }) => {
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
            <div
                className="md:h-[100vh] flex justify-center items-center template-two-background"
                style={{ backgroundImage: `url("/images/payment-card/template-two.png")`, backgroundPosition: "bottom" }}>
                {/*  Center Box  */}
                <div className="box w-[650px] shadow-lg p-2 m-2" style={{ background: "#5f6876", boxShadow: "3px 3px 5px grey" }}>
                    <div className="grid grid-cols-12">
                        {/* Left Content */}
                        <div className="intro-x col-span-12 md:col-span-6 items-center flex">
                            <div className="flex justify-center item-center relative t2-product-image-container shadow-2xl">
                                <img src={data?.logo} className="t2-product-image" style={{ background: "#FFF" }} />
                            </div>
                        </div>
                        {/* End: Left Content */}
                        {/* Right Content */}
                        <div className="intro-x col-span-12 md:col-span-6 py-3 px-2 relative">
                            <div className="">
                                <h2 className="mb-4 text-xl antialiased font-semibold text-center text-white">You are purchasing: </h2>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={paymentCardUserSchema}
                                    onSubmit={onSubmit}
                                    enableReinitialize>
                                    {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                        <Form>
                                            <div className="space-y-6 mx-1 flex flex-col justify-between">
                                                <div className="max-2-line font-bold text-3xl text-center text-orange-500">
                                                    {data?.title}
                                                </div>
                                                <div className="max-h-[100px] flex items-center break-word justify-center max-3-line text-slate-200">
                                                    <em>{data?.description}</em>
                                                </div>
                                                <div className="relative">
                                                    <div>
                                                        <input
                                                            value={values?.email}
                                                            type="text"
                                                            className="w-full p-2 text-sm border-b-2 border-gray-400 rounded pl-3 bg-grey t2-input"
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

                                                    <div className="flex items-center mt-5">
                                                        <div className="flex items-center" style={{}}>
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
                                                                    menuList: (styles, { data }) => ({
                                                                        ...styles,
                                                                        maxHeight: 200,
                                                                    }),
                                                                    dropdownIndicator: () => null,
                                                                }}
                                                                options={countryCodes}
                                                                className="text-sm bg-grey rounded-l"
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
                                                            className="w-full p-2 text-sm rounded-r pl-3 "
                                                            placeholder="Your Mobile Number"
                                                            style={{ borderColor: "grey", borderLeftWidth: 0 }}
                                                            onChange={(e) => {
                                                                setFieldValue("mobile_no", e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-10">
                                                        {errors.mobile_no && touched.mobile_no ? (
                                                            <span className="text-xs text-red-600">{errors.mobile_no}</span>
                                                        ) : null}
                                                    </div>

                                                    <button
                                                        onClick={handleSubmit}
                                                        className="block w-full px-2 py-4 mt-2 text-white bg-orange-500 flex items-center justify-center cursor-pointer absolute"
                                                        style={{ boxShadow: "0px 3px 10px #c07c00", bottom: "-45px" }}>
                                                        <span className="mr-2">Pay</span>
                                                        <span className="text-xl">
                                                            {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}
                                                            {data?.amount || 0}.00
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        {/* End: Right Content */}
                    </div>
                </div>{" "}
                {/*  END: Center Box  */}
            </div>
        </>
    );
};

export default TemplateTwoUserPreview;

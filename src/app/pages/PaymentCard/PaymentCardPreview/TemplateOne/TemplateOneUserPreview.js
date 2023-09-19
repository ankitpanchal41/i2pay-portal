import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { decode } from "html-entities";
import { paymentCardUserSchema } from "../../../../utils/validationSchema";
import "./styles.css";
import { countryCodes } from "../../../../utils/countryCode";
import { Currency } from "../../../../utils/currency";
import { generatePaymentCardLink } from "../../../../redux/services/PaymentCard";
import MiniLoader from "../../../../components/common/MiniLoader";
const Select = React.lazy(() => import("react-select"));

const TemplateOneUserPreview = ({ data }) => {
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
                className="bg-white md:h-[100vh] flex justify-center items-center template-one-background"
                style={{ backgroundImage: `url("/images/payment-card/template-one.png")` }}>
                <div className="box bg-white w-[700px] shadow-lg p-2 m-2" style={{ borderRadius: 20 }}>
                    <div className="grid grid-cols-12 justify-between">
                        {/* Left Content */}
                        <div className="intro-x col-span-12 md:col-span-5 justify-center item-center">
                            <div className="text-center flex flex-col justify-between flex-grow">
                                <div className="p-2 flex justify-center  min-h-[300px]">
                                    <img src={data?.logo} />
                                </div>
                                <div className="text-lg px-5 mb-2 max-2-line">{data?.title}</div>
                                <div className="text-2xl text-center">
                                    {decode(Currency?.find((item) => item?.value === data?.currency)?.symbol)}
                                    {data?.amount || 0}.00
                                </div>
                            </div>
                        </div>
                        {/* End: Left Content */}
                        {/* Right Content */}
                        <div className="intro-x col-span-12 md:col-span-7  flex-grow w-full py-3 px-2 bg-white">
                            <div className="">
                                <h2 className="mb-4 text-xl antialiased font-semibold text-center text-gray-800">Payment Details</h2>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={paymentCardUserSchema}
                                    onSubmit={onSubmit}
                                    enableReinitialize>
                                    {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                        <Form>
                                            <div className="mx-8 space-y-8">
                                                <div className="description text-slate-500 max-h-[100px] flex items-center justify-center max-4-line">
                                                    {data?.description}
                                                </div>
                                                <div>
                                                    <input
                                                        value={values?.email}
                                                        type="text"
                                                        className="w-full p-2 text-sm border-b-2 border-gray-400 rounded pl-3 bg-grey t1-input"
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
                                                <div className="flex items-center">
                                                    <div className="flex items-center" style={{ width: 70, marginBottom: "2px" }}>
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
                                                            className="text-sm border-b-2 border-gray-400 bg-grey rounded-l"
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
                                                        className="w-full p-2 text-sm border-b-2 border-gray-400 rounded pl-5 bg-grey t1-input"
                                                        value={values?.mobile_no}
                                                        type="number"
                                                        placeholder="Your Mobile Number"
                                                        style={{ borderColor: "grey" }}
                                                        onChange={(e) => {
                                                            setFieldValue("mobile_no", e.target.value);
                                                        }}
                                                    />
                                                </div>
                                                {errors.mobile_no && touched.mobile_no ? (
                                                    <span className="text-xs text-red-600">{errors.mobile_no}</span>
                                                ) : null}
                                                <button
                                                    className="block w-full px-2 py-4 mt-2 text-white bg-success rounded-full"
                                                    onClick={handleSubmit}>
                                                    <MiniLoader
                                                        size={15}
                                                        css={"margin-right:10px; margin-left: 0px;"}
                                                        isLoading={isSubmiting}
                                                    />
                                                    Pay
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        {/* End: Right Content */}
                    </div>
                </div>{" "}
            </div>
        </>
    );
};

export default TemplateOneUserPreview;

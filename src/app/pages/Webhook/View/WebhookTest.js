import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import MiniLoader from "../../../components/common/MiniLoader";
import { messages } from "../../../messages/merchantRegister";
import { subscribedEventWebhookData } from "../../../redux/services/Webhook";
import { Formik, Form, ErrorMessage } from "formik";
import { webhookTestSchema } from "../../../utils/validationSchema";
import Select from "react-select";
import { TEST_WEBHOOK_REQUEST } from "../../../redux/actions/Webhook";
import { useMemo } from "react";

const WebhookTest = ({ setRefetchLogs, subscribedEventOptions }) => {
    const initialValues = {
        topics: "",
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { webhookId } = useParams();

    const [isSubmiting, setIsSubmiting] = useState(false);

    const state = useSelector((state) => state);
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
        menuList: (styles, { data }) => ({ ...styles, maxHeight: 128 }),
    };

    const onSubmit = (values) => {
        if (isSubmiting) return;
        setIsSubmiting(true);

        const callBack = () => {
            setRefetchLogs(true);
            setIsSubmiting(false);
        };

        const navigateState = () => {
            // navigate(`/web`);
        };

        const payload = {
            id: webhookId,
            event: values.topics.value,
        };

        dispatch({ type: TEST_WEBHOOK_REQUEST, payload, callBack, navigateState });
    };

    // useEffect(() => {
    //     setIsLogsLoading(true);
    //     dispatch(
    //         getWebhookLogsRequest(
    //             currentPage,
    //             perPage,
    //             () => {
    //                 setIsLogsLoading(false);
    //             },
    //             { id: webhookId },
    //         ),
    //     );
    // }, []);

    return (
        <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex w-full justify-center items-center flex-col">
            {/* Test Webhook */}
            <div className="text-xl font-medium text-slate-500 dark:text-white ">Webhook Logs not found.</div>
            <div className="text-slate-400 dark:text-white border-b pb-2">You can create logs by testing any webhook events.</div>
            <div className="intro-y p-5">
                {/* BEGIN: Webhook Test Form */}
                <Formik initialValues={initialValues} validationSchema={webhookTestSchema} onSubmit={onSubmit}>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid, validateOnMount }) => (
                        <Form className="">
                            <div className="">
                                <div className="w-full">
                                    <label className="form-label inline-block mb-2 text-gray-700 dark:text-white">
                                        Choose any following event to test webhook <span className="text-danger"> *</span>
                                    </label>
                                    <Select
                                        value={values?.topics}
                                        styles={colourStyles}
                                        style={{ boxShadow: "none" }}
                                        options={subscribedEventOptions}
                                        onChange={(e) => {
                                            console.log(e);
                                            setFieldValue("topics", e);
                                        }}
                                        placeholder={messages.webhook.topicsPlaceholder}
                                        className="intro-x login__input form-control block shadow-none"
                                        getOptionLabel={(e) => (
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span style={{ marginLeft: 5 }}>
                                                    <>
                                                        <div>{e?.label}</div>
                                                        <p>{e?.description}</p>
                                                    </>
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <ErrorMessage name="topics">{(msg) => <div className="text-danger">{msg}</div>}</ErrorMessage>
                                    <div className="flex justify-center items-center mt-10">
                                        <button type="buttons" className="btn btn-primary w-40 ml-2" onClick={handleSubmit}>
                                            Test Webhook <MiniLoader isLoading={isSubmiting} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                {/* END: Webhook Test Form */}
            </div>
            {/* Test Webhook */}
        </div>
    );
};

export default WebhookTest;

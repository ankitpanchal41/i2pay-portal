import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import Input from "../../components/common/forms/Input";
import {  webhookSchema } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import MiniLoader from "../../components/common/MiniLoader";
import Heading from "../../components/common/Heading";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import { eventWebhookData } from "../../redux/services/Webhook";
import {  DETAIL_WEBHOOK_REQUEST, UPDATE_WEBHOOK_REQUEST } from "../../redux/actions/Webhook";

const WebhookUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { webhookId } = useParams();

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

    const initialValuesObj = {
        endpoint_url: "",
        description: "",
        topics: [],
    };

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [eventOptions, setEventOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const { detailWebhook } = useSelector((state) => state.webhook);

    const state = useSelector((state) => state);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateListing = () => {
            navigate("/webhook");
        };

        setIsLoading(true);

        dispatch({ type: DETAIL_WEBHOOK_REQUEST, payload: { id: webhookId }, callBack, navigateListing });
    }, []);

    useEffect(() => {
        if (Object.keys(detailWebhook).length !== 0 && eventOptions?.length > 0) {
            const topicValues = [];
            eventOptions?.map((e) => {
                e?.options?.map((o) => {
                    if (detailWebhook?.topics?.includes(o?.value)) {
                        topicValues.push(o);
                        // console.log(e);
                    }
                });
            });
            console.log({ topicValues });
            setInitialValues({
                endpoint_url: detailWebhook?.endpoint_url,
                description: detailWebhook?.description,
                topics: topicValues,
            });
        }
    }, [detailWebhook, eventOptions]);

    useEffect(() => {
        getEventTypes();
    }, []);

    const getEventTypes = async () => {
        const data = await eventWebhookData();

        if (data?.data) {
            setEventOptions(data?.data);
        }
    };

    const onSubmit = (values) => {
        if (isSubmiting) return;
        setIsSubmiting(true);

        const callBack = () => {
            setIsSubmiting(false);
        };

        const navigateState = () => {
            navigate(`/webhook`);
        };

        const topicValue = [];
        values?.topics?.map((t) => {
            topicValue.push(t?.value);
        });
        const payload = {
            ...values,
            topics: topicValue,
            id: webhookId,
        };

        dispatch({ type: UPDATE_WEBHOOK_REQUEST, payload, callBack, navigateState });
    };

    const onClickBack = () => {
        navigate(`/webhook`);
    };

    const _renderHeading = () => {
        return <Heading title={"Edit Webhook"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    return (
        <>
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
                                                validationSchema={webhookSchema}
                                                onSubmit={onSubmit}
                                                validateOnMount
                                                enableReinitialize>
                                                {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                                                    <Form className="">
                                                        <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                {/* <Input
                                                            type="text"
                                                            className="intro-x login__input form-control py-2 px-3 block"
                                                            placeholder={messages.webhook.topicsPlaceholder}
                                                            name="topics"
                                                            label={messages.webhook.topics}
                                                            isRequiredField
                                                        /> */}
                                                                <label className="form-label inline-block mb-2 text-gray-700 dark:text-white">
                                                                    {messages.webhook.topics} <span className="text-danger"> *</span>
                                                                </label>
                                                                <Select
                                                                    // defaultValue={{ value: "INR", label: "India Rupee" }}
                                                                    value={values?.topics}
                                                                    isMulti
                                                                    styles={colourStyles}
                                                                    style={{ boxShadow: "none" }}
                                                                    options={eventOptions}
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
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                <Input
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.webhook.endpointUrlPlaceholder}
                                                                    name="endpoint_url"
                                                                    label={messages.webhook.endpointUrl}
                                                                    isRequiredField
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                <Input
                                                                    textarea="true"
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.webhook.descriptionPlaceholder}
                                                                    name="description"
                                                                    label={messages.webhook.description}
                                                                    // isRequiredField
                                                                    rows="5"
                                                                />
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

export default WebhookUpdate;

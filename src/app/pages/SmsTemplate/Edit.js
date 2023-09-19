import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { messages } from "../../messages/merchantRegister";
import { DETAIL_SMS_TEMPLATE_REQUEST, EDIT_SMS_TEMPLATE_REQUEST, SEND_PAYMENT_SMS_REQUEST } from "../../redux/types/SmsTemplate";
import { getMasterSmsTemplateRequest } from "../../redux/actions/SmsTemplate";
import { ClipLoader } from "react-spinners";
import reactStringReplace from "react-string-replace";
import * as Yup from "yup";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Select = React.lazy(() => import("../../components/common/forms/Select"));
const CurrencySelect = React.lazy(() => import("react-select"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const SmsTemplateEdit = () => {
    const initialValuesObj = {
        template_name: "",
        template: "",
        content: "",
        keyObject: "",
    };

    let defaultValidation = {
        template_name: Yup.string().trim().required("Please enter template name"),
        template: Yup.string().trim().required("Please select template"),
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode } = useSelector((state) => state.persist);

    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const [listingType, setListingType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [smsContent, setSmsContent] = useState("");
    const [masterTemplates, setMasterTemplates] = useState([]);
    const [validationObject, setValidationObject] = useState(defaultValidation);

    const { masterSmsTemplateList, smsTemplateDetail } = useSelector((state) => state.sms);
    const state = useSelector((state) => state);
    const { merchant_template_id } = useParams();

    useEffect(() => {
        if (masterSmsTemplateList.length) {
            let templates = [];
            masterSmsTemplateList.map((template) => {
                templates.push({ label: template.subject, value: template.id });
            });
            setMasterTemplates(templates);
        }
    }, [masterSmsTemplateList]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getMasterSmsTemplateRequest(() => {
                setIsLoading(false);
            }),
        );
    }, []);

    useEffect(() => {
        const setValue = async () => {
            let defaultValue = {
                template_name: smsTemplateDetail?.name,
                content: smsTemplateDetail?.original_content,
                template: smsTemplateDetail?.template_id,
            };

            await reactStringReplace(smsTemplateDetail?.original_content, /{([^}]+)}/g, (match, i) => {
                const name = match.split(".")[0];
                const type = match.split(".")[1];

                defaultValue[name] = smsTemplateDetail?.key_object[name] || "";
                if (type === "number") {
                    validationObject[name] = Yup.number()
                        .required(`Please ${type === "currency" ? "select" : "enter"} ${name}`)
                        .min(0.1);
                } else {
                    validationObject[name] = Yup.string().required(`Please ${type === "currency" ? "select" : "enter"} ${name}`);
                }
            });

            setInitialValues({ ...initialValuesObj, ...defaultValue });

            setValidationObject(validationObject);
        };

        if (Object.keys(smsTemplateDetail).length > 0) {
            setValue();
        }
    }, [smsTemplateDetail]);

    const getSmsContent = (template_id, setFieldValue, values) => {
        setFieldValue("template", template_id);
        let smsTemplate = masterSmsTemplateList.filter((template) => template_id == template.id);
        let contents = template_id == smsTemplateDetail.template_id ? smsTemplateDetail?.original_content : smsTemplate[0].message;

        setSmsContent(contents);

        reactStringReplace(smsTemplate?.message, /{([^}]+)}/g, (match, i) => {
            const name = match.split(".")[0];
            setFieldValue(name, undefined);
        });
        setFieldValue("content", contents);
        setValidationObject(defaultValidation);
        setFieldValue("template_name", values?.template_name);

        reactStringReplace(contents, /{([^}]+)}/g, (match, i) => {
            const name = match.split(".")[0];
            const type = match.split(".")[1];

            setFieldValue(
                name,
                type === "currency" ? smsTemplateDetail?.key_object[name] || "INR" : smsTemplateDetail?.key_object[name] || "",
            );
            if (type === "number") {
                validationObject[name] = Yup.number()
                    .required(`Please ${type === "currency" ? "select" : "enter"} ${name}`)
                    .min(0.1);
            } else {
                validationObject[name] = Yup.string().required(`Please ${type === "currency" ? "select" : "enter"} ${name}`);
            }
        });

        setValidationObject(validationObject);
    };

    const setSMSContent = (column, value, setFieldValue) => {
        setFieldValue(column, value);
    };

    let validationState = Yup.object().shape(validationObject);

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };
        setIsLoading(true);

        const navigateListing = () => {
            navigate("/sms-payment");
        };

        dispatch({
            type: DETAIL_SMS_TEMPLATE_REQUEST,
            payload: { merchant_payment_sms_content_id: merchant_template_id },
            callBack,
            navigateListing,
        });
    }, []);

    const onSubmit = (values) => {
        let newContent = values?.content;
        let rxp = /{([^}]+)}/g;

        // let curlyMatch;
        // while ((curlyMatch = rxp.exec(values?.content))) {
        //     const name = curlyMatch?.[1]?.split(".")[0];

        //     let value = values[name] !== undefined ? values[name] : initialValues.keyObject[name];
        //     newContent = newContent.replace("{" + curlyMatch[1] + "}", "{" + value + "}");
        // }

        let curlyMatch;
        while ((curlyMatch = rxp.exec(values?.content))) {
            const name = curlyMatch?.[1]?.split(".")[0];
            let value = values[name];

            newContent = newContent.replace("{" + curlyMatch[1] + "}", "{" + value + "}");
        }

        const callBack = () => {
            // navigate(`/store-front`);
            setIsLoading(false);
        };

        const navigateState = () => {
            // const sendSMSPayload = {
            //     merchant_payment_sms_content_id: merchant_template_id,
            //     email: data?.email
            // }
            //
            // dispatch({type: SEND_PAYMENT_SMS_REQUEST, payload: sendSMSPayload, callBack, navigateState});

            navigate(`/sms-payment`);
        };

        const payload = {
            name: values.template_name,
            content: newContent,
            template_id: values.template,
            merchant_payment_sms_content_id: merchant_template_id,
        };

        setIsLoading(true);

        dispatch({ type: EDIT_SMS_TEMPLATE_REQUEST, payload, callBack, navigateState });
    };

    const onClickBack = () => {
        navigate(`/sms-payment`);
    };

    const _renderHeading = () => {
        return <Heading title={"Edit SMS Payment"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const colourStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            borderColor: "#e2e8f0",
            color: mode === "dark" ? "#FFFFFF" : "#384252",
            height: "2.5rem",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                //backgroundColor: "white",
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
            borderWidth: 0,
            // This line disable the blue border
        }),
        placeholder: (styles, { isFocused }) => ({
            ...styles,
            boxShadow: "none",
            // This line disable the blue border
        }),
        singleValue: (styles, { data }) => ({
            ...styles,
            color: mode === "dark" ? "#FFFFFF" : "#384252",
        }),
        menu: (styles, { data }) => ({ ...styles, backgroundColor: mode === "dark" ? "#1b253b" : "white" }),
        menuPortal: (base) => ({ ...base, zIndex: 999 }),
    };

    return (
        <>
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="intro-y">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {/* BEGIN: Connector Table */}
                                <div className="intro-y box p-5 mt-5">
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
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationState}
                                            onSubmit={onSubmit}
                                            validateOnMount
                                            enableReinitialize={true}>
                                            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                                                <Form className="">
                                                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.sms_template.template_name}
                                                                name="template_name"
                                                                label={messages.sms_template.template_name}
                                                                isRequiredField
                                                            />
                                                        </div>

                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Select
                                                                onChange={(e) => getSmsContent(e.target.value, setFieldValue, values)}
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                name="template"
                                                                firstDisableLabel="Select Template"
                                                                label={messages.sms_template.template}
                                                                isRequiredField
                                                                data={masterTemplates}
                                                            />
                                                        </div>

                                                        {values.template && (
                                                            <>
                                                                <div className="intro-y col-span-12 sm:col-span-12">
                                                                    <label className="form-label" style={{ marginBottom: "-15px" }}>
                                                                        {messages.sms_template.content}{" "}
                                                                        <span className="text-danger"> *</span>
                                                                    </label>
                                                                </div>

                                                                <Input type="hidden" name="replaced_content" />

                                                                <div className="intro-y col-span-12 sm:col-span-12 flex items-center sms-template-replace-input">
                                                                    {values?.content &&
                                                                        reactStringReplace(values?.content, /{([^}]+)}/g, (match, i) => {
                                                                            const name = match.split(".")[0];
                                                                            const type = match.split(".")[1];
                                                                            return (
                                                                                <span key={name}>
                                                                                    {type === "currency" ? (
                                                                                        <CurrencySelect
                                                                                            menuPortalTarget={document.body}
                                                                                            value={Currency?.find(
                                                                                                (item) => item?.value === values.currency,
                                                                                            )}
                                                                                            styles={colourStyles}
                                                                                            style={{
                                                                                                boxShadow: "none",
                                                                                                zIndex: 1,
                                                                                            }}
                                                                                            options={Currency}
                                                                                            onChange={(e) => {
                                                                                                // setFieldValue("currency", e?.value);
                                                                                                setSMSContent(
                                                                                                    name,
                                                                                                    e?.value,
                                                                                                    setFieldValue,
                                                                                                );
                                                                                            }}
                                                                                            // onChange={(e) => handleCurrencyChange(e, setFieldValue)}
                                                                                            className="login__input form-control block shadow-none z-1 w-48"
                                                                                            getOptionLabel={(e) => (
                                                                                                <div
                                                                                                    style={{
                                                                                                        display: "flex",
                                                                                                        alignItems: "center",
                                                                                                    }}>
                                                                                                    <span style={{ marginLeft: 5 }}>
                                                                                                        <span>{decode(e.symbol)}</span> (
                                                                                                        {e?.value})
                                                                                                    </span>
                                                                                                </div>
                                                                                            )}
                                                                                        />
                                                                                    ) : (
                                                                                        <Input
                                                                                            errorEnabled={true}
                                                                                            type={type}
                                                                                            className="form-control"
                                                                                            placeholder={`Enter ${name}`}
                                                                                            name={name}
                                                                                            isRequiredField
                                                                                            // validateFieldOnChange={true}
                                                                                            onChange={(e) =>
                                                                                                setSMSContent(
                                                                                                    name,
                                                                                                    e.target.value,
                                                                                                    setFieldValue,
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                                </span>
                                                                            );
                                                                        })}
                                                                    <span className="text-primary underline ml-2">
                                                                        {" "}
                                                                        https://example.com
                                                                    </span>
                                                                </div>

                                                                {/*<div className="intro-y col-span-12 sm:col-span-12">*/}
                                                                {/*    {values.replaced_content}*/}
                                                                {/*</div>*/}
                                                            </>
                                                        )}

                                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                            <button
                                                                type="buttons"
                                                                className="btn btn-primary ml-2" // type="submit"
                                                                onClick={handleSubmit}
                                                                // disabled={!isValid || isSubmiting}
                                                            >
                                                                Update <MiniLoader isLoading={isLoading} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    )}
                                </div>
                                {/* END: Connector Table */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END: Content */}
        </>
    );
};

export default SmsTemplateEdit;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { messages } from "../../messages/merchantRegister";
import { ADD_SMS_TEMPLATE_REQUEST } from "../../redux/types/SmsTemplate";
import { getMasterSmsTemplateRequest } from "../../redux/actions/SmsTemplate";
import * as Yup from "yup";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import reactStringReplace from "react-string-replace";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Select = React.lazy(() => import("../../components/common/forms/Select"));
const CurrencySelect = React.lazy(() => import("react-select"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const SmsTemplateCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode } = useSelector((state) => state.persist);

    let initialValues = {
        template_name: "",
        template: "",
        replaced_content: "",
    };

    let defaultValidation = {
        template_name: Yup.string().trim().required("Please enter template name"),
        template: Yup.string().trim().required("Please select template"),
    };

    const { masterSmsTemplateList } = useSelector((state) => state.sms);

    const [, setListingType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [masterTemplates, setMasterTemplates] = useState([]);
    const [contentData, setContentData] = useState("");
    const [validationObject, setValidationObject] = useState(defaultValidation);

    // Backup
    useEffect(() => {
        const filteredValue = [];
        let rxp = /{([^}]+)}/g;

        let curlyMatch;

        while ((curlyMatch = rxp.exec(contentData))) {
            filteredValue.push(curlyMatch[1]);
        }
    }, [contentData]);

    const state = useSelector((state) => state);

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    const getSmsContent = (template_id, setFieldValue) => {
        setFieldValue("template", template_id);
        let smsTemplate = masterSmsTemplateList.find((template) => template_id == template.id);

        reactStringReplace(smsTemplate?.message, /{([^}]+)}/g, (match, i) => {
            const name = match.split(".")[0];
            setFieldValue(name, undefined);
        });
        setValidationObject(defaultValidation);
        setContentData(smsTemplate?.message);
        setFieldValue("content", smsTemplate?.message);

        reactStringReplace(smsTemplate?.message, /{([^}]+)}/g, (match, i) => {
            const name = match.split(".")[0];
            const type = match.split(".")[1];

            setFieldValue(name, type === "currency" ? "INR" : "");
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

    let validationState = Yup.object().shape(validationObject);
    const setSMSContent = (column, value, setFieldValue) => {
        setFieldValue(column, value);
    };

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
        dispatch(getMasterSmsTemplateRequest(() => {}));
    }, []);

    const onSubmit = (values) => {
        let newContent = contentData;
        let rxp = /{([^}]+)}/g;

        let curlyMatch;
        while ((curlyMatch = rxp.exec(contentData))) {
            const name = curlyMatch?.[1]?.split(".")[0];
            let value = values[name];

            newContent = newContent.replace("{" + curlyMatch[1] + "}", "{" + value + "}");
        }

        // while ((curlyMatch = rxp.exec(contentData))) {

        // }s

        const callBack = () => {
            setIsLoading(false);
        };

        const navigateState = () => {
            navigate(`/sms-payment`);
        };

        const payload = {
            name: values.template_name,
            content: newContent,
            display_content: newContent,
            template_id: values.template,
        };

        setIsLoading(true);

        dispatch({ type: ADD_SMS_TEMPLATE_REQUEST, payload, callBack, navigateState });
    };

    const onClickBack = () => {
        navigate(`/sms-payment`);
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

    const _renderHeading = () => {
        return <Heading title={"Add SMS Payment"} displayBackButton={true} onClickBack={onClickBack} />;
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
                            <div className="intro-y col-span-12">
                                {/* BEGIN: Connector Table */}
                                <div className="intro-y box p-5 mt-5">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationState}
                                        onSubmit={onSubmit}
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
                                                            onChange={(e) => getSmsContent(e.target.value, setFieldValue)}
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
                                                                    {messages.sms_template.content} <span className="text-danger"> *</span>
                                                                </label>
                                                            </div>

                                                            <Input type="hidden" name="replaced_content" />

                                                            <div className="intro-y col-span-12 sm:col-span-12 flex items-center sms-template-replace-input flex-wrap">
                                                                {reactStringReplace(values?.content, /{([^}]+)}/g, (match, i) => {
                                                                    const name = match.split(".")[0];
                                                                    const type = match.split(".")[1];
                                                                    return (
                                                                        <span key={name}>
                                                                            {type === "currency" ? (
                                                                                <CurrencySelect
                                                                                    value={Currency?.find(
                                                                                        (item) => item?.value === values.currency,
                                                                                    )}
                                                                                    menuPortalTarget={document.body}
                                                                                    styles={colourStyles}
                                                                                    style={{ boxShadow: "none", zIndex: 1 }}
                                                                                    options={Currency}
                                                                                    onChange={(e) => {
                                                                                        // setFieldValue("currency", e?.value);
                                                                                        setSMSContent(name, e?.value, setFieldValue);
                                                                                    }}
                                                                                    // onChange={(e) => handleCurrencyChange(e, setFieldValue)}
                                                                                    className="login__input form-control block shadow-none z-1 w-48 sm:col-span-12"
                                                                                    getOptionLabel={(e) => (
                                                                                        <div
                                                                                            style={{
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                            }}>
                                                                                            <span style={{ marginLeft: 5 }}>
                                                                                                <span>{decode(e.symbol)}</span> ({e?.value})
                                                                                            </span>
                                                                                        </div>
                                                                                    )}
                                                                                />
                                                                            ) : (
                                                                                <Input
                                                                                    errorEnabled={true}
                                                                                    type={type}
                                                                                    className="form-control sm:col-span-12"
                                                                                    placeholder={`Enter ${name}`}
                                                                                    name={name}
                                                                                    isRequiredField
                                                                                    // validateFieldOnChange={true}
                                                                                    onChange={(e) =>
                                                                                        setSMSContent(name, e.target.value, setFieldValue)
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </span>
                                                                    );
                                                                })}
                                                                <span className="text-primary underline ml-2"> https://example.com</span>
                                                            </div>

                                                            {/*<div className="intro-y col-span-12 sm:col-span-12">*/}
                                                            {/*    {values.replaced_content}*/}
                                                            {/*</div>*/}
                                                        </>
                                                    )}

                                                    <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                        <button
                                                            type="buttons"
                                                            className="btn btn-primary w-24 ml-2"
                                                            onClick={handleSubmit}
                                                            disabled={isLoading}>
                                                            Save <MiniLoader isLoading={isLoading} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                {/* END: Connector Table */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END: Content */}
            {/* </MainMenu> */}
            {/* END: Menu */}
        </>
    );
};

export default SmsTemplateCreate;

import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Form, Formik } from "formik";
import { connectorRules } from "../../utils/validationSchema";
import { messages } from "../../messages/settings";
import { getConnectorsRequest, GET_ENABLED_CONNECTOR_REQUEST } from "../../redux/actions/Connector";
import { CREATE_RULES_REQUEST } from "../../redux/actions/Rules";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { amountTypeConditions, cardTypeConditions, connectorRulesTypes, currencyTypeConditions } from "../../utils/rulesTypes";
import { Currency } from "../../utils/currency";
import { v4 as UUID } from "uuid";
import { decode } from "html-entities";
import { countryCodes } from "../../utils/countryCode";
import { getConnectorTypeData } from "../../redux/services/Connector";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Select = React.lazy(() => import("react-select"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const CreateRules = () => {
    const initialValuesObj = {
        rule_name: "",
        connector_id: "",
        formValues: [
            {
                rule_type: "",
                condition: "",
                value: "",
                id: UUID(),
            },
        ],
    };
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const state = useSelector((state) => state);
    const [, setIsSubmiting] = useState(false);
    const { enabledConnector } = useSelector((state) => state.connector);
    const [connectorTypes, setConnectorTypes] = useState([]);
    const [connectorTypeCard, setConnectorTypeCard] = useState([]);
    const [connectors, setConnectors] = useState([]);

    // const { connector: connectors } = useSelector((state) => state.connector);
    let handleChange = (onChange, i, e, values) => {
        let newFormValues = [...values];

        newFormValues[i][e.target.name] = e.target.value;

        if (e.target.name === "rule_type") {
            if (e.target.value == "not in" || e.target.value == "in") {
                newFormValues[i]["condition"] = [];
            } else {
                newFormValues[i]["condition"] = "";
            }

            if (e.target.value == "not in" || e.target.value == "in") {
                newFormValues[i]["value"] = [];
            } else {
                newFormValues[i]["value"] = "";
            }
        }

        if (e.target.name === "condition") {
            if (e.target.value == "not in" || e.target.value == "in") {
                newFormValues[i]["value"] = [];
            } else {
                newFormValues[i]["value"] = "";
            }
        }

        onChange("formValues", newFormValues);
        // setFormValues(newFormValues);
    };

    // useEffect(() => {
    //     setIsLoading(true);
    //     dispatch(
    //         getConnectorsRequest(1, "all", "", () => {
    //             setIsLoading(false);
    //         }),
    //     );
    //     return true;
    // }, []);

    useEffect(() => {
        setIsLoading(true);

        const callBack = () => {
            setIsLoading(false);
        };

        const navigateState = () => {};

        dispatch({ type: GET_ENABLED_CONNECTOR_REQUEST, payload: {}, callBack, navigateState });
    }, []);

    useEffect(() => {
        // let connectors = [];
        if (enabledConnector) {
            // enabledConnector.forEach((item) => {
            //     connectors.push({ value: item?.id, label: item?.name });
            // });
            setConnectors(enabledConnector);
        }
    }, [enabledConnector]);

    let handleCurrencyChange = (onChange, fieldName, condition, i, e, values) => {
        let newFormValues = [...values];

        if (condition == "==") {
            newFormValues[i][fieldName] = e;
        } else {
            let tempCurrencyArray = e.map((currency) => currency);
            newFormValues[i][fieldName] = tempCurrencyArray;
        }

        onChange("formValues", newFormValues);
        // setFormValues(newFormValues);
    };

    let handleCountryChange = (onChange, fieldName, condition, i, e, values) => {
        let newFormValues = [...values];

        if (condition == "==") {
            newFormValues[i][fieldName] = e;
        } else {
            let tempCurrencyArray = e.map((currency) => currency);
            newFormValues[i][fieldName] = tempCurrencyArray;
        }

        onChange("formValues", newFormValues);
        // setFormValues(newFormValues);
    };
    let addFormFields = (setFieldValue) => {
        setIsSubmiting(false);
        // setFormValues([...formValues, { rule_type: "", condition: "", value: "" }]);
        setFieldValue({ rule_type: "", condition: "", value: "", id: UUID() });
    };

    const onClickBack = () => {
        navigate(`/rules`);
    };
    const onSubmit = async (values, formikBag) => {
        const callBack = () => {
            setIsLoading(false);
        };
        const navigateState = () => {
            navigate(`/rules`);
        };
        // setIsLoading(true);

        const tempFormValues = [];
        values.formValues.map((item) => {
            let tempItem = { ...item };
            if (Array.isArray(item.value)) {
                tempItem.value = item?.value?.map((i) => (item?.rule_type === "country" ? i?.code : i?.value));
            } else if (typeof item.value === "object") {
                tempItem.value = item?.rule_type === "country" ? item.value.code : item.value.value;
            }
            tempFormValues.push(tempItem);
        });

        const types = [];
        values.connector_type?.map((type) => {
            types.push(type?.value);
        });

        const payload = {
            rule_name: values.rule_name,
            connector_id: values.connector_id,
            rules: tempFormValues,
            connector_type: types,
        };

        dispatch({
            type: CREATE_RULES_REQUEST,
            payload: payload,
            callBack,
            navigateState,
        });
    };
    const { mode } = useSelector((state) => state.persist);
    const colourStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (styles, state) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "#ffffff",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
            // borderColor: "#e2e8f0",
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
    };

    let handleTypeChange = (onChange, value, values) => {
        let cardType = false;
        values?.map((type) => {
            if (type?.label === "Credit Card" || type?.label === "Debit Card") {
                cardType = true;
            }
        });
        if (!cardType) {
            const setNewValue = [];
            values?.map((item) => {
                if (item?.rule_type !== "card_type") {
                    setNewValue.push(item);
                }
            });

            onChange("formValues", setNewValue);
        }

        onChange("connector_type", value);
    };

    const getConnectorType = async (value, setFieldValue, values) => {
        const payload = {
            connector_id: value,
        };

        let newFormValues = [...values];

        if (values) {
            let newFormValues = [...values];

            const changeFormValue = [];
            newFormValues?.map((item, index) => {
                if (item?.rule_type !== "card_type") {
                    changeFormValue.push(item);
                }
                // if (item?.rule_type === "card_type") {
                //     if (item?.condition == "not in" || item?.condition == "in") {
                //         newFormValues[index]["value"] = [];
                //     } else {
                //         newFormValues[index]["value"] = "";
                //     }
                // }
            });

            setFieldValue("formValues", changeFormValue);
        }

        setConnectorTypes([]);
        setConnectorTypeCard([]);

        if (setFieldValue) {
            setFieldValue("connector_type", []);
        }

        const data = await getConnectorTypeData(payload);

        if (data?.responseCode === 200) {
            setConnectorTypes(data?.data?.type);
            setConnectorTypeCard(data?.data?.card_type);
        }
    };

    const _renderHeading = () => {
        return <Heading title={"Create Rules"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    return (
        <>
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                <div className="intro-y box mt-5">
                    {connectors && (
                        <Formik initialValues={initialValuesObj} validationSchema={connectorRules} onSubmit={onSubmit}>
                            {({ handleSubmit, errors, values, setFieldValue, touched, isValid, setFieldTouched }) => (
                                <Form className="">
                                    {/*  Transactions Limit */}

                                    <div className="grid grid-cols-12 gap-2 gap-y-5">
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <label className="form-label">
                                                {messages.formTitles.rule_name} <span className="text-danger"> *</span>
                                            </label>
                                            <Input
                                                type="text"
                                                className="intro-x login__input form-control py-2 px-3 block"
                                                placeholder={messages.placeholders.enter_rule_name}
                                                name="rule_name"
                                            />
                                        </div>
                                        <div className="intro-y col-span-12 sm:col-span-6">
                                            <label className="form-label">
                                                Connectors <span className="text-danger"> *</span>
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    getConnectorType(e.target.value, setFieldValue, values.formValues);
                                                    setFieldValue("connector_id", e.target.value);
                                                }}
                                                value={values.connector_id}
                                                name="connector_id"
                                                className="form-select intro-x login__input form-control py-2 px-3 block">
                                                <option value="" disabled>
                                                    Select Connector
                                                </option>

                                                {connectors &&
                                                    connectors.map((connector, index) => (
                                                        <option key={index} value={connector.id}>
                                                            {connector.name}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors.connector_id && touched.connector_id ? (
                                                <p className="text-red-500 mt-2 ml-1">{errors.connector_id}</p>
                                            ) : null}
                                        </div>
                                        <div className="intro-y col-span-12 sm:col-span-6 z-index-99">
                                            <label className="form-label">
                                                Connector Type <span className="text-danger"> *</span>
                                            </label>
                                            <Select
                                                // menuPortalTarget={document.body}
                                                styles={colourStyles}
                                                // defaultValue={element.value}
                                                value={values.connector_type}
                                                // onBlur={() => setFieldTouched(`formValues[${index}].value`)}
                                                isMulti
                                                style={{ boxShadow: "none" }}
                                                options={connectorTypes}
                                                name="value"
                                                onChange={(e) => handleTypeChange(setFieldValue, e, values?.formValues)}
                                                className="login__input form-control block shadow-none"
                                            />
                                            {touched?.connector_type && errors?.connector_type ? (
                                                <p className="text-red-500 mt-2 ml-1">{errors?.connector_type}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    {/*  END: Transactions Limit */}
                                    {/* START: Rules Details */}
                                    <div className="flex items-center justify-between mt-10 mb-2">
                                        <div className="text-base">{messages.formTitles.rules_details}</div>
                                        <button
                                            className="btn btn-primary bg-primary btn-sm mb-2"
                                            type="button"
                                            onClick={() =>
                                                addFormFields((value) => setFieldValue("formValues", [...values?.formValues, value]))
                                            }
                                            style={{ backgroundColor: "rgb(30,58,138)" }}>
                                            <Icon.Plus size="18" />
                                        </button>
                                    </div>
                                    <hr />

                                    {values.formValues.map((element, index) => (
                                        <div className="grid grid-cols-12 gap-2 gap-y-5 mt-5" key={element?.id}>
                                            <div className="col-span-12 sm:col-span-3">
                                                <label className="form-label">
                                                    {messages.formTitles.rules_type} <span className="text-danger"> *</span>
                                                </label>

                                                <select
                                                    onChange={(e) => handleChange(setFieldValue, index, e, values.formValues)}
                                                    value={element.rule_type || ""}
                                                    name="rule_type"
                                                    onBlur={() => setFieldTouched(`formValues[${index}].rule_type`)}
                                                    className="form-select intro-x login__input form-control py-2 px-3 block">
                                                    <option value="" disabled>
                                                        Select type
                                                    </option>
                                                    {connectorRulesTypes &&
                                                        connectorRulesTypes.map((connectorRulesType, index) => {
                                                            const connectorTypeArray = [];

                                                            values?.connector_type?.map((ct) => {
                                                                connectorTypeArray.push(ct.value);
                                                            });
                                                            if (connectorRulesType.value === "card_type") {
                                                                if (
                                                                    connectorTypeArray?.includes("1") ||
                                                                    connectorTypeArray?.includes("2")
                                                                ) {
                                                                    return (
                                                                        <option key={index} value={connectorRulesType.value}>
                                                                            {connectorRulesType.label}
                                                                        </option>
                                                                    );
                                                                }
                                                            } else {
                                                                return (
                                                                    <option key={index} value={connectorRulesType.value}>
                                                                        {connectorRulesType.label}
                                                                    </option>
                                                                );
                                                            }
                                                        })}
                                                </select>
                                                {errors.formValues?.[index]?.rule_type && touched.formValues?.[index]?.rule_type ? (
                                                    <p className="text-red-500 mt-2 ml-1">{errors.formValues?.[index]?.rule_type}</p>
                                                ) : null}
                                            </div>
                                            {element.rule_type ? (
                                                <div className="intro-y col-span-12 sm:col-span-3">
                                                    <label className="form-label">{messages.formTitles.condition}</label>
                                                    <select
                                                        onChange={(e) => handleChange(setFieldValue, index, e, values.formValues)}
                                                        value={element.condition || ""}
                                                        name="condition"
                                                        onBlur={() => setFieldTouched(`formValues[${index}].condition`)}
                                                        className="form-select intro-x login__input form-control py-2 px-3 block">
                                                        <option value="" disabled>
                                                            Select Operator
                                                        </option>
                                                        {element.rule_type === "currency" ||
                                                        element.rule_type === "country" ||
                                                        element.rule_type === "card_type"
                                                            ? currencyTypeConditions &&
                                                              currencyTypeConditions.map((currencyTypeCondition, index) => {
                                                                  let filterValue = values.formValues.map(
                                                                      (v) => v.rule_type === element.rule_type && v["condition"],
                                                                  );

                                                                  return (
                                                                      <option
                                                                          key={index}
                                                                          value={currencyTypeCondition.value}
                                                                          disabled={filterValue?.includes(currencyTypeCondition.value)}>
                                                                          {currencyTypeCondition.label}
                                                                      </option>
                                                                  );
                                                              })
                                                            : ""}
                                                        {element.rule_type === "amount" &&
                                                            amountTypeConditions &&
                                                            amountTypeConditions.map((amountTypeCondition, index) => {
                                                                let filterValue = values.formValues.map(
                                                                    (v) => v.rule_type === "amount" && v["condition"],
                                                                );
                                                                return (
                                                                    <option
                                                                        key={index}
                                                                        value={amountTypeCondition.value}
                                                                        disabled={filterValue?.includes(amountTypeCondition.value)}>
                                                                        {amountTypeCondition.label}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                    {errors.formValues?.[index]?.condition && touched.formValues?.[index]?.condition ? (
                                                        <p className="text-red-500 mt-2 ml-1">{errors.formValues?.[index]?.condition}</p>
                                                    ) : null}
                                                </div>
                                            ) : null}
                                            {element.rule_type ? (
                                                <div className="intro-y col-span-12 sm:col-span-3">
                                                    <label className="form-label">{messages.formTitles.value}</label>
                                                    {element.rule_type === "amount" ? (
                                                        <Input
                                                            onChange={(e) => handleChange(setFieldValue, index, e, values.formValues)}
                                                            value={element.value || ""}
                                                            name="value"
                                                            onBlur={() => setFieldTouched(`formValues[${index}].value`)}
                                                            type="number"
                                                            className="intro-x login__input form-control py-2 px-3 block"
                                                            placeholder={messages.placeholders.enter_amount_here}
                                                        />
                                                    ) : element.rule_type === "card_type" ? (
                                                        <Select
                                                            menuPortalTarget={document.body}
                                                            styles={colourStyles}
                                                            // defaultValue={element.value}
                                                            value={element.value}
                                                            onBlur={() => setFieldTouched(`formValues[${index}].value`)}
                                                            isMulti={element.condition != "==" ? true : false}
                                                            style={{ boxShadow: "none" }}
                                                            options={connectorTypeCard}
                                                            name="value"
                                                            onChange={(e) => {
                                                                handleCurrencyChange(
                                                                    setFieldValue,
                                                                    "value",
                                                                    element.condition,
                                                                    index,
                                                                    e,
                                                                    values.formValues,
                                                                );
                                                            }}
                                                            className="intro-x login__input form-control block shadow-none"
                                                            getOptionLabel={(e) => (
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <span style={{ marginLeft: 5 }}>
                                                                        <span>{decode(e.label)}</span>
                                                                    </span>
                                                                </div>
                                                            )}
                                                        />
                                                    ) : element.rule_type === "country" ? (
                                                        <Select
                                                            menuPortalTarget={document.body}
                                                            styles={colourStyles}
                                                            // defaultValue={element.value}
                                                            value={element.value}
                                                            onBlur={() => setFieldTouched(`formValues[${index}].value`)}
                                                            isMulti={element.condition != "==" ? true : false}
                                                            style={{ boxShadow: "none" }}
                                                            options={countryCodes}
                                                            name="value"
                                                            onChange={(e) => {
                                                                handleCountryChange(
                                                                    setFieldValue,
                                                                    "value",
                                                                    element.condition,
                                                                    index,
                                                                    e,
                                                                    values.formValues,
                                                                );
                                                            }}
                                                            getOptionValue={(option) => option.name}
                                                            className="intro-x login__input form-control block shadow-none"
                                                            getOptionLabel={(e) => (
                                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                                    <span style={{ marginLeft: 5 }}>
                                                                        <span>{decode(e.name)}</span> ({e?.code})
                                                                    </span>
                                                                </div>
                                                            )}
                                                        />
                                                    ) : (
                                                        // <select onChange={e => handleChange(setFieldValue, index, e)}
                                                        //         value={element.value || ""}
                                                        //         name="value"
                                                        //         className="form-select intro-x login__input form-control py-2 px-3 block">
                                                        //     <option value="" disabled>Select Currency</option>
                                                        //     {Currency && Currency.map(currency => (
                                                        //         <option
                                                        //             value={currency.value}>{currency.label} ({currency.value})</option>
                                                        //     ))}
                                                        // </select>
                                                        <>
                                                            <Select
                                                                menuPortalTarget={document.body}
                                                                styles={colourStyles}
                                                                // defaultValue={element.value}
                                                                value={element.value}
                                                                onBlur={() => setFieldTouched(`formValues[${index}].value`)}
                                                                isMulti={
                                                                    element.rule_type === "currency" && element.condition != "=="
                                                                        ? true
                                                                        : false
                                                                }
                                                                style={{ boxShadow: "none" }}
                                                                options={Currency}
                                                                name="value"
                                                                onChange={(e) =>
                                                                    handleCurrencyChange(
                                                                        setFieldValue,
                                                                        "value",
                                                                        element.condition,
                                                                        index,
                                                                        e,
                                                                        values.formValues,
                                                                    )
                                                                }
                                                                className="intro-x login__input form-control block shadow-none"
                                                                getOptionLabel={(e) => (
                                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                                        <span style={{ marginLeft: 5 }}>
                                                                            <span>{decode(e.symbol)}</span> ({e?.value})
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                    {errors.formValues?.[index]?.value && touched.formValues?.[index]?.value ? (
                                                        <p className="text-red-500 mt-2 ml-1">{errors.formValues?.[index]?.value}</p>
                                                    ) : null}
                                                </div>
                                            ) : null}
                                            {index ? (
                                                <div className="intro-y col-span-12 sm:col-span-1">
                                                    <div className="mb-1">&nbsp;</div>
                                                    <div className="intro-x login__input px-4 block">
                                                        <button
                                                            className="btn btn-danger remove"
                                                            style={{ position: "relative", top: 5 }}
                                                            onClick={() => {
                                                                setFieldTouched(`formValues[${index}].rule_type`, false);
                                                                setFieldTouched(`formValues[${index}].condition`, false);
                                                                setFieldTouched(`formValues[${index}].value`, false);
                                                                setFieldValue(
                                                                    "formValues",
                                                                    values.formValues.filter((_, i) => i !== index),
                                                                    true,
                                                                );
                                                            }}>
                                                            <Icon.Trash2 size="24" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : null}
                                            <div className="md:hidden lg:hidden w-full border-b col-span-12"></div>
                                        </div>
                                    ))}

                                    {/* START: Rules Details */}
                                    <div className="grid grid-cols-12 gap-2 gap-y-5">
                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end my-5">
                                            <button
                                                disabled={isLoading}
                                                type="buttons"
                                                className="btn btn-primary w-24 ml-2"
                                                onClick={handleSubmit}>
                                                Save <MiniLoader isLoading={isLoading} />
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            </div>
        </>
    );
};
export default CreateRules;

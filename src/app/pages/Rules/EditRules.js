import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import { connectorRules } from "../../utils/validationSchema";
import { messages } from "../../messages/settings";
import { getConnectorsRequest, GET_ENABLED_CONNECTOR_REQUEST } from "../../redux/actions/Connector";
import { GET_DETAIL_RULES_REQUEST, UPDATE_RULES_REQUEST } from "../../redux/actions/Rules";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { amountTypeConditions, cardTypeConditions, connectorRulesTypes, currencyTypeConditions } from "../../utils/rulesTypes";
import { Currency } from "../../utils/currency";
import { v4 as UUID } from "uuid";
import { ClipLoader } from "react-spinners";
import { decode } from "html-entities";
import { countryCodes } from "../../utils/countryCode";
import { getConnectorTypeData } from "../../redux/services/Connector";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Select = React.lazy(() => import("react-select"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const EditRules = () => {
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
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rulesId } = useParams();

    // const state = useSelector((state) => state);
    const { rulesDetail } = useSelector((state) => state?.rules);
    const { enabledConnector } = useSelector((state) => state.connector);
    const [connectors, setConnectors] = useState([]);
    const [connectorTypes, setConnectorTypes] = useState([]);
    const [connectorTypeCard, setConnectorTypeCard] = useState([]);

    const [initialValues, setInitialValues] = useState(initialValuesObj);
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
        setFieldValue({ rule_type: "", condition: "", value: "", id: UUID() });
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

    const getConnectorType = async (value, setFieldValue, values) => {
        const payload = {
            connector_id: value,
        };

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

    useEffect(() => {
        // let connectors = [];
        if (enabledConnector) {
            // enabledConnector.forEach((item) => {
            //     connectors.push({ value: item?.id, label: item?.name });
            // });
            setConnectors(enabledConnector);
        }
    }, [enabledConnector]);

    useEffect(() => {
        const callBack = () => {
            setIsLoadingPage(false);
        };
        setIsLoadingPage(true);

        const navigateListing = () => {
            navigate("/rules");
        };

        dispatch({ type: GET_DETAIL_RULES_REQUEST, payload: { rules_id: rulesId }, callBack, navigateListing });
    }, []);

    const onRulesDetailsChange = () => {
        if (rulesDetail) {
            if (rulesDetail?.connector_id) {
                getConnectorType(rulesDetail?.connector_id);
            }

            const value = {
                rule_name: rulesDetail?.rule_name,
                connector_id: rulesDetail?.connector_status ? rulesDetail?.connector_id : "",
                connector_type: rulesDetail?.connector_type,
                formValues: [],
            };

            rulesDetail?.rules?.map((item) => {
                if (item.rule_type === "country" && item?.condition === "==") {
                    value.formValues.push({
                        ...item,
                        id: UUID(),
                        value: countryCodes?.find((country) => country?.code == item?.value),
                    });
                } else if (item.rule_type === "country") {
                    const countryValue = [];

                    item?.value?.map((d) => {
                        countryValue.push(countryCodes?.find((country) => country?.code === JSON.parse(d)));
                    });

                    value.formValues.push({
                        ...item,
                        id: UUID(),
                        value: countryValue,
                    });
                } else if (item.rule_type === "card_type" && item?.condition === "==") {
                    value.formValues.push({
                        ...item,
                        id: UUID(),
                        value: rulesDetail?.card_type?.find((rule_type) => rule_type?.value == item?.value),
                    });
                } else if (item.rule_type === "card_type") {
                    const cardTypeValue = [];

                    item?.value?.map((d) => {
                        cardTypeValue.push(rulesDetail?.card_type?.find((rule_type) => rule_type?.value === JSON.parse(d)));
                    });

                    value.formValues.push({
                        ...item,
                        id: UUID(),
                        value: cardTypeValue,
                    });
                } else if (item.rule_type === "currency" && item?.condition === "==") {
                    value.formValues.push({
                        ...item,
                        id: UUID(),
                        value: Currency?.find((currency) => currency?.value == item?.value),
                    });
                } else if (item.rule_type === "currency") {
                    const currencyValue = [];

                    item?.value?.map((d) => {
                        currencyValue.push(Currency?.find((currency) => currency?.value === JSON.parse(d)));
                    });

                    value.formValues.push({
                        ...item,
                        id: UUID(),
                        value: currencyValue,
                    });
                } else {
                    value.formValues.push({ ...item, id: UUID() });
                }
            });

            setInitialValues(value);
        }
    };

    useEffect(onRulesDetailsChange, [rulesDetail]);

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
        setIsLoading(true);

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
            rules_id: rulesId,
            connector_type: types,
            enable_edit_on_active: rulesDetail?.enable_edit_on_active ? rulesDetail?.enable_edit_on_active : undefined,
        };
        dispatch({
            type: UPDATE_RULES_REQUEST,
            payload: payload,
            callBack,
            navigateState,
        });
    };
    const { mode } = useSelector((state) => state.persist);
    const colourStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
            borderColor: "#e2e8f0",
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
        value?.map((type) => {
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

    const OPTIONS = [
        { label: "Card", value: "1" },
        { label: "Wallet", value: "2" },
        { label: "UPI", value: "3" },
    ];

    const _renderHeading = () => {
        return <Heading title={"Edit Rules"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    return (
        <>
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="intro-y box mt-5">
                    {isLoadingPage ? (
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
                            {connectors && (
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={connectorRules}
                                    onSubmit={onSubmit}
                                    validateOnMount
                                    enableReinitialize>
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
                                                        <option value="">Select Connector</option>
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
                                            <div className="grid grid-cols-12 gap-2 gap-y-5 mt-10">
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="text-base float-left">{messages.formTitles.rules_details}</div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-6">
                                                    <button
                                                        className="btn btn-primary bg-primary btn-sm float-right mb-2"
                                                        type="button"
                                                        onClick={() =>
                                                            addFormFields((value) =>
                                                                setFieldValue("formValues", [...values?.formValues, value]),
                                                            )
                                                        }
                                                        style={{ backgroundColor: "rgb(30,58,138)" }}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-plus">
                                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <hr />
                                            {values.formValues.map((element, index) => (
                                                <div className="grid grid-cols-12 gap-2 gap-y-5 mt-5" key={element?.id}>
                                                    <div className="intro-y col-span-12 sm:col-span-3">
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
                                                            <p className="text-red-500 mt-2 ml-1">
                                                                {errors.formValues?.[index]?.rule_type}
                                                            </p>
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
                                                                                  selected={
                                                                                      currencyTypeCondition.value === element.condition
                                                                                  }
                                                                                  value={currencyTypeCondition.value}
                                                                                  disabled={filterValue?.includes(
                                                                                      currencyTypeCondition.value,
                                                                                  )}>
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
                                                                                selected={amountTypeCondition.value === element.condition}
                                                                                value={amountTypeCondition.value}
                                                                                disabled={filterValue?.includes(amountTypeCondition.value)}>
                                                                                {amountTypeCondition.label}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                            {errors.formValues?.[index]?.condition &&
                                                            touched.formValues?.[index]?.condition ? (
                                                                <p className="text-red-500 mt-2 ml-1">
                                                                    {errors.formValues?.[index]?.condition}
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                    ) : null}
                                                    {element.rule_type ? (
                                                        <div className="intro-y col-span-12 sm:col-span-3">
                                                            <label className="form-label">{messages.formTitles.value}</label>
                                                            {element.rule_type === "amount" ? (
                                                                <Input
                                                                    onChange={(e) =>
                                                                        handleChange(setFieldValue, index, e, values.formValues)
                                                                    }
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
                                                                    getOptionValue={(option) => option.name}
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
                                                                                    <span>{decode(e.symbol)}</span>({e?.value})
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                </>
                                                            )}
                                                            {errors.formValues?.[index]?.value && touched.formValues?.[index]?.value ? (
                                                                <p className="text-red-500 mt-2 ml-1">
                                                                    {errors.formValues?.[index]?.value}
                                                                </p>
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
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="feather feather-trash-2">
                                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ))}
                                            {/*<div style={{marginTop: 20}}>{JSON.stringify(initialValues)}</div>*/}
                                            {/*<div style={{marginTop: 20}}>{JSON.stringify(formValues)}</div>*/}
                                            {/*<ConnectorRulesForm/>*/}
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default EditRules;

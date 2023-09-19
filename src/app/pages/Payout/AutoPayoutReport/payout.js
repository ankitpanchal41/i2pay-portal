import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { ClipLoader } from "react-spinners";
import "react-datepicker/dist/react-datepicker.css";
import {
    generatePayout,
    getPayoutConnectorData,
    getPayoutDetailData,
    getPayoutModeData,
    getPayoutModeFieldData,
} from "../../../redux/services/AutoPayoutReports";
import { messages } from "../../../messages/merchantRegister";
import PhoneInput from "../../../components/common/forms/PhoneInput";
import { useNavigate, useParams } from "react-router";
import { payoutSchema } from "../../../utils/validationSchema";
import NormalSelect from "../../../components/common/forms/NormalSelect";
import NormalInput from "../../../components/common/forms/NormalInput";
import { showToastMessage } from "../../../utils/methods";
import MiniLoader from "../../../components/common/MiniLoader";
import { countryCodes } from "../../../utils/countryCode";

const Heading = React.lazy(() => import("../../../components/common/Heading"));
const Input = React.lazy(() => import("../../../components/common/forms/Input"));
const MultiSelect = React.lazy(() => import("react-select"));

const initialValuesObj = {
    name: "",
    email: "",
    phone: "",
    address: "",
    countryCode: {
        name: "India",
        value: "+91",
        code: "IN",
        flag: "🇮🇳",
    },
    connector_id: [],
};

const ReTryPayout = () => {
    const { payoutId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [connectorData, setConnectorData] = useState([]);
    const [connectorBalanceData, setConnectorBalanceData] = useState([]);
    const [activeMenu, setActiveMenu] = useState("");
    const [payoutModeDropdown, setPayoutModeDropdown] = useState([]);
    const [paymentModeValue, setPaymentModeValue] = useState([]);
    const [paymentModeValueError, setPaymentModeValueError] = useState([]);
    const [allConnectorValue, setAllConnectorValue] = useState([]);
    const [fieldByPayoutMode, setFieldByPayoutMode] = useState([]);
    const [paymentModeFields, setPaymentModeFields] = useState({});
    const [amount, setAmount] = useState(0);
    const [isLoadingConnector, setIsLoadingConnector] = useState(false);

    useEffect(() => {
        getPayoutConnectors();
        getModeField();
    }, []);

    const getPayoutConnectors = async () => {
        setIsLoadingConnector(true);
        const data = await getPayoutConnectorData();
        if (data?.responseCode === 200) {
            const connectors = [];
            const connectorsBalance = [];
            data?.data?.map((item) => {
                connectors.push({ label: item?.name, value: item?.id });
                connectorsBalance.push({
                    is_provide_balance_api: item?.is_provide_balance_api,
                    available_balance: item?.available_balance,
                });
            });

            setConnectorData(connectors);

            setConnectorBalanceData(connectorsBalance);
        }
        setIsLoadingConnector(false);
    };

    const getModeField = async () => {
        const payload = {
            payout_id: payoutId,
        };

        const data = await getPayoutModeFieldData(payload);

        console.log({ data });
        if (data?.responseCode === 200) {
            setPaymentModeFields(data?.data?.payment_mode_field);
            setAmount(data?.data?.amount);
        }
    };

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
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

    const onSubmitPayout = async (values) => {
        const customizePayoutModeValueError = [];
        let error = false;

        paymentModeValue?.map((item, index) => {
            const errorValue = {};
            Object.keys(item)?.map((key) => {
                if (item?.[key]) {
                    if (key === "account_no") {
                        if (/^[0-9]{9,18}$/?.test(item?.[key]) === false) {
                            error = true;
                            console.log("1", error);
                            errorValue[key] = `Please enter valid ${paymentModeFields?.[item?.mode_type]?.[key]}`;
                        }
                    } else if (key === "ifsc_code") {
                        if (/^[A-Za-z]{4}[0-9]{7}$/?.test(item?.[key]) === false) {
                            error = true;
                            console.log("2", error);
                            errorValue[key] = `Please enter valid${paymentModeFields?.[item?.mode_type]?.[key]}`;
                        }
                    } else if (
                        key === "amount" &&
                        connectorBalanceData?.[index]?.is_provide_balance_api === 1 &&
                        connectorBalanceData?.[index]?.available_balance < Number(item?.[key])
                    ) {
                        error = true;
                        console.log("3", error);
                        errorValue[
                            key
                        ] = `You have insufficient balance your total balance is ${connectorBalanceData?.[index]?.available_balance}`;
                    } else {
                        errorValue[key] = "";
                    }
                } else {
                    error = true;
                    console.log("4", error);
                    if (key === "mode_type") {
                        errorValue[key] = `Please enter Payout Mode`;
                    } else if (key === "amount") {
                        errorValue[key] = `Please enter Amount`;
                    } else {
                        errorValue[key] = `Please enter ${paymentModeFields?.[item?.mode_type]?.[key]}`;
                    }
                }
            });
            customizePayoutModeValueError.push(errorValue);
        });

        setPaymentModeValueError(customizePayoutModeValueError);

        if (error) {
            return false;
        }

        const paymentModeData = [];
        // const amount = 1000;
        let customAmount = 0;
        paymentModeValue?.map((item, index) => {
            customAmount += Number(item?.amount);
            paymentModeData.push({
                ...item,
                connector_id: allConnectorValue?.[index],
            });
        });

        if (Number(amount) !== Number(customAmount?.toFixed(2))) {
            showToastMessage(`Your entered amount should be match with payout amount (${amount})`, 500);
            return false;
        }

        // return false;

        const payload = {
            payout_id: payoutId,
            name: values?.name,
            email: values?.email,
            phone: values?.phone,
            address: values?.address,
            country_code: values?.countryCode?.value,
            payout_mode_data: JSON.stringify(paymentModeData),
        };

        setIsLoadingSubmit(true);
        const data = await generatePayout(payload);

        if (data?.responseCode === 200) {
            navigate("/auto-payout-report");
        }

        setIsLoadingSubmit(false);
    };

    const onChangePayoutMode = (value, index) => {
        const fieldValue = paymentModeFields?.[value];

        const customizeFieldByPayoutMode = [...fieldByPayoutMode];
        customizeFieldByPayoutMode[index] = fieldValue;

        setFieldByPayoutMode(customizeFieldByPayoutMode);

        const customizePayoutModeValue = [...paymentModeValue];
        const customizePayoutModeValueError = [...paymentModeValueError];

        const customizeObj = { mode_type: value, amount: "" };
        const customizeErrorObj = { mode_type: "", amount: "" };

        Object.keys(fieldValue)?.map((key) => {
            customizeObj[key] = "";
            customizeErrorObj[key] = "";
        });

        customizePayoutModeValue[index] = customizeObj;
        customizePayoutModeValueError[index] = customizeErrorObj;

        setPaymentModeValue(customizePayoutModeValue);
        setPaymentModeValueError(customizePayoutModeValueError);
    };

    const onChangeAmount = (value, index) => {
        const customizePayoutModeValue = [...paymentModeValue];
        customizePayoutModeValue[index]["amount"] = value;
        setPaymentModeValue(customizePayoutModeValue);

        if (!value) {
            const customizePayoutModeValueError = [...paymentModeValueError];
            customizePayoutModeValueError[index]["amount"] = "Please enter Amount";
            setPaymentModeValueError(customizePayoutModeValueError);
        } else {
            const customizePayoutModeValueError = [...paymentModeValueError];
            customizePayoutModeValueError[index]["amount"] = "";
            setPaymentModeValueError(customizePayoutModeValueError);
        }
    };

    const onChangeConnectors = async (setFieldValue, e) => {
        console.log({ e, allConnectorValue });
        const connectorValueCustomizeData = [];
        const allConnectorValueData = [];

        e?.map((item) => {
            allConnectorValueData.push(item?.value);
        });

        let dropdownData = [];

        if (allConnectorValue?.length >= e?.length) {
            // Remove Function

            allConnectorValue?.map((item) => {
                connectorValueCustomizeData.push(item);
            });

            e?.map((item) => {
                const index = connectorValueCustomizeData.indexOf(item?.value);
                if (index > -1) {
                    connectorValueCustomizeData.splice(index, 1);
                }
            });

            if (activeMenu === connectorValueCustomizeData?.[0]) {
                if (allConnectorValueData?.[0]) {
                    setActiveMenu(allConnectorValueData?.[0]);
                } else {
                    setActiveMenu("");
                }
            }

            const removeIndex = allConnectorValue?.indexOf(connectorValueCustomizeData?.[0]);

            const customizePayoutModeValue = [...paymentModeValue];
            const customizePayoutModeValueError = [...paymentModeValueError];
            const customizeFieldByPayoutMode = [...fieldByPayoutMode];

            if (removeIndex > -1) {
                customizePayoutModeValue.splice(removeIndex, 1);
                customizePayoutModeValueError.splice(removeIndex, 1);
                customizeFieldByPayoutMode.splice(removeIndex, 1);
            }
            console.log({ customizePayoutModeValue });

            setPaymentModeValue(customizePayoutModeValue);
            setPaymentModeValueError(customizePayoutModeValueError);
            setFieldByPayoutMode(customizeFieldByPayoutMode);
        } else {
            // Add Function

            e?.map((item) => {
                connectorValueCustomizeData.push(item?.value);
            });

            allConnectorValue?.map((item) => {
                const index = connectorValueCustomizeData.indexOf(item);
                if (index > -1) {
                    connectorValueCustomizeData.splice(index, 1);
                }
            });

            const customizePayoutModeValue = [...paymentModeValue];
            customizePayoutModeValue.push({ mode_type: "", amount: "" });
            console.log({ customizePayoutModeValue });
            setPaymentModeValue(customizePayoutModeValue);

            const payload = {
                connector_id: connectorValueCustomizeData?.[0],
            };

            setIsLoadingConnector(true);
            const dropdownData = await getPayoutModeData(payload);
            setIsLoadingConnector(false);

            const data = dropdownData?.data;

            const customizeDropdownData = [...payoutModeDropdown];

            const dropDown = [];
            Object.keys(data)?.map((key) => {
                dropDown.push({ label: data?.[key], value: key });
            });

            customizeDropdownData.push({ connector_id: connectorValueCustomizeData?.toString(), dropDown });

            setPayoutModeDropdown(customizeDropdownData);
        }

        setAllConnectorValue(allConnectorValueData);
        if (!activeMenu) {
            setActiveMenu(allConnectorValueData[0]);
        }

        setFieldValue("connector_id", e);
    };

    const onChangeDynamicValue = (index, name, value, label) => {
        const customizePayoutModeValue = [...paymentModeValue];
        customizePayoutModeValue[index][name] = value;
        setPaymentModeValue(customizePayoutModeValue);

        if (!value) {
            const customizePayoutModeValueError = [...paymentModeValueError];
            customizePayoutModeValueError[index][name] = `Please enter ${label}`;
            setPaymentModeValueError(customizePayoutModeValueError);
        } else {
            const customizePayoutModeValueError = [...paymentModeValueError];
            customizePayoutModeValueError[index][name] = "";
            setPaymentModeValueError(customizePayoutModeValueError);
        }
    };

    const _renderHeading = () => {
        return (
            <Heading
                onClickBack={() => {
                    navigate(`/auto-payout-report`);
                }}
                title={"Auto Payout"}
                // onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton
            />
        );
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
                            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
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
                                        <div className="intro-y">
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={payoutSchema}
                                                onSubmit={onSubmitPayout}
                                                enableReinitialize>
                                                {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                                    <Form className="">
                                                        <div className="grid grid-cols-12 gap-4 gap-y-5 box-without-margin p-5">
                                                            <div className="intro-y col-span-12 sm:col-span-6 relative">
                                                                {isLoadingConnector ? (
                                                                    <div className="absolute bg-[#00000020] bottom-0 z-[50] w-full h-[38px] flex justify-center items-center">
                                                                        <MiniLoader size={20} color="#1d3a8a" css="border-width: 2px;" />
                                                                    </div>
                                                                ) : null}
                                                                <label htmlFor="connectors_id" className="form-label">
                                                                    Connectors <span className="text-danger">*</span>
                                                                </label>
                                                                <MultiSelect
                                                                    isMulti
                                                                    // value={connectorData?.find(
                                                                    //     (item) => item?.value === values.connector_id,
                                                                    // )}
                                                                    isClearable={false}
                                                                    value={values.connector_id}
                                                                    styles={colourStyles}
                                                                    style={{ boxShadow: "none" }}
                                                                    options={connectorData}
                                                                    onChange={(e) => {
                                                                        onChangeConnectors(setFieldValue, e);
                                                                    }}
                                                                    className="intro-x login__input form-control block shadow-none"
                                                                />
                                                                {errors.connector_id && touched.connector_id ? (
                                                                    <p className="text-red-500 mt-2 ml-1 text-[12px]">
                                                                        {errors.connector_id}
                                                                    </p>
                                                                ) : null}
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <Input
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.payout.name}
                                                                    name="name"
                                                                    label={messages.payout.name}
                                                                    isRequiredField
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <Input
                                                                    containerClassName="mt-2"
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.payout.email}
                                                                    name="email"
                                                                    label={messages.payout.email}
                                                                    isRequiredField
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <div className="mb-[-12px]">
                                                                    {messages.payout.phone} <span className="text-danger">*</span>
                                                                </div>
                                                                <PhoneInput
                                                                    countryCodeValue={values.countryCode}
                                                                    setFieldValue={setFieldValue}
                                                                    error={errors.phone}
                                                                    touched={touched.phone}
                                                                    name="phone"
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12">
                                                                <Input
                                                                    rows="4"
                                                                    containerClassName="mt-2"
                                                                    textarea="true"
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.payout.address}
                                                                    name="address"
                                                                    label={messages.payout.address}
                                                                    isRequiredField
                                                                />
                                                            </div>

                                                            <div className="intro-y col-span-12">
                                                                <ul
                                                                    className="nav nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center"
                                                                    role="tablist">
                                                                    {values?.connector_id?.length > 0 &&
                                                                        values?.connector_id?.map((item, index) => {
                                                                            const currentErrorObj = paymentModeValueError?.[index];

                                                                            let error = false;
                                                                            if (currentErrorObj) {
                                                                                Object.keys(currentErrorObj)?.map((key) => {
                                                                                    if (currentErrorObj?.[key]) {
                                                                                        error = true;
                                                                                    }
                                                                                });
                                                                            }

                                                                            return (
                                                                                <li className="nav-item cursor-pointer relative">
                                                                                    {error && (
                                                                                        <div className="absolute bg-[red] h-[5px] w-[5px] top-4 right-2 rounded-full"></div>
                                                                                    )}
                                                                                    <a
                                                                                        onClick={() => {
                                                                                            setActiveMenu(item?.value);
                                                                                        }}
                                                                                        className={
                                                                                            activeMenu === item?.value
                                                                                                ? "nav-link py-4 active text-[#1E3A8A] text-[14px] font-medium"
                                                                                                : "nav-link py-4 text-[#B4BDCE] text-[14px] font-medium"
                                                                                        }>
                                                                                        {item?.label}
                                                                                    </a>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                </ul>
                                                            </div>

                                                            {values?.connector_id?.length > 0 &&
                                                                values?.connector_id?.map((item, index) => {
                                                                    if (item?.value === activeMenu) {
                                                                        return (
                                                                            <>
                                                                                <div className="intro-y col-span-12 sm:col-span-6">
                                                                                    <NormalSelect
                                                                                        containerClassName="mt-2"
                                                                                        isRequiredField
                                                                                        className="intro-x login__input form-control py-2 px-3 block"
                                                                                        firstDisableLabel={messages.payout.payout_mode}
                                                                                        label={messages.payout.payout_mode}
                                                                                        data={
                                                                                            payoutModeDropdown?.find(
                                                                                                (pm) =>
                                                                                                    pm?.connector_id ===
                                                                                                    item?.value?.toString(),
                                                                                            )?.dropDown || []
                                                                                        }
                                                                                        value={paymentModeValue?.[index]?.mode_type || ""}
                                                                                        error={
                                                                                            paymentModeValueError?.[index]?.mode_type || ""
                                                                                        }
                                                                                        onChange={(e) => {
                                                                                            onChangePayoutMode(e.target.value, index);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                {fieldByPayoutMode?.[index] && (
                                                                                    <div className="intro-y col-span-12 sm:col-span-6">
                                                                                        <NormalInput
                                                                                            isRequiredField
                                                                                            containerClassName="mt-2"
                                                                                            className="intro-x login__input form-control py-2 px-3 block border"
                                                                                            label={messages.payout.amount}
                                                                                            placeholder={messages.payout.amount}
                                                                                            value={paymentModeValue?.[index]?.amount || ""}
                                                                                            onChange={(e) => {
                                                                                                onChangeAmount(e.target.value, index);
                                                                                            }}
                                                                                        />
                                                                                        {paymentModeValueError?.[index]?.amount && (
                                                                                            <p className="text-red-500 text-[12px] mt-2">
                                                                                                {paymentModeValueError?.[index]?.amount}
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                )}

                                                                                {fieldByPayoutMode?.[index] &&
                                                                                    Object.keys(fieldByPayoutMode?.[index])?.map((key) => {
                                                                                        return (
                                                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                                                <NormalInput
                                                                                                    isRequiredField
                                                                                                    label={
                                                                                                        fieldByPayoutMode?.[index]?.[key]
                                                                                                    }
                                                                                                    containerClassName="mt-2"
                                                                                                    className="intro-x login__input form-control py-2 px-3 block border"
                                                                                                    placeholder={
                                                                                                        fieldByPayoutMode?.[index]?.[key]
                                                                                                    }
                                                                                                    value={
                                                                                                        paymentModeValue?.[index]?.[key] ||
                                                                                                        ""
                                                                                                    }
                                                                                                    name={key}
                                                                                                    onChange={(e) => {
                                                                                                        onChangeDynamicValue(
                                                                                                            index,
                                                                                                            key,
                                                                                                            e?.target?.value,
                                                                                                            fieldByPayoutMode?.[index]?.[
                                                                                                                key
                                                                                                            ],
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                                {paymentModeValueError?.[index] && (
                                                                                                    <p className="text-red-500 text-[12px] mt-2">
                                                                                                        {
                                                                                                            paymentModeValueError?.[
                                                                                                                index
                                                                                                            ]?.[key]
                                                                                                        }
                                                                                                    </p>
                                                                                                )}
                                                                                            </div>
                                                                                        );
                                                                                    })}
                                                                            </>
                                                                        );
                                                                    }
                                                                })}
                                                        </div>

                                                        {/* {Object.keys(DORP_DATA?.payment_mode_field?.[values?.payout_mode] || {})?.map(
                                                            (key, index) => {
                                                                return <div key={index}>{key}</div>;
                                                            },
                                                        )} */}
                                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                            <button
                                                                type="buttons"
                                                                className="btn btn-primary w-24 ml-2"
                                                                onClick={handleSubmit}
                                                                disabled={isLoadingSubmit}>
                                                                Save <MiniLoader isLoading={isLoadingSubmit} />
                                                            </button>
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
            {/* </MainMenu> */}
            {/* END: Menu */}
        </>
    );
};

export default ReTryPayout;

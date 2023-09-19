import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { getDefaultConnectorData, setDefaultConnector } from "../../redux/services/Connector";
import NormalInput from "../../components/common/forms/NormalInput";
import MiniLoader from "../../components/common/MiniLoader";

const Heading = React.lazy(() => import("../../components/common/Heading"));
const Select = React.lazy(() => import("react-select"));

const DefaultConnector = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [connectorType, setConnectorType] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [defaultConnectorValue, setDefaultConnectorValue] = useState([]);
    const [percentageValue, setPercentageValue] = useState([]);
    const [percentageSwitchConnectorValue, setPercentageSwitchConnectorValue] = useState([]);
    const [percentageDurationValue, setPercentageDurationValue] = useState([]);

    const [amountValue, setAmountValue] = useState([]);
    const [amountSwitchConnectorValue, setAmountSwitchConnectorValue] = useState([]);
    const [amountDurationValue, setAmountDurationValue] = useState([]);

    const state = useSelector((state) => state);
    const [listingType, setListingType] = useState("");
    const [percentageErrorMessage, setPercentageErrorMessage] = useState([]);
    const [amountErrorMessage, setAmountErrorMessage] = useState([]);

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
            borderColor: state?.selectProps?.isError ? "rgb(var(--color-danger)/var(--tw-border-opacity)) !important" : "",
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

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        getDefaultConnector();
    }, []);

    const getDefaultConnector = async () => {
        setIsLoading(true);
        const data = await getDefaultConnectorData();
        setIsLoading(false);
        if (data?.responseCode === 200) {
            const defaultConnectorValueCustomize = [...defaultConnectorValue];

            const percentageValueCustomize = [...percentageValue];
            const percentageSwitchConnectorValueCustomize = [...percentageSwitchConnectorValue];
            const percentageDurationValueCustomize = [...percentageDurationValue];

            const amountValueCustomize = [...amountValue];
            const amountSwitchConnectorValueCustomize = [...amountSwitchConnectorValue];
            const amountDurationValueCustomize = [...amountDurationValue];
            data?.data?.data?.map((item, index) => {
                defaultConnectorValueCustomize[index] = item?.selected_connector;

                percentageValueCustomize[index] = item?.selected_decline_percent;
                percentageSwitchConnectorValueCustomize[index] = item?.selected_switching_connectors;
                percentageDurationValueCustomize[index] = item?.selected_duration;

                amountValueCustomize[index] = item?.selected_decline_amount;
                amountSwitchConnectorValueCustomize[index] = item?.selected_amount_switching_connectors;
                amountDurationValueCustomize[index] = item?.selected_amount_duration;
            });

            setDefaultConnectorValue(defaultConnectorValueCustomize);

            setPercentageValue(percentageValueCustomize);
            setPercentageSwitchConnectorValue(percentageSwitchConnectorValueCustomize);
            setPercentageDurationValue(percentageDurationValueCustomize);

            setAmountValue(amountValueCustomize);
            setAmountSwitchConnectorValue(amountSwitchConnectorValueCustomize);
            setAmountDurationValue(amountDurationValueCustomize);

            setConnectorType(data?.data || []);
        }
    };

    const onSetDefaultConnector = async (value, index) => {
        const defaultConnectorValueCustomize = [...defaultConnectorValue];
        defaultConnectorValueCustomize[index] = value;
        setDefaultConnectorValue(defaultConnectorValueCustomize);

        const percentageSwitchConnectorValueCustomize = [...percentageSwitchConnectorValue];
        percentageSwitchConnectorValueCustomize[index] = [];
        setPercentageSwitchConnectorValue(percentageSwitchConnectorValueCustomize);

        const percentageValueCustomize = [...percentageValue];
        percentageValueCustomize[index] = "";
        setPercentageValue(percentageValueCustomize);

        const percentageDurationValueCustomize = [...percentageDurationValue];
        percentageDurationValueCustomize[index] = "";
        setPercentageDurationValue(percentageDurationValueCustomize);

        const amountSwitchConnectorValueCustomize = [...amountSwitchConnectorValue];
        amountSwitchConnectorValueCustomize[index] = [];
        setAmountSwitchConnectorValue(amountSwitchConnectorValueCustomize);

        const amountValueCustomize = [...amountValue];
        amountValueCustomize[index] = "";
        setAmountValue(amountValueCustomize);

        const amountDurationValueCustomize = [...amountDurationValue];
        amountDurationValueCustomize[index] = "";
        setAmountDurationValue(amountDurationValueCustomize);

        setPercentageErrorMessage([]);
        setAmountErrorMessage([]);
    };

    const onSetPercentageDuration = (value, index) => {
        const errorMessageCustomize = [...percentageErrorMessage];
        if (errorMessageCustomize?.[index]?.duration) {
            errorMessageCustomize[index].duration = false;
            setPercentageErrorMessage(errorMessageCustomize);
        }

        const percentageDurationValueCustomize = [...percentageDurationValue];
        percentageDurationValueCustomize[index] = value;
        setPercentageDurationValue(percentageDurationValueCustomize);
    };

    const onSetPercentageSwitchConnector = (value, index) => {
        const errorMessageCustomize = [...percentageErrorMessage];
        if (errorMessageCustomize?.[index]?.switchConnector) {
            errorMessageCustomize[index].switchConnector = false;
            setPercentageErrorMessage(errorMessageCustomize);
        }

        const percentageSwitchConnectorValueCustomize = [...percentageSwitchConnectorValue];
        percentageSwitchConnectorValueCustomize[index] = value;
        setPercentageSwitchConnectorValue(percentageSwitchConnectorValueCustomize);
    };

    const onChangePercentage = (e, index) => {
        if ((Number(e.target.value) || e.target.value === "") && Number(e.target.value) <= 100) {
            const errorMessageCustomize = [...percentageErrorMessage];
            if (errorMessageCustomize?.[index]?.percentage) {
                errorMessageCustomize[index].percentage = false;
            }
            setPercentageErrorMessage(errorMessageCustomize);

            const percentageValueCustomize = [...percentageValue];
            percentageValueCustomize[index] = e.target.value;
            setPercentageValue(percentageValueCustomize);
        }
    };

    const onSetAmountDuration = (value, index) => {
        const errorMessageCustomize = [...amountErrorMessage];
        if (errorMessageCustomize?.[index]?.duration) {
            errorMessageCustomize[index].duration = false;
            setAmountErrorMessage(errorMessageCustomize);
        }

        const amountDurationValueCustomize = [...amountDurationValue];
        amountDurationValueCustomize[index] = value;
        setAmountDurationValue(amountDurationValueCustomize);
    };

    const onSetAmountSwitchConnector = (value, index) => {
        const errorMessageCustomize = [...amountErrorMessage];
        if (errorMessageCustomize?.[index]?.switchConnector) {
            errorMessageCustomize[index].switchConnector = false;
            setAmountErrorMessage(errorMessageCustomize);
        }

        const amountSwitchConnectorValueCustomize = [...amountSwitchConnectorValue];
        amountSwitchConnectorValueCustomize[index] = value;
        setAmountSwitchConnectorValue(amountSwitchConnectorValueCustomize);
    };

    const onChangeAmount = (e, index) => {
        const errorMessageCustomize = [...amountErrorMessage];
        if (errorMessageCustomize?.[index]?.amount) {
            errorMessageCustomize[index].amount = false;
        }

        setAmountErrorMessage(errorMessageCustomize);

        const amountValueCustomize = [...amountValue];
        amountValueCustomize[index] = e.target.value;
        setAmountValue(amountValueCustomize);
    };

    const onSubmit = async () => {
        let isError = false;

        const percentageErrorMessageCustomize = [...percentageErrorMessage];
        const errorAmountErrorMessage = [...amountErrorMessage];
        connectorType?.data?.map((item, index) => {
            const percentageError = {};
            const amountError = {};

            if (percentageValue[index] || percentageSwitchConnectorValue[index]?.length > 0 || percentageDurationValue[index]) {
                if (!percentageValue[index]) {
                    percentageError["percentage"] = true;
                    isError = true;
                }

                if (!percentageSwitchConnectorValue[index]?.length > 0) {
                    percentageError["switchConnector"] = true;
                    isError = true;
                }

                if (!percentageDurationValue[index]) {
                    percentageError["duration"] = true;
                    isError = true;
                }
            } else {
                percentageError["percentage"] = false;
                percentageError["switchConnector"] = false;
                percentageError["duration"] = false;
            }

            if (amountValue[index] || amountSwitchConnectorValue[index]?.length > 0 || amountDurationValue[index]) {
                if (!amountValue[index]) {
                    amountError["amount"] = true;
                    isError = true;
                }

                if (amountValue[index] <= 0) {
                    amountError["amount"] = true;
                    isError = true;
                }

                if (!amountSwitchConnectorValue[index]?.length > 0) {
                    amountError["switchConnector"] = true;
                    isError = true;
                }

                if (!amountDurationValue[index]) {
                    amountError["duration"] = true;
                    isError = true;
                }
            } else {
                amountError["amount"] = false;
                amountError["switchConnector"] = false;
                amountError["duration"] = false;
            }

            percentageErrorMessageCustomize[index] = percentageError;
            errorAmountErrorMessage[index] = amountError;
        });

        setPercentageErrorMessage(percentageErrorMessageCustomize);
        setAmountErrorMessage(errorAmountErrorMessage);

        if (isError) {
            return false;
        }

        const payload = [];
        connectorType?.data?.map((item, index) => {
            const amountSwitchConnector = [];
            amountSwitchConnectorValue?.[index]?.map((type) => {
                amountSwitchConnector.push(type?.value);
            });

            const percentageSwitchConnector = [];
            percentageSwitchConnectorValue?.[index]?.map((type) => {
                percentageSwitchConnector.push(type?.value);
            });

            payload.push({
                type_id: item?.type_id,
                connector_id: defaultConnectorValue?.[index],

                selected_decline_percent: percentageValue?.[index],
                selected_switching_connectors: percentageSwitchConnector?.length > 0 ? JSON.stringify(percentageSwitchConnector) : "",
                selected_decline_duration: percentageDurationValue?.[index],

                selected_decline_amount: amountValue?.[index],
                selected_amount_switching_connectors: amountSwitchConnector?.length > 0 ? JSON.stringify(amountSwitchConnector) : "",
                selected_amount_decline_duration: amountDurationValue?.[index],
            });
        });

        // const payload = {
        //     type_id: item?.type_id,
        //     connector_id: defaultConnectorValue?.[index],
        //     selected_decline_percent: percentageValue?.[index],
        //     selected_switching_connectors: switchConnector?.length > 0 ? JSON.stringify(switchConnector) : "",
        //     selected_decline_duration: percentageDurationValue?.[index],
        // };

        // const data = await setDefaultConnector(payload);
        // if (data?.responseCode === 200) {
        //     getDefaultConnector();
        // }

        // const error = {};

        // let isError = false;
        // if (percentageValue[index] || percentageSwitchConnectorValue[index]?.length > 0 || percentageDurationValue[index]) {
        //     if (!percentageValue[index]) {
        //         error["percentage"] = true;
        //         isError = true;
        //     }

        //     if (!percentageSwitchConnectorValue[index]?.length > 0) {
        //         error["switchConnector"] = true;
        //         isError = true;
        //     }

        //     if (!percentageDurationValue[index]) {
        //         error["duration"] = true;
        //         isError = true;
        //     }
        // } else {
        //     error["percentage"] = false;
        //     error["switchConnector"] = false;
        //     error["duration"] = false;
        // }

        // const errorMessageCustomize = [...errorMessage];

        // errorMessageCustomize[index] = error;

        // setErrorMessage(errorMessageCustomize);

        // if (isError) {
        //     return false;
        // }

        // const switchConnector = [];
        // percentageSwitchConnectorValue?.[index]?.map((type) => {
        //     switchConnector.push(type?.value);
        // });

        // const payload = {
        //     type_id: item?.type_id,
        //     connector_id: defaultConnectorValue?.[index],
        //     selected_decline_percent: percentageValue?.[index],
        //     selected_switching_connectors: switchConnector?.length > 0 ? JSON.stringify(switchConnector) : "",
        //     selected_decline_duration: percentageDurationValue?.[index],
        // };
        setIsLoadingSubmit(true);

        const data = await setDefaultConnector(payload);
        if (data?.responseCode === 200) {
            // getDefaultConnector();
        }
        setIsLoadingSubmit(false);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Default Connector"}
                note={connectorType?.message}
                // onChangeSearchQuery={onChangeSearchQuery}
                // onClickExport={onClickExport}
                // isLoadingExport={isLoadingExport}
                displayBackButton={false}
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* BEGIN: Connector Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Connector Type</th>
                            <th className="whitespace-nowrap">Default Connector</th>
                            <th className="whitespace-nowrap">Criteria</th>
                            <th className="whitespace-nowrap">Transaction Timeline</th>
                            <th className="whitespace-nowrap">Switch Connector</th>
                            {/* <th className="whitespace-nowrap">Action</th> */}
                            {/* <th className="text-center whitespace-nowrap">Remove Connector</th> */}
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={7}>
                                    <div className="flex justify-center h-48 items-center">
                                        <ClipLoader
                                            loading={true}
                                            color="#1e3a8a"
                                            size={55}
                                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="font-normal">
                            {connectorType?.data?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-40">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-white">{item?.type_name}</p>
                                        </td>
                                        <td>
                                            <select
                                                onChange={(e) => {
                                                    onSetDefaultConnector(e.target.value, index);
                                                }}
                                                value={defaultConnectorValue[index]}
                                                name="connector_id"
                                                className="form-select intro-x login__input form-control py-2 px-3 block">
                                                <option value="" disabled>
                                                    Select Connector
                                                </option>

                                                {item?.available_connectors &&
                                                    item?.available_connectors.map((connector, index) => (
                                                        <option
                                                            key={index}
                                                            value={connector?.value}
                                                            selected={item?.selected_connector === connector?.value}>
                                                            {connector?.label}
                                                        </option>
                                                    ))}
                                            </select>
                                        </td>
                                        <td>
                                            <div class={`input-group ${percentageErrorMessage?.[index]?.percentage ? "has-error" : ""}`}>
                                                <input
                                                    value={percentageValue[index]}
                                                    onChange={(e) => {
                                                        onChangePercentage(e, index);
                                                    }}
                                                    type="text"
                                                    class="form-control w-20 border-red-950"
                                                    placeholder="Percentage"
                                                />
                                                <div class="input-group-text">%</div>
                                            </div>
                                            <div class={`input-group mt-3 ${amountErrorMessage?.[index]?.amount ? "has-error" : ""}`}>
                                                <NormalInput
                                                    value={amountValue[index]}
                                                    onChange={(e) => {
                                                        onChangeAmount(e, index);
                                                    }}
                                                    type="number"
                                                    class="form-control w-20 border-red-950"
                                                    placeholder="Amount"
                                                />
                                                <div class="input-group-text">₹</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class={`input-group ${percentageErrorMessage?.[index]?.duration ? "has-error" : ""}`}>
                                                <select
                                                    onChange={(e) => {
                                                        onSetPercentageDuration(e.target.value, index);
                                                    }}
                                                    value={percentageDurationValue[index]}
                                                    name="connector_id"
                                                    className={`form-select intro-x login__input form-control py-2 px-3 block`}>
                                                    <option value="">Select Timeline</option>
                                                    {item?.available_duration_option &&
                                                        item?.available_duration_option.map((connector, index) => (
                                                            <option
                                                                key={index}
                                                                value={connector?.value}
                                                                selected={item?.selected_duration === connector?.value}>
                                                                {connector?.label}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div class={`input-group mt-3 ${amountErrorMessage?.[index]?.duration ? "has-error" : ""}`}>
                                                <select
                                                    onChange={(e) => {
                                                        onSetAmountDuration(e.target.value, index);
                                                    }}
                                                    value={amountDurationValue[index]}
                                                    name="connector_id"
                                                    className={`form-select intro-x login__input form-control py-2 px-3 block`}>
                                                    <option value="">Select Timeline</option>
                                                    {item?.available_duration_option &&
                                                        item?.available_duration_option.map((connector, index) => (
                                                            <option
                                                                key={index}
                                                                value={connector?.value}
                                                                selected={item?.selected_duration === connector?.value}>
                                                                {connector?.label}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </td>
                                        <td className={`w-[300px]`}>
                                            <Select
                                                // menuPortalTarget={document.body}
                                                styles={colourStyles}
                                                isError={percentageErrorMessage?.[index]?.switchConnector}
                                                isOptionDisabled={(option) => option?.value == defaultConnectorValue[index]}
                                                // defaultValue={element.value}
                                                // value={values.connector_type}
                                                // onBlur={() => setFieldTouched(`formValues[${index}].value`)}
                                                isMulti
                                                style={{ boxShadow: "none" }}
                                                options={item?.available_connectors}
                                                name="value"
                                                onChange={(e) => {
                                                    onSetPercentageSwitchConnector(e, index);
                                                }}
                                                value={percentageSwitchConnectorValue[index]}
                                                // onChange={(e) => handleTypeChange(setFieldValue, e)}
                                                className="intro-x login__input form-control block shadow-none"
                                            />
                                            <Select
                                                // menuPortalTarget={document.body}
                                                styles={colourStyles}
                                                isError={amountErrorMessage?.[index]?.switchConnector}
                                                isOptionDisabled={(option) => option?.value == defaultConnectorValue[index]}
                                                // defaultValue={element.value}
                                                // value={values.connector_type}
                                                // onBlur={() => setFieldTouched(`formValues[${index}].value`)}
                                                isMulti
                                                style={{ boxShadow: "none" }}
                                                options={item?.available_connectors}
                                                name="value"
                                                onChange={(e) => {
                                                    onSetAmountSwitchConnector(e, index);
                                                }}
                                                value={amountSwitchConnectorValue[index]}
                                                // onChange={(e) => handleTypeChange(setFieldValue, e)}
                                                className="intro-x login__input form-control block shadow-none mt-3"
                                            />
                                        </td>
                                        {/* <td>
                                            <button
                                                type="buttons"
                                                onClick={() => {
                                                    onSubmit(index, item);
                                                }}
                                                className={`py-2 px-4 text-sm font-medium text-white bg-primary rounded max-h-[38px] ml-2`}>
                                                <Icon.Save size="16" className="block md:hidden lg:hidden" />
                                                <span className="hidden md:block lg:block">Save</span>
                                            </button>
                                        </td> */}
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Connector Table */}

                {/* START: Table Not Found */}
                {connectorType?.length === 0 && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
            </>
        );
    };

    const _renderBoxTable = () => {
        return (
            <>
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
                    <div className="grid grid-cols-12 gap-6 mt-5"></div>
                )}
                {!connectorType?.length && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    // MAIN CONTENT
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
                            <div className="intro-y col-span-12">{listingType === "box" ? _renderBoxTable() : _renderTable()}</div>

                            <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end my-5">
                                <button
                                    disabled={isLoadingSubmit}
                                    type="buttons"
                                    onClick={() => {
                                        onSubmit();
                                    }}
                                    className={`py-2 px-4 text-sm font-medium text-white bg-primary rounded ml-2 w-[100px]`}>
                                    Save <MiniLoader isLoading={isLoadingSubmit} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    // MAIN CONTENT
};

export default DefaultConnector;

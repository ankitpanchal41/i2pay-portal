import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { downloadConnectorExcel } from "../../redux/services/DownloadExcel";
import { adminConnectorStatusLabels } from "../../utils/helper";
import { UPDATE_CONNECTOR_REQUEST, UPDATE_CONNECTOR_MODE_REQUEST, getConnectorsRequest } from "../../redux/actions/Connector";
import { changeConnectorMode, enableDisableMultipleConnector, getEnabledConnectorData } from "../../redux/services/Connector";
import ReactTooltip from "react-tooltip";
import { detailStart } from "../../redux/actions/PersistActions";

const Modal = React.lazy(() => import("../../components/common/Modal"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Select = React.lazy(() => import("react-select"));

const Connector = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleContact, setModalVisibleContact] = useState(false);
    const [loadingId, setLoadingId] = useState(false);
    const [loadingModeId, setLoadingModeId] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [connectorTypes, setConnectorTypes] = useState([]);
    const [validationState, setValidationState] = useState({});
    const [signupURI, setSignupURI] = useState("");
    const [, setModalTitle] = useState("");
    const [modalId, setModalId] = useState("");
    const [isActive, setIsActive] = useState(0);
    const [initialValues, setInitialValues] = useState({});
    const [listingType, setListingType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    const state = useSelector((state) => state);
    const { connector, totalPage } = useSelector((state) => state.connector);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [useI2payConnector, setUseI2payConnector] = useState(false);
    const [editConnectorName, setEditConnectorName] = useState("");
    const [modalItem, setModalItem] = useState({});
    const [typeModal, setTypeModal] = useState(false);
    const [typeMessage, setTypeMessage] = useState("");
    const [modalVisibleMultipleConnector, setModalVisibleMultipleConnector] = useState(false);
    const [isLoadingMultipleConnector, setIsLoadingMultipleConnector] = useState(false);
    const [activeConnectorList, setActiveConnectorList] = useState([]);
    const [disableMultipleConnectorValue, setDisableMultipleConnectorValue] = useState(false);
    const [isPayoutProvider, setIsPayoutProvider] = useState(false);
    const [modeType, setModeType] = useState();
    const { connector: connectors } = useSelector((state) => state.connector);

    useEffect(() => {
        setIsLoading(true);
        getEnableConnectors();
        dispatch(
            getConnectorsRequest(searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    const { mode } = useSelector((state) => state.persist);
    const { userData } = useSelector((state) => state.persist);

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
        menu: (styles, { data }) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            zIndex: 999,
            position: "absolute",
        }),
    };

    const onSubmit = async (value) => {
        let liveValue = {};
        let testValue = {};
        let is_filled_live_credentials = 0;
        let is_filled_test_credentials = 0;

        modalData.map((item) => {
            if (value[item?.name]) {
                is_filled_live_credentials = 1;
                liveValue[item?.name] = value[item?.name];
            } else {
                liveValue[item?.name] = "";
            }

            if (value[`${item?.name}_sandbox`]) {
                is_filled_test_credentials = 1;
                testValue[`${item?.name}`] = value[`${item?.name}_sandbox`];
            } else {
                testValue[`${item?.name}`] = "";
            }
        });

        const types = [];
        value?.connector_type?.map((type) => {
            types.push(type?.value);
        });

        // return false;

        // let customizeValue = {};
        // if (Object.keys(liveValue)?.length === modalData?.length && Object.keys(testValue)?.length === modalData?.length) {
        //     customizeValue = { ...liveValue, ...testValue };
        // } else if (Object.keys(liveValue)?.length === modalData?.length) {
        //     customizeValue = { ...liveValue };
        // } else if (Object.keys(testValue)?.length === modalData?.length) {
        //     customizeValue = { ...testValue };
        // } else {
        // }

        // return false;
        // const is_filled_live_credentials = Object.keys(liveValue)?.length === modalData?.length ? 1 : 0;
        // const is_filled_test_credentials = Object.keys(testValue)?.length === modalData?.length ? 1 : 0;

        const payload = {
            id: modalId,
            is_active: isActive === 0 ? 1 : 0,
            is_filled_live_credentials,
            is_filled_test_credentials,
            is_payout_provider: isPayoutProvider,
            mode:
                is_filled_live_credentials === 1 && is_filled_test_credentials === 1
                    ? modeType
                        ? modeType
                        : 0
                    : is_filled_live_credentials === 1
                    ? 1
                    : is_filled_test_credentials === 1
                    ? 0
                    : 0,
            credentials: liveValue,
            test_credentials: testValue,
            connector_type: types,
        };
        // for (const property in customizeValue) {
        //     if (customizeValue[property]?.includes("sandbox")) {
        //         payload.test_credentials[property] = customizeValue[property];
        //     } else {
        //         payload.credentials[property] = customizeValue[property];
        //     }
        // }

        // return false;

        setLoadingId(true);
        const callBack = () => {
            setLoadingId(false);
            setModalVisible(!modalVisible);
            setIsLoading(true);
            getEnableConnectors();
            dispatch(getConnectorsRequest(searchQuery, () => setIsLoading(false)));
            getEnableConnectors();
        };

        const response = (data) => {
            if (data?.data?.is_show_popup) {
                setTypeModal(data?.data?.is_show_popup);
                setTypeMessage(data?.data?.popup_message);
            }
        };

        dispatch({ type: UPDATE_CONNECTOR_REQUEST, payload, callBack, response });
    };

    const onChangeSwitch = (item, isEdit = false) => {
        console.log("item?.is_payout_provider", item?.is_payout_provider);
        setIsPayoutProvider(item?.is_payout_provider);
        setModeType(item?.mode);
        if (item?.is_active === 1 && !isEdit) {
            setLoadingId(item?.id);

            let payload = { id: item?.id, is_active: 0, is_payout_provider: item?.is_payout_provider };
            console.log({ payload });

            const callBack = () => {
                setLoadingId(false);
                setIsLoading(true);
                getEnableConnectors();
                dispatch(getConnectorsRequest(searchQuery, () => setIsLoading(false)));
            };

            const response = (data) => {
                if (data?.data?.is_show_popup) {
                    setTypeModal(data?.data?.is_show_popup);
                    setTypeMessage(data?.data?.popup_message);
                }
            };

            dispatch({ type: UPDATE_CONNECTOR_REQUEST, payload, callBack, response });
        } else {
            let labelArray = [];
            let validationObject = {};
            let initialValuesObj = {};

            for (const property in item?.credential_titles) {
                labelArray.push({
                    placeholder: item?.credential_titles[property],
                    name: property,
                });

                let liveValue = false;
                let testValue = false;

                if (item?.credentials[property]) {
                    liveValue = true;
                }

                if (item?.test_credentials[property]) {
                    testValue = true;
                }

                initialValuesObj[property] = item?.credentials[property];

                initialValuesObj[property + "_sandbox"] = item?.test_credentials[property];

                if (liveValue) {
                    validationObject[property] = Yup.string().required(`Please enter ${item?.credential_titles[property]}`);
                }

                if (testValue) {
                    validationObject[property + "_sandbox"] = Yup.string().required(`Please enter ${item?.credential_titles[property]}`);
                }

                if (liveValue === false && testValue === false) {
                    validationObject[property] = Yup.string().required(`Please enter ${item?.credential_titles[property]}`);
                    validationObject[property + "_sandbox"] = Yup.string().required(`Please enter ${item?.credential_titles[property]}`);
                }
            }

            if (item?.is_payout_provider !== 1) {
                initialValuesObj["connector_type"] = item?.selected_connector_type;

                validationObject["connector_type"] = Yup.array()
                    .min(1, "Connector Type is required field")
                    .required(`Please select connector type`);
            } else {
                // initialValuesObj["connector_type"] = item?.selected_connector_type;
                // validationObject["connector_type"] = Yup.array();
            }

            let validationState = Yup.object().shape(validationObject);
            setValidationState(validationState);

            setModalItem(item);
            setConnectorTypes(item?.default_connector_type);
            setEditConnectorName(item?.name);
            setInitialValues(initialValuesObj);
            setUseI2payConnector(item?.use_payomatix_connector);
            setModalData(labelArray);
            setSignupURI(item?.signup_url);
            setModalTitle(item?.name);
            setModalId(item?.id);
            setIsActive(isEdit ? 0 : item?.is_active);
            setModalVisible(!modalVisible);
        }
    };

    const onChangeMode = async (item, mode) => {
        setLoadingModeId(item?.id);

        let payload = { id: item?.id, mode: mode };

        const callBack = () => {
            setLoadingModeId(false);
        };

        dispatch({ type: UPDATE_CONNECTOR_MODE_REQUEST, payload, callBack });
    };

    // const handleUseI2payConnector = (value) => {
    //     setUseI2payConnector(value);

    //     let validationObject = {};

    //     for (const property in modalItem?.credential_titles) {
    //         validationObject[property] = Yup.string().required(`Please enter ${modalItem?.credential_titles[property]}`);
    //     }

    //     let validationState = Yup.object().shape({});
    //     if (useI2payConnector) {
    //         validationState = Yup.object().shape(validationObject);
    //     }

    //     setValidationState(validationState);
    // };

    const onClickSignUp = () => {
        onCloseModal();
        setModalVisibleContact(true);
        // window.open(signupURI, "_blank");
    };

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    const onCloseModal = () => {
        setModalVisible(!modalVisible);
    };

    const onCloseModalContact = () => {
        setModalVisibleContact(false);
    };

    const onChangeSearchQuery = (value) => {
        setSearchQuery(value);
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const data = await downloadConnectorExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onChangeCredential = (values, isPayoutProvider) => {
        let isTestRequired = false;
        let isLiveRequired = false;
        modalData.map((item) => {
            if (values[`${item?.name}_sandbox`]) {
                isTestRequired = true;
            }

            if (values[`${item?.name}`]) {
                isLiveRequired = true;
            }
        });

        let validationObject = {};

        if (isTestRequired) {
            for (const property in modalItem?.credential_titles) {
                validationObject[property + "_sandbox"] = Yup.string().required(`Please enter ${modalItem?.credential_titles[property]}`);
            }
        }

        if (isLiveRequired) {
            for (const property in modalItem?.credential_titles) {
                validationObject[property] = Yup.string().required(`Please enter ${modalItem?.credential_titles[property]}`);
            }
        }

        if (!isTestRequired && !isLiveRequired) {
            for (const property in modalItem?.credential_titles) {
                validationObject[property + "_sandbox"] = Yup.string().required(`Please enter ${modalItem?.credential_titles[property]}`);
            }

            for (const property in modalItem?.credential_titles) {
                validationObject[property] = Yup.string().required(`Please enter ${modalItem?.credential_titles[property]}`);
            }
        }

        if (isPayoutProvider !== 1) {
            validationObject["connector_type"] = Yup.array()
                .min(1, "Connector Type is required field")
                .required(`Please select connector type`);
        }

        const validationState = Yup.object().shape(validationObject);

        setValidationState(validationState);
    };

    let handleTypeChange = (onChange, values) => {
        // const newValue = [];
        // values?.map((type) => {
        //     newValue.push(type?.value);
        // });
        onChange("connector_type", values);
        // setFormValues(newFormValues);
    };

    const handleDefaultConnectorClick = () => {
        navigate("/default-connector");
        document.body.style.overflow = "unset";
    };

    const onEnableDisableMultipleConnector = () => {
        setModalVisibleMultipleConnector(!modalVisibleMultipleConnector);
    };

    const onEnableMultipleConnectorAPI = async () => {
        const payload = {
            is_enabled: userData?.data?.is_multi_connector === 1 ? 0 : 1,
            connector_id: userData?.data?.is_multi_connector === 1 ? disableMultipleConnectorValue : undefined,
        };

        setIsLoadingMultipleConnector(true);

        const data = await enableDisableMultipleConnector(payload);

        if (data?.responseCode === 200) {
            dispatch(
                detailStart(userData?.data?.token, () => {
                    if (data?.data?.is_show_popup) {
                        setTypeModal(data?.data?.is_show_popup);
                        setTypeMessage(data?.data?.popup_message);
                    }
                    onEnableDisableMultipleConnector();
                    setIsLoadingMultipleConnector(false);
                    setIsLoading(true);
                    getEnableConnectors();
                    dispatch(getConnectorsRequest(searchQuery, () => setIsLoading(false)));
                }),
            );
        } else {
            setIsLoadingMultipleConnector(false);
        }
    };

    const getEnableConnectors = async () => {
        const data = await getEnabledConnectorData();

        if (data?.responseCode === 200) {
            setActiveConnectorList(data?.data);
            setDisableMultipleConnectorValue(data?.data[0]?.id);
        }
    };

    useEffect(() => {
        if (userData?.data?.is_multi_connector === 1 && userData?.data?.is_multi_connector === 1) {
            getEnableConnectors();
        }
    }, [userData?.data?.is_multi_connector]);

    const onChangeDisableConnectorValue = (e) => {
        setDisableMultipleConnectorValue(e?.target?.value);
    };

    const _renderMultipleConnectorModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    removeFooter={false}
                    heading={"Multiple Connector Setting"}
                    visible={modalVisibleMultipleConnector}
                    onClose={onEnableDisableMultipleConnector}>
                    {userData?.data?.is_multi_connector === 1 ? (
                        <>
                            <div className="px-5 py-2">
                                <label>Please select which connector you want to enable default.</label>
                                {activeConnectorList?.map((item) => {
                                    return (
                                        <div class="form-check mt-2">
                                            <input
                                                id={`radio-switch-${item?.id}`}
                                                class="form-check-input"
                                                type="radio"
                                                name="vertical_radio_button"
                                                value={item?.id}
                                                onChange={onChangeDisableConnectorValue}
                                                checked={disableMultipleConnectorValue == item?.id}
                                            />
                                            <label class="form-check-label" for={`radio-switch-${item?.id}`}>
                                                {item?.name}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="px-5 pb-8 text-center mt-4">
                                <button
                                    data-tw-dismiss="modal"
                                    onClick={onEnableDisableMultipleConnector}
                                    className="btn btn-outline-secondary w-24 mr-1">
                                    Close
                                </button>
                                <button
                                    disabled={isLoadingMultipleConnector === true}
                                    className="btn btn-primary"
                                    onClick={onEnableMultipleConnectorAPI}>
                                    {userData?.data?.is_multi_connector === 1 ? "Disable" : "Enable"} Multiple Connector
                                    <ClipLoader
                                        loading={isLoadingMultipleConnector === true}
                                        color="#1e3a8a"
                                        size={15}
                                        css="border-width: 2px;border-color: #fff !important;margin-left:10px;border-bottom-color: transparent !important;"
                                    />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="px-5 py-2 text-center">
                                <div className="text-3xl">Do you really want to enable multiple connector?</div>
                                <br />
                                <div className="text-slate-500 mt-2">
                                    <strong>Note:</strong> If you enable multiple connectors, you must select the payment type 2 times for
                                    security reasons.
                                </div>
                            </div>
                            <div className="px-5 pb-8 text-center mt-4">
                                <button
                                    data-tw-dismiss="modal"
                                    onClick={onEnableDisableMultipleConnector}
                                    className="btn btn-outline-secondary w-24 mr-1">
                                    Close
                                </button>
                                <button
                                    disabled={isLoadingMultipleConnector === true}
                                    className="btn btn-primary w-24"
                                    onClick={onEnableMultipleConnectorAPI}>
                                    {userData?.data?.is_multi_connector === 1 ? "Disable" : "Enable"}
                                    <ClipLoader
                                        loading={isLoadingMultipleConnector === true}
                                        color="#1e3a8a"
                                        size={15}
                                        css="border-width: 2px;border-color: #fff !important;margin-left:10px;border-bottom-color: transparent !important;"
                                    />
                                </button>
                            </div>
                        </>
                    )}
                </Modal>
                {/* BEGIN: Modal */}
            </>
        );
    };

    const _renderTypeModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    removeFooter={false}
                    heading={"Default Connector Setting"}
                    visible={typeModal}
                    onClose={() => {
                        setTypeModal(false);
                    }}
                    // modalMinWidth={"50%"}
                >
                    <div>
                        <p style={{ fontSize: "16px" }} className="font-bold">
                            {typeMessage}
                        </p>

                        <ul className="mt-2 list-inside">
                            <li className="mt-1">
                                Go To the
                                <span
                                    onClick={() => handleDefaultConnectorClick()}
                                    rel="noreferrer"
                                    className="text-primary cursor-pointer">
                                    <strong>
                                        {" "}
                                        <Icon.ExternalLink size="13" className="relative inline-block ml-1" /> Default Connector
                                    </strong>
                                </span>{" "}
                                and manage default connector setting also you can manage your connector priority by creating rules.
                            </li>
                        </ul>
                    </div>
                </Modal>
                {/* BEGIN: Modal */}
            </>
        );
    };

    const _renderContactModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    removeFooter={false}
                    heading={"New Account Contact"}
                    visible={modalVisibleContact}
                    onClose={onCloseModalContact}
                    // modalMinWidth={"50%"}
                >
                    <div>
                        <p style={{ fontSize: "14px", maxWidth: 300 }}>
                            We will happy to create a new account for you. You can contact our team and create a new account easily.
                        </p>
                        <p className="mt-3">
                            <span style={{ fontSize: "16px", maxWidth: 300 }} className="font-bold">
                                Email:
                            </span>{" "}
                            sales@i2pay.dev
                        </p>
                        <p>
                            <span style={{ fontSize: "16px", maxWidth: 300 }} className="font-bold">
                                Mobile Number:
                            </span>{" "}
                            +44 800 832 1733
                        </p>
                        <div className="text-center mt-4">
                            <button className="btn btn-success py-3 px-4 align-top text-white">
                                Click here to our sales team will contact you
                            </button>
                        </div>
                    </div>
                </Modal>
                {/* BEGIN: Modal */}
            </>
        );
    };

    const _renderModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    func
                    heading={`Add ` + editConnectorName}
                    visible={modalVisible}
                    onClose={onCloseModal}
                    onClickSave={onSubmit}
                    onClickCancel={onClickSignUp}
                    useFormik
                    initialValues={initialValues}
                    validationState={validationState}
                    modalMinWidth={"50%"}
                    buttonLoading={loadingId}
                    cancelButtonLink
                    cancelButtonText={`Don't have an account? Sign Up`}>
                    {(setFieldValue, values, errors, setFieldTouched) => {
                        console.log({ values, errors });
                        return (
                            <>
                                {isPayoutProvider !== 1 && (
                                    <span>
                                        Select Types{" "}
                                        <small className="text-gray-500">
                                            (<em>Multiple</em>)
                                        </small>
                                        <span className="text-danger"> *</span>
                                    </span>
                                )}

                                <div>
                                    {isPayoutProvider !== 1 && (
                                        <>
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
                                                onChange={(e) => handleTypeChange(setFieldValue, e)}
                                                className="intro-x login__input form-control block shadow-none"
                                            />
                                            <div className="mb-4">
                                                {errors && errors?.connector_type ? (
                                                    <p className="text-red-500 mt-2 ml-1">{errors?.connector_type}</p>
                                                ) : null}
                                            </div>
                                        </>
                                    )}

                                    <div className="sm:flex">
                                        <div className="pr-3 flex flex-col justify-center flex-1">
                                            <p>Live Credential</p>
                                            {modalData?.map((item, index) => {
                                                return (
                                                    <Input
                                                        onKeyUp={() => {
                                                            onChangeCredential(values, isPayoutProvider);
                                                        }}
                                                        key={index}
                                                        type="text"
                                                        className="intro-x login__input form-control py-2 px-3 block"
                                                        containerClassName="mt-3"
                                                        placeholder={item?.placeholder}
                                                        name={item?.name}
                                                        label={item?.placeholder}
                                                        isRequiredField={true}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <div className="pl-3 flex flex-col justify-center flex-1">
                                            <p>Sandbox Credential</p>
                                            {modalData?.map((item, index) => {
                                                return (
                                                    <Input
                                                        onKeyUp={() => {
                                                            onChangeCredential(values, isPayoutProvider);
                                                        }}
                                                        key={index}
                                                        type="text"
                                                        className="intro-x login__input form-control py-2 px-3 block"
                                                        containerClassName="mt-3"
                                                        placeholder={item?.placeholder}
                                                        name={`${item?.name}_sandbox`}
                                                        label={item?.placeholder}
                                                        isRequiredField={true}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    }}
                    {/* {initialValues.is_admin_connector_active ? (
                        <div className="form-check">
                            <Input
                                className="form-check-input my-3 mr-4 block"
                                name="own_checkbox"
                                type="checkbox"
                                onChange={(e) => handleUseI2payConnector(e.target.checked)}
                                defaultChecked={useI2payConnector !== 0 ? true : false}
                            />
                            <label className="form-check-label ml-0" htmlFor="own_checkbox">
                                Use I2pay Connector
                            </label>
                        </div>
                    ) : null} */}
                </Modal>
                {/* BEGIN: Modal */}
            </>
        );
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Connector"}
                onChangeSearchQuery={onChangeSearchQuery}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                displayBackButton={false}
                addButton={
                    <button
                        disabled={
                            userData?.data?.is_multi_connector === 1
                                ? activeConnectorList?.length > 1
                                    ? false
                                    : true
                                : activeConnectorList?.length > 0
                                ? false
                                : true
                        }
                        type="buttons"
                        onClick={onEnableDisableMultipleConnector}
                        className={`py-2 px-4 text-sm font-medium text-white bg-primary rounded max-h-[38px] ml-2`}>
                        <Icon.Save size="16" className="block md:hidden lg:hidden" />
                        <span className="hidden md:block lg:block">
                            {userData?.data?.is_multi_connector === 1 ? "Disable" : "Enable"} Multiple Connector
                        </span>
                    </button>
                }
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
                            <th className="whitespace-nowrap">Name</th>
                            <th className="whitespace-nowrap">Default Currency</th>
                            {/* <th className="whitespace-nowrap">Default Type</th> */}
                            <th className="whitespace-nowrap">Connector Type</th>
                            <th className="whitespace-nowrap">Supported Card</th>
                            <th className="text-center whitespace-nowrap">Mode</th>
                            <th className="text-center whitespace-nowrap">Status</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={9}>
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
                            {connector?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-20">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-white">{item?.name}</p>
                                        </td>
                                        <td>
                                            {item?.default_currency?.length > 1 ? (
                                                <span class="py-0.5 px-2 rounded-full text-xs text-white font-medium bg-primary custom-badge">
                                                    {item?.default_currency}
                                                </span>
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>
                                        {/* <td>
                                            {item?.default_currency ? (
                                                <span class="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-primary">
                                                    {item?.default_currency}
                                                </span>
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td> */}
                                        <td>
                                            {item?.selected_connector_type?.length > 0 ? (
                                                <div className="flex flex-wrap">
                                                    {item?.selected_connector_type?.map((dc) => {
                                                        return (
                                                            <>
                                                                {dc?.is_default === "1" ? (
                                                                    <span
                                                                        class="ml-1 mt-1 py-0.5 px-2 rounded-full text-xs cursor-pointer text-white font-medium bg-primary flex items-center justify-center custom-badge"
                                                                        data-tip
                                                                        data-for={`global${item?.name}`}>
                                                                        <ReactTooltip
                                                                            id={`global${item?.name}`}
                                                                            type="dark"
                                                                            place="right"
                                                                            effect="solid">
                                                                            <div>Default for {item?.name}</div>
                                                                        </ReactTooltip>
                                                                        <Icon.Settings size={12} />
                                                                        &nbsp; {dc?.label}
                                                                    </span>
                                                                ) : (
                                                                    <span class="ml-1 mt-1 py-0.5 px-2 rounded-full text-xs text-white font-medium bg-primary flex items-center justify-center custom-badge custom-badge">
                                                                        {dc?.label}
                                                                    </span>
                                                                )}
                                                            </>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            {item?.supported_cards?.length > 0 ? (
                                                <div className="flex flex-wrap">
                                                    {item?.supported_cards?.map((dc) => {
                                                        return (
                                                            <span class="ml-1 mt-1 py-0.5 px-2 rounded-full text-xs text-white font-medium bg-primary custom-badge">
                                                                {dc?.label}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="font-medium whitespace-nowrap">
                                                    <span className="text-danger">-- N/A --</span>
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex justify-center align-center min-w-[185px]">
                                                {item?.is_active === 1 ? (
                                                    <>
                                                        <div className="flex items-center justify-center text-danger">Test</div>
                                                        <div className="form-switch ">
                                                            <input
                                                                onChange={(e) => {
                                                                    onChangeMode(item, item?.mode === 1 ? 0 : 1);
                                                                }}
                                                                // id="show-example-5"
                                                                className="show-code form-check-input mr-0 ml-3"
                                                                type="checkbox"
                                                                disabled={
                                                                    item?.is_filled_test_credentials === 0 ||
                                                                    item?.is_filled_live_credentials === 0
                                                                        ? true
                                                                        : false
                                                                }
                                                                checked={item?.mode === 1 ? true : false}
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-center text-success ml-3">Live</div>
                                                        <div className="ml-2 flex items-center border-slate-900">
                                                            <ClipLoader
                                                                loading={loadingModeId === item?.id}
                                                                color="#1e3a8a"
                                                                size={15}
                                                                css="border-width: 1px;border-bottom-color: white !important;"
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p className="font-medium whitespace-nowrap">
                                                        <span className="text-danger">-- N/A --</span>
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-center align-center min-w-[185px]">
                                                <div
                                                    className={
                                                        item?.is_active === 1
                                                            ? "flex items-center justify-center text-success"
                                                            : "flex items-center justify-center text-danger"
                                                    }>
                                                    <Icon.CheckSquare size={15} /> &nbsp; {item?.is_active === 1 ? "Active" : "Inactive"}
                                                </div>
                                                <div className="form-switch ">
                                                    <input
                                                        disabled={item?.is_enabled === "0"}
                                                        onChange={() => {
                                                            onChangeSwitch(item);
                                                        }}
                                                        // id="show-example-5"
                                                        className="show-code form-check-input mr-0 ml-3"
                                                        type="checkbox"
                                                        checked={item?.is_active === 1 ? true : false}
                                                    />
                                                </div>
                                                <div className="ml-2 flex items-center border-slate-900">
                                                    <ClipLoader
                                                        loading={loadingId === item?.id}
                                                        color="#1e3a8a"
                                                        size={15}
                                                        css="border-width: 1px;border-bottom-color: white !important;"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-report__action text-center">
                                            <div className="flex justify-center">
                                                <div
                                                    onClick={() => {
                                                        if (item?.is_active === 1) {
                                                            onChangeSwitch(item, true);
                                                        }
                                                    }}
                                                    className={
                                                        item?.is_active
                                                            ? "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                            : "font-medium whitespace-nowrap flex items-center justify-center cursor-not-allowed text-slate-300 dark:text-slate-500 mr-3"
                                                    }>
                                                    <Icon.Edit size={15} /> &nbsp;
                                                </div>
                                                <Link
                                                    to={item?.is_active ? `/connector/${item.id}/settings` : "#"}
                                                    className={
                                                        item?.is_active
                                                            ? "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                            : "font-medium whitespace-nowrap flex items-center justify-center cursor-not-allowed text-slate-300 dark:text-slate-500 mr-3"
                                                    }>
                                                    <Icon.Settings size={15} /> &nbsp;
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Connector Table */}

                {/* START: Table Not Found */}
                {connector?.length === 0 && !isLoading && (
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
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        {connector?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6" key={index}>
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <span className="font-medium text-primary dark:text-white">{item?.name}</span>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0 ml-1 lg:ml-0">
                                                <div className="dropdown ml-auto sm:ml-0 flex items-center">
                                                    <div
                                                        onClick={() => {
                                                            if (item?.is_active === 1) {
                                                                onChangeSwitch(item, true);
                                                            }
                                                        }}
                                                        className={
                                                            item?.is_active
                                                                ? "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                                : "font-medium whitespace-nowrap flex items-center justify-center cursor-not-allowed text-slate-300 dark:text-slate-500 mr-3"
                                                        }>
                                                        <Icon.Edit size={15} /> &nbsp;
                                                    </div>
                                                    <Link
                                                        to={item?.is_active ? `/connector/${item.id}/settings` : "#"}
                                                        className={
                                                            item?.is_active
                                                                ? "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300"
                                                                : "font-medium whitespace-nowrap flex items-center justify-center cursor-not-allowed text-slate-300 dark:text-slate-500"
                                                        }>
                                                        <Icon.Settings size={15} /> &nbsp;
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row lg:flex-nowrap items-center justify-center p-5">
                                            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 mr-auto">
                                                <div className="flex text-slate-500 text-xs">
                                                    <div className="form-switch ">
                                                        <input
                                                            onChange={() => {
                                                                onChangeSwitch(item);
                                                            }}
                                                            // id="show-example-5"
                                                            className="show-code form-check-input mr-0"
                                                            type="checkbox"
                                                            checked={item?.is_active === 1 ? true : false}
                                                        />
                                                    </div>
                                                    <div className="ml-2 flex items-center border-slate-900">
                                                        <ClipLoader
                                                            loading={loadingId === item?.id}
                                                            color="#1e3a8a"
                                                            size={15}
                                                            css="border-width: 1px;border-bottom-color: white !important;"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-slate-500 text-xs mt-0.5">
                                                <span
                                                    className={`py-0.5 px-2 rounded-full text-xs ${
                                                        item?.is_active ? "bg-success" : "bg-danger"
                                                    } text-white cursor-pointer font-medium`}>
                                                    {item?.is_active === 1 ? "Active" : "Inactive"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!connector?.length && !isLoading && (
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
            {/* BEGIN: Modal */}
            {_renderModal()}
            {_renderContactModal()}
            {_renderTypeModal()}
            {_renderMultipleConnectorModal()}
            {/* END: Modal */}

            {/* BEGIN: Content */}

            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {listingType === "box" ? _renderBoxTable() : _renderTable()}
                            </div>
                        </div>
                    </div>
                </div>
                {/* {!isLoading && connector?.length !== 0 && typeof connector !== "undefined" && (
                    <Pagination
                        pagination={pagination}
                        currentPage={currentPage}
                        perPage={perPage}
                        onChangePage={onChangePage}
                        onChangePerPage={onChangePerPage}
                    />
                )} */}
            </div>
        </>
    );
    // MAIN CONTENT
};

export default Connector;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { ipWhitelist } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import { ADD_IP_WHITELIST_REQUEST } from "../../redux/actions/IPWhitelist";
import { GET_ENABLED_CONNECTOR_REQUEST } from "../../redux/actions/Connector";
import { ClipLoader } from "react-spinners";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Select = React.lazy(() => import("react-select"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const IPWhiteListCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [, setListingType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [, setIsTableLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const state = useSelector((state) => state);
    const { enabledConnector } = useSelector((state) => state.connector);
    const [connectors, setConnectors] = useState([]);

    const initialValues = {
        website: "",
        connectors_id: [],
        ip_addresses: [{ address: "" }],
    };

    let addIpAddressField = (setFieldValue) => {
        setFieldValue({ address: "" });
    };

    let handleChange = (onChange, i, e, values) => {
        let newFormValues = [...values];
        newFormValues[i][e.target.name] = e.target.value;
        onChange("ip_addresses", newFormValues);
    };

    let handleConnectorsChange = (setFieldValue, e) => {
        let connectors_id = [];
        if (e.length) {
            e.forEach((connector) => {
                connectors_id.push(connector.value);
            });
        }
        setFieldValue("connectors_id", connectors_id);
    };

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        let connectors = [];
        if (enabledConnector) {
            enabledConnector.forEach((item) => {
                connectors.push({ value: item?.id, label: item?.name });
            });
            setConnectors(connectors);
        }
    }, [enabledConnector]);

    useEffect(() => {
        setIsTableLoading(true);

        const callBack = () => {
            setIsLoading(false);
            setIsTableLoading(false);
        };

        const navigateState = () => {};

        dispatch({ type: GET_ENABLED_CONNECTOR_REQUEST, payload: {}, callBack, navigateState });
    }, []);

    const onSubmit = (values) => {
        const callBack = () => {
            setIsSubmitting(false);
        };

        const navigateState = () => {
            navigate(`/ip-whitelist`);
        };

        // setIsLoading(true);
        setIsSubmitting(true);

        const payload = {
            website: values.website,
            // connectors_id: JSON.stringify(values.connectors_id),
            ip_addresses: JSON.stringify(values.ip_addresses),
        };

        dispatch({ type: ADD_IP_WHITELIST_REQUEST, payload, callBack, navigateState });
    };

    const onClickBack = () => {
        navigate(`/ip-whitelist`);
    };

    const _renderHeading = () => {
        return <Heading title={"Add IP Whitelist"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const connectorStyles = {
        container: (base) => ({
            ...base,
            // border: "1px solid lightgrey"
        }),
        control: (base) => ({
            ...base,
            border: "1px solid #e3e3e3",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
        }),
        valueContainer: (base) => ({
            ...base,
            height: "43px",
        }),
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
                                    <div className="intro-y box p-5 mt-5">
                                        <Formik initialValues={initialValues} validationSchema={ipWhitelist} onSubmit={onSubmit}>
                                            {({ handleSubmit, errors, values, setFieldValue, touched, isValid, setFieldTouched }) => (
                                                <Form className="">
                                                    {/*{JSON.stringify(values)}*/}
                                                    {/*<hr />*/}
                                                    {/*{JSON.stringify(errors)}*/}

                                                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                        <div className="intro-y col-span-12 sm:col-span-6">
                                                            <Input
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.whiteList.website}
                                                                name="website"
                                                                label={messages.whiteList.website}
                                                                isRequiredField
                                                            />
                                                        </div>

                                                        {/* <div className="col-span-12 sm:col-span-6">
                                                            <label htmlFor="connectors_id" className="form-label">
                                                                Connector <span className="text-danger">*</span>
                                                            </label>

                                                            <Select
                                                                isMulti
                                                                name="connectors_id"
                                                                onChange={(e) => handleConnectorsChange(setFieldValue, e)}
                                                                options={connectors}
                                                                className="intro-x login__input form-control block"
                                                                styles={connectorStyles}
                                                            />

                                                            {errors.connectors_id && touched.connectors_id ? (
                                                                <p className="text-red-500 mt-2 ml-1">{errors.connectors_id}</p>
                                                            ) : null}
                                                        </div> */}

                                                        {values.ip_addresses.map((element, index) => (
                                                            <>
                                                                <div className="col-span-12 sm:col-span-6 relative" key={element + index}>
                                                                    <div className="flex">
                                                                        <label htmlFor="connectors_id" className="form-label">
                                                                            {values.ip_addresses.length === 1
                                                                                ? `IP Address`
                                                                                : `IP Address ` + (index + 1)}
                                                                            <span className="text-danger">*</span>
                                                                        </label>

                                                                        <div className="absolute right-0 top-[-5px]">
                                                                            {/* ADD BUTTON */}
                                                                            {index + 1 === values.ip_addresses.length ? (
                                                                                <button
                                                                                    className="btn btn-primary bg-primary btn-sm ml-auto mb-2 mr-1"
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        addIpAddressField((value) =>
                                                                                            setFieldValue("ip_addresses", [
                                                                                                ...values?.ip_addresses,
                                                                                                value,
                                                                                            ]),
                                                                                        )
                                                                                    }
                                                                                    style={{ backgroundColor: "rgb(30,58,138)" }}>
                                                                                    <Icon.Plus size={14} />
                                                                                </button>
                                                                            ) : null}
                                                                            {/* ADD BUTTON */}

                                                                            {/* REMOVE BUTTON */}
                                                                            {values.ip_addresses.length > 1 ? (
                                                                                <button
                                                                                    className="btn btn-danger btn-sm ml-auto mb-2"
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        setFieldTouched(
                                                                                            `ip_addresses[${index}].address`,
                                                                                            false,
                                                                                        );
                                                                                        setFieldValue(
                                                                                            "ip_addresses",
                                                                                            values.ip_addresses.filter(
                                                                                                (_, i) => i !== index,
                                                                                            ),
                                                                                            true,
                                                                                        );
                                                                                    }}>
                                                                                    <Icon.Minus size={14} />
                                                                                </button>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>
                                                                    {/* REMOVE BUTTON */}

                                                                    <input
                                                                        onChange={(e) =>
                                                                            handleChange(setFieldValue, index, e, values.ip_addresses)
                                                                        }
                                                                        value={element.address || ""}
                                                                        type="text"
                                                                        name="address"
                                                                        onBlur={() => setFieldTouched(`ip_addresses[${index}].address`)}
                                                                        className="intro-x login__input form-control py-2 px-3 block"
                                                                        placeholder="e.g. 127.0.0.1"
                                                                        style={{ zIndex: 0 }}
                                                                    />

                                                                    {errors.ip_addresses?.[index]?.address &&
                                                                    touched.ip_addresses?.[index]?.address ? (
                                                                        <p className="text-red-500 mt-2 ml-1">
                                                                            {errors.ip_addresses?.[index]?.address}
                                                                        </p>
                                                                    ) : null}
                                                                </div>
                                                            </>
                                                        ))}

                                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                            <button
                                                                className="btn btn-primary w-24 ml-2"
                                                                onClick={handleSubmit}
                                                                disabled={isSubmitting}>
                                                                Save <MiniLoader className="dark:text-white" isLoading={isSubmitting} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
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

export default IPWhiteListCreate;

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { decode } from "html-entities";
import { addDaysInDate } from "../../utils/helper";
import { advanceSearchSchema } from "../../utils/validationSchema";
import { Currency } from "../../utils/currency";
import { transactionsStatus } from "../../utils/transactions";
import { getConnectorsRequest } from "../../redux/actions/Connector";
import "react-datepicker/dist/react-datepicker.css";
import { AutoSplitPayment } from "../../utils/staticDropdown";
const Input = React.lazy(() => import("../../components/common/forms/Input"));

const AdvanceSearchModal = ({
    visible,
    onClose,
    advanceSearchSubmit,
    resetFilter,
    resetState,
    additionalStartDateLabel,
    additionalEndDateDateLabel,
    additionalStartDateName,
    additionalEndDateDateName,
    removeConnector,
    removeIPAddress,
}) => {
    const initialValuesObj = {
        email: "",
        order_id: "",
        from_amount: "",
        to_amount: "",
        start_date: "",
        end_date: "",
        ip_address: "",
        currency: "",
        status: "",
        connectors_id: "",
        is_auto_split_enabled: "",
    };

    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [additionalStartDate, setAdditionalStartDate] = useState(null);
    const [additionalEndDate, setAdditionalEndDate] = useState(null);
    const { connector: connectors } = useSelector((state) => state.connector);
    const [currencyRef, setCurrencyRef] = useState(null);
    const [initialValues, setInitialValues] = useState(initialValuesObj);

    const handleStartDate = (date, setFieldValue) => {
        setFieldValue("start_date", date);
        setEndDate(null);
        setStartDate(date);
    };

    const handleEndDate = (date, setFieldValue) => {
        setFieldValue("end_date", date);
        setEndDate(date);
    };

    const handleAdditionalStartDate = (date, setFieldValue) => {
        setFieldValue(additionalStartDateName, date);
        setAdditionalEndDate(null);
        setAdditionalStartDate(date);
    };

    const handleAdditionalEndDate = (date, setFieldValue) => {
        setFieldValue(additionalEndDateDateName, date);
        setAdditionalEndDate(date);
    };

    const onSubmit = (values) => {
        advanceSearchSubmit(values);
    };

    const onReset = () => {
        setInitialValues({
            email: "",
            order_id: "",
            from_amount: "",
            to_amount: "",
            start_date: "",
            end_date: "",
            ip_address: "",
            currency: "",
            status: "",
            connectors_id: "",
            is_auto_split_enabled: "",
        });
        // setStartDate(null);
        // setEndDate(null);
        // setAdditionalStartDate(null);
        // setAdditionalEndDate(null);
        // currencyRef.clearValue();
        // if (!removeConnector) {
        //     document.getElementById("connectors_id").value = "";
        // }

        // document.getElementById("status").value = "";
        // resetFilter();
    };

    useEffect(() => {
        if (resetState) {
            setStartDate(null);
            setEndDate(null);
            setAdditionalStartDate(null);
            setAdditionalEndDate(null);
            currencyRef.clearValue();
            if (!removeConnector) {
                document.getElementById("connectors_id").value = "";
            }
            document.getElementById("status").value = "";
            document.getElementById("search-form").reset();
        }
    }, [resetState]);

    useEffect(() => {
        dispatch(getConnectorsRequest("", () => {}));
    }, []);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [visible]);

    const { mode } = useSelector((state) => state.persist);
    const colourStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            borderColor: "#e2e8f0",
            color: mode === "dark" ? "#FFFFFF" : "#384252",
        }),
        option: (styles, { isDisabled, isFocused }) => {
            return {
                ...styles,
                //backgroundColor: "white",
                // backgroundColor: mode === "dark" ? "#0f1d36" : "#b1d7ff",
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
        input: (styles) => ({
            ...styles,
            ":active": {
                border: "none",
            },
            border: 0,
            // This line disable the blue border
        }),
        placeholder: (styles) => ({
            ...styles,
            boxShadow: "none",
            // This line disable the blue border
        }),
        singleValue: (styles) => ({
            ...styles,
            color: mode === "dark" ? "#FFFFFF" : "#384252",
        }),
        menu: (styles) => ({ ...styles, backgroundColor: mode === "dark" ? "#1b253b" : "white" }),
    };

    return (
        <>
            <div
                onClick={onClose}
                className={
                    visible
                        ? "modal modal-slide-over overflow-y-auto show ml-0 mt-0 z-[999]"
                        : "modal modal-slide-over overflow-y-auto ml-0 mt-0 z-[999]"
                }
                data-tw-backdrop="static"
                tabIndex="-1"
                aria-hidden="true">
                <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <a data-tw-dismiss="modal" className="cursor-pointer" onClick={onClose}>
                            {" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x w-8 h-8 text-slate-400">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>{" "}
                        </a>

                        <div className="modal-header">
                            <h2 className="font-medium text-base mr-auto">Advance Filters</h2>
                        </div>

                        <Formik initialValues={initialValues} validationSchema={advanceSearchSchema} onSubmit={onSubmit} validateOnMount>
                            {({ handleSubmit, errors, values, setFieldValue, touched }) => (
                                <Form id="search-form">
                                    <div className="modal-body pb-[85px]">
                                        <div className="mt-3">
                                            <label htmlFor="modal-form-2" className="form-label">
                                                Email
                                            </label>
                                            <Input placeholder="Email" className="form-control" name="email" type="email" />
                                        </div>
                                        <div className="mt-3">
                                            <label htmlFor="modal-form-3" className="form-label">
                                                Order ID
                                            </label>
                                            <Input placeholder="Order ID" className="form-control" name="order_id" type="text" />
                                        </div>

                                        <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                                            {!removeIPAddress && (
                                                <div className="col-span-12 sm:col-span-6">
                                                    <label htmlFor="ip_address" className="form-label">
                                                        IP Address
                                                    </label>
                                                    <Input
                                                        placeholder="eg. 127.0.0.1"
                                                        className="form-control"
                                                        name="ip_address"
                                                        type="text"
                                                    />
                                                </div>
                                            )}

                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="currency" className="form-label">
                                                    Currency
                                                </label>

                                                <Select
                                                    ref={(ref) => {
                                                        setCurrencyRef(ref);
                                                    }}
                                                    menuPortalTarget={document.body}
                                                    value={Currency?.find((item) => item?.value === values.currency)}
                                                    styles={colourStyles}
                                                    style={{ boxShadow: "none", zIndex: 1 }}
                                                    options={Currency}
                                                    onChange={(e) => {
                                                        setFieldValue("currency", e?.value);
                                                    }}
                                                    // onChange={(e) => handleCurrencyChange(e, setFieldValue)}
                                                    className="login__input form-control block shadow-none z-1"
                                                    getOptionLabel={(e) => (
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <span style={{ marginLeft: 5 }}>
                                                                <span>{decode(e.symbol)}</span> ({e?.value})
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="status" className="form-label">
                                                    Status
                                                </label>

                                                <select
                                                    id="status"
                                                    onChange={(e) => setFieldValue("status", e.target.value)}
                                                    value={values.status}
                                                    name="status"
                                                    style={{ zIndex: 1 }}
                                                    className="form-select intro-x login__input form-control px-4 block">
                                                    <option value="" disabled>
                                                        Select Status
                                                    </option>
                                                    {transactionsStatus &&
                                                        transactionsStatus.map((status, index) => (
                                                            <option key={index} value={status.value}>
                                                                {status.label}
                                                            </option>
                                                        ))}
                                                </select>
                                                {errors.status && touched.status ? (
                                                    <p className="text-red-500 mt-2 ml-1">{errors.status}</p>
                                                ) : null}
                                            </div>
                                            {!removeConnector && (
                                                <div className="col-span-12 sm:col-span-6">
                                                    <label htmlFor="connectors_id" className="form-label">
                                                        Connector
                                                    </label>

                                                    <select
                                                        id="connectors_id"
                                                        onChange={(e) => setFieldValue("connectors_id", e.target.value)}
                                                        value={values.connectors_id}
                                                        name="connectors_id"
                                                        className="form-select intro-x login__input form-control px-4 block"
                                                        style={{ zIndex: 1 }}>
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
                                                    {errors.connectors_id && touched.connectors_id ? (
                                                        <p className="text-red-500 mt-2 ml-1">{errors.connectors_id}</p>
                                                    ) : null}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="modal-form-3" className="form-label">
                                                    From Amount:
                                                </label>
                                                <Input
                                                    placeholder="From Amount"
                                                    className="form-control"
                                                    name="from_amount"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="modal-form-3" className="form-label">
                                                    To Amount:
                                                </label>
                                                <Input placeholder="To Amount" className="form-control" name="to_amount" type="number" />
                                            </div>
                                        </div>

                                        <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="modal-form-4" className="form-label">
                                                    Start Date
                                                </label>

                                                <div className="relative mx-auto">
                                                    <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                                        {" "}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-calendar w-4 h-4">
                                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                                        </svg>{" "}
                                                    </div>
                                                    <DatePicker
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={startDate}
                                                        className="form-control pl-12"
                                                        name="start_date"
                                                        maxDate={new Date()}
                                                        onChange={(date) => handleStartDate(date, setFieldValue)}
                                                        placeholderText="Select Start Date"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="modal-form-5" className="form-label">
                                                    End Date
                                                </label>
                                                <div className="relative mx-auto">
                                                    <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                                        {" "}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-calendar w-4 h-4">
                                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                                        </svg>{" "}
                                                    </div>
                                                    <DatePicker
                                                        dateFormat="dd-MM-yyyy"
                                                        selected={endDate}
                                                        className="form-control pl-12"
                                                        name="end_date"
                                                        maxDate={new Date()}
                                                        minDate={
                                                            addDaysInDate(startDate, 1) !== null ? addDaysInDate(startDate, 1) : startDate
                                                        }
                                                        onChange={(date) => handleEndDate(date, setFieldValue)}
                                                        placeholderText="Select End Date"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {additionalStartDateLabel &&
                                            additionalEndDateDateLabel &&
                                            additionalStartDateName &&
                                            additionalEndDateDateName && (
                                                <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                                                    <div className="col-span-12 sm:col-span-6">
                                                        <label htmlFor="modal-form-4" className="form-label">
                                                            {additionalStartDateLabel}
                                                        </label>

                                                        <div className="relative mx-auto">
                                                            <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                                                {" "}
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="feather feather-calendar w-4 h-4">
                                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                                </svg>{" "}
                                                            </div>
                                                            <DatePicker
                                                                dateFormat="dd-MM-yyyy"
                                                                selected={additionalStartDate}
                                                                className="form-control pl-12"
                                                                name={additionalStartDateName}
                                                                maxDate={new Date()}
                                                                onChange={(date) => handleAdditionalStartDate(date, setFieldValue)}
                                                                placeholderText="Select Start Date"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 sm:col-span-6">
                                                        <label htmlFor="modal-form-5" className="form-label">
                                                            {additionalEndDateDateLabel}
                                                        </label>
                                                        <div className="relative mx-auto">
                                                            <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                                                                {" "}
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="feather feather-calendar w-4 h-4">
                                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                                </svg>{" "}
                                                            </div>
                                                            <DatePicker
                                                                dateFormat="dd-MM-yyyy"
                                                                selected={additionalEndDate}
                                                                className="form-control pl-12"
                                                                name={additionalEndDateDateName}
                                                                maxDate={new Date()}
                                                                minDate={
                                                                    addDaysInDate(additionalStartDate, 1) !== null
                                                                        ? addDaysInDate(additionalStartDate, 1)
                                                                        : additionalStartDate
                                                                }
                                                                onChange={(date) => handleAdditionalEndDate(date, setFieldValue)}
                                                                placeholderText="Select End Date"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="status" className="form-label">
                                                    Auto Spit Payment
                                                </label>

                                                <select
                                                    id="is_auto_split_enabled"
                                                    onChange={(e) => setFieldValue("is_auto_split_enabled", e.target.value)}
                                                    value={values.is_auto_split_enabled}
                                                    name="is_auto_split_enabled"
                                                    style={{ zIndex: 1 }}
                                                    className="form-select intro-x login__input form-control px-4 block">
                                                    <option value="" disabled>
                                                        Select Type
                                                    </option>
                                                    {AutoSplitPayment &&
                                                        AutoSplitPayment.map((status, index) => (
                                                            <option key={index} value={status.value}>
                                                                {status.label}
                                                            </option>
                                                        ))}
                                                </select>
                                                {errors.is_auto_split_enabled && touched.is_auto_split_enabled ? (
                                                    <p className="text-red-500 mt-2 ml-1">{errors.is_auto_split_enabled}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer w-full absolute bottom-0 flex justify-between">
                                        <button
                                            className="btn btn-outline-secondary w-20 mr-1 resetForm"
                                            onClick={() => onReset()}
                                            type="reset">
                                            Reset
                                        </button>
                                        {/*<button className="btn btn-outline-secondary w-20 mr-1 resetForm"*/}
                                        {/*        onClick={() => currencyRef.clearValue()}*/}
                                        {/*        // onClick={() => console.log(clearCurrency, clearCurrency.clearValue())}*/}
                                        {/*        type="button">*/}
                                        {/*    Test*/}
                                        {/*</button>*/}
                                        <button
                                            type="buttons"
                                            onClick={handleSubmit}
                                            className="btn btn-primary w-20 filter"
                                            id="extraSearch">
                                            Search
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdvanceSearchModal;

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
const Input = React.lazy(() => import("../../components/common/forms/Input"));

const PayoutAdvanceSearchModal = ({
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
}) => {
    const initialValues = {
        invoice_no: "",
        start_date: "",
        end_date: "",
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [additionalStartDate, setAdditionalStartDate] = useState(null);
    const [additionalEndDate, setAdditionalEndDate] = useState(null);

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
        setStartDate(null);
        setEndDate(null);
        setAdditionalStartDate(null);
        setAdditionalEndDate(null);
        resetFilter();
    };

    useEffect(() => {
        if (resetState) {
            setStartDate(null);
            setEndDate(null);
            setAdditionalStartDate(null);
            setAdditionalEndDate(null);

            document.getElementById("search-form").reset();
        }
    }, [resetState]);

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
                                            <label htmlFor="modal-form-3" className="form-label">
                                                Payout No.
                                            </label>
                                            <Input placeholder="Payout No." className="form-control" name="invoice_no" type="text" />
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
                                                        autoComplete="off"
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
                                                        autoComplete="off"
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
                                    </div>

                                    <div className="modal-footer w-full absolute bottom-0 flex justify-between">
                                        <button
                                            className="btn btn-outline-secondary w-20 mr-1 resetForm"
                                            onClick={() => onReset()}
                                            type="reset">
                                            Reset
                                        </button>

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

export default PayoutAdvanceSearchModal;

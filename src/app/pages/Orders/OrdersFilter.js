import React, { useEffect, useState } from "react";
import { orderAdvanceSearchSchema } from "../../utils/validationSchema";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getStoreFrontListRequest } from "../../redux/actions/StoreFront";
import { Currency } from "../../utils/currency";
import { addDaysInDate } from "../../utils/helper";
import {decode} from "html-entities";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Select = React.lazy(() => import("react-select"));
const DatePicker = React.lazy(() => import("react-datepicker"));

const OrdersFilter = ({ visible, onClose, children, title, advanceSearchSubmit, resetFilter, resetState }) => {
    const initialValues = {
        product_name: "",
        store_name: "",
        customer_email: "",
        order_id: "",
        currency: "",
        from_amount: "",
        to_amount: "",
        start_date: "",
        end_date: "",
    };

    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.persist);
    // const {storeFrontList} = useSelector((state) => state.storeFrontStep);
    const [currencyRef, setCurrencyRef] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [visible]);

    const handleStartDate = (date, setFieldValue) => {
        setFieldValue("start_date", date);
        setEndDate(null);
        setStartDate(date);
    };

    const handleEndDate = (date, setFieldValue) => {
        setFieldValue("end_date", date);
        setEndDate(date);
    };

    const onReset = () => {
        setStartDate(null);
        setEndDate(null);
        currencyRef.clearValue();
        resetFilter();
    };

    const onSubmit = (values) => {
        advanceSearchSubmit(values);
    };

    useEffect(() => {
        if (resetState) {
            setStartDate(null);
            setEndDate(null);
            currencyRef.clearValue();
            document.getElementById("search-form").reset();
        }
    }, [resetState]);

    const onLoadEffect = () => {
        let payload = { user_id: userData?.data?.id };
        dispatch(getStoreFrontListRequest(1, "all", "", payload, () => {}));
    };

    React.useEffect(onLoadEffect, []);

    const { mode } = useSelector((state) => state.persist);
    const colourStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            borderColor: "#e2e8f0",
            color: mode === "dark" ? "#FFFFFF" : "#384252",
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
    };

    return (
        <>
            <div
                className={
                    visible
                        ? "modal modal-slide-over overflow-y-auto show ml-0 mt-0 z-[999]"
                        : "modal modal-slide-over overflow-y-auto ml-0 mt-0 z-[999]"
                }
                data-tw-backdrop="static"
                tabIndex="-1"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <a data-tw-dismiss="modal" className="cursor-pointer" onClick={onClose}>
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
                            </svg>
                        </a>

                        <div className="modal-header">
                            <h2 className="font-medium text-base mr-auto">Advance Filters</h2>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={orderAdvanceSearchSchema}
                            onSubmit={onSubmit}
                            validateOnMount>
                            {({ handleSubmit, errors, values, setFieldValue, touched, resetForm }) => (
                                <Form id="search-form">
                                    <div className="modal-body pb-[85px]">
                                        <div className="mt-3">
                                            <label htmlFor="modal-form-3" className="form-label">
                                                Product Name
                                            </label>
                                            <Input
                                                placeholder="Enter Product Name"
                                                className="form-control"
                                                name="product_name"
                                                type="text"
                                            />
                                        </div>

                                        <div className="mt-3">
                                            <label htmlFor="modal-form-3" className="form-label">
                                                Store Name
                                            </label>
                                            <Input placeholder="Enter Store Name" className="form-control" name="store_name" type="text" />
                                        </div>

                                        <div className="mt-3">
                                            <label htmlFor="modal-form-2" className="form-label">
                                                Email
                                            </label>
                                            <Input placeholder="Email" className="form-control" name="customer_email" type="email" />
                                        </div>
                                        <div className="mt-3">
                                            <label htmlFor="modal-form-3" className="form-label">
                                                Order ID
                                            </label>
                                            <Input placeholder="Order ID" className="form-control" name="order_id" type="text" />
                                        </div>

                                        <div className="mt-3">
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
                                                            <span>{ decode(e.symbol) }</span> ({e?.value})
                                                        </span>
                                                    </div>
                                                )}
                                            />
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

export default React.memo(OrdersFilter);

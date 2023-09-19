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
import { messages } from "../../messages/validations";
const Input = React.lazy(() => import("../../components/common/forms/Input"));

const ProductAdvanceSearchModal = ({ visible, onClose, advanceSearchSubmit, resetFilter, resetState }) => {
    const initialValues = {
        category: "",
    };

    const onSubmit = (values) => {
        advanceSearchSubmit(values);
    };

    const onReset = () => {
        resetFilter();
    };

    useEffect(() => {
        if (resetState) {
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
                                                Category
                                            </label>
                                            <Select
                                                onChange={(e) => {
                                                    setFieldValue("category", e.target.value);
                                                }}
                                                className="intro-x login__input form-control py-2 px-3 block"
                                                name="template"
                                                firstDisableLabel="Select Template"
                                                label={messages.sms_template.template}
                                                isRequiredField
                                                // data={masterTemplates}
                                            />
                                            {/* <Input placeholder="Payout No." className="form-control" name="invoice_no" type="text" /> */}
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

export default ProductAdvanceSearchModal;

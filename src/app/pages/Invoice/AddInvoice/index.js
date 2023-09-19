import React, { useState } from "react";
import * as Icon from "react-feather";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { invoiceProduct } from "../../../utils/validationSchema";
import { ADD_INVOICE_REQUEST } from "../../../redux/types/Invoice";
import { useDispatch, useSelector } from "react-redux";
import { GSTValue, InvoiceTextType } from "../../../utils/staticDropdown";
import { Currency } from "../../../utils/currency";
import { decode } from "html-entities";
import { withDecimal } from "../../../utils/helper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Modal = React.lazy(() => import("../../../components/common/Modal"));
const Input = React.lazy(() => import("../../../components/common/forms/Input"));
const InvoiceDetails = React.lazy(() => import("../../../components/common/InvoiceDetails"));
const SubmitInvoiceModal = React.lazy(() => import("./SubmitInvoiceModal"));
const Select = React.lazy(() => import("../../../components/common/forms/Select"));
const DropzoneComponent = React.lazy(() => import("../../../components/common/forms/Dropzone"));
const CurrencySelect = React.lazy(() => import("react-select"));
const Heading = React.lazy(() => import("../../../components/common/Heading"));

var converter = require("number-to-words");

const initialValuesObj = {
    name: "",
    description: "",
    qty: "",
    price: "",
    tax_type: "",
    tax_value: "",
};

const AddInvoice = () => {
    const formRef = React.useRef("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const printRef = React.useRef(null);

    const initialValue = {
        invoice: "INVOICE",
        invoiceNumber: "PT-5568",
        billToLabel: "Bill To",
        billToCompanyName: "I2pay Technologies Pvt. Ltd.",
        billToName: "I2pay Technologies",
        billToGst: "24ASDDKSDMD",
        billToContact: "+91- 9988998899",
        billToEmail: "account@i2pay.com, support@i2pay.com",
        billToAddress: "Sector 8, Chetak Marg,, Pratap Nagar, Sanganer, Jaipur",
        shipToLabel: "Bill From",
        shipToCompanyName: "HARDIK PVT. LTD.",
        shipToName: "Hardik Sonagra",
        shipToGst: "24AAGCI9497N1ZO",
        shipToContact: "+91- 6384560679",
        shipToEmail: "hardik@gmail.com, hardik@i2pay.com",
        shipToAddress: "N-72, Connaught Circus, New Delhi",
        productList: [],
        gst: 0,
        gstRate: 0,
        subTotal: 0,
        totalAmount: 0,
        invoice_logo: "",
        currency: "INR",
        signature: "System generated invoice",
        duaDate: "",
    };

    const validationSchema = Yup.object().shape({
        invoiceNumber: Yup.string().required("Please enter Invoice Number"),
        currency: Yup.string().required("Please select currency"),
        duaDate: Yup.string().required("Please select due date"),
        billToCompanyName: Yup.string().required("Please enter company name"),
        shipToCompanyName: Yup.string().required("Please enter company name"),
        billToAddress: Yup.string().required("Please enter address"),
        shipToAddress: Yup.string().required("Please enter address"),
        productList: Yup.array().required("Please add products").min(1),
    });

    const [isInvoiceDetailsVisible, setIsInvoiceDetailsVisible] = useState(false);
    const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
    const [apiLoading, setAPILoading] = useState(false);
    const [apiValue, setAPIValue] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [editID, setEditID] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);

    const { mode } = useSelector((state) => state.persist);
    const colourStyles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            borderColor: "#e2e8f0",
            color: mode === "dark" ? "#FFFFFF" : "#384252",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
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

    const onCloseModal = () => {
        setShowModal(false);
        setEditID("");
    };

    // const handleChangeGST = (value) => {
    //     formRef.current?.setFieldValue("gst", value);
    //     handleChangeProductList(undefined, value);
    // };

    const handleChangeProductList = (productList, gst) => {
        const productListClone = productList || formRef.current?.values?.productList;
        const gstClone = gst ?? formRef.current.values?.gst;

        const subTotal = productListClone.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.price * currentValue.qty;
        }, 0);

        formRef.current?.setFieldValue("subTotal", subTotal);
        const gstRate = subTotal * (gstClone / 100);

        formRef.current?.setFieldValue("gstRate", gstRate.toFixed(2));

        let totalFormAmount = 0;
        {
            productList.map((item, index) => {
                const amount = item?.qty * item?.price;
                const igstP = item?.tax_value;
                const totalAmount = amount + (amount * igstP) / 100;
                totalFormAmount = totalFormAmount + totalAmount;
            });
        }

        formRef.current?.setFieldValue("totalAmount", totalFormAmount);
    };

    const onClickAddNewProduct = () => {
        setInitialValues(initialValuesObj);
        setShowModal(true);
    };

    const onClickSaveProduct = (value) => {
        const products = [...formRef.current?.values?.productList];

        let genrateId = products[products?.length - 1]?.id;
        genrateId = genrateId ? genrateId + 1 : 1;
        products.push({
            ...value,
            id: genrateId,
            qty: value?.qty < 0 ? value?.qty * -1 : value?.qty,
            price: value?.price < 0 ? value?.price * -1 : value?.price,
        });
        handleChangeProductList(products);
        formRef.current?.setFieldValue("productList", products);
        onCloseModal();
    };

    const onClickEditProduct = (item) => {
        setEditID(item?.id);

        setInitialValues({
            name: item?.name,
            description: item?.description,
            qty: item?.qty,
            price: item?.price,
            tax_type: item?.tax_type,
            tax_value: item?.tax_value,
        });
        setShowModal(true);
    };

    const onSubmitkEditProduct = (value) => {
        const products = [...formRef.current?.values?.productList];
        const craeteNewData = [];
        products?.forEach((item) => {
            if (editID === item?.id) {
                craeteNewData.push({
                    ...value,
                    id: editID,
                    qty: value?.qty < 0 ? value?.qty * -1 : value?.qty,
                    price: value?.price < 0 ? value?.price * -1 : value?.price,
                });
            } else {
                craeteNewData.push({
                    ...value,
                    qty: value?.qty < 0 ? value?.qty * -1 : value?.qty,
                    price: value?.price < 0 ? value?.price * -1 : value?.price,
                });
            }
        });
        handleChangeProductList(craeteNewData);
        formRef.current?.setFieldValue("productList", craeteNewData);
        onCloseModal();
        setEditID("");
    };

    const onClickDeleteProduct = (id) => {
        const filterProduct = formRef.current?.values?.productList.filter((item) => item?.id !== id);
        handleChangeProductList(filterProduct);
        formRef.current?.setFieldValue("productList", filterProduct);
    };

    const onSubmit = (values) => {
        setIsSubmitModalVisible(true);
        setAPIValue({
            ...values,
            duaDate: values?.duaDate ? moment(values?.duaDate).format("YYYY-MM-DD") : undefined,
            productList: JSON.stringify(values?.productList),
        });
    };

    const onSubmitAPI = (value) => {
        const payload = {
            ...apiValue,
            ...value,
        };

        const formData = new FormData();

        for (const property in payload) {
            if (property === "invoice_logo") {
                if (payload["invoice_logo"]) {
                    formData.append(property, payload[property][0]);
                }
            } else if (property === "isPriceEditable") {
                formData.append(property, payload[property] ? 1 : 0);
            } else {
                formData.append(property, payload[property]);
            }
        }

        // values
        const callBack = () => {
            setAPILoading(false);
        };

        const navigateState = () => {
            navigate(`/invoice`);
        };
        setAPILoading(true);
        dispatch({ type: ADD_INVOICE_REQUEST, payload: formData, callBack, navigateState });
    };

    const _renderAmountSection = (values) => {
        const amount = values?.qty * values?.price;
        const igstP = values?.tax_value;
        const sgstCgstP = values?.tax_value / 2;
        const igst = (amount * igstP) / 100;
        const sgstCgst = (amount * sgstCgstP) / 100;
        const totalAmount = amount + (amount * igstP) / 100;
        return (
            <div className="flex flex-col items-end">
                {values?.tax_type != "" && values?.tax_type != "1" && values?.tax_value != "" && (
                    <div className="text-base text-slate-500 font-bold mt-3">
                        Amount: <span>{decode(Currency.find((c) => c?.value === formRef?.current?.values?.currency)?.symbol)}</span>
                        {amount.toFixed(2)}
                    </div>
                )}
                {values?.tax_type == "2" && values?.tax_value != "" && (
                    <div className="text-base text-slate-500 font-bold">
                        IGST: <span>{decode(Currency.find((c) => c?.value === formRef?.current?.values?.currency)?.symbol)}</span>
                        {igst.toFixed(2)} ({igstP}%)
                    </div>
                )}
                {values?.tax_type == "3" && values?.tax_value != "" && (
                    <div className="text-base text-slate-500 font-bold">
                        SGST: <span>{decode(Currency.find((c) => c?.value === formRef?.current?.values?.currency)?.symbol)}</span>
                        {sgstCgst.toFixed(2)} ({sgstCgstP}%)
                    </div>
                )}
                {values?.tax_type == "3" && values?.tax_value != "" && (
                    <div className="text-base text-slate-500 font-bold">
                        CGST: <span>{decode(Currency.find((c) => c?.value === formRef?.current?.values?.currency)?.symbol)}</span>
                        {sgstCgst.toFixed(2)} ({sgstCgstP}%)
                    </div>
                )}
                {values?.price != "" && (
                    <div className="text-xl text-blue-800 dark:text-white font-bold mt-2">
                        Total Amount: <span>{decode(Currency.find((c) => c?.value === formRef?.current?.values?.currency)?.symbol)}</span>
                        {totalAmount.toFixed(2)}
                    </div>
                )}
            </div>
        );
    };

    // Need Props to heading Skipping
    const _renderHeading = (isValid, handleSubmit) => {
        return (
            <Heading
                title={"Add Invoice"}
                displayBackButton={true}
                onClickBack={() => (isInvoiceDetailsVisible ? setIsInvoiceDetailsVisible(false) : navigate("/invoice"))}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <button
                            type="buttons"
                            onClick={() => setIsInvoiceDetailsVisible(!isInvoiceDetailsVisible)}
                            className="btn btn-primary w-24 ml-2 h-[46px]">
                            {isInvoiceDetailsVisible ? (
                                <Icon.Edit size="16" className="block md:hidden lg:hidden" />
                            ) : (
                                <Icon.Eye size="16" className="block md:hidden lg:hidden" />
                            )}

                            <span className="hidden md:block lg:block">{isInvoiceDetailsVisible ? "Edit" : "Preview"}</span>
                        </button>
                        <button type="buttons" disabled={!isValid} onClick={handleSubmit} className={"btn btn-primary w-24 ml-2 h-[46px]"}>
                            <Icon.Save size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Save</span>
                        </button>
                    </div>
                }
            />
        );
    };

    return (
        <>
            <SubmitInvoiceModal
                isLoading={apiLoading}
                onClickSave={onSubmitAPI}
                data={formRef?.current?.values}
                showModal={isSubmitModalVisible}
                onCloseModal={() => setIsSubmitModalVisible(false)}
            />
            <Modal
                heading={"Add Product"}
                visible={showModal}
                onClose={onCloseModal}
                onClickSave={editID ? onSubmitkEditProduct : onClickSaveProduct}
                onClickCancel={onCloseModal}
                modalMinWidth={"50%"}
                useFormik
                initialValues={initialValues}
                func
                validationState={invoiceProduct}>
                {(setFieldValue, values, errors) => {
                    return (
                        <>
                            <Input
                                type="text"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={"Product Name"}
                                name={"name"}
                                label="Product Name"
                                isRequiredField
                                maxlength={150}
                            />
                            <Input
                                labelRightContent={
                                    <div
                                        className={`border-2 h-[30px] w-[30px] ${
                                            values?.description?.length >= 200
                                                ? "border-red-600 text-red-600"
                                                : values?.description?.length >= 80
                                                ? "border-yellow-600 text-yellow-600"
                                                : "border-green-600 text-green-600"
                                        } rounded-full flex justify-center items-center`}>
                                        {200 - values?.description?.length}
                                    </div>
                                }
                                textarea="true"
                                type="text"
                                maxlength={200}
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={"Product Description"}
                                name={"description"}
                                label="Product Description"
                                containerClassName="mt-3"
                            />
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                <div
                                    className={
                                        values?.tax_type != "" && values?.tax_type != "1"
                                            ? "intro-y col-span-12 sm:col-span-6"
                                            : "intro-y col-span-12 sm:col-span-12"
                                    }>
                                    <Select
                                        isRequiredField
                                        name="tax_type"
                                        data={InvoiceTextType}
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        label="Tax Type"
                                        placeholder="Tax Type"
                                        containerClassName="mt-3"
                                        firstDisableLabel="Select Tax Type"
                                        value={values?.tax_type}
                                        onChange={(e) => {
                                            setFieldValue("tax_type", e.target.value);
                                            setFieldValue("tax_value", "");
                                        }}
                                    />
                                </div>
                                {values?.tax_type != "" && values?.tax_type != "1" && (
                                    <div className="intro-y col-span-12 sm:col-span-6">
                                        <Select
                                            isRequiredField
                                            name="tax_value"
                                            data={GSTValue}
                                            className="intro-x login__input form-control py-2 px-3 block"
                                            label="Tax Value"
                                            placeholder="Tax Value"
                                            containerClassName="mt-3"
                                            firstDisableLabel="Select Tax Type"
                                        />
                                    </div>
                                )}
                            </div>

                            <Input
                                type="number"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={"Qty"}
                                name={"qty"}
                                label="Qty"
                                min="0"
                                isRequiredField
                                containerClassName="mt-3"
                            />
                            <Input
                                type="number"
                                className="intro-x login__input form-control py-2 px-3 block"
                                placeholder={"Price"}
                                name={"price"}
                                label="Price"
                                min="0"
                                isRequiredField
                                containerClassName="mt-3"
                            />
                            {_renderAmountSection(values)}
                        </>
                    );
                }}
            </Modal>

            <Formik innerRef={formRef} initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount>
                {({ values, touched, errors, setFieldValue, setFieldTouched, handleSubmit, isValid }) => {
                    let totalFormAmount = 0;
                    return (
                        <div className="content">
                            {_renderHeading(isValid, handleSubmit)}

                            {isInvoiceDetailsVisible ? (
                                <InvoiceDetails
                                    printRef={printRef}
                                    data={formRef?.current?.values}
                                    closePreview={setIsInvoiceDetailsVisible}
                                />
                            ) : (
                                <div className="col-span-12 lg:col-span-8 xl:col-span-6 mt-2 bg-white dark:bg-darkmode-500">
                                    <div className="intro-y mt-12 sm:mt-5">
                                        <div className="box">
                                            {/* BILLING AND SHIPPING DETAILS STARTS FROM HERE */}
                                            <div className="text-center sm:text-left">
                                                <div className="px-5 py-8 sm:px-20">
                                                    <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                                                        <div className="col-span-12 sm:col-span-4">
                                                            <DropzoneComponent
                                                                setFieldValue={(name, value) => {
                                                                    setFieldValue(name, value);
                                                                }}
                                                                name="invoice_logo"
                                                                placeholder={"Invoice Logo"}
                                                                values={values.invoice_logo}
                                                                accept="image/png,image/jpg,image/jpeg"
                                                                // label={"Invoice Logo"}
                                                            />
                                                            {/* <div className="text-blue-800 dark:text-white font-semibold text-3xl mt-[22px]">
                                                                <input
                                                                    type="text"
                                                                    // autoFocus
                                                                    placeholder="*INVOICE"
                                                                    value={values.invoice}
                                                                    onChange={(e) => {
                                                                        setInvoiceNameWidth(e?.target?.value?.length + 7);
                                                                        setFieldValue("invoice", e.target.value);
                                                                    }}
                                                                    className="login__input form-control py-2 px-4 block dark"
                                                                />
                                                            </div> */}

                                                            <div className="mt-2 font-medium mt-[22px]">
                                                                Invoice Number<span className="text-danger ml-1">*</span> :{" "}
                                                                <div>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="000000"
                                                                        value={values.invoiceNumber}
                                                                        onBlur={() => setFieldTouched("invoiceNumber", true)}
                                                                        onChange={(e) => {
                                                                            setFieldValue("invoiceNumber", e.target.value);
                                                                        }}
                                                                        className="login__input form-control py-2 px-4 block"
                                                                    />
                                                                </div>
                                                                {touched.invoiceNumber && errors.invoiceNumber && (
                                                                    <p className="text-red-500 text-[12px] mt-2">{errors.invoiceNumber}</p>
                                                                )}
                                                            </div>

                                                            <div className="mt-2 font-medium mt-[22px]">
                                                                Currency <span className="text-danger ml-1">*</span> :{" "}
                                                                <div>
                                                                    <CurrencySelect
                                                                        value={Currency?.find((item) => item?.value === values.currency)}
                                                                        styles={colourStyles}
                                                                        style={{ boxShadow: "none", zIndex: 1 }}
                                                                        options={Currency}
                                                                        onChange={(e) => {
                                                                            setFieldValue("currency", e?.value);
                                                                        }}
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
                                                            </div>
                                                            {touched.currency && errors.currency && (
                                                                <p className="text-red-500 text-[12px] mt-2">{errors.currency}</p>
                                                            )}

                                                            <div className="mt-2 font-medium mt-[22px]">
                                                                Due Date<span className="text-danger ml-1">*</span> :{" "}
                                                                <div>
                                                                    <DatePicker
                                                                        minDate={new Date()}
                                                                        dateFormat="dd-MM-yyyy"
                                                                        selected={values.duaDate}
                                                                        className="form-control"
                                                                        onBlur={() => setFieldTouched("duaDate", true)}
                                                                        onChange={(date) => setFieldValue("duaDate", date)}
                                                                        placeholderText="Select Due Date"
                                                                    />
                                                                </div>
                                                                {touched.invoiceNumber && errors.invoiceNumber && (
                                                                    <p className="text-red-500 text-[12px] mt-2">{errors.invoiceNumber}</p>
                                                                )}
                                                            </div>

                                                            {/* 
                                                            <div className="mt-1">
                                                                <DatePicker selected={new Date()} onChange={(date) => {}} />
                                                            </div> */}
                                                        </div>
                                                        <div className="col-span-12 sm:col-span-4"></div>
                                                        <div className="col-span-12 sm:col-span-4">
                                                            <div className="flex-1 flex flex-col ml-1">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Company Name *"
                                                                    // autoFocus
                                                                    value={values.shipToCompanyName}
                                                                    onChange={(e) => setFieldValue("shipToCompanyName", e.target.value)}
                                                                    onBlur={() => setFieldTouched("shipToCompanyName", true)}
                                                                    className="intro-x login__input form-control py-2 px-3 block text-right"
                                                                    style={{ width: "100%ch", maxWidth: "100%" }}
                                                                />
                                                                {touched.shipToCompanyName && errors.shipToCompanyName && (
                                                                    <p className="text-red-500 text-[12px] mt-2 text-right">
                                                                        {errors.shipToCompanyName}
                                                                    </p>
                                                                )}
                                                                <input
                                                                    type="text"
                                                                    placeholder="Name"
                                                                    // autoFocus
                                                                    value={values.shipToName}
                                                                    onChange={(e) => setFieldValue("shipToName", e.target.value)}
                                                                    onBlur={() => setFieldTouched("shipToName", true)}
                                                                    className="intro-x login__input form-control py-2 px-3 block text-right mt-[22px]"
                                                                    style={{ width: "100%ch", maxWidth: "100%" }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="GSTIN"
                                                                    // autoFocus
                                                                    value={values.shipToGst}
                                                                    onChange={(e) => setFieldValue("shipToGst", e.target.value)}
                                                                    onBlur={() => setFieldTouched("shipToGst", true)}
                                                                    className="intro-x login__input form-control py-2 px-3 block text-right mt-[22px]"
                                                                    style={{ width: "100%ch", maxWidth: "100%" }}
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Contact Number"
                                                                    // autoFocus
                                                                    value={values.shipToContact}
                                                                    onChange={(e) => setFieldValue("shipToContact", e.target.value)}
                                                                    onBlur={() => setFieldTouched("shipToContact", true)}
                                                                    className="intro-x login__input form-control py-2 px-3 block text-right mt-[22px]"
                                                                    style={{ width: "100%ch", maxWidth: "100%" }}
                                                                />

                                                                <input
                                                                    type="text"
                                                                    placeholder="abc@gmail.com"
                                                                    // autoFocus
                                                                    value={values.shipToEmail}
                                                                    onChange={(e) => setFieldValue("shipToEmail", e.target.value)}
                                                                    onBlur={() => setFieldTouched("shipToEmail", true)}
                                                                    className="intro-x login__input form-control py-2 px-3 block text-right mt-[22px]"
                                                                    style={{ width: "100%ch", maxWidth: "100%" }}
                                                                />

                                                                <textarea
                                                                    type="text"
                                                                    placeholder="Address *"
                                                                    // autoFocus
                                                                    value={values.shipToAddress}
                                                                    onChange={(e) => setFieldValue("shipToAddress", e.target.value)}
                                                                    onBlur={() => setFieldTouched("shipToAddress", true)}
                                                                    className="intro-x login__input form-control py-2 px-3 block text-right mt-[22px]"
                                                                    style={{ width: "100%ch", maxWidth: "100%" }}
                                                                />
                                                                {touched.shipToAddress && errors.shipToAddress && (
                                                                    <p className="text-red-500 text-[12px] mt-2 text-right">
                                                                        {errors.shipToAddress}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* SHIPPING AND BILLING DETAILS ENDS HERE */}

                                                <div className="border-t border-[#1E3A8A] mx-5 sm:mx-20"></div>

                                                {/* SHIPPING AND BILLING DETAILS ENDS HERE */}
                                                <div className="lg:flex-row px-5 sm:px-20 pt-8">
                                                    <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                                                        <div className="col-span-12 sm:col-span-6">
                                                            <div className="flex-1 mr-1">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Bill To *"
                                                                    // autoFocus
                                                                    value={values.billToLabel}
                                                                    onChange={(e) => setFieldValue("billToLabel", e.target.value)}
                                                                    onBlur={() => setFieldTouched("billToLabel", true)}
                                                                    className="login__input form-control py-2 px-4 block"
                                                                    style={{ width: "100%", maxWidth: "100%" }}
                                                                />
                                                                {touched.billToLabel && errors.billToLabel && (
                                                                    <p className="text-red-500 text-[12px] mt-2">{errors.billToLabel}</p>
                                                                )}

                                                                <input
                                                                    type="text"
                                                                    placeholder="Company Name *"
                                                                    // autoFocus
                                                                    value={values.billToCompanyName}
                                                                    onChange={(e) => setFieldValue("billToCompanyName", e.target.value)}
                                                                    onBlur={() => setFieldTouched("billToCompanyName", true)}
                                                                    className="login__input form-control py-2 px-4 block mt-[18px]"
                                                                    style={{ width: "100%", maxWidth: "100%" }}
                                                                />
                                                                {touched.billToCompanyName && errors.billToCompanyName && (
                                                                    <p className="text-red-500 text-[12px] mt-2">
                                                                        {errors.billToCompanyName}
                                                                    </p>
                                                                )}

                                                                <input
                                                                    type="text"
                                                                    placeholder="Name"
                                                                    // autoFocus
                                                                    value={values.billToName}
                                                                    onChange={(e) => setFieldValue("billToName", e.target.value)}
                                                                    onBlur={() => setFieldTouched("billToName", true)}
                                                                    className="login__input form-control py-2 px-4 block mt-[18px]"
                                                                    style={{ width: "100%", maxWidth: "100%" }}
                                                                />

                                                                <input
                                                                    type="text"
                                                                    placeholder="Contact Number"
                                                                    // autoFocus
                                                                    value={values.billToContact}
                                                                    onChange={(e) => setFieldValue("billToContact", e.target.value)}
                                                                    onBlur={() => setFieldTouched("billToContact", true)}
                                                                    className="login__input form-control py-2 px-4 block mt-[18px]"
                                                                    style={{ width: "100%", maxWidth: "100%" }}
                                                                />

                                                                <input
                                                                    type="text"
                                                                    placeholder="GSTIN"
                                                                    // autoFocus
                                                                    value={values.billToGst}
                                                                    onChange={(e) => setFieldValue("billToGst", e.target.value)}
                                                                    onBlur={() => setFieldTouched("billToGst", true)}
                                                                    className="login__input form-control py-2 px-4 block mt-[18px]"
                                                                    style={{ width: "100%", maxWidth: "100%" }}
                                                                />

                                                                <input
                                                                    type="text"
                                                                    placeholder="abc@gmail.com"
                                                                    // autoFocus
                                                                    value={values.billToEmail}
                                                                    onChange={(e) => setFieldValue("billToEmail", e.target.value)}
                                                                    onBlur={() => setFieldTouched("billToEmail", true)}
                                                                    className="login__input form-control py-2 px-4 block mt-[18px]"
                                                                    style={{ width: "100%", maxWidth: "100%" }}
                                                                />

                                                                <textarea
                                                                    type="text"
                                                                    placeholder="Address *"
                                                                    // autoFocus
                                                                    value={values.billToAddress}
                                                                    onChange={(e) => setFieldValue("billToAddress", e.target.value)}
                                                                    onBlur={() => setFieldTouched("billToAddress", true)}
                                                                    className="login__input form-control py-2 px-4 block mt-[18px]"
                                                                    style={{ width: "100%", maxWidth: "100%" }}
                                                                />
                                                                {touched.billToAddress && errors.billToAddress && (
                                                                    <p className="text-red-500 text-[12px] mt-2">{errors.billToAddress}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* SHIPPING AND BILLING DETAILS ENDS HERE  */}
                                            </div>
                                            <div className="px-5 sm:px-16 pt-10">
                                                {/* THIS CODE FOR THE MODAL BUTTON */}
                                                <div className="flex justify-end mb-5">
                                                    <button onClick={onClickAddNewProduct} className="btn btn-primary">
                                                        Add Product To The List
                                                    </button>
                                                </div>
                                                {/* THIS CODE IS FOR THE MODAL */}
                                                <div className="overflow-x-auto">
                                                    <table className="table" style={{ border: "0px solid" }}>
                                                        <thead>
                                                            <tr className="bg-[#1E3A8A] font-semibold text-[14px] text-[#FFFFFF]">
                                                                <th className="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                                                                    PRODUCT NAME
                                                                </th>
                                                                <th className="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                                                                    DESCRIPTION
                                                                </th>
                                                                <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                                                                    QTY
                                                                </th>
                                                                <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                                                                    PRICE
                                                                </th>
                                                                {values?.productList?.find((d) => d?.tax_type == "2") &&
                                                                    values?.productList?.tax_value != "" && (
                                                                        <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                                                                            IGST
                                                                        </th>
                                                                    )}
                                                                {values?.productList?.find((d) => d?.tax_type == "3") &&
                                                                    values?.productList?.tax_value != "" && (
                                                                        <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                                                                            SGST
                                                                        </th>
                                                                    )}
                                                                {values?.productList?.find((d) => d?.tax_type == "3") &&
                                                                    values?.productList?.tax_value != "" && (
                                                                        <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                                                                            CGST
                                                                        </th>
                                                                    )}
                                                                <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                                                                    SUBTOTAL
                                                                </th>
                                                                <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap w-[150px]">
                                                                    ACTION
                                                                </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {values.productList.map((item, index) => {
                                                                const amount = item?.qty * item?.price;
                                                                const igstP = item?.tax_value;
                                                                const sgstCgstP = item?.tax_value / 2;
                                                                const igst = (amount * igstP) / 100;
                                                                const sgstCgst = (amount * sgstCgstP) / 100;
                                                                const totalAmount = amount + (amount * igstP) / 100;
                                                                totalFormAmount = totalFormAmount + totalAmount;
                                                                return (
                                                                    <tr
                                                                        key={index}
                                                                        className={`${index % 2 === 0 ? "bg-[#F7F7F780]" : ""}`}>
                                                                        <td className="border-b dark:border-darkmode-400 text-[#3B4863] text-[14px] font-normal">
                                                                            {/* <div className="text-slate-500 dark:text-white text-sm mt-0.5 whitespace-nowrap"> */}
                                                                            {item?.name}
                                                                            {/* </div> */}
                                                                        </td>
                                                                        <td className="border-b dark:border-darkmode-400 text-[14px] font-normal">
                                                                            {item?.description}
                                                                        </td>
                                                                        <td className="text-right border-b dark:border-darkmode-400 w-32  text-[#3B4863] text-[14px] font-normal">
                                                                            {item?.qty}
                                                                        </td>
                                                                        <td className="text-right border-b dark:border-darkmode-400 w-32  text-[#3B4863] text-[14px] font-normal">
                                                                            <span>
                                                                                {decode(
                                                                                    Currency.find((c) => c?.value === values?.currency)
                                                                                        ?.symbol,
                                                                                )}
                                                                            </span>
                                                                            {item?.price.toFixed(2)}
                                                                        </td>

                                                                        {values?.productList?.find((d) => d?.tax_type == "2") && (
                                                                            <>
                                                                                {item?.tax_type == "2" ? (
                                                                                    <td className="text-right border-b dark:border-darkmode-400 w-32  text-[#3B4863] text-[14px] font-normal">
                                                                                        <div className="text-xs text-blue-800 dark:text-white">
                                                                                            {igstP}%
                                                                                        </div>
                                                                                        <span>
                                                                                            {decode(
                                                                                                Currency.find(
                                                                                                    (c) => c?.value === values?.currency,
                                                                                                )?.symbol,
                                                                                            )}
                                                                                        </span>
                                                                                        {igst.toFixed(2)}
                                                                                    </td>
                                                                                ) : (
                                                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                                                                        -
                                                                                    </td>
                                                                                )}
                                                                            </>
                                                                        )}

                                                                        {values?.productList?.find((d) => d?.tax_type == "3") && (
                                                                            <>
                                                                                {item?.tax_type == "3" ? (
                                                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 font-medium text-[#3B4863] text-[14px] font-normal">
                                                                                        <div className="text-xs text-blue-800 dark:text-white">
                                                                                            {sgstCgstP}%
                                                                                        </div>
                                                                                        <span>
                                                                                            {decode(
                                                                                                Currency.find(
                                                                                                    (c) => c?.value === values?.currency,
                                                                                                )?.symbol,
                                                                                            )}
                                                                                        </span>
                                                                                        {sgstCgst.toFixed(2)}
                                                                                    </td>
                                                                                ) : (
                                                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 font-medium text-[#3B4863] text-[14px] font-normal">
                                                                                        -
                                                                                    </td>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                        {values?.productList?.find((d) => d?.tax_type == "3") && (
                                                                            <>
                                                                                {item?.tax_type == "3" ? (
                                                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 font-medium text-[#3B4863] text-[14px] font-normal">
                                                                                        <div className="text-xs text-blue-800 dark:text-white">
                                                                                            {sgstCgstP}%
                                                                                        </div>
                                                                                        <span>
                                                                                            {decode(
                                                                                                Currency.find(
                                                                                                    (c) => c?.value === values?.currency,
                                                                                                )?.symbol,
                                                                                            )}
                                                                                        </span>
                                                                                        {sgstCgst.toFixed(2)}
                                                                                    </td>
                                                                                ) : (
                                                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 font-medium text-[#3B4863] text-[14px] font-normal">
                                                                                        -
                                                                                    </td>
                                                                                )}
                                                                            </>
                                                                        )}

                                                                        <td className="text-right border-b dark:border-darkmode-400 w-32 font-medium text-[#3B4863] text-[14px] font-normal">
                                                                            <span>
                                                                                {decode(
                                                                                    Currency.find((c) => c?.value === values?.currency)
                                                                                        ?.symbol,
                                                                                )}
                                                                            </span>
                                                                            {totalAmount.toFixed(2)}
                                                                        </td>
                                                                        <td className="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                                                                            <Icon.Edit
                                                                                onClick={() => onClickEditProduct(item)}
                                                                                size={35}
                                                                                className="remove-data btn bg-slate-500 btn-sm text-slate-50 mr-2"
                                                                            />
                                                                            <Icon.Trash2
                                                                                onClick={() => onClickDeleteProduct(item?.id)}
                                                                                size={35}
                                                                                className="remove-data btn btn-danger btn-sm"
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                    {values.productList?.length === 0 && (
                                                        <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                                                            <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">
                                                                No Record Found
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-12 gap-4 gap-y-3 mx-5 sm:mx-16 my-10 bg-[#F7F7F780] p-6 mt-0">
                                                <div className="col-span-12 sm:col-span-6">
                                                    <div className="text-xl text-blue-800 dark:text-white font-bold">Total (in words)</div>
                                                    <div className="text-slate-400">{withDecimal(totalFormAmount?.toFixed(2))}</div>
                                                </div>
                                                <div className="col-span-12 sm:col-span-3"></div>
                                                <div className="col-span-12 sm:col-span-3">
                                                    <div className="text-center sm:text-right sm:ml-auto">
                                                        <div className="text-xl text-blue-800 dark:text-white font-bold mt-2">
                                                            Total Amount :{" "}
                                                            <span>
                                                                {decode(Currency.find((c) => c?.value === values?.currency)?.symbol)}
                                                            </span>
                                                            {totalFormAmount?.toFixed(2)}
                                                        </div>

                                                        <div className="mt-6">
                                                            <input
                                                                type="text"
                                                                placeholder="System generated invoice *"
                                                                // autoFocus
                                                                value={values.signature}
                                                                onChange={(e) => setFieldValue("signature", e.target.value)}
                                                                onBlur={() => setFieldTouched("signature", true)}
                                                                className="intro-x login__input form-control py-2 px-3 block text-right mt-2"
                                                                style={{ width: "100%ch", maxWidth: "100%" }}
                                                            />
                                                            {touched.signature && errors.signature && (
                                                                <p className="text-red-500 text-[12px] mt-2">{errors.signature}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddInvoice;

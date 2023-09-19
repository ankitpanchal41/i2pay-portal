import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Icon from "react-feather";
import { v4 as UUID } from "uuid";
import { Formik, Form } from "formik";
import { paymentCardSchema } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import { store } from "../../redux/store";
import { productDetailHandle } from "../../redux/services/Product";
import { DETAIL_PAYMENT_CARD_REQUEST, UPDATE_PAYMENT_CARD_REQUEST } from "../../redux/actions/PaymentCardAction";
import { ClipLoader } from "react-spinners";
import { productListData } from "../../redux/services/PaymentCard";

const Input = React.lazy(() => import("../../components/common/forms/Input"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Select = React.lazy(() => import("react-select"));
const Creatable = React.lazy(() => import("react-select/creatable"));
const DropzoneComponent = React.lazy(() => import("../../components/common/forms/Dropzone"));
const PaymentCardPreviewModal = React.lazy(() => import("../../components/common/PaymentCardPreviewModal"));
const TemplateOneMerchantPreview = React.lazy(() => import("./PaymentCardPreview/TemplateOne/TemplateOneMerchantPreview"));
const Templates = React.lazy(() => import("./Templates"));
const TemplateTwoMerchantPreview = React.lazy(() => import("./PaymentCardPreview/TemplateTwo/TemplateTwoMerchantPreview"));
const TemplateThreeMerchantPreview = React.lazy(() => import("./PaymentCardPreview/TemplateThree/TemplateThreeMerchantPreview"));
const TemplateFourMerchantPreview = React.lazy(() => import("./PaymentCardPreview/TemplateFour/TemplateFourMerchantPreview"));
const TemplateFiveMerchantPreview = React.lazy(() => import("./PaymentCardPreview/TemplateFive/TemplateFiveMerchantPreview"));
const Variants = React.lazy(() => import("./Variants"));
const Options = React.lazy(() => import("./Options"));
const Pricing = React.lazy(() => import("./Pricing"));
const Specifications = React.lazy(() => import("./Specifications"));

const PaymentCardEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { paymentCardId } = useParams();
    const { userData } = store.getState()?.persist;

    const initialValuesObj = {
        title: "",
        currency: "INR",
        price: "",
        quantity: "",
        compare_price: "",
        description: "",
        logo: "",
        sku: "",
        pricing_option: "0",
        specifications_enable: "0",
        specifications: [{ key: "", value: "" }],
        options: [{ name: { label: "", value: "" }, value: [{ id: "", value: "" }] }],
        variants: [
            {
                variant: "",
                quantity: "",
                price: "",
                image: "",
                sku: "",
            },
        ],
    };

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const [optionValueErrorObject, setOptionValueErrorObject] = useState([""]);
    const [apiVariantError, setAPIVariantError] = useState({});
    const [disableFields, setDisableFields] = useState(false);
    const { detailPaymentCard } = useSelector((state) => state.paymentCard);
    const [isLoading, setIsLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [submitValue, setSubmitValue] = useState({});
    const [previewValue, setPreviewValue] = useState({});
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [isVisibleTemplateModal, setIsVisibleTemplateModal] = useState(false);
    const [templateId, setTemplateId] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState([""]);
    const [optionErrorObject, setOptionErrorObject] = useState([]);

    const state = useSelector((state) => state);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateListing = () => {
            navigate("/payment-card");
        };

        setIsLoading(true);
        let payload = { merchant_id: userData?.data?.id, id: paymentCardId };

        dispatch({ type: DETAIL_PAYMENT_CARD_REQUEST, payload, callBack, navigateListing });
    }, []);

    const getProductList = async () => {
        const payload = { merchant_id: state?.persist?.userData?.data?.id };
        const data = await productListData(payload);

        if (data?.responseCode === 200) {
            const products = [];
            data?.data?.map((p) => {
                products.push({ value: p?.id, label: p?.name });
            });
            setProductList(products);
        }
    };

    useEffect(() => {
        getProductList();
    }, []);

    useEffect(() => {
        if (Object.keys(detailPaymentCard).length !== 0) {
            const title = productList?.find((p) => p?.label === detailPaymentCard?.title);

            if (title) {
                setDisableFields(true);
            }

            setTemplateId(detailPaymentCard?.template_id);

            const options = [];
            if (detailPaymentCard?.options && Object.keys(detailPaymentCard?.options).length > 0) {
                for (const property in detailPaymentCard?.options) {
                    const value = [];
                    for (const valueProperty in detailPaymentCard?.options[property]) {
                        value.push({
                            id: valueProperty,
                            value: detailPaymentCard?.options[property][valueProperty],
                        });
                    }

                    options.push({
                        name: { label: property[0].toUpperCase() + property.slice(1), value: property },
                        value: value,
                    });
                }
            }

            const variants = [];
            if (detailPaymentCard?.product_variant) {
                detailPaymentCard?.product_variant?.map((v) => {
                    variants.push({
                        variants: v?.variant,
                        displayVariant: v?.variant_values.join(" / "),
                        quantity: v?.quantity,
                        price: v?.price,
                        image: v?.image,
                        sku: v?.sku,
                        id: v?.id,
                    });
                });
            }

            if (variants.length === 0) {
                variants.push({
                    variant: "",
                    quantity: "",
                    price: "",
                    image: "",
                    sku: "",
                });
            }

            if (options.length === 0) {
                options.push({ name: { label: "", value: "" }, value: [{ id: "", value: "" }] });
            }

            // setInitialValues({
            // title: title ? title : { label: detailPaymentCard?.title, value: detailPaymentCard?.title },
            // currency: detailPaymentCard?.currency,
            // amount: detailPaymentCard?.amount,
            // description: detailPaymentCard?.description,
            // logo: detailPaymentCard?.logo,

            setInitialValues({
                ...initialValues,
                title: title ? title : { label: detailPaymentCard?.title, value: detailPaymentCard?.title },
                currency: detailPaymentCard?.currency,
                logo: detailPaymentCard?.product_image,
                price: detailPaymentCard?.price,
                compare_price: detailPaymentCard?.compare_price,
                description: detailPaymentCard?.description,
                sku: detailPaymentCard?.sku,
                quantity: detailPaymentCard?.quantity,
                pricing_option:
                    (detailPaymentCard?.options && Object.keys(detailPaymentCard?.options).length === 0) ||
                    detailPaymentCard?.options === ""
                        ? "0"
                        : "1",
                options,
                variants,
                specifications_enable: detailPaymentCard?.specification?.length > 0 ? "1" : "0",
                specifications: detailPaymentCard?.specification?.length > 0 ? detailPaymentCard?.specification : "",
            });

            let newOptions = [...selectedOptions];
            options?.map((o, index) => {
                newOptions[index] = o?.name?.value;
            });

            setSelectedOptions(newOptions);
        }
    }, [detailPaymentCard, productList]);

    const onCloseModal = () => {
        setIsVisibleModal(false);
    };

    const onSubmit = (values) => {
        if (isSubmiting) return;

        if (optionErrorObject.length > 0) {
            return false;
        }
        setSubmitValue({
            ...values,
            preview: values?.logo
                ? values?.logo?.includes("http://") || values?.logo?.includes("https://")
                    ? values?.logo
                    : URL.createObjectURL(values?.logo[0])
                : undefined,
        });
        setIsVisibleModal(true);

        const objectValueError = false;
        optionValueErrorObject?.map((error) => {
            if (error?.length > 0) {
                objectValueError = true;
            }
        });

        if (objectValueError) {
            return false;
        }

        const options = {};
        values?.options?.map((o) => {
            const val = {};
            o?.value?.map((v) => {
                val[v?.id] = v?.value;
            });
            options[o?.name?.value] = val;
        });

        const variants = [];

        if (values?.variants?.length > 0) {
            values?.variants?.map((v) => {
                var variant_values = v?.displayVariant?.split("/")?.map(function (item) {
                    return item?.trim();
                });
                variants.push({
                    image: v?.image,
                    variant: v?.variant,
                    price: v?.price,
                    quantity: v?.quantity,
                    sku: v?.quantity,
                    variant_values,
                });
            });
        }

        const json = {
            name: values?.title?.label,
            description: values?.description,
            image: values?.logo
                ? values?.logo?.includes("http://") || values?.logo?.includes("https://")
                    ? values?.logo
                    : URL.createObjectURL(values?.logo[0])
                : undefined,
            price: values?.price,
            compare_price: values?.compare_price,
            quantity: values?.quantity,
            sku: values?.sku,
            options: values?.options?.[0]?.name?.value ? options : "",
            specifications: values?.specifications ? JSON.stringify(values?.specifications) : "",
            product_variant: variants,
            currency: values?.currency,
            product_image: values?.logo
                ? values?.logo?.includes("http://") || values?.logo?.includes("https://")
                    ? values?.logo
                    : URL.createObjectURL(values?.logo[0])
                : undefined,
        };

        setPreviewValue(json);
    };

    const onSubmitAPI = () => {
        const values = submitValue;

        setIsSubmiting(true);

        const callBack = () => {
            setIsVisibleModal(false);
            setIsSubmiting(false);
        };

        const navigateState = () => {
            setIsVisibleModal(false);
            setIsSubmiting(false);
            navigate(`/payment-card`);
        };

        let payload = {};
        if (disableFields) {
            payload = {
                product_id: values?.title?.value,
                template_id: templateId,
                id: paymentCardId,
                merchant_id: userData?.data?.id,
            };
        } else {
            const options = {};
            values?.options?.map((o) => {
                const val = {};
                o?.value?.map((v) => {
                    val[v?.id] = v?.value;
                });
                options[o?.name?.value] = val;
            });

            payload = {
                ...values,
                price: values?.pricing_option === "1" ? null : values?.price,
                sku: values?.pricing_option === "1" ? null : values?.sku,
                compare_price: values?.pricing_option === "1" ? null : values?.compare_price,
                options: values?.pricing_option === "1" ? JSON.stringify(options) : null,
                variants: values?.pricing_option === "1" ? JSON.stringify(values?.variants) : null,
                specifications: values?.specifications_enable === "1" ? JSON.stringify(values?.specifications) : null,
                template_id: templateId,
                id: paymentCardId,
                merchant_id: userData?.data?.id,
                logo: values?.logo,
                title: values?.title?.value,
            };
        }

        const formData = new FormData();

        for (const property in payload) {
            if (payload[property] === null) {
            } else if (property === "logo") {
                if (payload[property]?.includes("http://") || payload[property]?.includes("https://")) {
                } else if (payload[property][0] === undefined) {
                    formData.append(property, "");
                } else {
                    formData.append(property, payload[property][0]);
                }
            } else if (property !== "preview") {
                formData.append(property, payload[property]);
            }
        }

        const variantError = (error) => {
            const errors = JSON.parse(error?.response);
            setAPIVariantError(errors);
        };

        dispatch({ type: UPDATE_PAYMENT_CARD_REQUEST, payload: formData, callBack, navigateState, variantError });
    };

    const onGetProductDetail = async (title, value, isNew) => {
        if (isNew) {
            setDisableFields(false);
            setInitialValues({
                title: title,
                currency: "INR",
                price: "",
                quantity: "",
                compare_price: "",
                description: "",
                logo: "",
                sku: "",
                pricing_option: "0",
                specifications_enable: "0",
                specifications: [{ key: "", value: "" }],
                options: [{ name: { label: "", value: "" }, value: [{ id: "", value: "" }] }],
                variants: [
                    {
                        variant: "",
                        quantity: "",
                        price: "",
                        image: "",
                        sku: "",
                    },
                ],
            });
        } else {
            const formData = new FormData();
            formData.append("product_id", value);
            formData.append("user_id", userData?.data?.id);

            setIsLoading(true);

            const data = await productDetailHandle(formData);
            setIsLoading(false);
            if (data?.responseCode) {
                setDisableFields(true);
                // setInitialValues({
                //     title: title,
                //     currency: "INR",
                //     price: data?.data?.[0]?.price,
                //     description: data?.data?.[0]?.description,
                //     logo: data?.data?.[0]?.product_image,
                // });
                const options = [];
                if (data?.data?.[0]?.options && Object.keys(data?.data?.[0]?.options).length > 0) {
                    for (const property in data?.data?.[0]?.options) {
                        const value = [];
                        for (const valueProperty in data?.data?.[0]?.options[property]) {
                            value.push({
                                id: valueProperty,
                                value: data?.data?.[0]?.options[property][valueProperty],
                            });
                        }

                        options.push({
                            name: { label: property[0].toUpperCase() + property.slice(1), value: property },
                            value: value,
                        });
                    }
                }

                const variants = [];
                if (data?.data?.[0]?.product_variant) {
                    data?.data?.[0]?.product_variant?.map((v) => {
                        variants.push({
                            variants: v?.variant,
                            displayVariant: v?.variant_values.join(" / "),
                            quantity: v?.quantity,
                            price: v?.price,
                            image: v?.image,
                            sku: v?.sku,
                        });
                    });
                }

                if (variants.length === 0) {
                    variants.push({
                        variant: "",
                        quantity: "",
                        price: "",
                        image: "",
                        sku: "",
                    });
                }

                if (options.length === 0) {
                    options.push({ name: { label: "", value: "" }, value: [{ id: "", value: "" }] });
                }

                setInitialValues({
                    ...initialValues,
                    title: title,
                    currency: "INR",
                    price: data?.data?.[0]?.price,
                    description: data?.data?.[0]?.description,
                    logo: data?.data?.[0]?.product_image,
                    compare_price: data?.data?.[0]?.compare_price,
                    sku: data?.data?.[0]?.sku,
                    quantity: data?.data?.[0]?.quantity,
                    pricing_option:
                        (data?.data?.[0]?.options && Object.keys(data?.data?.[0]?.options).length === 0) || data?.data?.[0]?.options === ""
                            ? "0"
                            : "1",
                    options,
                    variants,
                    specifications_enable: data?.data?.[0]?.specifications ? "1" : "0",
                    specifications: data?.data?.[0]?.specifications ? JSON.parse(data?.data?.[0]?.specifications) : "",
                });
            }
        }
    };

    const onChooseTemplate = (id) => {
        setTemplateId(id);
        onCloseTemplateModal();
    };

    const onCloseTemplateModal = () => {
        setIsVisibleTemplateModal(false);
    };

    const onOpenTemplateModal = () => {
        setIsVisibleTemplateModal(true);
    };

    const onChangePricingOption = (e, values) => {
        setInitialValues({
            ...values,
            price: "",
            compare_price: "",
            sku: "",
            quantity: "",
            pricing_option: e.target.checked ? "1" : "0",
            options: [{ name: { label: "", value: "" }, value: [{ id: "", value: "" }] }],
            variants: [
                {
                    variant: "",
                    quantity: "",
                    price: "",
                    image: "",
                    sku: "",
                },
            ],
        });
    };

    let handleChange = (onChange, mi, i, e, values) => {
        values.options[mi].value[i] = { id: UUID(), value: e.target.value };

        onChange("options", values.options, false);

        const newOptionsValue = [];
        values.options?.map((o) => {
            const aaa = [];
            o?.value?.map((v) => {
                aaa.push(v?.value);
            });
            newOptionsValue.push(aaa);
        });

        const duplicateItem = [];
        newOptionsValue?.map((ov) => {
            const value = ov.filter((item, index) => index !== ov?.indexOf(item));
            duplicateItem.push(value);
        });

        const newErrorObj = [];

        newOptionsValue?.map((o, index) => {
            const aaa = [];
            o?.map((value, subIndex) => {
                if (duplicateItem[index]?.includes(value)) {
                    if (value) {
                        aaa[subIndex] = true;
                        // newErrorObj[index][subIndex] = "ERROR" + subIndex;
                    }
                }
            });
            newErrorObj.push(aaa);
        });

        setOptionValueErrorObject(newErrorObj);
    };

    const onRemoveOptionValueValidation = (values) => {
        const newOptionsValue = [];
        values.options?.map((o) => {
            const aaa = [];
            o?.value?.map((v) => {
                aaa.push(v?.value);
            });
            newOptionsValue.push(aaa);
        });

        const duplicateItem = [];
        newOptionsValue?.map((ov) => {
            const value = ov.filter((item, index) => index !== ov?.indexOf(item));
            duplicateItem.push(value);
        });

        const newErrorObj = [];

        newOptionsValue?.map((o, index) => {
            const aaa = [];
            o?.map((value, subIndex) => {
                if (duplicateItem[index]?.includes(value)) {
                    if (value) {
                        aaa[subIndex] = true;
                        // newErrorObj[index][subIndex] = "ERROR" + subIndex;
                    }
                }
            });
            newErrorObj.push(aaa);
        });

        setOptionValueErrorObject(newErrorObj);
    };

    const onChangeVariantsValue = (key, index, variants, value) => {
        const customizeAPIVariantError = { ...apiVariantError };
        variants?.map((variant, index) => {
            if (variant[key] === value) {
                customizeAPIVariantError[key][index] = "";
            }
        });

        //
        setAPIVariantError(customizeAPIVariantError);
    };

    const onHandleAddOption = (onClick, values) => {
        const newValue = [...values.options, { name: { label: "", value: "" }, value: [{ id: "", value: "" }] }];

        onClick("options", newValue, false);
    };

    const onChangeOption = (setFieldValue, values, e, mainIndex) => {
        values.options[mainIndex].name = e;
        setFieldValue(`options`, values.options);

        let newOptions = [...selectedOptions];
        newOptions[mainIndex] = e?.value;

        setSelectedOptions(newOptions);

        const duplicateItem = newOptions.filter((item, index) => index !== newOptions?.indexOf(item));

        const newErrorObj = [];

        newOptions?.map((o, index) => {
            if (duplicateItem?.includes(o)) {
                if (o) {
                    newErrorObj[index] = "ERROR" + index;
                }
            }
        });

        setOptionErrorObject(newErrorObj);
    };

    const onCheckDuplicateOption = (index) => {
        let newOptions = [...selectedOptions];
        newOptions = newOptions.filter((e, i) => i !== index);
        setSelectedOptions(newOptions);

        const duplicateItem = newOptions.filter((item, index) => index !== newOptions?.indexOf(item));

        const newErrorObj = [];

        newOptions?.map((o, index) => {
            if (duplicateItem?.includes(o)) {
                if (o) {
                    newErrorObj[index] = "ERROR" + index;
                }
            }
        });

        setOptionErrorObject(newErrorObj);
    };

    const onClickBack = () => {
        navigate(`/payment-card`);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Edit Payment Card"}
                displayBackButton={true}
                onClickBack={onClickBack}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <button className="btn text-sm font-medium text-white bg-primary max-h-[38px]" onClick={onOpenTemplateModal}>
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Choose Another Template</span>
                        </button>
                    </div>
                }
            />
        );
    };

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles, { isDisabled }) => ({
            ...styles,
            backgroundColor: mode === "dark" ? (isDisabled ? "#202a41" : "#1b253b") : isDisabled ? "#f1f5f9" : "white",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
            borderRadius: ".375rem",
            borderColor: "#E2E8F0",
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
        menuList: (styles, { data }) => ({ ...styles, maxHeight: 150 }),
    };

    return (
        <>
            <PaymentCardPreviewModal visible={isVisibleTemplateModal} onClose={onCloseTemplateModal}>
                <Templates onChooseTemplate={onChooseTemplate} />
            </PaymentCardPreviewModal>

            <PaymentCardPreviewModal
                closeDark={templateId === 2 || templateId === 3 ? true : false}
                visible={isVisibleModal}
                onClose={onCloseModal}>
                {templateId === 1 ? (
                    <TemplateOneMerchantPreview data={previewValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} />
                ) : templateId === 2 ? (
                    <TemplateTwoMerchantPreview data={previewValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} />
                ) : templateId === 3 ? (
                    <TemplateThreeMerchantPreview data={previewValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} />
                ) : templateId === 4 ? (
                    <TemplateFourMerchantPreview data={previewValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} />
                ) : (
                    <TemplateFiveMerchantPreview data={previewValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} />
                )}
                {/* <TemplateOneMerchantPreview data={submitValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} /> */}
                {/* <TemplateTwoMerchantPreview data={submitValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} /> */}
                {/* <TemplateThreeMerchantPreview data={submitValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} />                 */}
                {/* <TemplateFourMerchantPreview data={submitValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} /> */}
                {/* <TemplateFiveMerchantPreview data={submitValue} onClickSave={onSubmitAPI} isSubmiting={isSubmiting} /> */}
            </PaymentCardPreviewModal>
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 overflow-x-auto overflow-hidden">
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
                                        <div className="">
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={paymentCardSchema}
                                                onSubmit={onSubmit}
                                                enableReinitialize>
                                                {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                                    <Form className="">
                                                        <div className="grid grid-cols-12 gap-4 gap-y-5 box-without-margin p-5">
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <label className="form-label">
                                                                    {messages.paymentCard.title}{" "}
                                                                    <small className="text-gray-500">
                                                                        (<em>You can select exiting product or create new product</em>)
                                                                    </small>{" "}
                                                                    <span className="text-danger"> *</span>
                                                                </label>
                                                                <Creatable
                                                                    value={values?.title}
                                                                    styles={colourStyles}
                                                                    style={{ boxShadow: "none" }}
                                                                    placeholder="Select or Create"
                                                                    options={productList}
                                                                    onChange={(e) => {
                                                                        setFieldValue("title", e);
                                                                        onGetProductDetail(e, e.value, e.__isNew__);
                                                                    }}
                                                                    className="intro-x login__input form-control block shadow-none"
                                                                />
                                                                {errors.title && touched.title ? (
                                                                    <p className="text-red-500 mt-2 ml-1">{errors.title}</p>
                                                                ) : null}
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <label className="form-label">
                                                                    {messages.paymentLink.currency} <span className="text-danger"> *</span>
                                                                </label>
                                                                <Select
                                                                    isDisabled={disableFields}
                                                                    defaultValue={{ value: "INR", label: "India Rupee" }}
                                                                    value={Currency?.find((item) => item?.value === values?.currency)}
                                                                    styles={colourStyles}
                                                                    style={{ boxShadow: "none" }}
                                                                    options={Currency}
                                                                    onChange={(e) => {
                                                                        setFieldValue("currency", e?.value);
                                                                    }}
                                                                    className="intro-x login__input form-control block shadow-none"
                                                                    getOptionLabel={(e) => (
                                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                                            <span style={{ marginLeft: 5 }}>
                                                                                <span>{decode(e.symbol)}</span> ({e?.value})
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                <Input
                                                                    readOnly={disableFields}
                                                                    rows="6"
                                                                    textarea="true"
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.paymentCard.description}
                                                                    name="description"
                                                                    label={messages.paymentCard.description}
                                                                    isRequiredField
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-12">
                                                                <label className="form-label">
                                                                    {messages.paymentCard.productImage}
                                                                    <span className="text-danger"> *</span>
                                                                </label>
                                                                <DropzoneComponent
                                                                    disabled={disableFields}
                                                                    error={errors.logo}
                                                                    touched={touched.logo}
                                                                    setFieldValue={setFieldValue}
                                                                    name="logo"
                                                                    placeholder={messages.paymentCard.productImage}
                                                                    values={values.logo}
                                                                    accept="image/png,image/jpg,image/jpeg"
                                                                />
                                                            </div>
                                                        </div>

                                                        <Pricing disableFields={disableFields} values={values} />

                                                        <Specifications
                                                            disableFields={disableFields}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors}
                                                            touched={touched}
                                                        />

                                                        <Options
                                                            disableFields={disableFields}
                                                            pricingOption={values?.pricing_option}
                                                            onChangePricingOption={(e) => {
                                                                onChangePricingOption(e, values);
                                                            }}
                                                            values={values}
                                                            onChangeOption={onChangeOption}
                                                            onCheckDuplicateOption={onCheckDuplicateOption}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors}
                                                            touched={touched}
                                                            optionErrorObject={optionErrorObject}
                                                            optionValueErrorObject={optionValueErrorObject}
                                                            handleChange={handleChange}
                                                            setFieldTouched={setFieldTouched}
                                                            onHandleAddOption={onHandleAddOption}
                                                            onRemoveOptionValueValidation={onRemoveOptionValueValidation}
                                                        />

                                                        <Variants
                                                            disableFields={disableFields}
                                                            options={values?.options}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors}
                                                            touched={touched}
                                                            apiVariantError={apiVariantError}
                                                            onChangeVariantsValue={onChangeVariantsValue}
                                                        />
                                                        <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                            <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                                <button
                                                                    type="buttons"
                                                                    className="btn btn-primary w-24 ml-2"
                                                                    onClick={handleSubmit}
                                                                    // disabled={!isValid || isSubmiting}
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>
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

export default PaymentCardEdit;

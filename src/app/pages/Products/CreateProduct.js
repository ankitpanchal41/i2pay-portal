import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { v4 as UUID } from "uuid";
import { productDetails } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import { createProductStart } from "../../redux/actions/Product";
import Specifications from "./Specifications";
import Pricing from "./Pricing";
import Select from "react-select";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as Icon from "react-feather";
import SoreDropzone from "../../components/common/forms/SoreDropzone";
import { getCategoryList, getCategoryListHandle } from "../../redux/services/Product";
import OnSale from "./OnSale";
import { showToastMessage } from "../../utils/methods";
import ProductAdvanceSearchModal from "../../components/common/ProductAdvanceSearchModal";
const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Dropzone = React.lazy(() => import("../../components/common/forms/Dropzone"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Creatable = React.lazy(() => import("react-select/creatable"));
const Options = React.lazy(() => import("./Options"));
const Variants = React.lazy(() => import("./Variants"));

const OPTIONS = [
    { label: "Size", value: "size" },
    { label: "Color", value: "color" },
    { label: "Material", value: "material" },
    { label: "Style", value: "style" },
];

const CreateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { storeId } = useParams();

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            padding: "4px",
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

    const initialValuesObj = {
        name: "",
        category_id: "",
        description: "",
        product_image: "",
        compare_price: "",
        price: "",
        sku: "",
        quantity: "",
        pricing_option: "0",
        on_sale: "0",
        specifications_enable: "0",
        store_id: storeId,
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

    const [listingType, setListingType] = useState("");
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([""]);
    // const [selectedOptionsValue, setSelectedOptionsValue] = useState([""]);
    const [optionValueErrorObject, setOptionValueErrorObject] = useState([""]);
    const [optionErrorObject, setOptionErrorObject] = useState([]);
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const [categoryListData, setCategoryListData] = useState([]);
    const [apiVariantError, setAPIVariantError] = useState({});
    const [imageCropModalVisible, setImageCropModalVisible] = useState(false);
    const [cropper, setCropper] = useState();
    const [imageCropData, setImageCropData] = useState({ name: "", value: "" });
    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
    };

    const state = useSelector((state) => state);

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        const data = await getCategoryListHandle({ store_id: storeId });

        if (data?.responseCode === 200) {
            setCategoryListData(data?.data);
        }
    };

    const onSubmit = async (values) => {
        if (optionErrorObject.length > 0) {
            return false;
        }

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

        const submitValues = {
            ...values,
            price: values?.pricing_option === "1" ? null : values?.price,
            sku: values?.pricing_option === "1" ? null : values?.sku,
            compare_price: values?.pricing_option === "1" ? null : values?.compare_price,
            options: values?.pricing_option === "1" ? JSON.stringify(options) : null,
            variants: values?.pricing_option === "1" ? JSON.stringify(values?.variants) : null,
            specifications: values?.specifications_enable === "1" ? JSON.stringify(values?.specifications) : null,
        };

        if (isSubmiting) return;
        setIsSubmiting(true);
        const formData = new FormData();
        Object.keys(submitValues).forEach((item) => {
            if (submitValues[item] === null) {
            } else if (item === "product_image") {
                formData.append(item, submitValues[item]);
            } else {
                formData.append(item, submitValues[item]);
            }
        });
        const callback = () => {
            setIsSubmiting(false);
        };

        const variantError = (error) => {
            const errors = JSON.parse(error?.response);
            setAPIVariantError(errors);
        };

        dispatch(createProductStart(formData, callback, () => navigate(`/products/${storeId}`), variantError));
    };

    const onChangePricingOption = (e, values) => {
        setInitialValues({
            ...values,
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

    let handleChange = (onChange, mi, i, e, values, id, option) => {
        values.options[mi].value[i] = { id: id ? id : Math.floor(Date.now()) + "-" + UUID(), value: e.target.value };

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
        navigate(`/products/${storeId}`);
    };

    const _renderHeading = () => {
        return <Heading title={"Add Product"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const onSaveImage = (setFieldValue) => {
        if (typeof cropper !== "undefined") {
            setFieldValue(imageCropData?.name, cropper.getCroppedCanvas().toDataURL());

            setImageCropModalVisible(false);
        }
    };

    const onCloseBannerImage = () => {
        setImageCropModalVisible(false);
    };

    return (
        <>
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* <ProductAdvanceSearchModal /> */}
                {/* END: Heading */}

                <div className="">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 overflow-x-auto overflow-hidden">
                                {/* BEGIN: Connector Table */}
                                <div className="">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={productDetails}
                                        onSubmit={onSubmit}
                                        validateOnMount
                                        enableReinitialize>
                                        {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                                            <Form className="">
                                                {imageCropModalVisible && (
                                                    <div className=" justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                                                        <div className="relative my-6 mx-auto h-full w-full bg-white flex flex-col items-center justify-around">
                                                            <div className="flex flex-col items-center">
                                                                <h1 className="text-lg font-medium mt-2">Crop Image</h1>
                                                                <small class="text-gray-500">
                                                                    <em>
                                                                        To set the product image you need to set the image to 1:1 aspect
                                                                        ratio
                                                                    </em>
                                                                </small>
                                                                <button
                                                                    type="button"
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500 absolute right-5"
                                                                    onClick={onCloseBannerImage}>
                                                                    <Icon.X size={25} />
                                                                </button>
                                                            </div>
                                                            <div className="crop-container">
                                                                <Cropper
                                                                    src={imageCropData?.value}
                                                                    style={{ height: "400px", width: "100%" }}
                                                                    zoomTo={0.5}
                                                                    aspectRatio={1 / 1}
                                                                    minCropBoxHeight={750}
                                                                    minCropBoxWidth={750}
                                                                    zoomOnWheel={false}
                                                                    crop={onCrop}
                                                                    ref={cropperRef}
                                                                    background={false}
                                                                    responsive={true}
                                                                    autoCropArea={1}
                                                                    checkOrientation={false}
                                                                    onInitialized={(instance) => {
                                                                        setCropper(instance);
                                                                    }}
                                                                    guides={true}
                                                                    viewMode={1}
                                                                    preview=".img-preview"
                                                                />
                                                            </div>
                                                            <div className="controls">
                                                                <div className="flex justify-center">
                                                                    <button
                                                                        type="buttons"
                                                                        className="btn btn-primary w-24 ml-2"
                                                                        onClick={() => {
                                                                            onSaveImage(setFieldValue);
                                                                        }}>
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-danger w-24 ml-4"
                                                                        type="button"
                                                                        onClick={onCloseBannerImage}>
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="grid grid-cols-12 gap-4 gap-y-5 box-without-margin p-5">
                                                    <div className="intro-y col-span-12 sm:col-span-12">
                                                        <Input
                                                            type="text"
                                                            className="intro-x login__input form-control py-2 px-3 block"
                                                            placeholder={messages.productTitles.productName}
                                                            name="name"
                                                            label={messages.productTitles.productName}
                                                            isRequiredField
                                                        />
                                                    </div>
                                                    <div className="intro-y col-span-12 sm:col-span-12">
                                                        <Input
                                                            rows="6"
                                                            textarea="true"
                                                            type="text"
                                                            className="intro-x login__input form-control py-2 px-3 block"
                                                            placeholder={messages.productTitles.description}
                                                            name="description"
                                                            label={messages.productTitles.description}
                                                            isRequiredField
                                                        />
                                                    </div>
                                                    <div className="intro-y col-span-12 sm:col-span-12">
                                                        <label className="form-label flex mt-4">Category</label>
                                                        <div className="flex items-center">
                                                            <Select
                                                                value={categoryListData?.find(
                                                                    (item) => item?.value === values?.category_id,
                                                                )}
                                                                styles={colourStyles}
                                                                style={{ boxShadow: "none" }}
                                                                options={categoryListData}
                                                                onChange={(e) => {
                                                                    setFieldValue("category_id", e?.value);
                                                                }}
                                                                className="intro-x login__input form-control block shadow-none"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="intro-y col-span-12 sm:col-span-12">
                                                        <label className="form-label">
                                                            {messages.productTitles.image}
                                                            <span className="text-danger"> *</span>
                                                        </label>
                                                        <SoreDropzone
                                                            setFieldValue={(name, value, tag = "", file) => {
                                                                if (tag === "remove") {
                                                                    setFieldValue(name, value);
                                                                } else {
                                                                    if (file?.width < 750 || file?.height < 750) {
                                                                        showToastMessage("Please upload image min 750x750", 500);
                                                                        return false;
                                                                    } else {
                                                                        setImageCropModalVisible(true);
                                                                        setImageCropData({ name, value });
                                                                    }
                                                                }
                                                            }}
                                                            type="product_image"
                                                            error={errors.product_image}
                                                            touched={touched.product_image}
                                                            name="product_image"
                                                            placeholder={messages.productTitles.image}
                                                            values={values.product_image}
                                                            accept="image/png,image/jpg,image/jpeg"
                                                        />
                                                    </div>
                                                </div>
                                                {/* {values?.pricing_option === "0" && (
                                                    <div className="box p-5 mt-5">
                                                        <h2 className="text-lg font-medium mr-auto">Pricing</h2>
                                                        <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <Input
                                                                    type="number"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.productTitles.amount}
                                                                    name="price"
                                                                    label={messages.productTitles.amount}
                                                                    isRequiredField
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <Input
                                                                    type="number"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.productTitles.compare_at_price}
                                                                    name="compare_price"
                                                                    label={messages.productTitles.compare_at_price}
                                                                    isRequiredField
                                                                />
                                                            </div>
                                                            <div className="intro-y col-span-12 sm:col-span-6">
                                                                <Input
                                                                    type="text"
                                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                                    placeholder={messages.productTitles.sku}
                                                                    name="sku"
                                                                    label={messages.productTitles.sku}
                                                                    isRequiredField
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )} */}

                                                <Pricing values={values} />

                                                <OnSale values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />

                                                <Specifications
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    errors={errors}
                                                    touched={touched}
                                                />

                                                <Options
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
                                                            disabled={isSubmiting}>
                                                            Save <MiniLoader isLoading={isSubmiting} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                {/* END: Connector Table */}
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

export default CreateProduct;

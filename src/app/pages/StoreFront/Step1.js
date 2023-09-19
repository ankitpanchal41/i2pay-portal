import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import * as Icon from "react-feather";
import { Formik, Form } from "formik";
import Input from "../../components/common/forms/Input";
import Dropzone from "../../components/common/forms/Dropzone";
import { messages } from "../../messages/merchantRegister";
import { storeDetails } from "../../utils/validationSchema";
import { Currency } from "../../utils/currency";
import Select from "react-select";
import { decode } from "html-entities";
// import ProductDropzone from "../../components/common/forms/ProductDropzone";
import SoreDropzone from "../../components/common/forms/SoreDropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { showToastMessage } from "../../utils/methods";
import SoreLogoDropzone from "../../components/common/forms/SoreLogoDropzone";

const initialValuesObj = {
    store_name: "",
    store_email: "",
    store_description: "",
    store_banner_1: "",
    store_banner_2: "",
    store_banner_3: "",
    store_currency: "INR",
    template_banner: 1,
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    pincode: "",
    banner_image_1_title: "",
    banner_image_1_description: "",
    banner_image_2_title: "",
    banner_image_2_description: "",
    banner_image_3_title: "",
    banner_image_3_description: "",
    country: "",
    logo: "",
};

const Step1 = (props) => {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const isEdit = location?.pathname?.includes("edit");
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const [imageCropModalVisible, setImageCropModalVisible] = useState(false);
    const [cropper, setCropper] = useState();
    const [imageCropData, setImageCropData] = useState({ name: "", value: "" });
    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
    };

    const state = useSelector((state) => state);

    const onSubmit = (value) => {
        props?.onSubmitStep(value);
    };

    const onClickTemplate = (number) => {
        // props?.onSelectTemplateNumber(number);
        window.open(`${process.env.REACT_APP_STORE_API_URL}preview/template/${number}/home`, "_blank", "noreferrer");
    };

    useEffect(() => {
        if (state?.storeFrontStep?.step1?.value) {
            setInitialValues(state?.storeFrontStep?.step1?.value);
        }
    }, [state?.storeFrontStep?.step1]);

    // const onClickBack = () => {
    //     navigate("/store-front");
    // };

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            paddingRight: "4px",
            paddingLeft: "4px",
            minHeight: 38,
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
            <Formik initialValues={initialValues} validationSchema={storeDetails} onSubmit={onSubmit} enableReinitialize>
                {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                    <Form>
                        {imageCropModalVisible && (
                            <div className="justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                                <div className="relative my-6 mx-auto h-full w-full bg-white flex flex-col items-center justify-around">
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-lg font-medium mt-2">Crop Image</h1>
                                        <small class="text-gray-500">
                                            <em>To set the banner image you need to set the image to 16:9 aspect ratio</em>
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
                                            aspectRatio={16 / 9}
                                            minCropBoxHeight={768}
                                            minCropBoxWidth={1366}
                                            zoomOnWheel={false}
                                            crop={onCrop}
                                            ref={cropperRef}
                                            background={false}
                                            responsive={true}
                                            autoCropArea={1}
                                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
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
                                            <button className="btn btn-danger w-24 ml-4" type="button" onClick={onCloseBannerImage}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="intro-y box-without-margin p-5">
                            <h2 className="text-lg font-medium mr-auto mb-4">Basic Details</h2>
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="store_name"
                                        label={messages.formTitles.soreName}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <label className="form-label">
                                        {messages.formTitles.currency} <span className="text-danger"> *</span>
                                    </label>
                                    <Select
                                        defaultValue={{ value: "INR", label: "India Rupee" }}
                                        value={Currency?.find((item) => item?.value === values?.store_currency)}
                                        styles={colourStyles}
                                        style={{ boxShadow: "none" }}
                                        options={Currency}
                                        onChange={(e) => {
                                            setFieldValue("store_currency", e?.value);
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

                                <div className="intro-y col-span-12 lg:col-span-12">
                                    <Input
                                        rows="6"
                                        textarea="true"
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="store_description"
                                        label={messages.formTitles.description}
                                        isRequiredField
                                    />
                                </div>

                                <div className="intro-y col-span-12 lg:col-span-12">
                                    <label className="form-label">{messages.formTitles.logo}</label>
                                    <SoreLogoDropzone
                                        setFieldValue={setFieldValue}
                                        name="logo"
                                        placeholder={"Choose Files..."}
                                        error={errors.logo}
                                        touched={touched.logo}
                                        values={values.logo}
                                        isRequiredField={true}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </div>
                                {/* <div className="intro-y col-span-12 lg:col-span-6 ">
                                    <label className="form-label">{messages.formTitles.banner}</label>
                                    <div className="flex justify-between flex-wrap">
                                        <div className="intro-y border-0 w-[100%] mb-[20px] md:w-[32%] md:mb-0">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="store_banner_1"
                                                placeholder={"Choose Files..."}
                                                error={errors.store_banner_1}
                                                touched={touched.store_banner_1}
                                                values={values.store_banner_1}
                                                accept="image/png, image/jpg, image/jpeg"
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[32%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="store_banner_2"
                                                placeholder={"Choose Files..."}
                                                error={errors.store_banner_2}
                                                touched={touched.store_banner_2}
                                                values={values.store_banner_2}
                                                accept="image/png, image/jpg, image/jpeg"
                                            />
                                        </div>
                                        <div className="intro-y w-[100%] md:w-[32%]">
                                            <Dropzone
                                                setFieldValue={setFieldValue}
                                                name="store_banner_3"
                                                placeholder={"Choose Files..."}
                                                error={errors.store_banner_3}
                                                touched={touched.store_banner_3}
                                                values={values.store_banner_3}
                                                accept="image/png, image/jpg, image/jpeg"
                                            />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="intro-y box-without-margin p-5 mt-5">
                            <h2 className="text-lg font-medium mr-auto mb-4">Address</h2>
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="address_line_1"
                                        label={messages.formTitles.address_line_1}
                                        isRequiredField
                                        errorEnabled
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-12">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="address_line_2"
                                        label={messages.formTitles.address_line_2}
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="city"
                                        label={messages.formTitles.city}
                                        isRequiredField
                                        errorEnabled
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="pincode"
                                        label={messages.formTitles.pincode}
                                        isRequiredField
                                        errorEnabled
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="state"
                                        label={messages.formTitles.state}
                                        isRequiredField
                                        errorEnabled
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="country"
                                        label={messages.formTitles.country}
                                        isRequiredField
                                        errorEnabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="intro-y box-without-margin mt-5">
                            <h2 className="text-lg font-medium mr-auto mb-4 px-5 pt-5">Banner Images 1</h2>
                            <div className="grid grid-cols-12 gap-4 gap-y-5 p-5 pt-0">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="banner_image_1_title"
                                        label={messages.formTitles.banner_image_1_title}
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="banner_image_1_description"
                                        label={messages.formTitles.banner_image_1_description}
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-12">
                                    <label className="form-label">{messages.formTitles.banner_1}</label>
                                    <SoreDropzone
                                        type="banner"
                                        setFieldValue={(name, value, tag = "", file) => {
                                            if (tag === "remove") {
                                                setFieldValue(name, value);
                                            } else {
                                                if (file?.width < 1366 || file?.height < 768) {
                                                    showToastMessage("Please upload image min 1366x768", 500);
                                                    return false;
                                                } else {
                                                    setImageCropModalVisible(true);
                                                    setImageCropData({ name, value });
                                                }
                                            }
                                        }}
                                        name="store_banner_1"
                                        placeholder={"Choose Files..."}
                                        error={errors.store_banner_1}
                                        touched={touched.store_banner_1}
                                        values={values.store_banner_1}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </div>
                            </div>
                            <h2 className="text-lg font-medium mr-auto mb-4 px-5 pt-5 mt-2 border-t border-slate-400/60 dark:border-darkmode-400">
                                Banner Images 2
                            </h2>
                            <div className="grid grid-cols-12 gap-4 gap-y-5 p-5 pt-0">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="banner_image_2_title"
                                        label={messages.formTitles.banner_image_2_title}
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="banner_image_2_description"
                                        label={messages.formTitles.banner_image_2_description}
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-12">
                                    <label className="form-label">{messages.formTitles.banner_2}</label>
                                    <SoreDropzone
                                        type="banner"
                                        setFieldValue={(name, value, tag = "", file) => {
                                            if (tag === "remove") {
                                                setFieldValue(name, value);
                                            } else {
                                                if (file?.width < 1366 || file?.height < 768) {
                                                    showToastMessage("Please upload image min 1366x768", 500);
                                                    return false;
                                                } else {
                                                    setImageCropModalVisible(true);
                                                    setImageCropData({ name, value });
                                                }
                                            }
                                        }}
                                        name="store_banner_2"
                                        placeholder={"Choose Files..."}
                                        error={errors.store_banner_2}
                                        touched={touched.store_banner_2}
                                        values={values.store_banner_2}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </div>
                            </div>
                            <h2 className="text-lg font-medium mr-auto mb-4 px-5 pt-5 mt-2 border-t border-slate-400/60 dark:border-darkmode-400">
                                Banner Images 3
                            </h2>
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-3 p-5 pt-0">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="banner_image_3_title"
                                        label={messages.formTitles.banner_image_3_title}
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-6">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="banner_image_3_description"
                                        label={messages.formTitles.banner_image_3_description}
                                    />
                                </div>
                                <div className="intro-y col-span-12 lg:col-span-12">
                                    <label className="form-label">{messages.formTitles.banner_3}</label>
                                    <SoreDropzone
                                        type="banner"
                                        setFieldValue={(name, value, tag = "", file) => {
                                            if (tag === "remove") {
                                                setFieldValue(name, value);
                                            } else {
                                                if (file?.width < 1366 || file?.height < 768) {
                                                    showToastMessage("Please upload image min 1366x768", 500);
                                                    return false;
                                                } else {
                                                    setImageCropModalVisible(true);
                                                    setImageCropData({ name, value });
                                                }
                                            }
                                        }}
                                        name="store_banner_3"
                                        placeholder={"Choose Files..."}
                                        error={errors.store_banner_3}
                                        touched={touched.store_banner_3}
                                        values={values.store_banner_3}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="intro-y box-without-margin p-5 mt-5">
                            <h2 className="text-lg font-medium mr-auto mb-4">Store Templates</h2>
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                {[1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                                    return (
                                        <div className="intro-y col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-center">
                                            <label className="form-check-label ml-0" htmlFor="3">
                                                Template {index + 1}
                                            </label>
                                            <div
                                                onClick={() => {
                                                    setFieldValue("template_banner", index + 1);
                                                }}
                                                className={
                                                    values?.template_banner === index + 1
                                                        ? "h-[350px] overflow-hidden cursor-pointer border-4 border-dashed border-blue-900 mt-2"
                                                        : "h-[350px] overflow-hidden cursor-pointer mt-2"
                                                }>
                                                <img
                                                    src={require(`../../../assets/images/template${index + 1}.png`)}
                                                    className="w-[100%]"
                                                />
                                            </div>
                                            <div
                                                className="btn btn-rounded-primary btn-sm mt-2 w-full"
                                                onClick={() => {
                                                    onClickTemplate(index + 1);
                                                }}>
                                                <Icon.Eye size={15} className="mr-1 mb-[1px]" />
                                                Preview
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                            <button type="buttons" className="btn btn-primary w-24 ml-2" onClick={handleSubmit}>
                                Next
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Step1;

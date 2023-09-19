import React, { useEffect, useState, useRef } from "react";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { ClipLoader } from "react-spinners";
import Input from "../../components/common/forms/Input";
import Dropzone from "../../components/common/forms/Dropzone";
import { messages } from "../../messages/merchantRegister";
import { storeContactDetails } from "../../utils/validationSchema";
import PhoneInput from "../../components/common/forms/PhoneInput";
import SoreDropzone from "../../components/common/forms/SoreDropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { showToastMessage } from "../../utils/methods";

const initialValuesObj = {
    store_contact_email: "",
    store_contact_description: "",
    contact_image: "",
    store_contact_mobile: "",
    countryCode: {
        name: "India",
        value: "+91",
        code: "IN",
        flag: "🇮🇳",
    },
};

const Step3 = (props) => {
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
    // const [isLoading, setIsLoading] = useState(false);

    const state = useSelector((state) => state);

    useEffect(() => {
        if (state?.storeFrontStep?.step3?.value) {
            setInitialValues(state?.storeFrontStep?.step3?.value);
        }
    }, [state?.storeFrontStep?.step3]);

    // useEffect(() => {
    //     setIsLoading(state?.storeFrontStep?.loadingAdd);
    // }, [state?.storeFrontStep?.loadingAdd]);

    // useEffect(() => {
    //     setIsLoading(state?.storeFrontStep?.loadingUpdate);
    // }, [state?.storeFrontStep?.loadingUpdate]);

    const onSubmit = (value) => {
        props?.onSubmitStep({ ...value, country_code: value?.countryCode?.value, countryCode: "" });
    };

    // const onClickBack = () => {
    //     navigate("/store-front");
    // };

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
            <div className="box-without-margin p-5">
                <Formik initialValues={initialValues} validationSchema={storeContactDetails} onSubmit={onSubmit} enableReinitialize>
                    {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                        <Form className="px-5">
                            {imageCropModalVisible && (
                                <div className=" justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                                    <div className="relative my-6 mx-auto h-full w-full bg-white flex flex-col items-center justify-around">
                                        <div className="flex flex-col items-center">
                                            <h1 className="text-lg font-medium mt-2">Crop Image</h1>
                                            <small class="text-gray-500">
                                                <em>To set the contact us banner image you need to set the image to 16:9 aspect ratio</em>
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
                            <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    <Input
                                        type="email"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="store_contact_email"
                                        label={messages.formTitles.contact_us_email}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-6">
                                    {/* <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="store_contact_mobile"
                                        label={messages.formTitles.store_contact_mobile}
                                        isRequiredField
                                        errorEnabled
                                    /> */}
                                    <div className="mb-[7px]">
                                        {messages.formTitles.store_contact_mobile}
                                        <span className="text-danger">*</span>
                                    </div>
                                    <PhoneInput
                                        marginTopNull
                                        countryCodeValue={values.countryCode}
                                        setFieldValue={setFieldValue}
                                        error={errors.store_contact_mobile}
                                        touched={touched.store_contact_mobile}
                                        name="store_contact_mobile"
                                        errorEnabled
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        rows="6"
                                        textarea="true"
                                        type="email"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={"Enter Here..."}
                                        name="store_contact_description"
                                        label={messages.formTitles.contact_us_description}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <label className="form-label">
                                        {messages.formTitles.contact_us_image}
                                        <span className="text-danger"> *</span>
                                    </label>
                                    <SoreDropzone
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
                                        name="contact_image"
                                        placeholder={"Choose Files..."}
                                        error={errors.contact_image}
                                        touched={touched.contact_image}
                                        values={values.contact_image}
                                        accept="image/png, image/jpg, image/jpeg"
                                    />
                                </div>

                                <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                    <button className="btn btn-secondary w-24" type="button" onClick={props?.onPreviousClick}>
                                        Previous
                                    </button>
                                    <button
                                        disabled={props?.isLoading}
                                        type="buttons"
                                        className="btn btn-primary w-24 ml-2"
                                        onClick={handleSubmit}>
                                        Save
                                        <ClipLoader
                                            loading={props?.isLoading}
                                            color="#1e3a8a"
                                            size={15}
                                            css="border-width: 2px;border-color: #fff !important;margin-left:10px;border-bottom-color: transparent !important;"
                                        />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Step3;

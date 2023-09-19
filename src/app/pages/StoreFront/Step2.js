import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import * as Icon from "react-feather";
// import CKEditor from "react-ckeditor-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Formik, Form } from "formik";
import Dropzone from "../../components/common/forms/Dropzone";
import { messages } from "../../messages/merchantRegister";
import { storeAboutDetails } from "../../utils/validationSchema";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SoreDropzone from "../../components/common/forms/SoreDropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { showToastMessage } from "../../utils/methods";

const initialValuesObj = { about_description: "", about_image: "" };

const Step2 = (props) => {
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

    useEffect(() => {
        if (state?.storeFrontStep?.step2?.value) {
            setInitialValues(state?.storeFrontStep?.step2?.value);
        }
    }, [state?.storeFrontStep?.step2]);

    const onSubmit = (value) => {
        props?.onSubmitStep(value);
    };

    // const onClickBack = () => {
    //     navigate("/store-front");
    // };

    // const onChange = (evt) => {
    //     var newContent = evt.editor.getData();
    //     this.setState({
    //         content: newContent,
    //     });
    // };

    // const onBlur = (evt) => {

    // };

    // const afterPaste = (evt) => {

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
                <Formik initialValues={initialValues} validationSchema={storeAboutDetails} onSubmit={onSubmit} enableReinitialize>
                    {({ handleSubmit, errors, values, setFieldValue, setFieldTouched, touched, isValid }) => (
                        <Form className="px-5">
                            {imageCropModalVisible && (
                                <div className=" justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                                    <div className="relative my-6 mx-auto h-full w-full bg-white flex flex-col items-center justify-around">
                                        <div className="flex flex-col items-center">
                                            <h1 className="text-lg font-medium mt-2">Crop Image</h1>
                                            <small class="text-gray-500">
                                                <em>To set the about us banner you need to set the image to 16:9 aspect ratio</em>
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
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <label className="form-label">
                                        {messages.formTitles.about_image} <span className="text-danger"> *</span>
                                    </label>
                                    <div className="intro-y">
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
                                            name="about_image"
                                            placeholder={"Choose Files..."}
                                            error={errors.about_image}
                                            touched={touched.about_image}
                                            values={values.about_image}
                                            accept="image/png, image/jpg, image/jpeg"
                                        />
                                        {/*{ errors.about_image ? () : null }*/}
                                    </div>
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <label className="form-label">
                                        {messages.formTitles.about_description} <span className="text-danger"> *</span>
                                    </label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed"],
                                        }}
                                        data={values.about_description}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();

                                            setFieldValue("about_description", data);
                                        }}
                                    />

                                    {touched.about_description && errors.about_description ? (
                                        <p className="text-red-500 mt-2 ml-1">{errors.about_description}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                <button className="btn btn-secondary w-24" type="button" onClick={props?.onPreviousClick}>
                                    Previous
                                </button>
                                <button type="buttons" className="btn btn-primary w-24 ml-2" onClick={handleSubmit}>
                                    Next
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default Step2;

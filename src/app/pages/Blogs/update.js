import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { blogsSchema, contactSchema } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import { DETAIL_CONTACT_REQUEST, UPDATE_CONTACT_REQUEST } from "../../redux/actions/Contact";
import { countryCodes } from "../../utils/countryCode";
import { ClipLoader } from "react-spinners";
import { categoryListData } from "../../redux/services/Contact";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import * as Icon from "react-feather";
import { DETAIL_BLOG_REQUEST, UPDATE_BLOG_REQUEST } from "../../redux/actions/Blogs";
import SoreDropzone from "../../components/common/forms/SoreDropzone";
import { showToastMessage } from "../../utils/methods";

const Creatable = React.lazy(() => import("react-select/creatable"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const PhoneInput = React.lazy(() => import("../../components/common/forms/PhoneInput"));
const Input = React.lazy(() => import("../../components/common/forms/Input"));
const Dropzone = React.lazy(() => import("../../components/common/forms/Dropzone"));

const UpdateContact = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { storeId } = useParams();

    const { blogId } = useParams();

    const initialValuesObj = {
        title: "",
        blog_image: "",
        description: "",
        short_description: "",
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const { detailBlogs } = useSelector((state) => state.blogs);
    const [categoryList, setCategoryList] = useState([]);
    const [imageCropModalVisible, setImageCropModalVisible] = useState(false);
    const [cropper, setCropper] = useState();
    const [imageCropData, setImageCropData] = useState({ name: "", value: "" });
    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        // console.log(cropper.getCroppedCanvas().toDataURL());
    };

    useEffect(() => {
        async function getData() {
            const category = await categoryListData(0);

            if (category?.responseCode === 200) {
                const categoryList = [];
                category?.data?.map((c) => {
                    categoryList?.push({ label: c?.name, value: c?.name });
                });
                setCategoryList(categoryList);
            }
        }

        getData();
    }, []);

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateListing = () => {
            // navigate("/contact");
        };

        setIsLoading(true);
        dispatch({ type: DETAIL_BLOG_REQUEST, payload: { id: blogId }, callBack, navigateListing });
    }, []);

    useEffect(() => {
        setInitialValues({
            title: detailBlogs?.title,
            blog_image: detailBlogs?.blog_image,
            description: detailBlogs?.description,
            short_description: detailBlogs?.short_description,
        });
    }, [detailBlogs]);

    const onSubmit = (values) => {
        const callBack = () => {
            setIsSubmitting(false);
            navigate(`/blogs/${storeId}`);
        };

        const navigateState = () => {
            navigate(`/blogs/${storeId}`);
        };

        setIsSubmitting(true);

        const payload = {
            ...values,
            store_id: storeId,
            blog_id: blogId,
        };

        const formData = new FormData();
        for (const property in payload) {
            if (property === "blog_image") {
                if (payload[property]?.includes("https://") || payload[property]?.includes("http://")) {
                } else {
                    formData.append(property, payload[property]);
                }
            } else if (payload[property]) {
                formData.append(property, payload[property]);
            }
        }

        dispatch({ type: UPDATE_BLOG_REQUEST, payload: formData, callBack, navigateState });
    };

    const onClickBack = () => {
        navigate(`/blogs/${storeId}`);
    };

    const { mode } = useSelector((state) => state.persist);

    const _renderHeading = () => {
        return <Heading title={"Edit Blog"} displayBackButton={true} onClickBack={onClickBack} />;
    };

    const onSaveImage = (setFieldValue) => {
        if (typeof cropper !== "undefined") {
            setFieldValue(imageCropData?.name, cropper.getCroppedCanvas().toDataURL());
            // console.log(cropper.getCroppedCanvas().toDataURL());
            setImageCropModalVisible(false);
        }
    };

    const onCloseBannerImage = () => {
        setImageCropModalVisible(false);
    };

    return (
        <>
            {/* BEGIN: Modal */}
            {/* {_renderModal()} */}
            {/* END: Modal */}

            {/* <div className="mobile-menu md:hidden">
                <div className="mobile-menu-bar">
                    <a href className="flex mr-auto">
                        <img alt="logo" className="w-[30%]" src={Images.logoImage} />
                    </a>
                    <a href="javascript:;" id="mobile-menu-toggler">
                        {" "}
                        <Icon.BarChart2 className="w-8 h-8 text-white transform -rotate-90" />{" "}
                    </a>
                </div>
                <ul className="border-t border-white/[0.08] py-5 hidden">
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Home />{" "}
                            </div>
                            <div className="menu__title">Dashboard</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Box />{" "}
                            </div>
                            <div className="menu__title">Application</div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" className="menu">
                            <div className="menu__icon">
                                {" "}
                                <Icon.Box />{" "}
                            </div>
                            <div className="menu__title">Connector</div>
                        </a>
                    </li>
                </ul>
            </div> */}
            {/* END: Mobile Menu */}

            {/* BEGIN: Header */}
            {/* <Header /> */}
            {/* END: Header */}

            {/* BEGIN: Menu */}
            {/* <MainMenu active={5}> */}
            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 overflow-x-auto overflow-hidden">
                                {/* BEGIN: Connector Table */}
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
                                    <div className="box-without-margin p-5">
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={blogsSchema}
                                            onSubmit={onSubmit}
                                            validateOnMount
                                            enableReinitialize>
                                            {({ handleSubmit, errors, values, setFieldValue, touched, isValid }) => (
                                                <Form className="">
                                                    {imageCropModalVisible && (
                                                        <div className=" justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                                                            <div className="relative my-6 mx-auto h-full w-full bg-white flex flex-col items-center justify-around">
                                                                <div className="flex flex-col items-center">
                                                                    <h1 className="text-lg font-medium mt-2">Crop Image</h1>
                                                                    <small class="text-gray-500">
                                                                        <em>
                                                                            To set the blog image you need to set the image to 16:9 aspect
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
                                                                        aspectRatio={16 / 9}
                                                                        minCropBoxHeight={1366}
                                                                        minCropBoxWidth={768}
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
                                                    <div className="grid grid-cols-12 gap-4 gap-y-5">
                                                        <div className="intro-y col-span-12 sm:col-span-12">
                                                            <Input
                                                                type="text"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.blogs.title}
                                                                name="title"
                                                                label={messages.blogs.title}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-12">
                                                            <Input
                                                                rows="5"
                                                                textarea="true"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.blogs.short_description}
                                                                name="short_description"
                                                                label={messages.blogs.short_description}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-12">
                                                            <label className="form-label">
                                                                {messages.blogs.blog_image}
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <SoreDropzone
                                                                type={"banner"}
                                                                error={errors.blog_image}
                                                                touched={touched.blog_image}
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
                                                                name="blog_image"
                                                                placeholder={messages.blogs.blog_image}
                                                                values={values.blog_image}
                                                                accept="image/png,image/jpg,image/jpeg"
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-12">
                                                            <label className="form-label">
                                                                {messages.blogs.description} <span className="text-danger"> *</span>
                                                            </label>
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                config={{
                                                                    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed"],
                                                                }}
                                                                data={values.description}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    setFieldValue("description", data);
                                                                }}
                                                            />

                                                            {touched.description && errors.description ? (
                                                                <p className="text-red-500 mt-2 ml-1">{errors.description}</p>
                                                            ) : null}
                                                        </div>

                                                        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
                                                            <button
                                                                type="buttons"
                                                                className="btn btn-primary w-24 ml-2"
                                                                onClick={handleSubmit}
                                                                disabled={isSubmitting}>
                                                                Save <MiniLoader isLoading={isSubmitting} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                )}
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

export default UpdateContact;

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Icon from "react-feather";
import { collectionBannerSchema } from "../../utils/validationSchema";
import { messages } from "../../messages/merchantRegister";
import { ClipLoader } from "react-spinners";
import { categoryListData } from "../../redux/services/Contact";
import { DETAIL_COLLECTION_BANNER_REQUEST, UPDATE_COLLECTION_BANNER_REQUEST } from "../../redux/actions/CollectionBanner";
import { getCategoryListHandle } from "../../redux/services/Product";
import Select from "react-select";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
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

    const { collectionBannerId } = useParams();

    const initialValuesObj = {
        name: "",
        banner_image: "",
        category_id: "",
        description: "",
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const { detailCollectionBanner } = useSelector((state) => state.collectionBanners);
    const [categoryList, setCategoryList] = useState([]);
    const [productCategoryListData, setProductCategoryListData] = useState([]);
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
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        const data = await getCategoryListHandle({ store_id: storeId });

        if (data?.responseCode === 200) {
            setProductCategoryListData(data?.data);
        }
    };

    useEffect(() => {
        const callBack = () => {
            setIsLoading(false);
        };

        const navigateListing = () => {
            // navigate("/contact");
        };

        setIsLoading(true);
        dispatch({ type: DETAIL_COLLECTION_BANNER_REQUEST, payload: { id: collectionBannerId }, callBack, navigateListing });
    }, []);

    useEffect(() => {
        if (detailCollectionBanner) {
            setInitialValues({
                name: detailCollectionBanner?.name,
                banner_image: detailCollectionBanner?.banner_image,
                category_id: detailCollectionBanner?.category_id,
                description: detailCollectionBanner?.description,
            });
        }
    }, [detailCollectionBanner]);

    const onSubmit = (values) => {
        const callBack = () => {
            setIsSubmitting(false);
            navigate(`/collection-banner/${storeId}`);
        };

        const navigateState = () => {
            navigate(`/collection-banner/${storeId}`);
        };

        setIsSubmitting(true);

        const payload = {
            ...values,
            store_id: storeId,
            collection_banner_id: collectionBannerId,
        };

        const formData = new FormData();
        for (const property in payload) {
            if (property === "banner_image") {
                if (payload[property]?.includes("https://") || payload[property]?.includes("http://")) {
                } else {
                    formData.append(property, payload[property]);
                }
            } else if (payload[property]) {
                formData.append(property, payload[property]);
            }
        }

        dispatch({ type: UPDATE_COLLECTION_BANNER_REQUEST, payload: formData, callBack, navigateState });
    };

    const onClickBack = () => {
        navigate(`/collection-banner/${storeId}`);
    };

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
        menuList: (styles, { data }) => ({ ...styles, maxHeight: 150 }),
    };

    const _renderHeading = () => {
        return <Heading title={"Edit Collection Banner"} displayBackButton={true} onClickBack={onClickBack} />;
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
                                            validationSchema={collectionBannerSchema}
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
                                                                            To set the collection banner image you need to set the image to
                                                                            4:3 aspect ratio
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
                                                                        aspectRatio={4 / 3}
                                                                        minCropBoxHeight={750}
                                                                        minCropBoxWidth={700}
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
                                                                placeholder={messages.collectionBanners.name}
                                                                name="name"
                                                                label={messages.collectionBanners.name}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-12">
                                                            <label className="form-label">
                                                                {messages.collectionBanners.category_id}{" "}
                                                                <span className="text-danger"> *</span>
                                                            </label>
                                                            <Select
                                                                value={productCategoryListData?.find(
                                                                    (item) => item?.value === values?.category_id,
                                                                )}
                                                                styles={colourStyles}
                                                                style={{ boxShadow: "none" }}
                                                                options={productCategoryListData}
                                                                onChange={(e) => {
                                                                    setFieldValue("category_id", e?.value);
                                                                }}
                                                                className="intro-x login__input form-control block shadow-none"
                                                            />

                                                            {touched.category_id && errors.category_id ? (
                                                                <p className="text-red-500 mt-2 ml-1">{errors.category_id}</p>
                                                            ) : null}
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-12">
                                                            <Input
                                                                rows="5"
                                                                textarea="true"
                                                                className="intro-x login__input form-control py-2 px-3 block"
                                                                placeholder={messages.collectionBanners.description}
                                                                name="description"
                                                                label={messages.collectionBanners.description}
                                                                isRequiredField
                                                            />
                                                        </div>
                                                        <div className="intro-y col-span-12 sm:col-span-12">
                                                            <label className="form-label">
                                                                {messages.collectionBanners.banner_image}
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <SoreDropzone
                                                                // type={"banner"}
                                                                error={errors.banner_image}
                                                                touched={touched.banner_image}
                                                                setFieldValue={(name, value, tag = "", file) => {
                                                                    if (tag === "remove") {
                                                                        setFieldValue(name, value);
                                                                    } else {
                                                                        if (file?.width < 750 || file?.height < 700) {
                                                                            showToastMessage("Please upload image min 750x700", 500);
                                                                            return false;
                                                                        } else {
                                                                            setImageCropModalVisible(true);
                                                                            setImageCropData({ name, value });
                                                                        }
                                                                    }
                                                                }}
                                                                name="banner_image"
                                                                placeholder={messages.collectionBanners.banner_image}
                                                                values={values.banner_image}
                                                                accept="image/png,image/jpg,image/jpeg"
                                                            />
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

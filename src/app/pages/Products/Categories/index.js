import React, { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Formik, Form } from "formik";
import { productCategorySchema } from "../../../utils/validationSchema";
import { messages } from "../../../messages/merchantRegister";
import {
    createProductCategoryStart,
    deleteProductCategoryStart,
    editProductCategoryStart,
    getProductCategoryStart,
} from "../../../redux/actions/ProductCategory";
import SoreDropzone from "../../../components/common/forms/SoreDropzone";
import { showToastMessage } from "../../../utils/methods";
import { downloadProductCategoryExcel } from "../../../redux/services/DownloadExcel";

const MiniLoader = React.lazy(() => import("../../../components/common/MiniLoader"));
const DeleteModal = React.lazy(() => import("../../../components/common/DeleteModal"));
const Heading = React.lazy(() => import("../../../components/common/Heading"));
const Pagination = React.lazy(() => import("../../../components/common/Pagination"));
const Input = React.lazy(() => import("../../../components/common/forms/Input"));
const Dropzone = React.lazy(() => import("../../../components/common/forms/Dropzone"));

const initialValuesObj = {
    name: "",
    description: "",
    image: "",
};

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { storeId } = useParams();
    // const storeId = 2;

    const [loadingId, setLoadingId] = useState(false);
    const [listingType, setListingType] = useState("");
    const [currentDeleteProductsCategory, setCurrentDeleteProductsCategory] = useState([]);
    const [deleteModalDetails, setDeleteModalDetails] = useState({ visible: false, id: null });
    const [isLoading, setIsLoading] = useState(false);
    const [isParPage, setIsParPage] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [initialValues, setInitialValues] = useState(initialValuesObj);
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(false);
    const [imageCropModalVisible, setImageCropModalVisible] = useState(false);
    const [cropper, setCropper] = useState();
    const [imageCropData, setImageCropData] = useState({ name: "", value: "" });
    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
    };

    const { productCategoryList, store_id, totalPage } = useSelector((state) => state.productCategory);

    const state = useSelector((state) => state);

    useEffect(() => {
        if (!state?.connector?.updateLoading && loadingId) {
            setLoadingId(false);
        }
    }, [state?.connector?.updateLoading]);

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    const onCloseModal = (e) => {
        setCategoryModal(false);
        setCurrentEditId(false);
    };

    const onClickEdit = (id, name, description, image) => {
        setCurrentEditId(id);
        setInitialValues({ name, description, image });
        setCategoryModal(true);
        // navigate(`/${storeId}/edit-product/${id}`);
    };

    const onClickDelete = (id) => {
        if (!deleteModalDetails?.visible) return;
        handleCloseDeleteModal();
        setCurrentDeleteProductsCategory([...currentDeleteProductsCategory, id]);

        const finishDeleteProduct = () => {
            setCurrentDeleteProductsCategory((prevValue) => prevValue.filter((item) => item?.id !== id));
        };

        dispatch(deleteProductCategoryStart(id, finishDeleteProduct));
    };

    const handleCloseDeleteModal = React.useCallback(() => {
        setDeleteModalDetails({ visible: false, id: null });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getProductCategoryStart(storeId, currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsParPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isParPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getProductCategoryStart(storeId, 1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const pagination = {
        totalPage: productCategoryList?.length === 0 ? 1 : totalPage,
    };

    const onClickBack = () => {
        navigate(`/products/${storeId}`);
    };

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const onChangePerPage = (page) => {
        setPerPage(page);
    };

    const onChangeSearchQuery = (value) => {
        setSearchQuery(value);
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const payload = {
            store_id,
            merchant_id: state?.persist?.userData?.data?.id,
        };
        const data = await downloadProductCategoryExcel(searchQuery, payload);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onSubmit = (values) => {
        setIsLoadingSave(true);

        let payload = { ...values, store_id: storeId };

        if (currentEditId) {
            payload["category_id"] = currentEditId;

            const formData = new FormData();
            for (const property in payload) {
                if (property === "image") {
                    if (payload[property]?.includes("https://") || payload[property]?.includes("http://")) {
                    } else {
                        formData.append(property, payload[property]);
                    }
                } else if (payload[property]) {
                    formData.append(property, payload[property]);
                }
            }

            const callback = () => {
                setIsLoadingSave(false);
            };
            dispatch(
                editProductCategoryStart(formData, callback, () => {
                    onCloseModal();
                    setIsLoading(true);
                    dispatch(
                        getProductCategoryStart(storeId, currentPage, perPage, searchQuery, () => {
                            setIsLoading(false);
                            setIsParPage(true);
                        }),
                    );
                }),
            );
        } else {
            const formData = new FormData();
            for (const property in payload) {
                formData.append(property, payload[property]);
            }

            const callback = () => {
                setIsLoadingSave(false);
            };

            dispatch(
                createProductCategoryStart(formData, callback, () => {
                    onCloseModal();
                    setIsLoading(true);
                    dispatch(
                        getProductCategoryStart(storeId, currentPage, perPage, searchQuery, () => {
                            setIsLoading(false);
                            setIsParPage(true);
                        }),
                    );
                }),
            );
        }
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

    const _renderHeading = () => {
        return (
            <Heading
                title={"Categories"}
                onClickBack={onClickBack}
                onChangeSearchQuery={onChangeSearchQuery}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="w-full sm:w-auto flex sm:mt-0 ml-2">
                        <div
                            onClick={() => {
                                setCategoryModal(true);
                                setInitialValues(initialValuesObj);
                            }}
                            className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add New Category</span>
                        </div>
                    </div>
                }
            />
        );
    };

    const _renderModal = () => {
        if (categoryModal) {
            return (
                <>
                    {/* BEGIN: Modal */}
                    <div
                        className="backdrop-sepia-0 bg-black/50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog"
                        onClick={onCloseModal}>
                        <div className={`relative my-6 mx-auto min-w-[80vh]`} onClick={(e) => e.stopPropagation()}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={productCategorySchema}
                                onSubmit={onSubmit}
                                validateOnMount
                                enableReinitialize>
                                {({ handleSubmit, errors, values, setFieldValue, touched }) => (
                                    <Form className="">
                                        {imageCropModalVisible && (
                                            <div className=" justify-center items-center flex fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog">
                                                <div className="relative my-6 mx-auto h-full w-full bg-white flex flex-col items-center justify-around">
                                                    <div className="flex flex-col items-center">
                                                        <h1 className="text-lg font-medium mt-2">Crop Image</h1>
                                                        <small class="text-gray-500">
                                                            <em>To set the category image you need to set the image to 1:1 aspect ratio</em>
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
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full modal-content outline-none focus:outline-none">
                                            {/* BEGIN: Modal Header */}
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                                <h3 className="text-xl font-semibold">{currentEditId ? "Edit" : "Add"} Category</h3>
                                                <button
                                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500"
                                                    onClick={onCloseModal}>
                                                    <Icon.X size={25} />
                                                </button>
                                            </div>
                                            <div className="relative p-6 flex-auto overflow-hidden overflow-y-auto">
                                                <Input
                                                    type="text"
                                                    className="intro-x login__input form-control py-2 px-3 block"
                                                    placeholder={messages.productCategory.name}
                                                    name={"name"}
                                                    // label={messages.productCategory.name}
                                                    isRequiredField={true}
                                                />
                                                <Input
                                                    textarea="true"
                                                    type="text"
                                                    className="intro-x login__input form-control py-2 px-3 block mt-2"
                                                    placeholder={messages.productCategory.description}
                                                    name={"description"}
                                                    containerClassName="mb-2"
                                                    // label={messages.productCategory.name}
                                                    isRequiredField={true}
                                                />
                                                <SoreDropzone
                                                    error={errors.image}
                                                    touched={touched.image}
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
                                                    name="image"
                                                    placeholder={messages.productCategory.image}
                                                    values={values.image}
                                                    accept="image/png,image/jpg,image/jpeg"
                                                    // label={messages.productCategory.image}
                                                    isRequiredField={true}
                                                />
                                            </div>
                                            {/* BEGIN: Modal Footer */}
                                            <div className="flex flex-col-reverse md:flex-row items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                <button
                                                    type="button"
                                                    className="btn btn-light mt-3 py-3 px-4 w-full xl:w-32 xl:mr-3 align-top md:mt-0"
                                                    onClick={onCloseModal}>
                                                    Cancel
                                                </button>

                                                <button
                                                    disabled={isLoadingSave === true}
                                                    type="buttons"
                                                    className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                                                    onClick={handleSubmit}>
                                                    Save
                                                    <ClipLoader
                                                        loading={isLoadingSave === true}
                                                        color="#1e3a8a"
                                                        size={15}
                                                        css="border-width: 2px;border-color: #fff !important;margin-left:10px;border-bottom-color: transparent !important;"
                                                    />
                                                </button>
                                            </div>
                                            {/* END: Modal Footer */}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    {/* BEGIN: Modal */}
                </>
            );
        }

        return <div />;
    };

    const _renderTable = () => {
        return (
            <>
                {/* BEGIN: Connector Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Category Name</th>
                            <th className="whitespace-nowrap">Description</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={10}>
                                    <div className="flex justify-center h-48 items-center">
                                        <ClipLoader
                                            loading={true}
                                            color="#1e3a8a"
                                            size={55}
                                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="font-normal">
                            {productCategoryList?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-10">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td>
                                            <p className="font-medium line-clamp-1 dark:text-white">{item?.name}</p>
                                        </td>
                                        <td>
                                            <p className="font-medium line-clamp-1 dark:text-white">{item?.description}</p>
                                        </td>
                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5"
                                                    }>
                                                    <Icon.Edit
                                                        onClick={() => {
                                                            onClickEdit(item?.id, item.name, item.description, item.category_image);
                                                        }}
                                                        size={15}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                    }>
                                                    {currentDeleteProductsCategory?.includes(item?.id) ? (
                                                        <MiniLoader isLoading={true} color="red" />
                                                    ) : (
                                                        <Icon.Trash2
                                                            onClick={() =>
                                                                setDeleteModalDetails({
                                                                    visible: true,
                                                                    id: item?.id,
                                                                })
                                                            }
                                                            size={15}
                                                            stroke={"red"}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {!isLoading && productCategoryList?.length === 0 && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    const _renderBoxTable = () => {
        return (
            <>
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
                    <div className="grid grid-cols-12 gap-6 mt-5">
                        {productCategoryList?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6">
                                    <div className="box">
                                        <div className="flex flex-row lg:flex-nowrap items-center justify-center p-5">
                                            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 mr-auto">
                                                <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <span className="font-medium text-primary dark:text-white">{item?.name}</span>
                                                    <div className="text-slate-400 text-xs mt-0.5 max-3-line">{item?.description}</div>
                                                </div>
                                            </div>
                                            <div className="text-slate-500 text-xs mt-0.5">
                                                <div className="dropdown ml-auto sm:ml-0">
                                                    <div className="flex">
                                                        <div
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5"
                                                            }>
                                                            <Icon.Edit
                                                                onClick={() => {
                                                                    onClickEdit(item?.id, item.name);
                                                                }}
                                                                size={15}
                                                            />
                                                        </div>
                                                        <div
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                            }>
                                                            {currentDeleteProductsCategory?.includes(item?.id) ? (
                                                                <MiniLoader isLoading={true} color="red" />
                                                            ) : (
                                                                <Icon.Trash2
                                                                    onClick={() =>
                                                                        setDeleteModalDetails({
                                                                            visible: true,
                                                                            id: item?.id,
                                                                        })
                                                                    }
                                                                    size={15}
                                                                    stroke={"red"}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!isLoading && productCategoryList?.length === 0 && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            {/* BEGIN: Modal */}
            {_renderModal()}
            <DeleteModal
                visible={deleteModalDetails?.visible}
                onClose={handleCloseDeleteModal}
                onDelete={() => onClickDelete(deleteModalDetails?.id)}
            />
            {/* END: Modal */}

            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {listingType === "box" ? _renderBoxTable() : _renderTable()}
                            </div>
                        </div>
                    </div>
                </div>

                {!isLoading && productCategoryList?.length !== 0 && typeof productCategoryList !== "undefined" && (
                    <Pagination
                        pagination={pagination}
                        currentPage={currentPage}
                        perPage={perPage}
                        onChangePage={onChangePage}
                        onChangePerPage={onChangePerPage}
                    />
                )}
            </div>
            {/* END: Content */}
        </>
    );
};

export default Categories;

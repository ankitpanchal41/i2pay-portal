import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { deleteProductStart, getProductStart } from "../../redux/actions/Product";
import { Currency } from "../../utils/currency";
import { downloadProductExcel } from "../../redux/services/DownloadExcel";
import { productStatusUpdateHandle } from "../../redux/services/Product";
import { decode } from "html-entities";

const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const NotAvailable = React.lazy(() => import("../../components/common/status/NotAvailable"));

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { storeId } = useParams();
    // const storeId = 2;

    const [loadingId, setLoadingId] = useState(false);
    const [listingType, setListingType] = useState("");
    const [currentDeleteProducts, setCurrentDeleteProducts] = useState([]);
    const [deleteModalDetails, setDeleteModalDetails] = useState({ visible: false, id: null });
    const [isLoading, setIsLoading] = useState(false);
    const [isParPage, setIsParPage] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    const { productList, store_id, totalPage } = useSelector((state) => state.product);

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
        setImageModal(false);
    };

    const onClickEdit = (id) => {
        navigate(`/${storeId}/edit-product/${id}`);
    };

    const onClickPreviewProduct = (id) => {
        navigate(`/${storeId}/preview-product/${id}`);
    };

    const onClickDelete = (id) => {
        if (!deleteModalDetails?.visible) return;
        handleCloseDeleteModal();
        setCurrentDeleteProducts([...currentDeleteProducts, id]);

        const finishDeleteProduct = () => {
            setCurrentDeleteProducts((prevValue) => prevValue.filter((item) => item?.id !== id));
        };

        dispatch(deleteProductStart(id, finishDeleteProduct));
    };

    const handleCloseDeleteModal = React.useCallback(() => {
        setDeleteModalDetails({ visible: false, id: null });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getProductStart(storeId, currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsParPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isParPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getProductStart(storeId, 1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const pagination = {
        totalPage: productList?.length === 0 ? 1 : totalPage,
    };

    const onClickBack = () => {
        navigate(`/store-front`);
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
        const data = await downloadProductExcel(searchQuery, payload);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onChangeSwitch = async (item) => {
        setLoadingId(item?.id);

        let updatePayload = { product_id: item?.id, is_active: item?.is_active == 0 ? 1 : 0 };

        const { data } = await productStatusUpdateHandle(updatePayload);

        if (data) {
            setIsLoading(true);
            dispatch(
                getProductStart(storeId, currentPage, perPage, searchQuery, () => {
                    setIsLoading(false);
                    setIsParPage(true);
                }),
            );
        }
        setLoadingId(false);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Products"}
                onClickBack={onClickBack}
                onChangeSearchQuery={onChangeSearchQuery}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="w-full sm:w-auto flex sm:mt-0 ml-2">
                        <Link to={`/${storeId}/categories`} className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Product Categories</span>
                        </Link>
                        <Link to={`/${storeId}/create-product`} className="btn text-sm font-medium text-white bg-primary max-h-[38px] ml-2">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add New Product</span>
                        </Link>
                    </div>
                }
            />
        );
    };

    const _renderModal = () => {
        const productDetails = productList.find((item) => item?.id === imageModal);
        if (imageModal) {
            return (
                <>
                    {/* BEGIN: Modal */}
                    <div
                        className="backdrop-sepia-0 bg-black/50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none modal-dialog"
                        onClick={onCloseModal}>
                        <div className={`relative my-6 mx-auto min-w-[50vh]`} onClick={(e) => e.stopPropagation()}>
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full modal-content outline-none
                        focus:outline-none">
                                {/* BEGIN: Modal Header */}
                                {/* <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none text-slate-900 dark:text-slate-500"
                                        onClick={onCloseModal}>
                                        <Icon.X size={25} />
                                    </button>
                                </div> */}
                                <div className="relative flex-auto">
                                    <div className="max-w-[50vh]">
                                        <div className="absolute top-[10px] right-[10px] cursor-pointer" onClick={onCloseModal}>
                                            <Icon.X size={25} color="white" />
                                        </div>
                                        <img src={productDetails?.product_image} alt="product" />
                                    </div>
                                </div>
                            </div>
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
                            <th className="text-center whitespace-nowrap">Image</th>
                            <th className="whitespace-nowrap">Product Name</th>
                            <th className="whitespace-nowrap">Product Description</th>
                            <th className="whitespace-nowrap">SKU</th>
                            <th className="whitespace-nowrap">Amount</th>
                            <th className="whitespace-nowrap">Total Orders</th>
                            <th className="whitespace-nowrap">Total Orders Amount</th>
                            <th className="text-center whitespace-nowrap">Status</th>
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
                            {productList?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-10">{(currentPage - 1) * perPage + index + 1}</td>
                                        <td className="w-10 text-center">
                                            <img
                                                src={item?.product_image}
                                                alt="product"
                                                className="cursor-pointer"
                                                onClick={() => setImageModal(item?.id)}
                                            />
                                        </td>
                                        <td>
                                            <p className="font-medium line-clamp-1 dark:text-white">{item?.name}</p>
                                        </td>
                                        <td>
                                            <p className="font-medium line-clamp-1 dark:text-slate-300">{item?.description}</p>
                                        </td>

                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-slate-300">
                                                {item?.sku || <NotAvailable />}
                                            </p>
                                        </td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-slate-300">
                                                {" "}
                                                {decode(Currency.find((c) => c?.value === item?.currency)?.symbol)} {item?.price}
                                            </p>
                                        </td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-slate-300">{item?.total_order}</p>
                                        </td>
                                        <td>
                                            <p className="font-medium whitespace-nowrap dark:text-slate-300">
                                                {" "}
                                                {decode(Currency.find((c) => c?.value === item?.transactionCurrency)?.symbol)}{" "}
                                                {item?.total_amount}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="flex justify-center align-center">
                                                <div className="form-switch ">
                                                    <input
                                                        onChange={() => {
                                                            onChangeSwitch(item);
                                                        }}
                                                        // id="show-example-5"
                                                        className="show-code form-check-input mr-0 ml-3"
                                                        type="checkbox"
                                                        checked={item?.is_active === 1 ? true : false}
                                                    />
                                                </div>
                                                <div className="ml-2 flex items-center border-slate-900">
                                                    <ClipLoader
                                                        loading={loadingId === item?.id}
                                                        color="#1e3a8a"
                                                        size={15}
                                                        css="border-width: 1px;border-bottom-color: white !important;"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5"
                                                    }>
                                                    <Icon.Eye
                                                        onClick={() => {
                                                            onClickPreviewProduct(item?.id);
                                                        }}
                                                        size={15}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5"
                                                    }>
                                                    <Icon.Edit
                                                        onClick={() => {
                                                            onClickEdit(item?.id);
                                                        }}
                                                        size={15}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                    }>
                                                    {currentDeleteProducts?.includes(item?.id) ? (
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
                {!isLoading && productList?.length === 0 && (
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
                        {productList?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6">
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400 items-center">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <span className="font-medium text-primary dark:text-white">{item?.name}</span>
                                            </div>

                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <img
                                                    src={item?.product_image}
                                                    alt="product"
                                                    className="cursor-pointer width-[100%] max-w-[70px]"
                                                    onClick={() => setImageModal(item?.id)}
                                                />
                                            </div>
                                        </div>

                                        {/* BOX BODY */}
                                        <div className="flex flex-col lg:flex-row p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="cursor-pointer lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div className="cursor-pointer flex text-slate-500 text-xs">
                                                    <div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                SKU:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.sku || <NotAvailable />}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Description:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.description}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Amount:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="cursor-pointer flex text-slate-500 text-xs">
                                                    <div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Category:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.category}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Total Orders:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.total_order}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Total Orders Amount:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                <span>
                                                                    {decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}
                                                                </span>{" "}
                                                                {item?.total_amount}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* BOX BODY */}

                                        {/* BOX FOOTER */}
                                        <div className="flex flex-row lg:flex-nowrap items-center justify-center p-5">
                                            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 mr-auto">
                                                <div className="flex text-slate-500 text-xs">
                                                    <div className="form-switch ">
                                                        <input
                                                            onChange={() => {
                                                                onChangeSwitch(item);
                                                            }}
                                                            // id="show-example-5"
                                                            className="show-code form-check-input mr-0"
                                                            type="checkbox"
                                                            checked={item?.is_active === 1 ? true : false}
                                                        />
                                                    </div>
                                                    <div className="ml-2 flex items-center border-slate-900">
                                                        <ClipLoader
                                                            loading={loadingId === item?.id}
                                                            color="#1e3a8a"
                                                            size={15}
                                                            css="border-width: 1px;border-bottom-color: white !important;"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-slate-500 text-xs mt-0.5">
                                                <div className="dropdown ml-auto sm:ml-0">
                                                    <div className="flex">
                                                        <div
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 mr-5 dark:text-slate-200"
                                                            }
                                                            onClick={() => onClickPreviewProduct(item?.id)}>
                                                            <Icon.Eye className="dark:text-white" size={15} /> &nbsp;
                                                        </div>
                                                        <div
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 mr-5"
                                                            }>
                                                            <Icon.Edit
                                                                className="dark:text-white"
                                                                onClick={() => {
                                                                    onClickEdit(item?.id);
                                                                }}
                                                                size={15}
                                                            />{" "}
                                                            &nbsp;
                                                        </div>
                                                        <div
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900"
                                                            }>
                                                            {currentDeleteProducts?.includes(item?.id) ? (
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
                                                            &nbsp;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* BOX FOOTER */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!isLoading && productList?.length === 0 && (
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

                {!isLoading && productList?.length !== 0 && typeof productList !== "undefined" && (
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

export default Products;

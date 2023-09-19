import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_CONTACT_REQUEST, getContactRequest } from "../../redux/actions/Contact";
import { downloadContactExcel } from "../../redux/services/Contact";
import moment from "moment";
import NotAvailable from "../../components/common/status/NotAvailable";
import { DELETE_BLOG_REQUEST, getBlogRequest } from "../../redux/actions/Blogs";
import { DELETE_COLLECTION_BANNER_REQUEST, getCollectionBannerRequest } from "../../redux/actions/CollectionBanner";
import { downloadProductCollectionBannerExcel } from "../../redux/services/DownloadExcel";

const Heading = React.lazy(() => import("../../components/common/Heading"));
const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));

const Contacts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { collectionBanners, totalPage } = useSelector((state) => state.collectionBanners);
    const { storeId } = useParams();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [listingType, setListingType] = useState("");
    const [imageModal, setImageModal] = useState(false);

    const state = useSelector((state) => state);

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getCollectionBannerRequest({ store_id: storeId }, currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getCollectionBannerRequest({ store_id: storeId }, 1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const pagination = {
        totalPage: collectionBanners?.length === 0 ? 1 : totalPage,
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

    const onCloseModal = (e) => {
        setImageModal(false);
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const payload = {
            store_id: storeId,
            merchant_id: state?.persist?.userData?.data?.id,
        };
        const data = await downloadProductCollectionBannerExcel(searchQuery, payload);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onClickDelete = () => {
        const callBack = () => {
            setIsLoadingDelete(false);
            onHandleDeleteModal();
            setIsLoading(true);
            dispatch(
                getCollectionBannerRequest({ store_id: storeId }, currentPage, perPage, searchQuery, () => {
                    setIsLoading(false);
                    setIsPerPage(true);
                }),
            );
        };

        setIsLoadingDelete(true);
        dispatch({ type: DELETE_COLLECTION_BANNER_REQUEST, payload: { collection_banner_id: deleteModalDetails }, callBack });
    };

    const onClickEdit = (item) => {
        navigate(`/${storeId}/edit-collection-banner/${item?.id}`);
    };

    const onClickPreview = (item) => {
        // navigate(`/contact/preview/${item?.id}`);
    };

    const onClickBack = () => {
        navigate(`/store-front`);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Collection Banners"}
                onChangeSearchQuery={onChangeSearchQuery}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                displayBackButton={true}
                onClickBack={onClickBack}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <Link
                            to={`/${storeId}/create-collection-banner`}
                            className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add Collection Banners</span>
                        </Link>
                    </div>
                }
            />
        );
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const _renderModal = () => {
        const collectionBannersDetails = collectionBanners.find((item) => item?.id === imageModal);
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
                                        <img src={collectionBannersDetails?.banner_image} alt="product" />
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
                            <th className="w-[50px] whitespace-nowrap">No</th>
                            <th className="text-center whitespace-nowrap">Image</th>
                            <th className="w-auto whitespace-nowrap">Name</th>
                            <th className="whitespace-nowrap">Category</th>
                            <th className="whitespace-nowrap">Description</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={7}>
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
                            {collectionBanners?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td>{index + 1}</td>
                                        <td className="w-10 text-center">
                                            <img
                                                src={item?.banner_image}
                                                alt="product"
                                                className="cursor-pointer"
                                                onClick={() => setImageModal(item?.id)}
                                            />
                                        </td>
                                        <td>{item?.name}</td>
                                        <td>{item?.category_name}</td>
                                        <td>{item?.description}</td>
                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                <div
                                                    onClick={() => {
                                                        onClickEdit(item);
                                                    }}
                                                    className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                    <Icon.Edit size={15} /> &nbsp;
                                                </div>

                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                    }>
                                                    <Icon.Trash2 onClick={() => onHandleDeleteModal(item?.id)} size={15} stroke={"red"} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Connector Table */}

                {/* START: Table Not Found */}
                {collectionBanners?.length === 0 && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
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
                        {collectionBanners?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6" key={index}>
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <span className="font-medium text-primary dark:text-white">
                                                    {item?.first_name} {item?.last_name}
                                                </span>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="dropdown ml-auto sm:ml-0 flex items-center">
                                                    <div
                                                        onClick={() => {
                                                            onClickPreview(item);
                                                        }}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Eye size={15} /> &nbsp;
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            onClickEdit(item);
                                                        }}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Edit size={15} /> &nbsp;
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            onHandleDeleteModal(item?.id);
                                                        }}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Trash2 size={15} stroke={"red"} strokeWidth={2} /> &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col lg:flex-row p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="cursor-pointer lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div className="cursor-pointer flex text-slate-500 text-xs">
                                                    <div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Email:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.email}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                SMS :&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.country_code + " " + item?.mobile_no}
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
                                                                Group:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.category || NotAvailable()}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Created Date:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {moment(item?.created_at).format("DD-MM-YYYY hh:mm")}
                                                            </span>
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
                {!collectionBanners?.length && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            {/* BEGIN: Content */}
            <DeleteModal
                isLoading={isLoadingDelete}
                visible={visibleDeleteModal}
                onClose={onHandleDeleteModal}
                onDelete={() => {
                    onClickDelete();
                }}
            />
            {_renderModal()}
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

                {!isLoading && collectionBanners?.length !== 0 && typeof collectionBanners !== "undefined" && (
                    <Pagination
                        pagination={pagination}
                        currentPage={currentPage}
                        perPage={perPage}
                        onChangePage={onChangePage}
                        onChangePerPage={onChangePerPage}
                    />
                )}
            </div>
        </>
    );
};

export default Contacts;

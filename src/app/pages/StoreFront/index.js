import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_STORE_FRONT_REQUEST, getStoreFrontListRequest } from "../../redux/actions/StoreFront";
import DeleteModal from "../../components/common/DeleteModal";
import NoImage from "../../../assets/images/no-image.png";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Modal from "../../components/common/Modal";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { Currency } from "../../utils/currency";
import Heading from "../../components/common/Heading";
import Pagination from "../../components/common/Pagination";
import { downloadStoreExcel } from "../../redux/services/DownloadExcel";
import { updateStoreFrontStatus } from "../../redux/services/storeFront";
import { store } from "../../redux/store";
import { decode } from "html-entities";
import { Menu, Transition } from "@headlessui/react";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const StoreFront = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mode } = useSelector((state) => state.persist);

    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [listingType, setListingType] = useState("");
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [bannerImages, setBannerImages] = useState([]);
    const [visibleBannerModal, setVisibleBannerModal] = useState("");
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [loadingId, setLoadingId] = useState(false);

    const { storeFrontList, totalPage } = useSelector((state) => state.storeFrontStep);

    const state = useSelector((state) => state);
    const { userData } = store.getState()?.persist;

    // Set Listing Type
    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoadingTable(true);

        let payload = { user_id: state?.persist?.userData?.data?.id };

        dispatch(
            getStoreFrontListRequest(currentPage, perPage, searchQuery, payload, () => {
                setIsLoadingTable(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoadingTable(true);
            let payload = { user_id: state?.persist?.userData?.data?.id };
            dispatch(getStoreFrontListRequest(1, perPage, searchQuery, payload, () => setIsLoadingTable(false)));
        }
    }, [perPage]);

    // Click on Store List To Product
    const onClickStore = (id) => {
        navigate(`/products/${id}`);
    };

    const onClickBlogs = (id) => {
        navigate(`/blogs/${id}`);
    };

    const onClickCollectionBanner = (id) => {
        navigate(`/collection-banner/${id}`);
    };

    const onClickViewStore = (slug) => {
        const newWindow = window.open(`${process.env.REACT_APP_STORE_API_URL}${slug}`, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;

        //
        // navigate(`/product-list/${id}`);
    };

    // Click on Edit
    const onClickEdit = (item) => {
        navigate(`/store/edit/${item?.id}`, { state: item });
    };

    // Handle Delete Modal
    const onHandleDeleteModal = (id = false) => {
        setVisibleDeleteModal(!visibleDeleteModal);
        setDeleteId(id);
    };

    // Delete API call
    const onDeleteModal = () => {
        const callBack = () => {
            setIsDeleteLoading(false);
            setVisibleDeleteModal(!visibleDeleteModal);
        };
        setIsDeleteLoading(true);
        dispatch({
            type: DELETE_STORE_FRONT_REQUEST,
            payload: { store_id: deleteId },
            callBack,
        });
    };

    const onClickBanner = (item) => {
        setVisibleBannerModal(!visibleBannerModal);
        setBannerImages(item?.logo);
    };

    const pagination = {
        totalPage: storeFrontList?.length === 0 ? 1 : totalPage,
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
            user_id: state?.persist?.userData?.data?.id,
        };
        const data = await downloadStoreExcel(searchQuery, payload);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onChangeSwitch = async (item) => {
        setLoadingId(item?.id);

        let updatePayload = { store_id: item?.id, is_active: item?.is_active == 0 ? 1 : 0 };

        const { data } = await updateStoreFrontStatus(updatePayload);

        if (data) {
            setIsLoadingTable(true);
            let payload = { user_id: state?.persist?.userData?.data?.id };
            dispatch(
                getStoreFrontListRequest(currentPage, perPage, searchQuery, payload, () => {
                    setIsLoadingTable(false);
                    setIsPerPage(true);
                }),
            );
        }
        setLoadingId(false);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Store Front List"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <Link to="/create-store" className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Create New Store</span>
                        </Link>
                    </div>
                }
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* BEGIN: Connector Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="w-10 whitespace-nowrap">No</th>
                            <th className="w-10 text-center whitespace-nowrap">Banner</th>
                            <th className="whitespace-nowrap">Store Name</th>
                            <th className="whitespace-nowrap">Email</th>
                            <th className="whitespace-nowrap">Currency</th>
                            <th className="whitespace-nowrap">Total Orders</th>
                            <th className="whitespace-nowrap">Total Orders Amount</th>
                            {/* <th className="w-[150px] whitespace-nowrap"></th>
                            <th className="w-[150px] whitespace-nowrap"></th> */}
                            <th className="text-center whitespace-nowrap">Status</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoadingTable ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={11}>
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
                            {storeFrontList?.map((item, index) => {
                                return (
                                    <tr className="" key={index}>
                                        <td
                                            onClick={() => {
                                                onClickViewStore(item?.slug);
                                            }}
                                            className="w-10 cursor-pointer dark:text-white">
                                            {index + 1}
                                        </td>
                                        <td className="text-center cursor-pointer">
                                            <img alt="bannerIamge" src={item?.logo || NoImage} style={{ width: "100%" }} />
                                        </td>
                                        <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                onClickViewStore(item?.slug);
                                            }}>
                                            <span className="font-medium whitespace-nowrap dark:text-white">{item?.name}</span>
                                        </td>
                                        {/* <td
                                        onClick={() => {
                                            onClickStore(item?.id);
                                        }}>
                                        <p className="font-medium whitespace-nowrap w-20">{item?.description}</p>
                                    </td> */}
                                        <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                onClickViewStore(item?.slug);
                                            }}>
                                            <span className="font-medium whitespace-nowrap dark:text-slate-300">
                                                {item?.contact_us_email}
                                            </span>
                                        </td>
                                        <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                onClickViewStore(item?.slug);
                                            }}>
                                            <span className="font-medium whitespace-nowrap dark:text-slate-300">
                                                <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span> (
                                                {item?.currency})
                                            </span>
                                        </td>
                                        <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                onClickViewStore(item?.slug);
                                            }}>
                                            <p className="font-medium whitespace-nowrap dark:text-slate-300">{item?.total_order}</p>
                                        </td>
                                        <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                onClickViewStore(item?.slug);
                                            }}>
                                            <span className="font-medium whitespace-nowrap dark:text-slate-300">
                                                <span>{decode(Currency.find((c) => c?.value === item?.transactionCurrency)?.symbol)}</span>{" "}
                                                {item?.total_amount}
                                            </span>
                                        </td>
                                        {/* <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                onClickStore(item?.id);
                                            }}>
                                            <button className="btn btn-primary">Products</button>
                                        </td>
                                        <td
                                            className="cursor-pointer"
                                            onClick={() => {
                                                onClickBlogs(item?.id);
                                            }}>
                                            <button className="btn btn-primary">Blogs</button>
                                        </td> */}
                                        <td onClick={() => {}}>
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
                                                <Menu as="div" className="relative">
                                                    <Menu.Button
                                                        type="buttons"
                                                        className="dropdown-toggle btn btn-elevated-rounded-secondary p-1 font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5">
                                                        <span className="w-5 h-5 flex items-center justify-center">
                                                            {" "}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="feather feather-plus w-4 h-4">
                                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                            </svg>{" "}
                                                        </span>
                                                    </Menu.Button>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95">
                                                        <Menu.Items
                                                            className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-darkmode-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                            style={{
                                                                background: mode === "light" ? "#ffffff" : "#232D45",
                                                                top: "-38px",
                                                                // bottom: "-15px",
                                                                left: "-210px",
                                                                zIndex: 9999,
                                                            }}>
                                                            <div className="p-2 z-[9999]">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => {
                                                                                onClickStore(item?.id);
                                                                            }}
                                                                            className={
                                                                                active
                                                                                    ? "dropdown-item bg-slate-200 w-full text-left rounded-md p-2"
                                                                                    : "dropdown-item w-full text-left p-2"
                                                                            }>
                                                                            <a className="dropdown-item flex items-center">Products</a>
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>

                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => {
                                                                                onClickBlogs(item?.id);
                                                                            }}
                                                                            className={
                                                                                active
                                                                                    ? "dropdown-item bg-slate-200 w-full text-left rounded-md p-2"
                                                                                    : "dropdown-item w-full text-left p-2"
                                                                            }>
                                                                            <a className="dropdown-item flex items-center">Blogs</a>
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>

                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => {
                                                                                onClickCollectionBanner(item?.id);
                                                                            }}
                                                                            className={
                                                                                active
                                                                                    ? "dropdown-item bg-slate-200 w-full text-left rounded-md p-2"
                                                                                    : "dropdown-item w-full text-left p-2"
                                                                            }>
                                                                            <a className="dropdown-item flex items-center">
                                                                                Collection Banner
                                                                            </a>
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                                <div
                                                    onClick={() => {
                                                        onClickViewStore(item?.slug);
                                                    }}
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5"
                                                    }>
                                                    <Icon.Eye size={15} />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        onClickEdit(item);
                                                    }}
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer  dark:text-white text-slate-900 mr-5"
                                                    }>
                                                    <Icon.Edit size={15} />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        onHandleDeleteModal(item?.id);
                                                    }}
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                    }>
                                                    <Icon.Trash2 size={15} stroke={"red"} strokeWidth={2} />
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
                {!storeFrontList?.length && !isLoadingTable && (
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
                {isLoadingTable ? (
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
                        {storeFrontList?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6">
                                    <div className="box min-h-[190px]">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div
                                                onClick={() => {
                                                    onClickViewStore(item?.slug);
                                                }}
                                                className="cursor-pointer mr-auto text-left mt-3 lg:mt-0">
                                                <span className="font-medium dark:text-white text-primary">{item?.name}</span>
                                                <div className="text-slate-400 text-xs mt-0.5 max-3-line">{item?.description}</div>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <img
                                                    onClick={() => {
                                                        if (item?.banner_image_1 || item?.banner_image_2 || item?.banner_image_3) {
                                                            onClickBanner(item);
                                                        }
                                                    }}
                                                    alt="bannerIamge"
                                                    src={item?.banner_image_1 || item?.banner_image_2 || item?.banner_image_3 || NoImage}
                                                    className={
                                                        item?.banner_image_1 || item?.banner_image_2 || item?.banner_image_3
                                                            ? "width-[100%] max-w-[70px] cursor-pointer"
                                                            : "width-[100%] max-w-[47px] cursor-pointer"
                                                    }
                                                />
                                            </div>

                                            {/*<div*/}
                                            {/*    onClick={() => {*/}
                                            {/*        onClickViewStore(item?.slug);*/}
                                            {/*    }}*/}
                                            {/*    className="cursor-pointer lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">*/}
                                            {/*    <span className="font-medium dark:text-white text-primary">{item?.name}</span>*/}
                                            {/*    <div className="text-slate-400 text-xs mt-0.5 max-3-line">{item?.description}</div>*/}
                                            {/*</div>*/}
                                            {/*<div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">*/}
                                            {/*    <img*/}
                                            {/*        onClick={() => {*/}
                                            {/*            if (item?.banner_image_1 || item?.banner_image_2 || item?.banner_image_3) {*/}
                                            {/*                onClickBanner(item);*/}
                                            {/*            }*/}
                                            {/*        }}*/}
                                            {/*        src={item?.banner_image_1 || item?.banner_image_2 || item?.banner_image_3 || NoImage}*/}
                                            {/*        className="width-[100%] max-w-[70px] cursor-pointer"*/}
                                            {/*    />*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="flex flex-col lg:flex-row p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div
                                                onClick={() => {
                                                    onClickViewStore(item?.slug);
                                                }}
                                                className="cursor-pointer lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div
                                                    onClick={() => {
                                                        onClickViewStore(item?.slug);
                                                    }}
                                                    className="cursor-pointer flex text-slate-500 text-xs">
                                                    <div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Email:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.contact_us_email}
                                                            </span>
                                                        </div>
                                                        <div className="flex text-slate-500 text-xs">
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                                Currency:&nbsp;
                                                            </span>
                                                            <span className="text-slate-900 dark:text-white text-xs mt-0.5">
                                                                {item?.currency}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div
                                                    onClick={() => {
                                                        onClickViewStore(item?.slug);
                                                    }}
                                                    className="cursor-pointer flex text-slate-500 text-xs">
                                                    <div>
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
                                        <div className="flex flex-row lg:flex-nowrap items-center justify-center p-5">
                                            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 mr-auto">
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
                                            </div>
                                            <div className="text-slate-500 text-xs mt-0.5">
                                                <div className="dropdown ml-auto sm:ml-0">
                                                    <div className="flex">
                                                        <Menu as="div" className="relative">
                                                            <Menu.Button
                                                                type="buttons"
                                                                className="dropdown-toggle btn btn-elevated-rounded-secondary p-1 font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5">
                                                                <span className="w-5 h-5 flex items-center justify-center">
                                                                    {" "}
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="24"
                                                                        height="24"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="feather feather-plus w-4 h-4">
                                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                    </svg>{" "}
                                                                </span>
                                                            </Menu.Button>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95">
                                                                <Menu.Items
                                                                    className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                                    style={{
                                                                        background: mode === "light" ? "#ffffff" : "#232D45",
                                                                        top: "-38px",
                                                                        // bottom: "-15px",
                                                                        left: "-210px",
                                                                    }}>
                                                                    <div className="p-2">
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <button
                                                                                    onClick={() => {
                                                                                        onClickStore(item?.id);
                                                                                    }}
                                                                                    className={
                                                                                        active
                                                                                            ? "dropdown-item bg-slate-200 w-full text-left rounded-md p-2"
                                                                                            : "dropdown-item w-full text-left p-2"
                                                                                    }>
                                                                                    <a className="dropdown-item flex items-center">
                                                                                        Products
                                                                                    </a>
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>

                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <button
                                                                                    onClick={() => {
                                                                                        onClickBlogs(item?.id);
                                                                                    }}
                                                                                    className={
                                                                                        active
                                                                                            ? "dropdown-item bg-slate-200 w-full text-left rounded-md p-2"
                                                                                            : "dropdown-item w-full text-left p-2"
                                                                                    }>
                                                                                    <a className="dropdown-item flex items-center">Blogs</a>
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>

                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <button
                                                                                    onClick={() => {
                                                                                        onClickCollectionBanner(item?.id);
                                                                                    }}
                                                                                    className={
                                                                                        active
                                                                                            ? "dropdown-item bg-slate-200 w-full text-left rounded-md p-2"
                                                                                            : "dropdown-item w-full text-left p-2"
                                                                                    }>
                                                                                    <a className="dropdown-item flex items-center">
                                                                                        Collection Banner
                                                                                    </a>
                                                                                </button>
                                                                            )}
                                                                        </Menu.Item>
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                        <div
                                                            onClick={() => {
                                                                onClickViewStore(item?.slug);
                                                            }}
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900  dark:text-white mr-5"
                                                            }>
                                                            <Icon.Eye size={15} />
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                onClickEdit(item);
                                                            }}
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900  dark:text-white mr-5"
                                                            }>
                                                            <Icon.Edit size={15} />
                                                        </div>

                                                        {/* <div
                                                            onClick={() => {
                                                                onClickStore(item?.id);
                                                            }}
                                                            title="Products"
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900  dark:text-white mr-5"
                                                            }>
                                                            <Icon.ShoppingBag size={15} />
                                                        </div> */}

                                                        <div
                                                            onClick={() => {
                                                                onHandleDeleteModal(item?.id);
                                                            }}
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                            }>
                                                            <Icon.Trash2 size={15} stroke={"red"} strokeWidth={2} />
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

                {/* START: Table Not Found */}
                {!storeFrontList?.length && !isLoadingTable && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
            </>
        );
    };

    return (
        <>
            <Modal removeHeader={false} removeFooter={false} visible={visibleBannerModal} onClose={onClickBanner}>
                <div className="h-[360px] w-[600px]">
                    <img alt="bannerIamge" src={bannerImages} />
                </div>
            </Modal>

            {/* BEGIN: Delete Modal */}
            <DeleteModal visible={visibleDeleteModal} onClose={onHandleDeleteModal} onDelete={onDeleteModal} isLoading={isDeleteLoading} />
            {/* END: Delete Modal */}

            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {userData?.data?.is_active_connector == "1" ? _renderHeading() : ""}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                                {/* BEGIN: Connector Table */}
                                {userData?.data?.is_active_connector != "1" ? (
                                    <div className="flex flex-col justify-center h-48 items-center">
                                        <div className="text-primary dark:text-white text-xl -mt-3">
                                            You need to active connector after that you can access store functionality.
                                        </div>
                                        <Link to="/connector" className="btn btn-primary mt-2">
                                            Active Connector here
                                        </Link>
                                    </div>
                                ) : (
                                    <>{listingType === "box" ? _renderBoxTable() : _renderTable()}</>
                                )}
                                {/* END: Connector Table */}
                            </div>
                        </div>
                    </div>
                </div>

                {userData?.data?.is_active_connector == "1" &&
                    !isLoadingTable &&
                    storeFrontList?.length !== 0 &&
                    typeof storeFrontList !== "undefined" && (
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

export default StoreFront;

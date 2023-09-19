import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { DELETE_IP_WHITELIST_REQUEST, getIpWhiteListRequest } from "../../redux/actions/IPWhitelist";
import { downloadIPWhiteListExcel } from "../../redux/services/DownloadExcel";

const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const PrintConnectorsLabels = React.lazy(() => import("../../components/common/status/PrintConnectorsLabels"));
const PrintIpAddressesLabels = React.lazy(() => import("../../components/common/status/PrintIpAddressesLabels"));

const IPWhiteList = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const storeId = 2;

    const [listingType, setListingType] = useState("");
    const [currentDeleteProducts, setCurrentDeleteProducts] = useState([]);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [imageModal, setImageModal] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    const { ipWhitelist, totalPage } = useSelector((state) => state.ipWhitelist);

    const state = useSelector((state) => state);

    // const onCloseModal = (e) => {
    //     setImageModal(false);
    // };

    // Set Listing Type
    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getIpWhiteListRequest(currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getIpWhiteListRequest(1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const onClickDelete = () => {
        const callBack = () => {
            setIsLoadingDelete(false);
            onHandleDeleteModal();
        };

        setIsLoadingDelete(true);
        dispatch({ type: DELETE_IP_WHITELIST_REQUEST, payload: { id: deleteModalDetails }, callBack });
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const pagination = {
        totalPage: ipWhitelist?.length === 0 ? 1 : totalPage,
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

    // const onClickBack = () => {
    //     navigate(`/store-front`);
    // };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const data = await downloadIPWhiteListExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };
    const _renderHeading = () => {
        return (
            <Heading
                title={"IP Whitelist"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <Link to={"/ip-whitelist/create"} className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add IP Whitelist</span>
                        </Link>
                    </div>
                }
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* START: IP whitelist Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Website URL</th>
                            <th className="whitespace-nowrap">IP Address</th>
                            <th className="whitespace-nowrap">Status</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={6}>
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
                            {ipWhitelist?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-20">{(currentPage - 1) * perPage + index + 1}</td>

                                        <td>
                                            <a
                                                href={item?.website}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-medium dark:text-white whitespace-nowrap text-primary truncate">
                                                {item?.website}
                                            </a>
                                        </td>
                                        <td>{item?.ip_address ? <PrintIpAddressesLabels ipAddresses={item?.ip_address} /> : null}</td>
                                        <td>
                                            {/* is_active */}
                                            {item?.is_active === 0 && (
                                                <span className="py-0.5 px-2 rounded-full text-xs bg-warning text-white cursor-pointer font-medium">
                                                    Pending
                                                </span>
                                            )}
                                            {item?.is_active === 1 && (
                                                <span className="py-0.5 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                                                    Approved
                                                </span>
                                            )}
                                            {item?.is_active === 2 && (
                                                <span className="py-0.5 px-2 rounded-full text-xs bg-danger text-white cursor-pointer font-medium">
                                                    Rejected
                                                </span>
                                            )}
                                        </td>

                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                {item?.is_active !== 1 && (
                                                    <Link
                                                        to={`/ip-whitelist/${item?.id}/edit`}
                                                        className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                        <Icon.Edit size={15} /> &nbsp;
                                                    </Link>
                                                )}

                                                <div
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "
                                                    }>
                                                    {currentDeleteProducts?.includes(item?.id) ? (
                                                        <MiniLoader isLoading={true} color="red" />
                                                    ) : (
                                                        <Icon.Trash2
                                                            onClick={() => onHandleDeleteModal(item?.id)}
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
                {/* END: IP whitelist Table */}

                {/* START: Table Not Found */}
                {ipWhitelist?.length === 0 && !isLoading && (
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
                        {ipWhitelist?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6" key={index}>
                                    <div className="box">
                                        <div className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 dark:text-white text-xs font-bold">
                                                            Website:&nbsp;
                                                        </span>
                                                        <a
                                                            href={item?.website}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="font-medium   dark:text-slate-400 whitespace-nowrap text-primary truncate">
                                                            {item?.website}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="flex">
                                                    <Link
                                                        to={`/ip-whitelist/${item?.id}/edit`}
                                                        className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                        <Icon.Edit size={15} /> &nbsp;
                                                    </Link>

                                                    <div
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900"
                                                        }>
                                                        {currentDeleteProducts?.includes(item?.id) ? (
                                                            <MiniLoader isLoading={true} color="red" />
                                                        ) : (
                                                            <Icon.Trash2
                                                                onClick={() => onHandleDeleteModal(item?.id)}
                                                                size={15}
                                                                stroke={"red"}
                                                            />
                                                        )}
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-center p-5">
                                            <div className="w-full lg:w-1/2 mb-4 lg:mb-0 mr-auto">
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                            Connectors:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                            {item?.connector && item?.connector !== "undefined" ? (
                                                                <PrintConnectorsLabels connectors={item?.connector} />
                                                            ) : null}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap md:flex-nowrap text-slate-500 text-xs mt-2">
                                                        <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                            IP Address:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                            {item?.connector && item?.connector !== "undefined" ? (
                                                                <PrintIpAddressesLabels ipAddresses={item?.ip_address} />
                                                            ) : null}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-slate-500 text-xs mt-0.5">
                                                {item?.is_active === 0 && (
                                                    <span className="py-0.5 px-2 rounded-full text-xs bg-warning text-white cursor-pointer font-medium">
                                                        Pending
                                                    </span>
                                                )}
                                                {item?.is_active === 1 && (
                                                    <span className="py-0.5 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                                                        Approved
                                                    </span>
                                                )}
                                                {item?.is_active === 2 && (
                                                    <span className="py-0.5 px-2 rounded-full text-xs bg-danger text-white cursor-pointer font-medium">
                                                        Rejected
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {ipWhitelist?.length === 0 && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <DeleteModal
                isLoading={isLoadingDelete}
                visible={visibleDeleteModal}
                onClose={onHandleDeleteModal}
                onDelete={() => {
                    onClickDelete();
                }}
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

                {!isLoading && ipWhitelist?.length !== 0 && typeof ipWhitelist !== "undefined" && (
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

export default IPWhiteList;

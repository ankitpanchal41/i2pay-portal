import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { DELETE_PAYMENT_LINK_REQUEST, getPaymentLinkRequest } from "../../redux/actions/PaymentLinkAction";
import { downloadPaymentLinkExcel } from "../../redux/services/DownloadExcel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showToastMessage } from "../../utils/methods";
import { printPaymentLinkStatus, truncateString } from "../../utils/helper";
import { decode } from "html-entities";
import { Currency } from "../../utils/currency";

const NotAvailable = React.lazy(() => import("../../components/common/status/NotAvailable"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const SocialSharingDropdown = React.lazy(() => import("./SocialSharingDropdown"));

const PaymentLink = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.persist);

    const [listingType, setListingType] = useState("");
    const [currentDeleteProducts, setCurrentDeleteProducts] = useState([]);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const [deleteModalDetails, setDeleteModalDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    const { links, totalPage } = useSelector((state) => state.paymentLink);

    const state = useSelector((state) => state);

    // Set Listing Type
    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getPaymentLinkRequest(currentPage, perPage, searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getPaymentLinkRequest(1, perPage, searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const onClickDelete = () => {
        const callBack = () => {
            setIsLoadingDelete(false);
            onHandleDeleteModal();
        };

        setIsLoadingDelete(true);
        dispatch({ type: DELETE_PAYMENT_LINK_REQUEST, payload: { payment_link_id: deleteModalDetails }, callBack });
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const pagination = {
        totalPage: links?.length === 0 ? 1 : totalPage,
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

    const onCopyText = () => {
        showToastMessage(`Your link is copied.`, 200);
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const data = await downloadPaymentLinkExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Payment Links"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <Link to={"/payment-links/create"} className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add Payment Link</span>
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
                            <th className="whitespace-nowrap">Title</th>
                            <th className="whitespace-nowrap">Amount</th>
                            <th className="whitespace-nowrap">Payment Link</th>
                            <th className="whitespace-nowrap">Link Status</th>
                            <th className="whitespace-nowrap">Expiration Date</th>
                            <th className="whitespace-nowrap">No Of Transactions</th>
                            <th className="whitespace-nowrap">Total Transactions</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
                            <tr className="intro-x">
                                <td colSpan={9}>
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
                            {links?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-20">{(currentPage - 1) * perPage + index + 1}</td>

                                        <td>
                                            <div className="max-2-line">{truncateString(item?.title, 50)}</div>
                                        </td>
                                        <td>
                                            {decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}
                                            {item?.amount}
                                        </td>
                                        <td>
                                            {item?.link ? (
                                                <div className="flex">
                                                    <div className="flex items-center justify-center py-0.5 px-2 rounded-full text-white bg-success mr-1">
                                                        <div className="text-xs">{item?.payment_type}</div>
                                                    </div>

                                                    {item?.status === "active" ? (
                                                        <>
                                                            <a
                                                                href={item?.link}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="font-medium   dark:text-slate-400 whitespace-nowrap text-primary truncate cursor-pointer">
                                                                {truncateString(item?.link, 20)}
                                                            </a>

                                                            <CopyToClipboard
                                                                text={item?.link}
                                                                onCopy={() => {
                                                                    onCopyText();
                                                                }}>
                                                                <Icon.Copy
                                                                    size={"22"}
                                                                    className="text-primary dark:text-white ml-2 border rounded p-1 border-primary dark:border-white cursor-pointer"
                                                                />
                                                            </CopyToClipboard>
                                                        </>
                                                    ) : (
                                                        <div className="text-black dark:text-slate-400 line-through">
                                                            {truncateString(item?.link, 40)}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <NotAvailable />
                                            )}
                                        </td>
                                        <td>{printPaymentLinkStatus(item?.status)}</td>
                                        <td>
                                            {item?.status === "expired" && item?.payment_type === "single" ? (
                                                <NotAvailable />
                                            ) : item?.expiry_date ? (
                                                item?.expiry_date
                                            ) : (
                                                <NotAvailable />
                                            )}
                                        </td>
                                        <td>{item?.noOfTransactions}</td>
                                        <td>
                                            {decode(Currency.find((c) => c?.value === item?.transactionCurrency)?.symbol)} {item?.totalTransactions}
                                        </td>
                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                {item?.status == "active" && (
                                                    <>
                                                        <SocialSharingDropdown item={item} />

                                                        <Link
                                                            to={`/payment-links/edit/${item?.id}`}
                                                            className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                            <Icon.Edit size={15} /> &nbsp;
                                                        </Link>
                                                    </>
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
                {links?.length === 0 && !isLoading && (
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
                    <div className="grid grid-cols-12 gap-6 my-5">
                        {links?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6 box shadow-lg" key={index}>
                                    {/* HEADER */}
                                    <div className="flex flex-col md:flex-row align-start md:items-center justify-between p-5 shadow order-slate-200/60 ">
                                        <div className="flex flex-col">
                                            <div className="flex flex-col md:flex-row align-start md:items-center max-2-line">
                                                <span className="text-slate-900 dark:text-white text-base mr-3">
                                                    {truncateString(item?.title, 50)}
                                                </span>
                                                <span className="min-w-[100px]">{printPaymentLinkStatus(item?.status)}</span>
                                            </div>
                                            <div className="text-slate-600 text-xs mt-0.5  dark:text-slate-400 flex flex-row relative">
                                                {item?.status === "active" ? (
                                                    <div className="flex flex-row">
                                                        <a
                                                            href={item?.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="font-medium   dark:text-slate-200 whitespace-nowrap text-primary truncate cursor-pointer">
                                                            {truncateString(item?.link, 40)}
                                                        </a>

                                                        <CopyToClipboard
                                                            text={item?.link}
                                                            onCopy={() => {
                                                                onCopyText();
                                                            }}>
                                                            <Icon.Copy
                                                                size={"22"}
                                                                className="text-primary dark:text-white dark:border-white ml-2 border rounded p-1 border-primary cursor-pointer relative top-[-3px]"
                                                            />
                                                        </CopyToClipboard>
                                                    </div>
                                                ) : (
                                                    <div className="text-black dark:text-slate-400 line-through">
                                                        {truncateString(item?.link, 40)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="flex">
                                                {item?.status == "active" && (
                                                    <>
                                                        <SocialSharingDropdown item={item} />

                                                        <Link
                                                            to={`/payment-links/edit/${item?.id}`}
                                                            className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                            <Icon.Edit size={15} /> &nbsp;
                                                        </Link>
                                                    </>
                                                )}

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
                                    {/* HEADER */}

                                    {/* BODY */}
                                    <div className="p-5">
                                        <div className="grid grid-cols-12 md:gap-6 gap-0">
                                            <div className="col-span-12 md:col-span-6 flex flex-col justify-start">
                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                        Email: &nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        {item?.email}
                                                    </span>
                                                </div>
                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                        Mobile Number: &nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        {item?.country_code} {item?.mobile_no}
                                                    </span>
                                                </div>
                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                        {" "}
                                                        No Of Transactions:&nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        {item?.noOfTransactions}
                                                    </span>
                                                </div>
                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                        Payment Type : &nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        <div className="flex items-center justify-center py-0.5 px-2 rounded-full text-white bg-success">
                                                            <div className="text-xs">{item?.payment_type}</div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 flex flex-col justify-start md:justify-end">
                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                        Amount: &nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        {item?.amount} ({item?.currency})
                                                    </span>
                                                </div>

                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                        Expiry Date : &nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        {item?.status === "expired" && item?.payment_type === "single" ? (
                                                            <NotAvailable />
                                                        ) : item?.expiry_date ? (
                                                            item?.expiry_date
                                                        ) : (
                                                            <NotAvailable />
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                        Total Transactions:&nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        {item?.totalTransactions}
                                                    </span>
                                                </div>
                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white mr-1">
                                                        Description: &nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400 max-2-line">
                                                        {item?.description ? item?.description : <NotAvailable />}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* BODY */}
                                </div>
                            );
                        })}
                    </div>
                )}
                {links?.length === 0 && !isLoading && (
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
                {userData?.data?.is_active_connector == "1" && _renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden min-h-[165px]">
                                {userData?.data?.is_active_connector != "1" ? (
                                    <div className="flex flex-col justify-center h-48 items-center">
                                        <div className="text-primary dark:text-white text-xl -mt-3">
                                            You need to active connector after that you can access Payment Link functionality.
                                        </div>
                                        <Link to="/connector" className="btn btn-primary mt-2">
                                            Active Connector here
                                        </Link>
                                    </div>
                                ) : (
                                    <>{listingType === "box" ? _renderBoxTable() : _renderTable()}</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {userData?.data?.is_active_connector == "1" && !isLoading && links?.length !== 0 && typeof links !== "undefined" && (
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

export default PaymentLink;

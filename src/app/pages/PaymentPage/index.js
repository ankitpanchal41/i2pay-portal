import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { DELETE_PAYMENT_PAGE_REQUEST, getPaymentPageRequest } from "../../redux/actions/PaymentPageAction";
import { downloadPaymentPageExcel } from "../../redux/services/DownloadExcel";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showToastMessage } from "../../utils/methods";
import { truncateString } from "../../utils/helper";
import { decode } from "html-entities";
import { Currency } from "../../utils/currency";

const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Heading = React.lazy(() => import("../../components/common/Heading"));
const NotAvailable = React.lazy(() => import("../../components/common/status/NotAvailable"));
const TransparentModal = React.lazy(() => import("../../components/common/TransparentModal"));
const SocialSharingDropdown = React.lazy(() => import("./SocialSharingDropdown"));

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [visibleTemplate, setVisibleTemplate] = useState(false);

    const { pages, totalPage } = useSelector((state) => state.paymentPage);

    const state = useSelector((state) => state);

    // Set Listing Type
    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    useEffect(() => {
        setIsLoading(true);
        let payload = { merchant_id: state?.persist?.userData?.data?.id };

        dispatch(
            getPaymentPageRequest(currentPage, perPage, searchQuery, payload, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            let payload = { merchant_id: state?.persist?.userData?.data?.id };

            dispatch(getPaymentPageRequest(1, perPage, searchQuery, payload, () => setIsLoading(false)));
        }
    }, [perPage]);

    const onClickDelete = () => {
        const callBack = async () => {
            onHandleDeleteModal();
            setIsLoading(true);
            let payload = { merchant_id: state?.persist?.userData?.data?.id };

            await dispatch(
                getPaymentPageRequest(currentPage, perPage, searchQuery, payload, () => {
                    setIsLoading(false);
                    setIsPerPage(true);
                }),
            );
            setIsLoadingDelete(false);
        };

        setIsLoadingDelete(true);
        let payload = { merchant_id: state?.persist?.userData?.data?.id, payment_page_id: deleteModalDetails };

        dispatch({ type: DELETE_PAYMENT_PAGE_REQUEST, payload, callBack });
    };

    const onHandleDeleteModal = (id) => {
        setDeleteModalDetails(id);
        setVisibleDeleteModal(!visibleDeleteModal);
    };

    const pagination = {
        totalPage: pages?.length === 0 ? 1 : totalPage,
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
        const payload = {
            merchant_id: state?.persist?.userData?.data?.id,
        };
        const data = await downloadPaymentPageExcel(searchQuery, payload);
        if (data) {
            window.location.href = data?.data;
        }
        setIsLoadingExport(false);
    };

    const onClickVisibleTemplate = () => {
        setVisibleTemplate(!visibleTemplate);
    };

    const onClickCreate = async (id) => {
        await onClickVisibleTemplate();
        navigate(`/payment-page/create/${id}`);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Payment Pages"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <div onClick={onClickVisibleTemplate} className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Add Payment Page</span>
                        </div>
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
                            <th className="whitespace-nowrap">Page Link</th>
                            <th className="whitespace-nowrap">Email</th>
                            <th className="whitespace-nowrap">Mobile Number</th>
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
                            {pages?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-20">{(currentPage - 1) * perPage + index + 1}</td>

                                        <td>
                                            <div className="max-2-line">{truncateString(item?.title, 50)}</div>
                                        </td>
                                        <td>
                                            {item?.amount_type === "multiple"
                                                ? "Multiple Amount"
                                                : item?.amount_type === "customer"
                                                ? "Customer Decides"
                                                : `${decode(Currency.find((c) => c?.value === item?.currency)?.symbol)} ${item?.amount}`}
                                        </td>
                                        <td>
                                            {item?.link ? (
                                                <div className="flex">
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
                                                </div>
                                            ) : (
                                                <NotAvailable />
                                            )}
                                        </td>
                                        <td>{item?.email}</td>
                                        <td>
                                            {item?.country_code} {item?.mobile}
                                        </td>
                                        <td>{item?.noOfTransactions}</td>
                                        <td>
                                            {decode(Currency.find((c) => c?.value === item?.transactionCurrency)?.symbol)} {item?.totalTransactions}
                                        </td>
                                        <td className="table-report__action text-center w-10">
                                            <div className="flex justify-center">
                                                <SocialSharingDropdown item={item} />
                                                {/* <RWebShare
                                                    data={{
                                                        text: "Like humans, flamingos make friends for life",
                                                        url: "https://link.medium.com/Gt17fJKkAtb",
                                                        title: "Flamingos",
                                                    }}
                                                    onClick={() => console.log("shared successfully!")}>
                                                    <div className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3 mt-1">
                                                        <Icon.Share2 size="15" />
                                                    </div>
                                                </RWebShare> */}

                                                <Link
                                                    to={`/payment-page/update/${item?.id}`}
                                                    className="font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3">
                                                    <Icon.Edit size={15} /> &nbsp;
                                                </Link>

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
                {pages?.length === 0 && !isLoading && (
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
                        {pages?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6 box shadow-lg" key={index}>
                                    <div className="flex flex-col md:flex-row align-start md:items-center justify-between p-5 shadow order-slate-200/60 ">
                                        <div className="flex flex-col">
                                            <div className="flex flex-col md:flex-row align-start md:items-center max-2-line">
                                                <span className="text-slate-900 dark:text-white text-base mr-3">
                                                    {truncateString(item?.title, 50)}
                                                </span>
                                            </div>
                                            <div className="text-slate-600 text-xs mt-0.5  dark:text-slate-400 flex flex-row relative">
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
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="flex">
                                                <SocialSharingDropdown item={item} />

                                                <Link
                                                    to={`/payment-page/update/${item?.id}`}
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
                                    {/* HEADER */}

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
                                                        Amount:&nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        {item?.amount_type === "multiple"
                                                            ? "Multiple Amount"
                                                            : item?.amount_type === "customer"
                                                            ? "Customer Decides"
                                                            : `${item?.amount} (${item?.currency})`}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6 flex flex-col justify-start">
                                                <div className="flex text-slate-500 text-xs">
                                                    <span className="text-slate-900 text-xs mt-0.5 font-bold  dark:text-white">
                                                        No Of Transactions:&nbsp;
                                                    </span>
                                                    <span className="text-slate-600 text-xs mt-0.5  dark:text-slate-400">
                                                        {item?.noOfTransactions}
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {pages?.length === 0 && !isLoading && (
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

            <TransparentModal visible={visibleTemplate} onClose={onClickVisibleTemplate}>
                <div className="grid grid-cols-12 gap-6">
                    <div
                        onClick={() => {
                            onClickCreate(1);
                        }}
                        className="col-span-12 sm:col-span-4 2xl:col-span-4 box p-5 cursor-pointer zoom-in max-w-[500px] hover-effect">
                        <div className="font-medium text-base text-slate-900 dark:text-white">Create your Own</div>
                        <div className="text-slate-500">Got your own idea? Start with a clean slate.</div>
                    </div>
                    <div
                        onClick={() => {
                            onClickCreate(2);
                        }}
                        className="col-span-12 sm:col-span-4 2xl:col-span-4 box p-5 cursor-pointer zoom-in max-w-[500px] mt-5 hover-effect">
                        <div className="font-medium text-base text-slate-900 dark:text-white">Events and Tickets</div>
                        <div className="text-slate-500">
                            Take your event live by adding venue details, event date/time and event images.
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            onClickCreate(3);
                        }}
                        className="col-span-12 sm:col-span-4 2xl:col-span-4 box p-5 cursor-pointer zoom-in max-w-[500px] mt-5 hover-effect">
                        <div className="font-medium text-base text-slate-900 dark:text-white">Accepting Donations</div>
                        <div className="text-slate-500">
                            Start collecting online donations by adding cause information, images and campaign duration.
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            onClickCreate(4);
                        }}
                        className="col-span-12 sm:col-span-4 2xl:col-span-4 box p-5 cursor-pointer zoom-in max-w-[500px] mt-5 hover-effect">
                        <div className="font-medium text-base text-slate-900 dark:text-white">Product Sale</div>
                        <div className="text-slate-500">
                            Kickstart your sales by adding product description along with multiple images and shipping information.
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            onClickCreate(5);
                        }}
                        className="col-span-12 sm:col-span-4 2xl:col-span-4 box p-5 cursor-pointer zoom-in max-w-[500px] mt-5 hover-effect">
                        <div className="font-medium text-base text-slate-900 dark:text-white">Fees Collection</div>
                        <div className="text-slate-500">Collect fees online by adding program details, fee breakup and T&C.</div>
                    </div>
                </div>
            </TransparentModal>

            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {userData?.data?.is_active_connector == "1" && _renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {userData?.data?.is_active_connector != "1" ? (
                                    <div className="flex flex-col justify-center h-48 items-center">
                                        <div className="text-primary dark:text-white text-xl -mt-3">
                                            You need to active connector after that you can access Payment Page functionality.
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

                {userData?.data?.is_active_connector == "1" && !isLoading && pages?.length !== 0 && typeof pages !== "undefined" && (
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

export default PaymentPage;

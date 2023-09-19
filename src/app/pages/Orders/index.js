import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsStart } from "../../redux/actions/Order";
import { Currency } from "../../utils/currency";
import { downloadOrderExcel } from "../../redux/services/DownloadExcel";
import * as Icon from "react-feather";
import { decode } from "html-entities";
import Images from "../../../assets/images";

const OrdersFilter = React.lazy(() => import("./OrdersFilter"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const initialFilterValue = {
    search: "",
    store_id: "",
    transaction_order_id: "",
    start_date: "",
    end_date: "",
    product_name: "",
    from_amount: "",
    to_amount: "",
};

const Orders = () => {
    const dispatch = useDispatch();
    // const filterRef = useRef(null);
    const [listingType, setListingType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [filterValues, setFilterValues] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    const state = useSelector((state) => state);
    const { userData } = useSelector((state) => state.persist);
    const { orderList, totalPage } = useSelector((state) => state?.order);
    const [, setIsPerPage] = useState(false);
    const [advanceSearchPayload, setAdvanceSearchPayload] = useState("");
    const [isReset, setIsReset] = useState(false);

    // const onResetFilter = () => {
    //     setFilterValues(null);
    //     filterRef.current?.resetForm();
    // };

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    const getOrderDetails = (page) => {
        setIsLoading(true);
        setIsOpenMenu(false);
        setIsReset(false);

        const formData = new FormData();
        filterValues &&
            Object.keys(filterValues).forEach((key) => {
                if (filterValues[key]) {
                    formData.append(key, filterValues[key]);
                }
            });
        formData.append("merchant_id", userData?.data?.id);
        dispatch(
            getOrderDetailsStart(currentPage, perPage, searchQuery, formData, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    };

    const advanceSearchSubmit = (values) => {
        setIsOpenMenu(!isOpenMenu);
        setIsLoading(true);
        setAdvanceSearchPayload(values);
        setIsReset(false);
        setCurrentPage(1);
        values.merchant_id = userData?.data?.id;

        dispatch(
            getOrderDetailsStart(1, perPage, searchQuery, values, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    };

    const resetFilter = () => {
        setIsOpenMenu(false);
        setIsLoading(true);
        setAdvanceSearchPayload("");
        setSearchQuery("");
        setIsReset(true);
        setCurrentPage(1);
        let payload = { merchant_id: userData?.data?.id };
        dispatch(
            getOrderDetailsStart(1, perPage, searchQuery, payload, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    };

    const onLoadEffect = () => {
        getOrderDetails(1);
    };

    useEffect(onLoadEffect, [perPage, filterValues, currentPage, searchQuery]);

    const onChangeSearchQuery = (value) => {
        setSearchQuery(value);
    };

    const pagination = {
        totalPage: orderList?.length === 0 ? 1 : totalPage,
    };

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const onChangePerPage = (page) => {
        setPerPage(page);
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const payload = {
            merchant_id: userData?.data?.id,
            ...advanceSearchPayload,
        };
        const data = await downloadOrderExcel(searchQuery, payload);
        if (data) {
            window.location.href = data?.data;
        }

        setIsLoadingExport(false);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Orders"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex rounded-none ml-2" role="group">
                        <button
                            onClick={() => setIsOpenMenu(true)}
                            className="py-2 px-4 text-sm font-medium text-white bg--[#FFFFFF] border border-[#B4BDCE] max-h-[38px] rounded-l flex items-center">
                            <span className="hidden md:block lg:block text-[#1E3A8A] text-[14px]">Advance Filters</span>
                            <img src={Images.Filter} className="h-[21px] w-[21px] ml-3" />
                        </button>
                        <button
                            onClick={resetFilter}
                            className="py-2 px-4 text-sm font-medium text-white bg-[#E8E8E9] max-h-[38px] border border-[#B4BDCE] border-l-0 rounded-r">
                            <Icon.RefreshCw size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block text-[#1E3A8A] text-[#1E3A8A] text-[14px]">Reset</span>
                        </button>
                    </div>
                }
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* START: Transactions Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Product Name</th>
                            <th className="whitespace-nowrap">Store Name</th>
                            <th className="whitespace-nowrap">Customer Email</th>
                            <th className="whitespace-nowrap">Order ID</th>
                            <th className="whitespace-nowrap">Price</th>
                            <th className="whitespace-nowrap">Currency</th>
                            <th className="whitespace-nowrap">Qty</th>
                            <th className="whitespace-nowrap">Total Amount</th>
                            <th className="whitespace-nowrap">Date</th>
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
                            {orderList?.map((item, index) => {
                                return (
                                    <tr className="intro-x" key={index}>
                                        <td className="w-10">{(currentPage - 1) * perPage + index + 1}</td>

                                        <td>{item?.product_name}</td>
                                        <td>{item?.store_name}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.order_id}</td>
                                        <td>
                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span> {item?.amount}
                                        </td>
                                        <td>{item?.currency}</td>
                                        <td>{item?.quantity}</td>
                                        <td>
                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span>{" "}
                                            {Number(item?.amount) * Number(item?.quantity)}
                                        </td>
                                        <td>{item?.created_at}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Transactions Table */}

                {/* START: Table Not Found */}
                {!orderList?.length && !isLoading && (
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
                        {orderList?.map((item, index) => {
                            return (
                                <div className="intro-y col-span-12 md:col-span-6">
                                    <div className="box">
                                        <div className="flex flex-col lg:flex-row items-center p-5">
                                            <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 dark:text-white text-xs font-bold">
                                                            Product Name:&nbsp;
                                                        </span>
                                                        <div className="font-medium dark:text-slate-500 whitespace-nowrap text-primary truncate">
                                                            {item?.product_name}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                            Store Front:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs dark:text-slate-500 mt-0.5">
                                                            {item?.store_name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 dark:text-white text-xs mt-0.5 font-bold">
                                                            Customer Email:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 dark:text-slate-500 text-xs mt-0.5">
                                                            {item?.email}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 text-xs mt-0.5 dark:text-white font-bold">
                                                            Order ID:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs dark:text-slate-500 mt-0.5">
                                                            {item?.order_id}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 text-xs mt-0.5 dark:text-white font-bold">
                                                            Price:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs mt-0.5 dark:text-slate-500">
                                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span>{" "}
                                                            {item?.amount}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 text-xs mt-0.5 dark:text-white font-bold">
                                                            Currency:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs dark:text-slate-500 mt-0.5">
                                                            {item?.currency}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 text-xs mt-0.5 dark:text-white font-bold">
                                                            Qty:&nbsp;
                                                        </span>
                                                        <span className="text-slate-600 text-xs dark:text-slate-500 mt-0.5">
                                                            {item?.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <div className="flex text-slate-500 text-xs">
                                                        <span className="text-slate-900 text-xs mt-0.5 dark:text-white font-bold">
                                                            Total Amount:&nbsp;
                                                        </span>
                                                        <span>
                                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span>{" "}
                                                            {Number(item?.amount) * Number(item?.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                                                <div className="flex"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!orderList.length && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            <OrdersFilter
                initialValues={initialFilterValue}
                title="Order Search"
                visible={isOpenMenu}
                onClose={() => setIsOpenMenu(false)}
                advanceSearchSubmit={advanceSearchSubmit}
                resetFilter={resetFilter}
                resetState={isReset}
            />

            <div className="content">
                {/* START: Heading */}
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

                {!isLoading && orderList?.length !== 0 && typeof orderList !== "undefined" ? (
                    <Pagination
                        pagination={pagination}
                        currentPage={currentPage}
                        perPage={perPage}
                        onChangePage={onChangePage}
                        onChangePerPage={onChangePerPage}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Orders;

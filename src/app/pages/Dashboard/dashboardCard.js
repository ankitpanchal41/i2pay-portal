import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getWidgetListRequest } from "../../redux/actions/Dashboard";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import Images from "../../../assets/images";
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
// const Images = React.lazy(() => import("../../../assets/images"));

const DashboardCard = ({ currencyValue }) => {
    const dispatch = useDispatch();
    const [cardLoading, setCardLoading] = useState(false);

    useEffect(() => {
        if (currencyValue) {
            setCardLoading(true);
            dispatch(
                getWidgetListRequest({ currency: currencyValue }, () => {
                    setCardLoading(false);
                }),
            );
        }
    }, [currencyValue]);

    const { widgetList } = useSelector((state) => state.dashboard);

    return (
        <div className="grid grid-cols-12 gap-6 mt-5">
            {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/orders" className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 dark:text-slate-400 mt-1">Total Orders</div>
                                <Icon.CreditCard className="ml-2 text-pending" size={27} />
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6 dark:text-white">{widgetList?.orders?.items || 0}</div>
                            <div className="text-base mt-1 dark:text-white">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.orders?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/store-front" className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 mt-1 dark:text-slate-400">Total Store</div>
                                <Icon.ShoppingCart className="text-primary" size={27} />
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6 dark:text-white">{widgetList?.stores?.items || 0}</div>
                            <div className="text-base mt-1 dark:text-white">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.stores?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 mt-1 dark:text-slate-400">Total Product</div>
                                <Icon.Monitor className="text-warning" size={27} />
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6 dark:text-white">{widgetList?.products?.items || 0}</div>
                            <div className="text-base mt-1 dark:text-white">${widgetList?.products?.amount || 0}</div>

                        </div>
                    </div>
                </div>
            )} */}
            {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/pay-button-list" className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 mt-1 dark:text-slate-400">Pay Button</div>
                                <img src={Images.payButtonGreen} />
                            </div>
                            <div className="flex"></div>
                            <div className="text-3xl font-medium leading-8 mt-6 dark:text-white">{widgetList?.pay_button?.items || 0}</div>
                            <div className="text-base mt-1 dark:text-white">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.pay_button?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/invoice" className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 mt-1 dark:text-slate-400">Invoice</div>
                                <Icon.FileText className="text-indigo-500" size={27} />
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6 dark:text-white">{widgetList?.invoice?.items || 0}</div>
                            <div className="text-base mt-1 dark:text-white">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.invoice?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/sms-payment" className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 mt-1 dark:text-slate-400">SMS</div>
                                <Icon.Mail className="text-danger" size={27} />
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6 dark:text-white">{widgetList?.sms?.items || 0}</div>
                            <div className="text-base mt-1 dark:text-white">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.sms?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/payment-links" className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 mt-1">Payment Link</div>
                                <Icon.Link className="text-teal-400" size={27} />
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6">{widgetList?.payment_link?.items || 0}</div>
                            <div className="text-base mt-1">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.payment_link?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/payment-page" className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 mt-1">Payment Page</div>
                                <Icon.Clipboard className="text-yellow-900" size={27} />
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6">{widgetList?.payment_page?.items || 0}</div>
                            <div className="text-base mt-1">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.payment_page?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {cardLoading ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box">
                            <div className="h-[152px] box flex items-center justify-center">
                                <MiniLoader
                                    isLoading={true}
                                    color="#1e3a8a"
                                    size={40}
                                    className="dark:text-white;"
                                    css={"border-width: 5px;"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/payment-card" className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div className="report-box zoom-in">
                        <div className="box p-5">
                            <div className="flex justify-between">
                                <div className="text-base text-slate-500 mt-1">Payment Card</div>
                                <Icon.CreditCard className="text-slate-600" size={27} />
                            </div>
                            <div className="text-3xl font-medium leading-8 mt-6">{widgetList?.payment_card?.items || 0}</div>
                            <div className="text-base mt-1">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.payment_card?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default DashboardCard;

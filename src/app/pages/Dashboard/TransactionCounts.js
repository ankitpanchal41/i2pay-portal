import React from "react";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import PlaceholderLoading from "react-placeholder-loading";
import Images from "../../../assets/images";
import { Link } from "react-router-dom";

const TransactionCounts = ({ isLoading, currencyValue }) => {
    const { widgetList } = useSelector((state) => state.dashboard);

    return (
        <div className={`grid grid-cols-12 gap-6 gap-y-20 py-8`}>
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <PlaceholderLoading shape="rect" width={50} height={50} />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/store-front" className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <img src={Images.Shop} height="26" width="26" />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                TOTAL STORE / <span className="text-[#F10075]">{widgetList?.stores?.items || 0}</span>
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.stores?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <PlaceholderLoading shape="rect" width={50} height={50} />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/orders" className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-store-view mr-[20px]">
                            <Icon.ShoppingCart size={26} color="#FFF" />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                TOTAL ORDERS / <span className="text-[#F10075]">{widgetList?.orders?.items || 0}</span>
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.orders?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <PlaceholderLoading shape="rect" width={50} height={50} />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/pay-button-list" className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-pay-button-view mr-[20px]">
                            <img src={Images.Pay} height="26" width="26" />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                PAY BUTTON / <span className="text-[#F10075]">{widgetList?.pay_button?.items || 0}</span>
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.pay_button?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <PlaceholderLoading shape="rect" width={50} height={50} />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/invoice" className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-invoice-view mr-[20px]">
                            <Icon.FileText size={26} color="#FFF" />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                INVOICE / <span className="text-[#F10075]">{widgetList?.invoice?.items || 0}</span>
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.invoice?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <PlaceholderLoading shape="rect" width={50} height={50} />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/sms-payment" className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-invoice-view mr-[20px]">
                            <Icon.MessageSquare size={26} color="#FFF" />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                SMS / <span className="text-[#F10075]">{widgetList?.sms?.items || 0}</span>
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.sms?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <PlaceholderLoading shape="rect" width={50} height={50} />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/payment-links" className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-pay-button-view mr-[20px]">
                            <Icon.Link size={26} color="#FFF" />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                PAYMENT LINK / <span className="text-[#F10075]">{widgetList?.payment_link?.items || 0}</span>
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.payment_link?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <PlaceholderLoading shape="rect" width={50} height={50} />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/payment-page" className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-store-view mr-[20px]">
                            <Icon.FilePlus size={26} color="#FFF" />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                PAYMENT PAGE / <span className="text-[#F10075]">{widgetList?.payment_page?.items || 0}</span>
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                {widgetList?.payment_page?.amount || 0}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            {isLoading ? (
                <div className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <PlaceholderLoading shape="rect" width={50} height={50} />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
                                <PlaceholderLoading shape="rect" width={100} height={10} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/payment-card" className="intro-y col-span-12 md:col-span-6 lg:col-span-3 px-0">
                    <div className="flex items-center">
                        <div className="dashboard-order-view mr-[20px]">
                            <Icon.CreditCard size={26} color="#FFF" />
                        </div>
                        <div className="flex flex-col justify-between h-[45px]">
                            <div className="text-[#677793] font-semibold text-[11px]">
                                PAYMENT CARD / <span className="text-[#F10075]">{widgetList?.payment_card?.items || 0}</span>
                            </div>
                            <div className="text-[#3B4863] font-medium text-[18px]">
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

export default TransactionCounts;

import React, { useState } from "react";
import { decode } from "html-entities";
import { Currency } from "../../utils/currency";
import moment from "moment";
import { withDecimal } from "../../utils/helper";

var converter = require("number-to-words");

const InvoiceDetails = ({ data }) => {
    const isShipToVisible = data?.shipToName || data?.shipToEmail || data?.shipToAddress || false;
    const isBillToVisible = data?.billToName || data?.billToEmail || data?.billToAddress || false;

    let totalFormAmount = 0;

    return (
        <>
            <div className="text-center sm:text-left">
                <div className="px-5 py-10 sm:px-20 sm:py-10 ">
                    <div className="mt-3 grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 sm:col-span-4">
                            {data?.invoice_logo && (
                                <div>
                                    <img
                                        className="h-[80px] rounded inline"
                                        src={
                                            data?.invoice_logo?.includes("https://") || data?.invoice_logo?.includes("http://")
                                                ? data?.invoice_logo
                                                : URL.createObjectURL(data?.invoice_logo[0])
                                        }
                                        alt="upload-img"
                                    />
                                </div>
                            )}
                            <div className="mt-[26px]">
                                <div className="text-[#3B4863] text-[14px] font-medium">
                                    INVOICE NUMBER: <span className="font-normal text-[#3B4863]">{data?.invoiceNumber}</span>
                                </div>
                                <div className="text-[#3B4863] text-[14px] font-medium">
                                    DATE:
                                    <span className="font-normal text-[#3B4863]"> {moment(data?.created_at).format("LL")}</span>
                                </div>
                                <div className="text-[#3B4863] text-[14px] font-medium">
                                    DUE DATE: <span className="font-normal text-[#3B4863]"> {moment(data?.duaDate).format("LL")}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-4"></div>
                        <div className={`col-span-12 sm:col-span-4 pt-[110px] ${data?.invoice_logo ? "pt-[110px]" : "pt-[26px]"}`}>
                            {data?.shipToCompanyName && (
                                <div className="text-[#1E3A8A] text-[18px] font-medium text-right">{data?.shipToCompanyName}</div>
                            )}
                            {data?.shipToName && (
                                <div className="text-[#3B4863] text-[14px] font-semibold text-right">{data?.shipToName}</div>
                            )}
                            {data?.billToGst && (
                                <div className="text-[#3B4863] text-[14px] font-normal text-right">GSTIN: {data?.billToGst}</div>
                            )}
                            {data?.shipToContact && (
                                <div className="text-[#3B4863] text-[14px] font-normal text-right">
                                    Contact number: {data?.shipToContact}
                                </div>
                            )}

                            {data?.shipToEmail && (
                                <div className="text-[#3B4863] text-[14px] font-normal text-right">{data?.shipToEmail}</div>
                            )}
                            {data?.shipToAddress && (
                                <div className="text-[#3B4863] text-[14px] font-normal text-right">{data?.shipToAddress}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="border-t border-[#1E3A8A] mx-5 sm:mx-20"></div>

                <div className="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 sm:pb-10">
                    <div>
                        {data?.billToLabel && <div className="text-base text-slate-500">{data?.billToLabel}</div>}
                        {data?.billToCompanyName && (
                            <div className="text-lg font-medium text-primary dark:text-white mt-2">{data?.billToCompanyName}</div>
                        )}
                        {data?.billToName && <div className="text-[#3B4863] text-[14px] font-semibold">Name: {data?.billToName}</div>}
                        {data?.billToGst && <div className="text-[#3B4863] text-[14px] font-normal">GSTIN: {data?.billToGst}</div>}
                        {data?.billToContact && (
                            <div className="text-[#3B4863] text-[14px] font-normal">Contact Number: {data?.billToContact}</div>
                        )}
                        {data?.billToEmail && <div className="mt-1">{data?.billToEmail}</div>}
                        {data?.billToAddress && <div className="mt-1">{data?.billToAddress}</div>}
                    </div>
                </div>
            </div>
            <div className="px-5 sm:px-16">
                <div className="overflow-x-auto">
                    <table className="table" style={{ border: "0px solid" }}>
                        <thead>
                            <tr className="bg-[#1E3A8A] font-semibold text-[14px] text-[#FFFFFF]">
                                <th className="border-b-2 dark:border-darkmode-400 whitespace-nowrap">PRODUCT NAME</th>
                                <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">QTY</th>
                                <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">PRICE</th>
                                {data?.productList?.find((d) => d?.tax_type == "2") && data?.productList?.tax_value != "" && (
                                    <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">IGST</th>
                                )}
                                {data?.productList?.find((d) => d?.tax_type == "3") && data?.productList?.tax_value != "" && (
                                    <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">SGST</th>
                                )}
                                {data?.productList?.find((d) => d?.tax_type == "3") && data?.productList?.tax_value != "" && (
                                    <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">CGST</th>
                                )}
                                <th className="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.productList?.map((item, index) => {
                                const amount = item?.qty * item?.price;
                                const igstP = item?.tax_value;
                                const sgstCgstP = item?.tax_value / 2;
                                const igst = (amount * igstP) / 100;
                                const sgstCgst = (amount * sgstCgstP) / 100;
                                const totalAmount = amount + (amount * igstP) / 100;

                                totalFormAmount = totalFormAmount + totalAmount;
                                return (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-[#F7F7F780]" : ""}`}>
                                        <td className="border-b dark:border-darkmode-400">
                                            <div className="whitespace-nowrap text-[#3B4863] text-[14px] font-normal">{item?.name}</div>
                                            <div className="text-slate-500 text-sm mt-0.5 whitespace-nowrap text-[#3B4863] text-[14px] font-normal">
                                                {item?.description}
                                            </div>
                                        </td>
                                        <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                            {item?.qty}
                                        </td>
                                        <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                            <span>{decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}</span> {item?.price}
                                        </td>
                                        {data?.productList?.find((d) => d?.tax_type == "2") && (
                                            <>
                                                {item?.tax_type == "2" ? (
                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                                        <div className="text-xs text-blue-800 dark:text-white">{igstP}%</div>
                                                        <span>{decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}</span>
                                                        {igst.toFixed(2)}
                                                    </td>
                                                ) : (
                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                                        -
                                                    </td>
                                                )}
                                            </>
                                        )}

                                        {data?.productList?.find((d) => d?.tax_type == "3") && (
                                            <>
                                                {item?.tax_type == "3" ? (
                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                                        <div className="text-xs text-blue-800 dark:text-white">{sgstCgstP}%</div>
                                                        <span>{decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}</span>
                                                        {sgstCgst.toFixed(2)}
                                                    </td>
                                                ) : (
                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                                        -
                                                    </td>
                                                )}
                                            </>
                                        )}
                                        {data?.productList?.find((d) => d?.tax_type == "3") && (
                                            <>
                                                {item?.tax_type == "3" ? (
                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                                        <div className="text-xs text-blue-800 dark:text-white">{sgstCgstP}%</div>
                                                        <span>{decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}</span>
                                                        {sgstCgst.toFixed(2)}
                                                    </td>
                                                ) : (
                                                    <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                                        -
                                                    </td>
                                                )}
                                            </>
                                        )}
                                        <td className="text-right border-b dark:border-darkmode-400 w-32 text-[#3B4863] text-[14px] font-normal">
                                            <span>{decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}</span>
                                            {totalAmount.toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {data?.productList?.length === 0 && (
                        <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                            <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 gap-y-3 mx-5 sm:mx-16 my-10 bg-[#F7F7F780] p-6 mt-0">
                <div className="col-span-12 sm:col-span-6">
                    <div className="text-xl text-blue-800 dark:text-white font-bold">Total (in words)</div>
                    <div className="text-slate-400 capitalize">{withDecimal(totalFormAmount?.toFixed(2))}</div>
                </div>
                <div className="col-span-12 sm:col-span-3"></div>
                <div className="col-span-12 sm:col-span-3">
                    <div className="text-center sm:text-right sm:ml-auto">
                        <div className="text-xl text-blue-800 dark:text-white font-bold mt-2">
                            Total Amount : <span>{decode(Currency.find((c) => c?.value === data?.currency)?.symbol)}</span>
                            {totalFormAmount?.toFixed(2)}
                        </div>
                        {data?.signature && <div className="text-slate-400 mt-6">{data?.signature}</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoiceDetails;

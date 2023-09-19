import React from "react";
import { getFileType } from "../../../utils/helper";
import * as Icon from "react-feather";
import { applicationKey } from "../../../utils/constants";
import { countryCodesApplication } from "../../../utils/countryCode";
import DisplayFileType from "../../../components/common/DisplayFileType";

const MerchantStepViewItem = ({ data, index, entitiesType, label }) => {
    if (entitiesType) {
        return (
            <div className="grid grid-cols-8 gap-6 max-w-[700px] merchant-item-view">
                {Object.keys(data).map(
                    (key, index) =>
                        applicationKey[entitiesType] &&
                        applicationKey[entitiesType][key] &&
                        !applicationKey[entitiesType][key]?.isDocumentType && (
                            <div key={index} className="col-span-12 lg:col-span-6 max-w-[745px]">
                                {Array.isArray(data[key]) ? (
                                    <div key={index} className="flex flex-col sm:flex-row items-center">
                                        <div className="w-full">
                                            <label className="font-bold">{applicationKey[entitiesType]?.[key]?.value} </label>
                                            <br />
                                            {data?.[key]?.map((d, index) => {
                                                return (
                                                    <span key={index} className="text-slate-500 mt-1 break-all">
                                                        {data?.[key]?.length === index + 1 ? d?.name + "." : d?.name + ", "}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div key={index} className="flex flex-col sm:flex-row items-center">
                                        <div className="w-full">
                                            <label className="text-[14px] text-[#3B4863] font-bold">
                                                {applicationKey[entitiesType]?.[key]?.value}{" "}
                                            </label>
                                            <div className="text-slate-500 text-[12px] mt-1 break-all">
                                                {key === "country_registration" ||
                                                key === "director_country" ||
                                                key === "share_holder_country" ? (
                                                    <span style={{ marginLeft: 5 }}>
                                                        {countryCodesApplication?.find((item) => item?.code === data[key])?.flag}{" "}
                                                        {countryCodesApplication?.find((item) => item?.code === data[key])?.value}
                                                    </span>
                                                ) : (
                                                    data[key]
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ),
                )}
                <div className="col-span-12 lg:col-span-12 max-w-[745px]">
                    <div className="flex flex-col sm:flex-row items-center">
                        <div className="w-full">
                            {entitiesType === "1" || entitiesType === "5" ? null : (
                                <div className="grid grid-cols-12 gap-2 border-t border-slate-200/60 dark:border-darkmode-400">
                                    <div className="col-span-12 lg:col-span-12 mt-2 mb-7">
                                        <label className="text-[14px] text-[#3B4863] font-bold">Documents</label>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-row flex-wrap gap-1">
                                {Object.keys(data).map((key, index) =>
                                    key?.includes("additional_document") ? (
                                        data[key]?.map((doc) => {
                                            return (
                                                <>
                                                    <DisplayFileType
                                                        key={index}
                                                        extension={getFileType(doc["additional_document"])}
                                                        name={applicationKey?.[key]?.value}
                                                        url={doc?.["additional_document"]}
                                                    />
                                                </>
                                            );
                                        })
                                    ) : applicationKey[entitiesType]?.[key]?.isDocumentType ? (
                                        <>
                                            <DisplayFileType
                                                key={index}
                                                extension={getFileType(data[key])}
                                                name={applicationKey[entitiesType]?.[key]?.value}
                                                url={data?.[key]}
                                            />
                                        </>
                                    ) : (
                                        ""
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="grid grid-cols-8 gap-6 max-w-[700px] merchant-item-view">
                {Object.keys(data).map(
                    (key, index) =>
                        applicationKey?.[key] &&
                        !applicationKey?.[key]?.isDocumentType && (
                            <div key={index} className="col-span-12 lg:col-span-6 max-w-[745px]">
                                {Array.isArray(data[key]) ? (
                                    <div key={index} className="flex flex-col sm:flex-row items-center">
                                        <div className="w-full">
                                            <label className="font-bold">
                                                {label} {applicationKey?.[key]?.value}{" "}
                                            </label>
                                            <br />
                                            {data?.[key]?.map((d, index) => {
                                                return (
                                                    <span key={index} className="text-slate-500 mt-1 break-all">
                                                        {data?.[key]?.length === index + 1 ? d?.name + "." : d?.name + ", "}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div key={index} className="flex flex-col sm:flex-row items-center">
                                        <div className="w-full">
                                            <label className="text-[14px] text-[#3B4863] font-bold">
                                                {label} {applicationKey?.[key]?.value}{" "}
                                            </label>
                                            <div className="text-slate-500 text-[12px] mt-1 break-all">
                                                {key === "country_registration" ||
                                                key === "director_country" ||
                                                key === "share_holder_country" ? (
                                                    <span style={{ marginLeft: 5 }}>
                                                        {countryCodesApplication?.find((item) => item?.code === data[key])?.flag}{" "}
                                                        {countryCodesApplication?.find((item) => item?.code === data[key])?.value}
                                                    </span>
                                                ) : (
                                                    data[key]
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ),
                )}
                <div className="col-span-12 lg:col-span-12 max-w-[745px]">
                    <div className="flex flex-col sm:flex-row items-center">
                        <div className="w-full">
                            {entitiesType === "1" || entitiesType === "5" ? null : (
                                <div className="grid grid-cols-12 gap-2 border-t border-slate-200/60 dark:border-darkmode-400">
                                    <div className="col-span-12 lg:col-span-12 mt-2 mb-7">
                                        <label className="text-[14px] text-[#3B4863] font-bold">Documents</label>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-row flex-wrap gap-1">
                                {Object.keys(data).map((key, index) =>
                                    key?.includes("additional_document") ? (
                                        data[key]?.map((doc) => {
                                            return (
                                                <>
                                                    <DisplayFileType
                                                        key={index}
                                                        extension={getFileType(doc["additional_document"])}
                                                        name={applicationKey?.[key]?.value}
                                                        url={doc?.["additional_document"]}
                                                    />
                                                </>
                                            );
                                        })
                                    ) : applicationKey?.[key]?.isDocumentType ? (
                                        <>
                                            <DisplayFileType
                                                key={index}
                                                extension={getFileType(data[key])}
                                                name={applicationKey?.[key]?.value}
                                                url={data?.[key]}
                                            />
                                        </>
                                    ) : (
                                        ""
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MerchantStepViewItem;

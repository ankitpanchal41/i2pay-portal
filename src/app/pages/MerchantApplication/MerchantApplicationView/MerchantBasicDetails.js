import React, { useState } from "react";
import * as Icon from "react-feather";
import Images from "../../../../assets/images";
import { TypeOfEntities } from "../../../utils/staticDropdown";

const MerchantBasicDetails = ({ name, email, address, phoneNo, status, reason, profileImage, entitiesType }) => {
    const _renderApplicationStatus = () => {
        return (
            <div className="relative flex flex-col lg:flex-row text-center before:hidden before:lg:block before:absolute before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-primary mb-3">
                {status == 0 && (
                    <div className="py-2 px-4 rounded-full text-xs bg-primary text-white cursor-pointer font-medium text-center">
                        In Progress
                    </div>
                )}
                {status == 1 && (
                    <span className="py-0.5 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">Approved</span>
                )}
                {status == 2 && (
                    <div className="">
                        <span className="py-2 px-4 rounded-full text-xs bg-warning text-white cursor-pointer font-medium">Reassigned</span>
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
                {status == 3 && (
                    <div className="">
                        <span className="py-2 px-4 rounded-full text-xs bg-danger text-white cursor-pointer font-medium">Rejected</span>
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
                {status == 4 && (
                    <div className="">
                        <span className="py-2 px-4 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                            Agreement Send{" "}
                        </span>
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
                {status == 5 && (
                    <div className="">
                        <span className="py-2 px-4 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                            Agreement Received
                        </span>
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
                {status == 6 && (
                    <div className="">
                        {reason ? (
                            <span className="py-2 px-4 rounded-full text-xs bg-danger text-white cursor-pointer font-medium">
                                Reassigned Agreement{" "}
                            </span>
                        ) : (
                            <span className="py-2 px-4 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                                Signed Agreement{" "}
                            </span>
                        )}
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
                {status == 7 && (
                    <div className="">
                        <span className="py-2 px-4 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                            Rate Accepted{" "}
                        </span>
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
                {status == 8 && (
                    <div className="">
                        <span className="py-2 px-4 rounded-full text-xs bg-danger text-white cursor-pointer font-medium">
                            Not Interested
                        </span>
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
                {status == 9 && (
                    <div className="">
                        <span className="py-2 px-4 rounded-full text-xs bg-black text-white cursor-pointer font-medium">Terminated</span>
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
                {status == 10 && (
                    <div className="">
                        <span className="py-2 px-4 rounded-full text-xs bg-danger text-white cursor-pointer font-medium">Decline</span>
                        {reason && <div className="mt-4 intro-y p-3 rounded-md text-slate-400 dark:text-slate-100 text-xs">{reason}</div>}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="intro-y">
            <div className="flex flex-col">
                {(phoneNo || email) && (
                    <div className="mt-6 lg:mt-0 flex-1 px-5 pt-5 lg:pt-0">
                        <div className="flex flex-col justify-center items-center">
                            {profileImage && (
                                <img
                                    alt={email ? email : name}
                                    className="w-[102px] h-[102px] object-cover rounded-full mb-5 md:mt-12 mt-2"
                                    src={profileImage || Images.profileImage}
                                />
                            )}
                            {name && <div className="mb-1 truncate sm:whitespace-normal font-medium text-lg">{name}</div>}
                            {email && <div className="truncate sm:whitespace-normal flex items-center mb-2">{email} </div>}
                            {phoneNo && <div className="truncate sm:whitespace-normal flex items-center">{phoneNo}</div>}
                            {entitiesType && <div className="truncate sm:whitespace-normal flex items-center">{TypeOfEntities?.find(i => i?.value === entitiesType)?.label}</div>}
                        </div>
                    </div>
                )}
                {status !== undefined && (
                    <div className="flex-1 bg-[#F4F5F8] py-5 lg:pt-0 mt-6 mb-5 md:mb-0">
                        <div className="flex flex-col justify-center items-center">
                            <div className="text-big font-bold mt-3 lg:mt-5 mb-3">Status</div>
                            {_renderApplicationStatus()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MerchantBasicDetails;

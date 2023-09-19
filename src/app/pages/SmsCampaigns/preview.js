import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/common/Heading";
import { useDispatch, useSelector } from "react-redux";
import { DETAIL_SMS_CAMPAIGN_REQUEST, getSmsCampaignPreviewMobileListRequest } from "../../redux/actions/SmsCampaign";
import { campaignStatusLabels } from "../../utils/helper";
import { ClipLoader } from "react-spinners";
import Pagination from "../../components/common/Pagination";
import NotAvailable from "../../components/common/status/NotAvailable";
import Box from "../../components/common/Box";

const SmsCampaignsPreview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobileListLoading, setIsMobileListLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);

    const { smsCampaignId } = useParams();

    const { detailSmsCampaign, mobileList, totalPage } = useSelector((state) => state.smsCampaign);

    const [isLoading, setIsLoading] = useState(false);

    const state = useSelector((state) => state);

    useEffect(() => {
        setIsLoading(true);
        const callBack = () => {
            setIsLoading(false);
        };
        dispatch({ type: DETAIL_SMS_CAMPAIGN_REQUEST, payload: { id: smsCampaignId }, callBack });
    }, []);

    useEffect(() => {
        setIsMobileListLoading(true);
        dispatch(
            getSmsCampaignPreviewMobileListRequest(smsCampaignId, currentPage, perPage, searchQuery, () => {
                setIsMobileListLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsMobileListLoading(true);
            dispatch(getSmsCampaignPreviewMobileListRequest(smsCampaignId, 1, perPage, searchQuery, () => setIsMobileListLoading(false)));
        }
    }, [perPage]);

    const pagination = {
        totalPage: mobileList?.length === 0 ? 1 : totalPage,
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

    const onClickBack = () => {
        navigate(`/sms-campaigns`);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"SMS Campaign Preview"}
                // isLoadingExport={isLoadingExport}
                displayBackButton={true}
                onClickBack={onClickBack}
                addButton={" "}
            />
        );
    };
    return (
        <>
            {/* BEGIN: Content */}

            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

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
                    <div className="intro-y mt-5">
                        <div className="">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="intro-y col-span-12 flex">
                                    {/* SIDEBAR */}
                                    <div className="flex flex-col w-1/4">
                                        {/* Details Box */}
                                        <Box header="Campaign Details">
                                            <div className="ml-0 lg:justify-end py-5">
                                                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                    <div className="text-slate-500 text-xs col-span-12">
                                                        <span className="mt-0.5 font-medium text-[22px] text-[#001737]">
                                                            {detailSmsCampaign?.name}
                                                        </span>
                                                    </div>
                                                    <div className="text-slate-500 text-xs col-span-12">
                                                        <span className="mt-0.5 text-slate-800 dark:text-white">
                                                            {detailSmsCampaign?.subject}
                                                        </span>
                                                    </div>
                                                    <div className="text-slate-500 text-xs col-span-12 mt-5">
                                                        <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                            <div className="text-slate-500 text-xs mt-0.5">
                                                                {" "}
                                                                {campaignStatusLabels(detailSmsCampaign?.status)}{" "}
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                        {/* Details Box */}

                                        {/* Categories Box */}
                                        <Box header="Group">
                                            <div className="ml-0 lg:justify-end">
                                                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                    {detailSmsCampaign?.categories && detailSmsCampaign?.categories.length ? (
                                                        detailSmsCampaign?.categories.map((category, index) => (
                                                            <div className="text-slate-500 text-xs col-span-12 p-2">
                                                                <span className="mt-0.5 text-[#001737] text-[14px] font-normal">
                                                                    #{index + 1} &nbsp; {category?.name}
                                                                </span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-slate-500 text-xs col-span-12 p-2">No Categories Found</div>
                                                    )}
                                                </div>
                                            </div>
                                        </Box>
                                        {/* Categories Box */}
                                    </div>
                                    {/* END: SIDEBAR */}

                                    {/* CONTENT */}
                                    <div className="flex flex-col w-3/4 pl-5">
                                        {/* Emails Box */}
                                        <Box header="Contacts">
                                            <div className="mt-1">
                                                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 col-span-12">
                                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                                            <div className="overflow-hidden">
                                                                <table className="min-w-full border">
                                                                    <thead className="border-b">
                                                                        <tr className="bg-[#F4F5F8]">
                                                                            <th
                                                                                scope="col"
                                                                                className="text-sm font-medium dark:text-white text-gray-900 px-6 py-3 text-left">
                                                                                #
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                className="text-sm font-medium dark:text-white text-gray-900 px-6 py-3 text-left">
                                                                                Name
                                                                            </th>
                                                                            <th
                                                                                scope="col"
                                                                                className="text-sm font-medium dark:text-white text-gray-900 px-6 py-3 text-left">
                                                                                Mobile No
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {isMobileListLoading ? (
                                                                            <tr className="border-b">
                                                                                <td
                                                                                    colSpan="3"
                                                                                    className="p-3 text-center dark:text-white text-gray-900">
                                                                                    <ClipLoader
                                                                                        loading={true}
                                                                                        color="#1e3a8a"
                                                                                        size={25}
                                                                                        css="border-width: 3px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                                                                    />
                                                                                </td>
                                                                            </tr>
                                                                        ) : (
                                                                            mobileList &&
                                                                            mobileList.map((mobile, index) => (
                                                                                <tr className="border-b">
                                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                                                        {(currentPage - 1) * perPage + index + 1}
                                                                                    </td>
                                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                                                        {mobile?.first_name} {mobile?.last_name}
                                                                                    </td>
                                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                                                        {mobile?.country_code} {mobile?.mobile_no}
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        )}
                                                                        {!mobileList?.length && !isMobileListLoading && (
                                                                            <tr className="border-b">
                                                                                <td
                                                                                    colSpan="3"
                                                                                    className="p-3 text-center dark:text-white text-gray-900">
                                                                                    No Contacts Found
                                                                                </td>
                                                                            </tr>
                                                                        )}
                                                                    </tbody>
                                                                </table>

                                                                {!isMobileListLoading &&
                                                                    mobileList?.length !== 0 &&
                                                                    typeof mobileList !== "undefined" && (
                                                                        <Pagination
                                                                            pagination={pagination}
                                                                            currentPage={currentPage}
                                                                            perPage={perPage}
                                                                            onChangePage={onChangePage}
                                                                            onChangePerPage={onChangePerPage}
                                                                            campaignPaginationStyle={true}
                                                                        />
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                        {/* Emails Box */}

                                        {/* Template Box */}
                                        <Box header="ContSMS Template">
                                            <div className="ml-0 lg:justify-end mt-3 lg:mt-0 p-5">
                                                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                    <div className="text-slate-500 text-xs col-span-6">
                                                        <span className="font-normal text-[14px] text-[#001737] mt-0.5">
                                                            {detailSmsCampaign?.content || <NotAvailable />}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                        {/* Template Box */}
                                    </div>
                                    {/* END: CONTENT */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SmsCampaignsPreview;

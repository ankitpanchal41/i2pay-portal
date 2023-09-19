import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DETAIL_EMAIL_CAMPAIGN_REQUEST, getEmailCampaignPreviewEmailListRequest } from "../../redux/actions/EmailCampaign";
import { campaignStatusLabels } from "../../utils/helper";
import { ClipLoader } from "react-spinners";
import { decode } from "js-base64";
import Box from "../../components/common/Box";
const Heading = React.lazy(() => import("../../components/common/Heading"));
const Pagination = React.lazy(() => import("../../components/common/Pagination"));

const EmailCampaignsPreview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { emailCampaignId } = useParams();

    const { detailEmailCampaign, emailList, totalPage } = useSelector((state) => state.emailCampaign);
    const [isLoading, setIsLoading] = useState(false);

    const [isEmailListLoading, setIsEmailListLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const callBack = () => {
            setIsLoading(false);
        };
        dispatch({ type: DETAIL_EMAIL_CAMPAIGN_REQUEST, payload: { id: emailCampaignId }, callBack });
    }, []);

    useEffect(() => {
        setIsEmailListLoading(true);
        dispatch(
            getEmailCampaignPreviewEmailListRequest(emailCampaignId, currentPage, perPage, searchQuery, () => {
                setIsEmailListLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsEmailListLoading(true);
            dispatch(getEmailCampaignPreviewEmailListRequest(emailCampaignId, 1, perPage, searchQuery, () => setIsEmailListLoading(false)));
        }
    }, [perPage]);

    const pagination = {
        totalPage: emailList?.length === 0 ? 1 : totalPage,
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
        navigate(`/email-campaigns`);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Email Campaign Preview"}
                // isLoadingExport={isLoadingExport}
                displayBackButton={true}
                onClickBack={onClickBack}
                addButton={" "}
            />
        );
    };

    // const HTML = detailEmailCampaign?.content?.split("\\n")?.join("")?.split("\\").join("");
    // const HTML = decode(detailEmailCampaign?.content);
    let HTML = "";

    if (detailEmailCampaign?.content) {
        HTML = decode(detailEmailCampaign?.content);
    }

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
                                            <div className="ml-0 lg:justify-end">
                                                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                    <div className="text-slate-500 text-xs col-span-12">
                                                        <span className="mt-0.5 font-medium text-[#001737] text-[22px]">
                                                            {detailEmailCampaign?.name}
                                                        </span>
                                                    </div>
                                                    <div className="text-slate-500 text-xs col-span-12 mt-2">
                                                        <span className="mt-0.5 font-normal text-[#001737] text-[14px]">
                                                            {detailEmailCampaign?.subject}
                                                        </span>
                                                    </div>
                                                    <div className="text-slate-500 text-xs col-span-12 mt-5">
                                                        <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                            <div className="text-slate-500 text-xs mt-0.5">
                                                                {campaignStatusLabels(detailEmailCampaign?.status)}{" "}
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
                                                    {detailEmailCampaign?.categories && detailEmailCampaign?.categories.length ? (
                                                        detailEmailCampaign?.categories.map((category, index) => (
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
                                                                        <tr className="bg-[#F4F5F8] h-[40px]">
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
                                                                                Email
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {isEmailListLoading ? (
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
                                                                            emailList &&
                                                                            emailList.map((email, index) => (
                                                                                <tr className="border-b">
                                                                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                                                        {(currentPage - 1) * perPage + index + 1}
                                                                                    </td>
                                                                                    <td className="px-6 py-3 text-sm dark:text-white text-gray-900 font-light whitespace-nowrap">
                                                                                        {email?.first_name} {email?.last_name}
                                                                                    </td>
                                                                                    <td className="px-6 py-3 text-sm dark:text-white text-gray-900 font-light whitespace-nowrap">
                                                                                        {email?.email}
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        )}
                                                                        {!emailList?.length && !isEmailListLoading && (
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

                                                                {!isEmailListLoading &&
                                                                    emailList?.length !== 0 &&
                                                                    typeof emailList !== "undefined" && (
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

                                        <Box header="Campaign Template">
                                            <div className="ml-0 lg:justify-end mt-3 lg:mt-0  border-b border-slate-200/60 dark:border-darkmode-400 p-5">
                                                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 grid grid-cols-12">
                                                    <div className="text-slate-500 text-xs col-span-12">
                                                        <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                                            <div dangerouslySetInnerHTML={{ __html: HTML }}></div>
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

export default EmailCampaignsPreview;

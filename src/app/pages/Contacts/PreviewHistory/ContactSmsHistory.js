import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getSmsCampaignSentHistoryRequest } from "../../../redux/actions/SmsCampaignsSentHistory";
import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import Box from "../../../components/common/Box";

const Pagination = React.lazy(() => import("../../../components/common/Pagination"));

const ContactSmsHistory = ({ contactId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isSmsHistoryLoading, setIsSmsHistoryLoading] = useState(false);
    const { smsHistory, totalPage } = useSelector((state) => state.smsCampaignSentHistory);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [isPerPage, setIsPerPage] = useState(false);

    //  Email Pagination
    useEffect(() => {
        setIsSmsHistoryLoading(true);
        dispatch(
            getSmsCampaignSentHistoryRequest(contactId, currentPage, perPage, searchQuery, () => {
                setIsSmsHistoryLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsSmsHistoryLoading(true);
            dispatch(getSmsCampaignSentHistoryRequest(contactId, 1, perPage, searchQuery, () => setIsSmsHistoryLoading(false)));
        }
    }, [perPage]);

    const pagination = {
        totalPage: smsHistory?.length === 0 ? 1 : totalPage,
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
    //  Email Pagination

    return (
        <Box header="SMS History">
            <div className="ml-0">
                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 col-span-12">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full border">
                                    <thead className="border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium dark:text-white text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium dark:text-white text-gray-900 px-6 py-4 text-left">
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium dark:text-white text-gray-900 px-6 py-4 text-left">
                                                Mobile No
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium dark:text-white text-gray-900 px-6 py-4 text-center">
                                                SMS Sent
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium dark:text-white text-gray-900 px-6 py-4 text-center">
                                                Template
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isSmsHistoryLoading ? (
                                            <tr className="border-b">
                                                <td colSpan="5" className="p-3 text-center dark:text-white text-gray-900">
                                                    <ClipLoader
                                                        loading={true}
                                                        color="#1e3a8a"
                                                        size={25}
                                                        css="border-width: 3px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            smsHistory &&
                                            smsHistory.map((sms, index) => (
                                                <tr className="border-b" key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                        {(currentPage - 1) * perPage + index + 1}
                                                    </td>
                                                    <td className="text-sm dark:text-white text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {sms?.name}
                                                    </td>
                                                    <td className="text-sm dark:text-white text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {sms?.mobile_no}
                                                    </td>
                                                    <td className="text-sm dark:text-white text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                        <span className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-success">
                                                            {sms?.count}
                                                        </span>
                                                    </td>
                                                    <td className="text-sm dark:text-white text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                        <button
                                                            onClick={() => navigate(`/sms-campaigns/preview/${sms?.campaign_id}`)}
                                                            className="btn btn-primary font-medium btn-sm justify-center">
                                                            <Icon.Eye size={15} /> &nbsp; View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                        {!smsHistory?.length && !isSmsHistoryLoading && (
                                            <tr className="border-b">
                                                <td colSpan="5" className="p-3 text-center dark:text-white text-gray-900">
                                                    No SMS Sent
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {!isSmsHistoryLoading && smsHistory?.length !== 0 && typeof smsHistory !== "undefined" && (
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
    );
};

export default ContactSmsHistory;

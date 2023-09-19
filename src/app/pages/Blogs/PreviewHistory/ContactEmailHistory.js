import React, {useEffect, useState} from 'react';
import {ClipLoader} from "react-spinners";
import {useDispatch, useSelector} from "react-redux";
import {getEmailCampaignSentHistoryRequest} from "../../../redux/actions/EmailCampaignsSentHistory";
import {Link, useNavigate} from "react-router-dom";
import * as Icon from "react-feather";
const Pagination = React.lazy(() => import("../../../components/common/Pagination"));

const ContactEmailHistory = ({ contactId }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isEmailHistoryLoading, setIsEmailHistoryLoading] = useState(false);
    const { emailHistory, totalPage } = useSelector((state) => state.emailCampaignSentHistory);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [isPerPage, setIsPerPage] = useState(false);


    //  Email Pagination
    useEffect(() => {
        setIsEmailHistoryLoading(true);
        dispatch(
            getEmailCampaignSentHistoryRequest(contactId, currentPage, perPage, searchQuery, () => {
                setIsEmailHistoryLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsEmailHistoryLoading(true);
            dispatch(getEmailCampaignSentHistoryRequest(contactId, 1, perPage, searchQuery, () => setIsEmailHistoryLoading(false)));
        }
    }, [perPage]);

    const pagination = {
        totalPage: emailHistory?.length === 0 ? 1 : totalPage,
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
        <div className="box shadow-lg">
            <div
                className="flex flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                <div className="mr-auto text-center lg:text-left mt-3 lg:mt-0">
                                                    <span
                                                        className="font-medium text-primary dark:text-white text-lg">Email History</span>
                </div>
            </div>
            <div
                className="ml-0 lg:justify-end mt-3 lg:mt-0  border-b border-slate-200/60 dark:border-darkmode-400 p-5">
                <div className="lg:mr-auto lg:text-left mt-3 lg:mt-0 col-span-12">


                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div
                            className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
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
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium dark:text-white text-gray-900 px-6 py-4 text-center">
                                            Emails Sent
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium dark:text-white text-gray-900 px-6 py-4 text-center">
                                            Template
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {isEmailHistoryLoading ? (
                                        <tr className="border-b">
                                            <td
                                                colSpan="5"
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
                                        emailHistory &&
                                        emailHistory.map((email, index) => (
                                            <tr className="border-b" key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                                                    {(currentPage - 1) * perPage + index + 1}
                                                </td>
                                                <td className="text-sm dark:text-white text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {email?.name}
                                                </td>
                                                <td className="text-sm dark:text-white text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {email?.email}
                                                </td>
                                                <td className="text-sm dark:text-white text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    <span
                                                        className="py-0.5 px-2 rounded-full text-xs text-white cursor-pointer font-medium bg-success">{email?.count}</span>
                                                </td>
                                                <td className="text-sm dark:text-white text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={() => navigate(`/email-campaigns/preview/${email?.campaign_id}`)}
                                                        className="btn btn-primary font-medium btn-sm justify-center">
                                                        <Icon.Eye size={15} /> &nbsp; View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    {!emailHistory?.length && !isEmailHistoryLoading && (
                                        <tr className="border-b">
                                            <td
                                                colSpan="5"
                                                className="p-3 text-center dark:text-white text-gray-900">
                                                No Emails Sent
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>

                                {!isEmailHistoryLoading &&
                                emailHistory?.length !== 0 &&
                                typeof emailHistory !== "undefined" && (
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
        </div>
    );
};

export default ContactEmailHistory;

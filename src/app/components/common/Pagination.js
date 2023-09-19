import React from "react";
import * as Icon from "react-feather";
import ReactPaginate from "react-paginate";

const Pagination = ({ pagination, onChangePage, onChangePerPage, onChangeSearchQuery, currentPage, perPage, searchQuery, children, campaignPaginationStyle = false }) => {
    const handlePageClick = (value) => {
        onChangePage(value?.selected + 1);
    };

    const handlePerPage = (e) => {
        onChangePerPage(e.target.value);
    };

    return (
        <div className={campaignPaginationStyle ? `` : `mt-10`}>
            <div className={campaignPaginationStyle ? `intro-y pt-5` : `intro-y`}>
                <div className="overflow-x-auto scrollbar-hidden">
                    <div className="grid grid-cols-12 gap-6">
                        <div className={campaignPaginationStyle ? `intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center justify-between` : `intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center justify-between`}>
                            <select value={perPage} className="w-20 form-select mt-3 sm:mt-0 border rounded-sm" onChange={handlePerPage}>
                                <option>10</option>
                                <option>25</option>
                                <option>35</option>
                                <option>50</option>
                            </select>
                            <nav>
                                <ul className="pagination">
                                    <ReactPaginate
                                        breakLabel="--"
                                        nextLabel={
                                            <div className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium text-gray-500 bg-white dark:bg-darkmode-300 border border-gray-300 rounded-r-sm leading-5 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 dark:focus:bg-darkmode-300 dark:hover:bg-darkmode-400">
                                                <Icon.ChevronRight size={20} />
                                            </div>
                                        }
                                        pageLinkClassName="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                                        activeLinkClassName="text-slate-50 bg-primary dark:bg-darkmode-900"
                                        breakLinkClassName="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white dark:text-slate-400 dark:bg-darkmode-300 border hover:text-gray-500 border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 dark:focus:bg-darkmode-300 dark:active:bg-darkmode-300"
                                        onPageChange={handlePageClick}
                                        // pageRangeDisplayed={5}
                                        pageCount={pagination?.totalPage}
                                        pageRangeDisplayed={2}
                                        marginPagesDisplayed={2}
                                        previousLabel={
                                            <div className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-darkmode-300 border border-gray-300 cursor-default rounded-l-sm leading-5 dark:focus:bg-darkmode-300 dark:active:bg-darkmode-300">
                                                <Icon.ChevronLeft size={20} />
                                            </div>
                                        }
                                        containerClassName="flex"
                                        forcePage={currentPage - 1}
                                    />
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;

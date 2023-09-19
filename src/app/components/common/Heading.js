import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
const MiniLoader = React.lazy(() => import("./MiniLoader"));

const Heading = ({
    onChangeSearchQuery = false,
    onClickBack,
    addButton,
    title,
    displayBackButton = true,
    onClickExport,
    isLoadingExport,
    exportClass,
    titleButton,
    subTitle,
    note,
}) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onChangeSearchQuery) {
                onChangeSearchQuery(searchText);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [searchText]);

    return (
        <div className="intro-y flex flex-col sm:flex-row mt-8 mb-4 justify-between px-0">
            {!displayBackButton && (
                <div>
                    <div className="flex">
                        <h2 className="text-lg font-medium mr-auto mb-4 ">{title}</h2>
                        {subTitle && (
                            <small className="text-gray-500 mt-1 ml-2">
                                (<em className="mb-4">{subTitle}</em>)
                            </small>
                        )}
                    </div>
                    {note && (
                        <small className="text-gray-500 mt-1">
                            <span className="text-danger">Note:</span> {note}
                        </small>
                    )}
                </div>
            )}

            <div className="flex">
                {displayBackButton && (
                    <div className="inline-flex -ml-2">
                        <div className="flex">
                            <Icon.ChevronLeft className="mr-2 cursor-pointer" size={30} onClick={onClickBack} />
                            <h2 className="text-lg font-medium mr-auto mb-4">{title}</h2>
                        </div>
                        {titleButton}
                    </div>
                )}
            </div>

            <div className="flex">
                {onChangeSearchQuery && (
                    <div className="sm:mt-0 sm:ml-auto md:ml-0 mr-3">
                        <div className="w-auto md:w-56 lg:w-56 relative text-slate-500">
                            <input
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                }}
                                type="text"
                                className="form-control pr-10"
                                placeholder="Search..."
                            />
                            <div className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0">
                                <Icon.Search size={17} />
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-row">
                    {onClickExport && (
                        <button
                            disabled={isLoadingExport}
                            onClick={onClickExport}
                            title="Export Excel"
                            className={"btn btn-outline-dark export-excel-btn max-h-[38px]  " + exportClass}>
                            <Icon.FileText size="16" />
                            <span className="hidden md:block lg:block">&nbsp; Export Excel</span>
                            <MiniLoader color="black" isLoading={isLoadingExport} />
                        </button>
                    )}
                    {addButton}
                </div>
            </div>
        </div>
    );
};

export default Heading;

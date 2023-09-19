import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
    DELETE_RULES_REQUEST,
    UPDATE_RULES_STATUS_REQUEST,
    getRulesRequest,
    UPDATE_RULES_PRIORITY_REQUEST,
} from "../../redux/actions/Rules";
import { useNavigate } from "react-router";
import { downloadRulesExcel } from "../../redux/services/DownloadExcel";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import TableRow from "./TableRow";
import BoxTable from "./BoxTable";

const Header = React.lazy(() => import("../../components/common/Header"));
const DeleteModal = React.lazy(() => import("../../components/common/DeleteModal"));
const Heading = React.lazy(() => import("../../components/common/Heading"));

const arrayMoveMutate = (array, from, to) => {
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const arrayMove = (array, from, to) => {
    array = array.slice();
    arrayMoveMutate(array, from, to);
    return array;
};

const SortableCont = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
});

const SortableBoxContainer = SortableContainer(({ children }) => {
    return <div className="grid grid-cols-12 gap-6 mt-5">{children}</div>;
});

const SortableItem = SortableElement((props) => <TableRow {...props} />);
const SortableBoxItem = SortableElement((props) => <BoxTable {...props} />);

const Rules = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingId, setLoadingId] = useState(false);
    const [listingType, setListingType] = useState("");
    const navigate = useNavigate();
    const [deleteModalDetails, setDeleteModalDetails] = useState({ visible: false, id: null });
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isLoadingExport, setIsLoadingExport] = useState(false);

    const [isPerPage, setIsPerPage] = useState(false);
    const state = useSelector((state) => state);
    const { rules } = useSelector((state) => state.rules);
    const [rulesList, setRulesList] = useState([]);
    const [isSorting, setIsSorting] = useState(false);

    useEffect(() => {
        setRulesList(rules);
    }, [rules]);

    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
        setRulesList((oldItems) => arrayMove(oldItems, oldIndex, newIndex));
        setIsSorting(true);
    }, []);

    useEffect(() => {
        if (rulesList.length && isSorting) {
            const rulesPriority = [];
            rulesList.map((rule, index) => {
                index++;
                rulesPriority.push({ rule_id: rule?.id, priority: index });
            });

            const newPriority = [];
            newPriority["rules_priority"] = rulesPriority;

            const callBack = () => {
                setIsSorting(false);
                setIsLoading(true);
                dispatch(
                    getRulesRequest(currentPage, "all", searchQuery, () => {
                        setIsLoading(false);
                        setIsPerPage(true);
                    }),
                );
            };
            const navigateState = () => {
                // navigate(`/rules`);
            };

            const payload = {
                rules_priority: rulesPriority,
            };

            dispatch({
                type: UPDATE_RULES_PRIORITY_REQUEST,
                payload: payload,
                callBack,
                navigateState,
            });
        }
    }, [isSorting]);

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getRulesRequest(currentPage, "all", searchQuery, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getRulesRequest(1, "all", searchQuery, () => setIsLoading(false)));
        }
    }, [perPage]);

    const onChangeSwitch = (item, isEdit = false) => {
        let status = item?.is_active === 1 ? 0 : 1;
        let payload = { rules_id: item?.id, is_active: status };
        setLoadingId(item?.id);

        const callBack = () => {
            setLoadingId(false);
        };

        const returnResponse = (data) => {
            if (data?.data?.enable_edit_on_active) {
                onClickEdit(item?.id);
            } else {
                setIsLoading(true);
                dispatch(
                    getRulesRequest(currentPage, "all", searchQuery, () => {
                        setIsLoading(false);
                        setIsPerPage(true);
                    }),
                );
            }
        };

        dispatch({ type: UPDATE_RULES_STATUS_REQUEST, payload, callBack, returnResponse });
    };

    useEffect(() => {
        if (state?.menu_type?.listingType) {
            setListingType(state?.menu_type?.listingType);
        }
    }, [state?.menu_type?.listingType]);

    const handleCloseDeleteModal = React.useCallback(() => {
        setDeleteModalDetails({ visible: false, id: null });
    }, []);

    const onClickEdit = (id) => {
        navigate(`/rules/edit/${id}`);
    };

    const handleDeleteRule = () => {
        if (deleteModalDetails?.visible) {
            const callBack = () => {
                handleCloseDeleteModal();
                setIsLoadingDelete(false);
            };
            setIsLoadingDelete(true);
            dispatch({ type: DELETE_RULES_REQUEST, payload: { rules_id: deleteModalDetails?.id }, callBack });
        }
    };

    const onChangeSearchQuery = (value) => {
        setSearchQuery(value);
    };

    const onClickExport = async () => {
        setIsLoadingExport(true);
        const data = await downloadRulesExcel(searchQuery);
        if (data) {
            window.location.href = data?.data;
        }

        setIsLoadingExport(false);
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Rules"}
                onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                onClickExport={onClickExport}
                isLoadingExport={isLoadingExport}
                addButton={
                    <div className="inline-flex ml-2" role="group">
                        <Link to="/rules/create" className="btn text-sm font-medium text-white bg-primary max-h-[38px]">
                            <Icon.Plus size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block">Create New Rule</span>
                        </Link>
                    </div>
                }
            />
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* BEGIN: Connector Table */}
                <table className="table table-report">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Name</th>
                            <th className="whitespace-nowrap">Rules</th>
                            <th className="whitespace-nowrap">Connector</th>
                            <th className="whitespace-nowrap">Connector Types</th>
                            <th className="whitespace-nowrap">Priority</th>
                            <th className="whitespace-nowrap">Status</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody>
                            <tr className="intro-x">
                                <td colSpan={9}>
                                    <div className="flex justify-center h-48 items-center">
                                        <ClipLoader
                                            loading={true}
                                            color="#1e3a8a"
                                            size={55}
                                            css="border-width: 6px;border-color: #1e3a8a !important;border-bottom-color: transparent !important;"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <SortableCont
                            onSortEnd={onSortEnd}
                            axis="y"
                            lockAxis="y"
                            lockToContainerEdges={true}
                            lockOffset={["30%", "50%"]}
                            helperClass="helperContainerClass"
                            useDragHandle={true}>
                            {rulesList?.map((item, index) => {
                                return (
                                    <SortableItem
                                        key={`item-${index}`}
                                        index={index}
                                        no={index + 1}
                                        item={item}
                                        onClickEdit={onClickEdit}
                                        onChangeSwitch={onChangeSwitch}
                                        loadingId
                                        helperclass="dragging-helper-class"
                                        setDeleteModalDetails={setDeleteModalDetails}
                                    />
                                );
                            })}
                        </SortableCont>
                    )}
                </table>
                {/* END: Connector Table */}

                {/* START: Table Not Found */}
                {!rules?.length && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
            </>
        );
    };

    const _renderBoxTable = () => {
        return (
            <>
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
                    <SortableBoxContainer
                        onSortEnd={onSortEnd}
                        axis="y"
                        lockAxis="y"
                        lockToContainerEdges={true}
                        lockOffset={["30%", "50%"]}
                        // helperClass="helperContainerClass"
                        useDragHandle={true}>
                        {rulesList?.map((item, index) => {
                            return (
                                <SortableBoxItem
                                    key={`item-${index}`}
                                    index={index}
                                    no={index + 1}
                                    item={item}
                                    onClickEdit={onClickEdit}
                                    onChangeSwitch={onChangeSwitch}
                                    loadingId
                                    // helperClass="dragging-helper-class"
                                    setDeleteModalDetails={setDeleteModalDetails}
                                />
                            );
                        })}
                    </SortableBoxContainer>
                )}

                {/* START: Table Not Found */}
                {!rules?.length && !isLoading && (
                    <div className="border-b dark:border-darkmode-400 items-center pt-10 pb-10">
                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">No Record Found</div>
                    </div>
                )}
                {/* END: Table Not Found */}
            </>
        );
    };

    return (
        <>
            {/* BEGIN: Delete Modal */}
            <DeleteModal
                isLoading={isLoadingDelete}
                onClose={handleCloseDeleteModal}
                visible={deleteModalDetails?.visible}
                onDelete={handleDeleteRule}
            />
            {/* END: Delete Modal */}

            {/* END: Mobile Menu */}

            {/* BEGIN: Header */}
            <Header />
            {/* END: Header */}

            {/* BEGIN: Menu */}

            {/* BEGIN: Content */}
            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}
                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">
                                {/* BEGIN: Connector Table */}
                                {listingType === "box" ? _renderBoxTable() : _renderTable()}
                                {/* END: Connector Table */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END: Content */}
        </>
    );
};

export default Rules;

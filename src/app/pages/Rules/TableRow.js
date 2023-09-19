import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import * as Icon from "react-feather";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const TrWrapper = styled.tr`
    &.helperContainerClass {
        display: flex;
        //justify-content: space-between;
        border: 1px solid #efefef;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 0.375rem;

        &:active {
            cursor: grabbing;
        }

        & > td {
            padding: 0.75rem 1.25rem;
            display: flex;
            // justify-content:center;
            align-items: center;
        }

        & td:nth-child(1) {
            // width: calc(100vw-10%);
            width: 60px;
        }

        // & td:nth-child(2) {
        //     width: 54.05px;
        // }

        & td:nth-child(2) {
            // width: 200.41px;
            width: 210px;
        }

        & td:nth-child(3) {
            // width: 100%;
            width: 310px;
        }

        & td:nth-child(4) {
            // width: 260.25px;
            width: 110px;
        }

        & td:nth-child(5) {
            // width: 555px;
            width: 260px;
        }

        & td:nth-child(6) {
            // width: 200px;
            width: 90px;
        }

        & td:nth-child(7) {
            // width: 206px;
            width: 190px;
        }

        & td:nth-child(8) {
            // width: 96.61px;
            width: 100px;
        }
    }
`;

const RowHandler = SortableHandle(() => <Icon.Move size={15} className="cursor-grabbing" />);

const TableRow = ({ no, item, loadingId, setDeleteModalDetails, onClickEdit, onChangeSwitch }) => {
    return (
        <TrWrapper className="w-[100%]">
            {/* <td className="w-10 text-black dark:text-slate-300">{item?.id}</td> */}
            <td className="w-[20px] text-black dark:text-slate-300">{no}</td>
            <td className="w-[200px]">
                <p className="font-medium  text-black dark:text-slate-300 w-[150px]">{item?.rule_name}</p>
            </td>
            <td className="w-[300px]">
                <p className="font-medium  text-black dark:text-slate-300">{item?.rule_condition_view.replace("==", "=")}</p>
            </td>
            <td className="w-[100px]">{item?.name}</td>
            <td className="w-[250px]">
                {item?.connector_type?.length > 0 ? (
                    <div className="flex flex-wrap">
                        {item?.connector_type?.map((dc) => {
                            return (
                                <span class="ml-1 mt-1 py-0.5 px-2 rounded-full text-xs text-white font-medium bg-primary flex items-center justify-center custom-badge custom-badge">
                                    {dc?.label}
                                </span>
                            );
                        })}
                    </div>
                ) : (
                    <p className="font-medium ">
                        <span className="text-danger">-- N/A --</span>
                    </p>
                )}
            </td>
            <td className="w-[80px]">
                <div className="flex">
                    {item?.is_active ? (
                        <>
                            <RowHandler /> &nbsp; &nbsp;
                            {item?.priority}
                        </>
                    ) : (
                        <p className="font-medium whitespace-nowrap">
                            <span className="text-danger">-- N/A --</span>
                        </p>
                    )}
                </div>
            </td>
            <td className="w-[170px]">
                <div className="flex justify-center align-center w-[135px]">
                    <div
                        className={
                            item?.is_active === 1
                                ? "flex items-center justify-center text-success min-w-[62px]"
                                : "flex items-center justify-center text-danger min-w-[62px]"
                        }>
                        <Icon.CheckSquare size={15} /> &nbsp; {item?.is_active === 1 ? "Active" : "Inactive"}
                    </div>
                    <div className="form-switch ">
                        <input
                            disabled={!item?.connector_status}
                            onChange={() => {
                                onChangeSwitch(item);
                            }}
                            // id="show-example-5"
                            className="show-code form-check-input mr-0 ml-3"
                            type="checkbox"
                            checked={item?.is_active === 1 ? true : false}
                        />
                    </div>
                    <div className="ml-2 flex items-center border-slate-900">
                        <ClipLoader
                            loading={loadingId === item?.id}
                            color="#1e3a8a"
                            size={15}
                            css="border-width: 1px;border-bottom-color: white !important;"
                        />
                    </div>
                </div>
            </td>
            <td className="w-[100px]">
                <div className="table-report__action text-center">
                    <div className="flex justify-center">
                        <div
                            onClick={() => {
                                if (item?.connector_status) {
                                    onClickEdit(item?.id);
                                }
                            }}
                            className={
                                item?.connector_status
                                    ? "font-medium flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-5"
                                    : "font-medium whitespace-nowrap flex items-center justify-center cursor-not-allowed text-slate-300 dark:text-slate-500 mr-5"
                            }>
                            <Icon.Edit size={15} /> &nbsp;
                        </div>
                        <div className={"font-medium  flex items-center justify-center cursor-pointer text-slate-900 text-rose-600  "}>
                            <Icon.Trash2
                                onClick={() =>
                                    setDeleteModalDetails({
                                        visible: true,
                                        id: item?.id,
                                    })
                                }
                                size={15}
                                stroke={"red"}
                                strokeWidth={2}
                            />{" "}
                            &nbsp;
                        </div>
                    </div>
                </div>
            </td>
        </TrWrapper>
    );
};

export default TableRow;

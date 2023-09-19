import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import * as Icon from "react-feather";
import { ClipLoader } from "react-spinners";

const RowHandler = SortableHandle(() => <Icon.Move size={15} style={{ cursor: "grab" }} />);

const BoxTable = ({ item, loadingId, setDeleteModalDetails, onClickEdit, onChangeSwitch }) => {
    return (
        <div className="intro-y col-span-12 md:col-span-6">
            <div className="box">
                <div className="flex flex-col lg:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                    <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0">
                        <span className="font-medium text-primary dark:text-white">{item?.rule_name}</span>
                    </div>
                    <div className="flex -ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0">
                        <div className="dropdown ml-auto sm:ml-0 flex items-center">
                            <div
                                onClick={() => {
                                    onClickEdit(item?.id);
                                }}
                                className={
                                    "font-medium whitespace-nowrap flex items-center justify-center cursor-pointer text-slate-900 dark:text-white mr-2"
                                }>
                                <Icon.Edit size={15} strokeWidth={2} /> &nbsp;
                            </div>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteModalDetails({ visible: true, id: item?.id });
                                }}
                                className={
                                    "font-medium whitespace-nowrap flex items-center cursor-pointer text-red-600 dark:text-red-600 mr-2"
                                }>
                                <Icon.Trash2 size={15} strokeWidth={2} /> &nbsp;
                            </div>

                            <div className={"font-medium whitespace-nowrap flex items-center cursor-pointer dark:text-red-600"}>
                                <RowHandler /> &nbsp;
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-2 lg:ml-0 lg:justify-end mt-3 lg:mt-0  border-b border-slate-200/60 dark:border-darkmode-400 p-5">
                    <div className="lg:mr-auto text-center lg:text-left mt-3 lg:mt-0 grid grid-cols-12">
                        <div className="text-slate-500 text-xs col-span-6">
                            <span className="mt-0.5 font-bold text-slate-800 dark:text-white"> Id:&nbsp;</span>
                            <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">{item?.id}</span>
                            <br />

                            <span className="mt-0.5 font-bold text-slate-800 dark:text-white"> Rules:&nbsp;</span>
                            <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">
                                {/*{item?.rule_condition_view}*/}
                                {item?.rule_condition_view.replace("==", "=")}
                            </span>
                        </div>
                        <div className="text-slate-500 text-xs col-span-6 text-right">
                            <span className="mt-0.5 font-bold text-slate-800 dark:text-white">Connector:&nbsp;</span>
                            <span className="text-slate-800 dark:text-slate-400 text-xs mt-0.5">{item?.name}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center p-5">
                    <div className="w-full lg:w-1/2 mb-4 lg:mb-0 mr-auto">
                        <div className="flex text-slate-500 text-xs">
                            <div className="form-switch ">
                                <input
                                    disabled={!item?.connector_status}
                                    onChange={() => {
                                        onChangeSwitch(item);
                                    }}
                                    // id="show-example-5"
                                    className="show-code form-check-input mr-0"
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
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">
                        <span
                            className={`py-0.5 px-2 rounded-full text-xs ${
                                item?.is_active ? "bg-success" : "bg-danger"
                            } text-white cursor-pointer font-medium`}>
                            {item?.is_active === 1 ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxTable;

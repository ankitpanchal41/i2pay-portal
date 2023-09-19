import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AutoPayoutTime, AutoPayoutTimeline, MonthSelect, PayoutMode, WeekSelect } from "../../../utils/staticDropdown";
import "react-datepicker/dist/react-datepicker.css";
import { payoutSchema, payoutSettingSchema } from "../../../utils/validationSchema";
import { getAutoPayoutReportRequest } from "../../../redux/actions/AutoPayoutReportsAction";
import {
    autoPayoutSetting,
    generatePayout,
    getAutoPayoutSettingData,
    getPayoutConnectorData,
} from "../../../redux/services/AutoPayoutReports";
import { Currency } from "../../../utils/currency";
import { decode } from "html-entities";
import PayoutAdvanceSearchModal from "../../../components/common/PayoutAdvanceSearchModal";
import Images from "../../../../assets/images";
import { messages } from "../../../messages/merchantRegister";
import PhoneInput from "../../../components/common/forms/PhoneInput";
import MiniLoader from "../../../components/common/MiniLoader";

const Modal = React.lazy(() => import("../../../components/common/Modal"));
const Heading = React.lazy(() => import("../../../components/common/Heading"));
const Pagination = React.lazy(() => import("../../../components/common/Pagination"));
const Input = React.lazy(() => import("../../../components/common/forms/Input"));
const Select = React.lazy(() => import("../../../components/common/forms/Select"));
const MultiSelect = React.lazy(() => import("react-select"));

const initialValuesPayout = {
    name: "",
    email: "",
    phone: "",
    address: "",
    account_no: "",

    ifsc_code: "",
    payout_mode: "",
    // amount: "",
    countryCode: {
        name: "India",
        value: "+91",
        code: "IN",
        flag: "🇮🇳",
    },
    connector_id: "",
};

const AutoPayoutGenerate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({ timeline: "", timeline_type: "", timeline_time: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { autoPayoutReports, totalPage } = useSelector((state) => state.autoPayoutReports);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isPerPage, setIsPerPage] = useState(false);
    // const [isLoadingExport, setIsLoadingExport] = useState(false);
    const [modalVisibleSetting, setModalVisibleSetting] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [advanceSearchPayload, setAdvanceSearchPayload] = useState("");
    const [modalVisiblePayout, setModalVisiblePayout] = useState(false);
    const [connectorData, setConnectorData] = useState([]);
    const [payoutId, setPayoutId] = useState("");
    const [settlementAmount, setSettlementAmount] = useState(0);
    const [isLoadingPayout, setIsLoadingPayout] = useState(false);
    const [activeDetailId, setActiveDetailId] = useState("");

    useEffect(() => {
        setIsLoading(true);
        dispatch(
            getAutoPayoutReportRequest(currentPage, perPage, searchQuery, advanceSearchPayload, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    }, [currentPage, searchQuery]);

    useEffect(() => {
        if (isPerPage) {
            setCurrentPage(1);
            setIsLoading(true);
            dispatch(getAutoPayoutReportRequest(1, perPage, searchQuery, advanceSearchPayload, () => setIsLoading(false)));
        }
    }, [perPage]);

    useEffect(() => {
        getAutoPayoutSetting();
        // getPayoutConnectors();
    }, []);

    const getAutoPayoutSetting = async () => {
        const data = await getAutoPayoutSettingData();

        if (data?.responseCode === 200) {
            setInitialValues({
                timeline: data?.data?.auto_payout_duration,
                timeline_type: data?.data?.auto_payout_day,
                timeline_time: data?.data?.auto_payout_time,
            });
        }
    };

    const getPayoutConnectors = async () => {
        const data = await getPayoutConnectorData();
        console.log(data?.data);
        if (data?.responseCode === 200) {
            const connectors = [];
            data?.data?.map((item) => {
                connectors.push({ label: item?.name, value: item?.id });
            });
            setConnectorData(connectors);
            // setInitialValues({
            //     timeline: data?.data?.auto_payout_duration,
            //     timeline_type: data?.data?.auto_payout_day,
            //     timeline_time: data?.data?.auto_payout_time,
            // });
        }
    };

    const pagination = {
        totalPage: autoPayoutReports?.length === 0 ? 1 : totalPage,
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
    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "white",
            padding: "4px",
            borderColor: "#e2e8f0",
            color: mode === "dark" ? "#FFFFFF" : "#384252",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,

                cursor: isDisabled ? "not-allowed" : "default",
                border: isFocused ? "0px" : "0px",

                ":active": {
                    ...styles[":active"],
                },
                ":hover": {
                    ...styles[":hover"],
                    backgroundColor: mode === "dark" ? "#0f1d36" : "#b1d7ff",
                },
            };
        },
        input: (styles, { isFocused }) => ({
            ...styles,
            ":active": {
                border: "none",
            },
            border: 0,
            // This line disable the blue border
        }),
        placeholder: (styles, { isFocused }) => ({
            ...styles,
            boxShadow: "none",
            // This line disable the blue border
        }),

        singleValue: (styles, { data }) => ({ ...styles, color: mode === "dark" ? "#FFFFFF" : "#384252" }),
        menu: (styles, { data }) => ({ ...styles, backgroundColor: mode === "dark" ? "#1b253b" : "white" }),
    };

    const onSettingPayout = () => {
        setModalVisibleSetting(!modalVisibleSetting);
    };

    const onSubmit = async (values) => {
        setIsLoadingSubmit(true);

        const payload = {
            auto_payout: true,
            auto_payout_duration: values?.timeline,
            auto_payout_time: values?.timeline_time,
            auto_payout_day: values?.timeline_type,
        };

        const data = await autoPayoutSetting(payload);

        if (data?.responseCode === 200) {
            onSettingPayout();
            if (data?.data?.is_load_list) {
                dispatch(getAutoPayoutReportRequest(1, perPage, searchQuery, advanceSearchPayload, () => setIsLoading(false)));
            }
        }

        setIsLoadingSubmit(false);

        await getAutoPayoutSetting();
    };

    const onRemovePayoutSetting = async () => {
        setIsLoadingSubmit(true);

        const payload = {
            auto_payout: false,
        };

        const data = await autoPayoutSetting(payload);

        setIsLoadingSubmit(false);
        if (data?.responseCode === 200) {
            await getAutoPayoutSetting();
        }
    };

    const advanceSearchSubmit = (values) => {
        setIsOpenMenu(!isOpenMenu);
        setIsLoading(true);
        setAdvanceSearchPayload(values);
        setIsReset(false);
        setCurrentPage(1);
        dispatch(
            getAutoPayoutReportRequest(1, perPage, searchQuery, values, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    };

    const resetFilter = () => {
        setIsOpenMenu(false);
        setIsLoading(true);
        setAdvanceSearchPayload("");
        setSearchQuery("");
        setIsReset(true);
        setCurrentPage(1);
        dispatch(
            getAutoPayoutReportRequest(1, perPage, "", {}, () => {
                setIsLoading(false);
                setIsPerPage(true);
            }),
        );
    };

    const changeMode = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const onOpenPayoutModal = (id, amount) => {
        setPayoutId(id);
        setSettlementAmount(amount);
        setModalVisiblePayout(true);
    };

    const onClosePayoutModal = () => {
        setModalVisiblePayout(false);
    };

    const onSubmitPayout = async (values) => {
        const payload = {
            ...values,
            country_code: values?.countryCode?.value,
            countryCode: undefined,
            connector_id: values?.connector_id?.value,
            payout_id: payoutId,
            amount: settlementAmount,
        };

        setIsLoadingPayout(true);
        const data = await generatePayout(payload);

        if (data?.responseCode === 200) {
            onClosePayoutModal();
            setIsLoading(true);
            dispatch(
                getAutoPayoutReportRequest(currentPage, perPage, searchQuery, advanceSearchPayload, () => {
                    setIsLoading(false);
                }),
            );
        }

        setIsLoadingPayout(false);
    };

    const onClickDetails = (id) => {
        if (activeDetailId) {
            setActiveDetailId("");
        } else {
            setActiveDetailId(id);
        }
    };

    const _renderHeading = () => {
        return (
            <Heading
                title={"Auto Payout Reports"}
                // onChangeSearchQuery={onChangeSearchQuery}
                displayBackButton={false}
                addButton={
                    <div className="inline-flex rounded-none ml-2" role="group">
                        <button
                            onClick={changeMode}
                            className="py-2 px-4 text-sm font-medium text-white bg--[#FFFFFF] border border-[#B4BDCE] max-h-[38px] rounded-l flex items-center">
                            <span className="hidden md:block lg:block text-[#1E3A8A] text-[14px]">Advance Filters</span>
                            <img src={Images.Filter} className="h-[21px] w-[21px] ml-3" />
                        </button>
                        <button
                            onClick={resetFilter}
                            className="py-2 px-4 text-sm font-medium text-white bg-[#E8E8E9] max-h-[38px] border border-[#B4BDCE] border-l-0 rounded-r">
                            <Icon.RefreshCw size="16" className="block md:hidden lg:hidden" />
                            <span className="hidden md:block lg:block text-[#1E3A8A] text-[#1E3A8A] text-[14px]">Reset</span>
                        </button>
                    </div>
                }
            />
        );
    };

    const _renderModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    func
                    heading={"Auto Payout Setting"}
                    visible={modalVisibleSetting}
                    onClose={onSettingPayout}
                    onClickCancel={onSettingPayout}
                    onClickSave={onSubmit}
                    useFormik
                    initialValues={initialValues}
                    validationState={payoutSettingSchema}
                    modalMinWidth={"50%"}
                    buttonLoading={isLoadingSubmit}>
                    {(setFieldValue, values, errors, setFieldTouched) => {
                        return (
                            <>
                                <Select
                                    isRequiredField
                                    name="timeline"
                                    className="intro-x login__input form-control py-2 px-3 block"
                                    firstEnableLabel={"Select Timeline"}
                                    label={"Select Timeline"}
                                    data={AutoPayoutTimeline}
                                    containerClassName="mt-2"
                                    value={values?.timeline}
                                    onChange={(e) => {
                                        setFieldValue("timeline", e.target.value);
                                        setFieldValue("timeline_type", "");
                                    }}
                                />
                                {values?.timeline != "" && values?.timeline != "1" && values?.timeline != "4" && (
                                    <Select
                                        isRequiredField
                                        name="timeline_type"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        firstDisableLabel={"Select Days"}
                                        label={"Select Days"}
                                        data={values?.timeline == 2 ? WeekSelect : values?.timeline == 3 ? MonthSelect : []}
                                        containerClassName="mt-2"
                                    />
                                )}
                                <Select
                                    isRequiredField
                                    name="timeline_time"
                                    className="intro-x login__input form-control py-2 px-3 block"
                                    firstDisableLabel={"Select Time"}
                                    label={"Select Time"}
                                    data={AutoPayoutTime}
                                    containerClassName="mt-2"
                                />
                            </>
                        );
                    }}
                </Modal>
                {/* BEGIN: Modal */}
            </>
        );
    };

    const _renderTable = () => {
        return (
            <>
                {/* BEGIN: Connector Table */}
                <table class="table table-report sm:mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">No</th>
                            <th className="whitespace-nowrap">Payout No.</th>
                            <th className="whitespace-nowrap">Start Date</th>
                            <th className="whitespace-nowrap">End Date</th>
                            <th className="whitespace-nowrap">Payout Amount</th>
                            <th className="text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody className="font-normal">
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
                        <tbody className="font-normal">
                            {autoPayoutReports?.map((item, index) => {
                                return (
                                    <>
                                        <tr className="intro-x" key={index}>
                                            <td className="w-20">{(currentPage - 1) * perPage + index + 1}</td>
                                            <td>
                                                {item?.invoice_no ? (
                                                    <p className="font-medium whitespace-nowrap dark:text-white">{item?.invoice_no}</p>
                                                ) : (
                                                    <p className="font-medium whitespace-nowrap">
                                                        <span className="text-danger">-- N/A --</span>
                                                    </p>
                                                )}
                                            </td>
                                            <td>
                                                {item?.start_date ? (
                                                    <p className="font-medium whitespace-nowrap dark:text-white">{item?.start_date}</p>
                                                ) : (
                                                    <p className="font-medium whitespace-nowrap">
                                                        <span className="text-danger">-- N/A --</span>
                                                    </p>
                                                )}
                                            </td>
                                            <td>
                                                {item?.end_date ? (
                                                    <p className="font-medium whitespace-nowrap dark:text-white">{item?.end_date}</p>
                                                ) : (
                                                    <p className="font-medium whitespace-nowrap">
                                                        <span className="text-danger">-- N/A --</span>
                                                    </p>
                                                )}
                                            </td>
                                            <td>
                                                {item?.net_settlement_amount ? (
                                                    <p className="font-medium whitespace-nowrap dark:text-white">
                                                        {decode(Currency.find((c) => c?.value === item?.currency)?.symbol)}
                                                        {item?.net_settlement_amount}
                                                    </p>
                                                ) : (
                                                    <p className="font-medium whitespace-nowrap">
                                                        <span className="text-danger">-- N/A --</span>
                                                    </p>
                                                )}
                                            </td>
                                            <td className="table-report__action text-center">
                                                <div className="flex justify-center">
                                                    {item?.is_active === 0 && item?.net_settlement_amount > 0 ? (
                                                        <Link
                                                            to={`/payout/${item?.id}`}
                                                            className={
                                                                "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                            }>
                                                            <img src={Images.PayoutIcon} />
                                                        </Link>
                                                    ) : null}
                                                    <Link
                                                        // target="_blank"
                                                        to={`/auto-payout-report/${item?.invoice_no}`}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <Icon.Eye size={20} /> &nbsp;
                                                    </Link>
                                                    {/* <div
                                                        onClick={() => {
                                                            onClickDetails(item?.id);
                                                        }}
                                                        className="cursor-pointer">
                                                        {activeDetailId === item?.id ? (
                                                            <Icon.ChevronDown size={25} />
                                                        ) : (
                                                            <Icon.ChevronUp size={25} />
                                                        )}
                                                    </div> */}
                                                </div>
                                            </td>
                                        </tr>
                                        {/* {activeDetailId === item?.id && (
                                            <tr className="intro-x">
                                                <td className="py-0 px-0" colSpan={6}>
                                                    {DATA?.map((item, index) => {
                                                        return (
                                                            <div className="flex justify-between min-h-[100px] border-b px-[20px]">
                                                                <div className="flex">
                                                                    <div className="w-[100px] mt-[20px]">
                                                                        12 Jan 2023 <br />
                                                                        04:50 PM
                                                                    </div>
                                                                    <div
                                                                        className={`border-r mx-8 border-[#a6a7b0] relative ${
                                                                            index === 0 ? "mt-[20px]" : ""
                                                                        } ${DATA?.length === index + 1 ? "h-[50px]" : ""}`}>
                                                                        <div
                                                                            className={`w-[14px] h-[14px] bg-[#a6a7b0] rounded-full absolute left-[-7px]  ${
                                                                                index === 0 ? "top-[0px]" : "top-[20px]"
                                                                            } ${DATA?.length === index + 1 ? "top-[50px]" : ""}`}
                                                                        />
                                                                    </div>
                                                                    <div className="mt-[20px]">
                                                                        <div className="font-black text-[16px]">Cashfree</div>
                                                                        <div className="mt-1">
                                                                            <div className="">ACCOUNT NUMBER: 900900900900</div>
                                                                            <div className="">IFSC CODE: UTIB0002951</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-[20px] flex">
                                                                    <div
                                                                        className={`mr-4 font-black text-[16px] mt-[5px] ${
                                                                            item?.status === 1
                                                                                ? "text-[#38b15d]"
                                                                                : item?.status === 2
                                                                                ? "text-[#ce505d]"
                                                                                : item?.status === 3 || item?.status === 0
                                                                                ? "text-[#fbb014]"
                                                                                : ""
                                                                        }`}>
                                                                        ₹163.04
                                                                    </div>
                                                                    {item?.status === 1 ? (
                                                                        <div className="bg-[#38b15d40] px-3 py-1 rounded text-[#38b15d] font-black h-fit">
                                                                            Success
                                                                        </div>
                                                                    ) : item?.status === 2 ? (
                                                                        <div className="bg-[#ce505d40] px-3 py-1 rounded text-[#ce505d] font-black h-fit">
                                                                            Failed
                                                                        </div>
                                                                    ) : item?.status === 3 || item?.status === 0 ? (
                                                                        <div className="bg-[#fbb01440] px-3 py-1 rounded text-[#fbb014] font-black h-fit">
                                                                            In Progress
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </td>
                                            </tr>
                                        )} */}
                                    </>
                                );
                            })}
                        </tbody>
                    )}
                </table>
                {/* END: Connector Table */}

                {/* START: Table Not Found */}
                {autoPayoutReports?.length === 0 && !isLoading && (
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
            <PayoutAdvanceSearchModal
                title="Payout Advance Search"
                visible={isOpenMenu}
                onClose={changeMode}
                advanceSearchSubmit={advanceSearchSubmit}
                resetFilter={resetFilter}
                resetState={isReset}
            />
            {/* BEGIN: Modal */}
            {_renderModal()}
            {/* END: Modal */}

            {/* BEGIN: Content */}

            <div className="content">
                {/* BEGIN: Heading */}
                {_renderHeading()}
                {/* END: Heading */}

                <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 overflow-x-auto overflow-hidden">{_renderTable()}</div>
                        </div>
                    </div>
                </div>
                {!isLoading && autoPayoutReports?.length !== 0 && typeof autoPayoutReports !== "undefined" && (
                    <Pagination
                        pagination={pagination}
                        currentPage={currentPage}
                        perPage={perPage}
                        onChangePage={onChangePage}
                        onChangePerPage={onChangePerPage}
                    />
                )}
            </div>
        </>
    );
};

export default AutoPayoutGenerate;

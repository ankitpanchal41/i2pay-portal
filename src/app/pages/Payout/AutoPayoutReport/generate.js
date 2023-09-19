import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
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

const AutoPayoutReport = () => {
    const dispatch = useDispatch();
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
        getPayoutConnectors();
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
                // addButton={
                //     <div className="inline-flex ml-2" role="group">
                //         <button
                //             type="buttons"
                //             onClick={onSettingPayout}
                //             className={`py-2 px-4 text-sm font-medium text-white bg-primary rounded max-h-[38px] ml-2`}>
                //             <Icon.Save size="16" className="block md:hidden lg:hidden" />
                //             <span className="hidden md:block lg:block">Auto Payout Settings</span>
                //         </button>
                //         <button
                //             type="buttons"
                //             onClick={onRemovePayoutSetting}
                //             className={`py-2 px-4 text-sm font-medium text-white bg-danger rounded max-h-[38px] ml-2`}>
                //             <Icon.Save size="16" className="block md:hidden lg:hidden" />
                //             <span className="hidden md:block lg:block">
                //                 Remove Payout Settings <MiniLoader isLoading={isLoadingSubmit} />
                //             </span>
                //         </button>
                //     </div>
                // }
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

    const _renderPayoutModal = () => {
        return (
            <>
                {/* BEGIN: Modal */}
                <Modal
                    func
                    heading={"Payout"}
                    visible={modalVisiblePayout}
                    onClose={onClosePayoutModal}
                    onClickCancel={onClosePayoutModal}
                    onClickSave={onSubmitPayout}
                    useFormik
                    initialValues={initialValuesPayout}
                    validationState={payoutSchema}
                    modalMinWidth={"50%"}
                    buttonLoading={isLoadingPayout}>
                    {(setFieldValue, values, errors, touched) => {
                        return (
                            <div className="grid grid-cols-12 gap-4 gap-y-5">
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <label htmlFor="connectors_id" className="form-label">
                                        Connectors <span className="text-danger">*</span>
                                    </label>
                                    <MultiSelect
                                        value={connectorData?.find((item) => item?.value === values.connector_id)}
                                        styles={colourStyles}
                                        style={{ boxShadow: "none" }}
                                        options={connectorData}
                                        onChange={(e) => {
                                            setFieldValue("connector_id", e);
                                        }}
                                        className="intro-x login__input form-control block shadow-none"
                                    />
                                    {errors.connector_id && touched.connector_id ? (
                                        <p className="text-red-500 mt-2 ml-1 text-[12px]">{errors.connector_id}</p>
                                    ) : null}
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.payout.name}
                                        name="name"
                                        label={messages.payout.name}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        containerClassName="mt-2"
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.payout.email}
                                        name="email"
                                        label={messages.payout.email}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <div className="mb-[-12px]">
                                        {messages.payout.phone} <span className="text-danger">*</span>
                                    </div>
                                    <PhoneInput
                                        countryCodeValue={values.countryCode}
                                        setFieldValue={setFieldValue}
                                        error={errors.phone}
                                        touched={touched.phone}
                                        name="phone"
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        rows="4"
                                        containerClassName="mt-2"
                                        textarea="true"
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.payout.address}
                                        name="address"
                                        label={messages.payout.address}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        containerClassName="mt-2"
                                        type="number"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.payout.account_no}
                                        name="account_no"
                                        label={messages.payout.account_no}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        containerClassName="mt-2"
                                        type="text"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.payout.ifsc_code}
                                        name="ifsc_code"
                                        label={messages.payout.ifsc_code}
                                        isRequiredField
                                    />
                                </div>
                                <div className="intro-y col-span-12 sm:col-span-12">
                                    <Select
                                        containerClassName="mt-2"
                                        isRequiredField
                                        name="payout_mode"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        firstEnableLabel={messages.payout.payout_mode}
                                        label={messages.payout.payout_mode}
                                        data={PayoutMode}
                                        value={values?.payout_mode}
                                        onChange={(e) => {
                                            setFieldValue("payout_mode", e.target.value);
                                        }}
                                    />
                                </div>
                                {/* <div className="intro-y col-span-12 sm:col-span-12">
                                    <Input
                                        containerClassName="mt-2"
                                        type="number"
                                        className="intro-x login__input form-control py-2 px-3 block"
                                        placeholder={messages.payout.amount}
                                        name="amount"
                                        label={messages.payout.amount}
                                        isRequiredField
                                    />
                                </div> */}
                            </div>
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
                                                {item?.is_active === 0 && (
                                                    <div
                                                        onClick={() => {
                                                            onOpenPayoutModal(item?.id, item?.net_settlement_amount);
                                                        }}
                                                        className={
                                                            "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                        }>
                                                        <img src={Images.PayoutIcon} />
                                                    </div>
                                                )}

                                                <Link
                                                    target="_blank"
                                                    to={`/auto-payout-report/${item?.invoice_no}`}
                                                    className={
                                                        "font-medium whitespace-nowrap flex items-center cursor-pointer text-slate-900 dark:text-slate-300 mr-3"
                                                    }>
                                                    <Icon.Eye size={20} /> &nbsp;
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
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
            {_renderPayoutModal()}
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

export default AutoPayoutReport;

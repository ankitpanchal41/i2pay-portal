import React, { useEffect, useMemo, useState } from "react";
import * as Icon from "react-feather";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TOTAL_MERCHANT_APPLICATION_STEP } from "../../utils/constants";
import { getConnectorTransactionRequest, getPaymentMethodTransactionRequest, getTransactionStatusRequest } from "../../redux/actions/Chart";
import { changeLoginStart } from "../../redux/actions/Product";
import { SET_CURRENCY_TYPE_REQUEST } from "../../redux/actions/Menu";
import { Currency } from "../../utils/currency";
import { decode } from "html-entities";
import "react-datepicker/dist/react-datepicker.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { detailStart } from "../../redux/actions/PersistActions";
import OverViewCard from "./OverViewCard";
import TransactionCounts from "./TransactionCounts";
import TransactionBox from "./TransactionBox";
import OnlineStore from "./OnlineStores";
import ConnectorsCard from "./ConnectorsCard";
import PlaceholderLoading from "react-placeholder-loading";
import { getWidgetListRequest } from "../../redux/actions/Dashboard";

const DashboardCard = React.lazy(() => import("./dashboardCard"));
// const EducationCard = React.lazy(() => import("./educationCard"));
const Modal = React.lazy(() => import("../../components/common/Modal"));
const Select = React.lazy(() => import("react-select"));
const MiniLoader = React.lazy(() => import("../../components/common/MiniLoader"));
const DatePicker = React.lazy(() => import("react-datepicker"));
const COLOR = [
    "#0168FA",
    "#FFC107",
    "#00CCCC",
    "#4682B3",
    "#FD7E14",
    "#FE0000",
    "#FE007E",
    "#FE00FC",
    "#B8860C",
    "#0000FD",
    "#33CD33",
    "#00FE02",
    "#FF6447",
    "#FEFE02",
    "#493D8B",
    "#9B5DE6",
    "#F15BB5",
    "#FDE441",
    "#01BAFA",
    "#E0AFA0",
    "#8093F1",
    "#0EAD6A",
    "#7BDEF1",
    "#FF0054",
    "#6494ED",
    "#FF9900",
    "#3ACEAC",
    "#696969",
    "#BB7F48",
];

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.persist);
    const { persist } = useSelector((state) => state);
    const stepNumber = Number(userData?.data?.step);
    const [statusStartDate, setStatusStartDate] = useState(null);
    const [statusEndDate, setStatusEndDate] = useState(null);
    const [connectorStartDate, setConnectorStartDate] = useState(null);
    const [connectorEndDate, setConnectorEndDate] = useState(null);
    const [paymentMethodStartDate, setPaymentMethodStartDate] = useState(null);
    const [paymentMethodEndDate, setPaymentMethodEndDate] = useState(null);
    const [isLoadingTransactionStatus, setIsLoadingTransactionStatus] = useState(false);
    const [isLoadingConnectorTransaction, setIsLoadingConnectorTransaction] = useState(false);
    const [isLoadingPaymentMethodTransaction, setIsLoadingPaymentMethodTransaction] = useState(false);
    const [visibleBarChart, setVisibleBarChart] = useState(false);
    const [currencyValue, setCurrencyValue] = useState(localStorage.getItem("CURRENCY_TYPE"));
    const [dummyData, setDummyData] = useState([]);
    const [cardLoading, setCardLoading] = useState(false);
    const [visibleAuthModal, setVisibleAuthModal] = useState(
        persist?.loginStart === true ? (userData?.data?.has_google_auth_activated === "1" ? false : true) : false,
    );

    const state = useSelector((state) => state);
    const { widgetList } = useSelector((state) => state.dashboard);

    useEffect(() => {
        if (userData?.data?.step === "0") {
            dispatch(detailStart(userData?.data?.token, () => {}));
        }
    }, []);

    const applicationPercent = useMemo(() => (100 * stepNumber) / TOTAL_MERCHANT_APPLICATION_STEP, [stepNumber]);
    const applicationStatus = persist?.userData?.data?.application_status;

    useEffect(() => {
        const currencyType = localStorage.getItem("CURRENCY_TYPE");
        if (currencyType) {
            setCurrencyValue(currencyType);
        } else {
            dispatch({ type: SET_CURRENCY_TYPE_REQUEST, payload: { currencyType: "INR" } });
            localStorage.setItem("CURRENCY_TYPE", "INR");
            setCurrencyValue("INR");
        }
    }, []);

    useEffect(() => {
        if (currencyValue) {
            const payload = {
                currency: currencyValue,
                from: statusStartDate && statusEndDate ? moment(statusStartDate).format("DD/MM/YYYY") : "",
                to: statusStartDate && statusEndDate ? moment(statusEndDate).format("DD/MM/YYYY") : "",
            };

            const callBack = () => {
                setIsLoadingTransactionStatus(false);
            };

            if ((statusStartDate === null && statusEndDate === null) || (statusStartDate && statusEndDate)) {
                setIsLoadingTransactionStatus(true);
                dispatch(getTransactionStatusRequest(payload, callBack));
            }
        }
    }, [statusStartDate, statusEndDate, dispatch, currencyValue]);

    useEffect(() => {
        if (currencyValue) {
            const payload = {
                currency: currencyValue,
                from: connectorStartDate && connectorEndDate ? moment(connectorStartDate).format("DD/MM/YYYY") : "",
                to: connectorStartDate && connectorEndDate ? moment(connectorEndDate).format("DD/MM/YYYY") : "",
            };

            const callBack = () => {
                setIsLoadingConnectorTransaction(false);
            };

            if ((connectorStartDate === null && connectorEndDate === null) || (connectorStartDate && connectorEndDate)) {
                setIsLoadingConnectorTransaction(true);
                dispatch(getConnectorTransactionRequest(payload, callBack));
            }
        }
    }, [connectorStartDate, connectorEndDate, dispatch, currencyValue]);

    useEffect(() => {
        if (currencyValue) {
            const payload = {
                currency: currencyValue,
                from: paymentMethodStartDate && paymentMethodEndDate ? moment(paymentMethodStartDate).format("DD/MM/YYYY") : "",
                to: paymentMethodStartDate && paymentMethodEndDate ? moment(paymentMethodEndDate).format("DD/MM/YYYY") : "",
            };

            const callBack = () => {
                setIsLoadingPaymentMethodTransaction(false);
            };

            if ((paymentMethodStartDate === null && paymentMethodEndDate === null) || (paymentMethodStartDate && paymentMethodEndDate)) {
                setIsLoadingPaymentMethodTransaction(true);
                dispatch(getPaymentMethodTransactionRequest(payload, callBack));
            }
        }
    }, [paymentMethodStartDate, paymentMethodEndDate, dispatch, currencyValue]);

    useEffect(() => {
        if (currencyValue) {
            setCardLoading(true);
            dispatch(
                getWidgetListRequest({ currency: currencyValue }, () => {
                    setCardLoading(false);
                }),
            );
        }
    }, [currencyValue]);

    // useEffect(() => {
    //     if (state?.chart?.connectorTransaction) {
    //         const dasdasd = [];
    //         state?.chart?.connectorTransaction?.category?.map((data, index) => {
    //             dasdasd.push({ name: data, y: state?.chart?.connectorTransaction?.value[index], color: colors[index] });
    //         });
    //         setDummyData(dasdasd);
    //         // state?.chart?.connectorTransaction?.value
    //     }
    // }, [state?.chart?.connectorTransaction?.category]);

    const onChangeStatusDate = (dates) => {
        const [startDate, endDate] = dates;
        setStatusStartDate(startDate);
        setStatusEndDate(endDate);
    };

    const onChangeConnectorDate = (dates) => {
        const [startDate, endDate] = dates;
        setConnectorStartDate(startDate);
        setConnectorEndDate(endDate);
    };

    const onChangePaymentMethodDate = (dates) => {
        const [startDate, endDate] = dates;
        setPaymentMethodStartDate(startDate);
        setPaymentMethodEndDate(endDate);
    };

    useEffect(() => {
        if (state?.chart?.paymentMethodTransaction?.value?.length > 0) {
            let barChartAmount = false;
            state?.chart?.paymentMethodTransaction?.value?.map((amount) => {
                if (amount !== 0) {
                    barChartAmount = true;
                }
                return true;
            });
            setVisibleBarChart(barChartAmount);
        }
    }, [state?.chart?.paymentMethodTransaction?.value]);

    const pieOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            backgroundColor: null,
        },
        title: {
            text: "",
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: "#FFFFFF",
            padding: 11,
            pointFormat: "<b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: "%",
            },
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false,
                    format: "<b>{point.name}</b>",
                    distance: -50,
                    filter: {
                        property: "percentage",
                        operator: ">",
                        value: 4,
                    },
                },
            },
        },
        series: [
            {
                data: state?.chart?.transactionStatus,
            },
        ],
    };

    const lineOptions = {
        chart: {
            type: "column",
            backgroundColor: null,
            marginTop: 20,
            spacingBottom: 0,
            height: 400,
        },
        title: {
            text: "",
        },
        accessibility: {
            enabled: false,
        },
        xAxis: {
            categories: state?.chart?.connectorTransaction?.category,
            labels: {
                enabled: false,
            },
            crosshair: false,
            lineWidth: 0,
        },
        yAxis: {
            title: {
                text: "",
            },
            labels: {
                formatter: function () {
                    return (
                        "<span style='margin-bottom: 20px;'>" +
                        decode(Currency?.find((item) => item?.value === currencyValue)?.symbol) +
                        this.value +
                        "</span>"
                    );
                },
                x: 0,
                y: -5,
            },
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: "#F1F1F1",
            padding: 11,
            formatter: function () {
                return (
                    '<div style="color: #3B4863; font-weight: 500; font-size: 14px;">Connector: </div>' +
                    '<span style="color: #677793; font-weight: 500; font-size: 14px;">' +
                    this.x +
                    "</span>" +
                    '<br/> <div style="color: #3B4863; font-weight: 500; font-size: 14px;">Amount:</div>' +
                    '<span style="color: #677793; font-weight: 500; font-size: 14px;">' +
                    decode(Currency?.find((item) => item?.value === currencyValue)?.symbol) +
                    this.y +
                    "</span>"
                );
            },
        },
        credits: {
            enabled: false,
        },
        colors: COLOR,
        plotOptions: {
            series: {
                pointWidth: 70,
                borderRadius: 0,
                borderWidth: 0,
            },
            column: {
                pointWidth: 30,
                colorByPoint: true,
            },
        },
        series: [
            {
                showInLegend: false,
                // name: "John",
                // data: dummyData,
                data: state?.chart?.connectorTransaction?.value,
            },
        ],
    };

    const barOptions = {
        chart: {
            type: "column",
            backgroundColor: null,
            marginTop: 20,
            spacingBottom: 0,
            height: 400,
        },
        title: {
            text: "",
        },
        accessibility: {
            enabled: false,
        },
        xAxis: {
            categories: state?.chart?.paymentMethodTransaction?.category,
            labels: {
                enabled: false,
            },
            crosshair: false,
            lineWidth: 0,
        },
        yAxis: {
            title: {
                text: "",
            },
            labels: {
                formatter: function () {
                    return decode(Currency?.find((item) => item?.value === currencyValue)?.symbol) + this.value;
                },
                x: 0,
                y: -5,
            },
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: "#F1F1F1",
            padding: 11,
            formatter: function () {
                return (
                    '<div style="color: #3B4863; font-weight: 500; font-size: 14px;">Payment Method: </div>' +
                    '<span style="color: #677793; font-weight: 500; font-size: 14px;">' +
                    this.x +
                    "</span>" +
                    '<br/> <div style="color: #3B4863; font-weight: 500; font-size: 14px;">Amount:</div>' +
                    '<span style="color: #677793; font-weight: 500; font-size: 14px;">' +
                    decode(Currency?.find((item) => item?.value === currencyValue)?.symbol) +
                    this.y +
                    "</span>"
                );
            },
        },
        credits: {
            enabled: false,
        },
        colors: COLOR,
        plotOptions: {
            series: {
                pointWidth: 70,
                borderRadius: 0,
                borderWidth: 0,
            },
            column: {
                pointWidth: 30,
                colorByPoint: true,
            },
        },
        series: [
            {
                showInLegend: false,
                // name: "John",
                // data: dummyData,
                data: state?.chart?.paymentMethodTransaction?.value,
            },
        ],
    };
    // {
    //     chart: {
    //         type: "column",
    //         backgroundColor: null,
    //         marginTop: 20,
    //         spacingBottom: 0,
    //     },
    //     title: {
    //         text: "",
    //     },
    //     xAxis: {
    //         categories: state?.chart?.paymentMethodTransaction?.category,
    //         labels: {
    //             enabled: false,
    //         },
    //         crosshair: false,
    //         lineWidth: 0,
    //     },
    //     yAxis: {
    //         title: { text: "" },
    //         labels: {
    //             formatter: function () {
    //                 return decode(Currency?.find((item) => item?.value === currencyValue)?.symbol) + this.value;
    //             },
    //             x: 0,
    //             y: -5,
    //         },
    //     },
    //     accessibility: {
    //         enabled: false,
    //     },
    //     tooltip: {
    //         formatter: function () {
    //             return (
    //                 "<b>Payment Method: </b>" +
    //                 this.x +
    //                 "<br/> <b>Amount: </b>" +
    //                 decode(Currency?.find((item) => item?.value === currencyValue)?.symbol) +
    //                 this.y
    //             );
    //         },
    //     },
    //     credits: {
    //         enabled: false,
    //     },
    //     colors: COLOR,
    //     plotOptions: {
    //         series: {
    //             pointWidth: 70,
    //             borderRadius: 0,
    //             borderWidth: 0,
    //         },
    //         column: {
    //             pointWidth: 30,
    //         },
    //     },
    //     series: [
    //         {
    //             showInLegend: false,
    //             data: state?.chart?.paymentMethodTransaction?.value,
    //         },
    //     ],
    // };

    const { mode } = useSelector((state) => state.persist);

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: mode === "dark" ? "#1b253b" : "#596882",
            borderColor: "#e2e8f0",
            color: mode === "dark" ? "#FFFFFF" : "#384252",
            height: 40,
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
            color: "#FFFFFF",
            // This line disable the blue border
        }),
        placeholder: (styles, { isFocused }) => ({
            ...styles,
            boxShadow: "none",
            // This line disable the blue border
        }),

        singleValue: (styles, { data }) => ({ ...styles, color: mode === "dark" ? "#FFFFFF" : "#FFFFFF" }),
        menu: (styles, { data }) => ({ ...styles, backgroundColor: mode === "dark" ? "#1b253b" : "white" }),
    };

    // useEffect(() => {
    //     setCardLoading(true);
    //     setTimeout(() => {
    //         setCardLoading(false);
    //     }, [3000]);
    // }, []);

    const onCloseAuthModal = () => {
        setVisibleAuthModal(!visibleAuthModal);
        dispatch(changeLoginStart(false));
    };

    const handleProfileClick = () => {
        dispatch(changeLoginStart(false));
        navigate("profile");
        document.body.style.overflow = "unset";
    };

    const onChangeCurrency = (e) => {
        setCurrencyValue(e?.value);
        localStorage.setItem("CURRENCY_TYPE", e?.value);
        dispatch({ type: SET_CURRENCY_TYPE_REQUEST, payload: { currencyType: e?.value } });
    };

    const renderAuthenticationModal = () => {
        return (
            <Modal visible={visibleAuthModal} onClose={onCloseAuthModal} heading={"Two-Step Authentication"} removeFooter={false}>
                <div>
                    <p style={{ fontSize: "16px" }} className="font-bold">
                        With <strong>Two-Step Authentication</strong>, you can add an extra layer of security to your account. Which is
                        useful in case your password is stolen. To enable <strong>Two-Step Authentication</strong>, go to the
                        <div className="text-primary" onClick={() => handleProfileClick()}>
                            <strong>
                                {" "}
                                <Icon.Link size="14" className="relative inline-block ml-1" /> profile
                            </strong>
                        </div>{" "}
                        page.
                    </p>

                    {userData?.data?.has_mobile_no_verified !== "1" && (
                        <>
                            <h2 className="text-lg mt-3 flex items-center">
                                <Icon.Smartphone className="inline-block mr-1" size="18" /> Mobile Number Verification
                            </h2>
                            <ul className="mt-2 list-decimal list-inside">
                                <li className="mt-2">
                                    To enable <strong>Two-Step Authentication</strong>, you need to verify your{" "}
                                    <strong>Mobile Number</strong> first.
                                </li>
                                <li className="mt-1">
                                    You'll get <strong>6 digit code (unique code)</strong> on your registered mobile number.
                                </li>
                                <li className="mt-1">
                                    After that, you can enable <strong>Two Step Authentication</strong> <br />
                                    <span className="text-danger">Note: </span>{" "}
                                    <em>
                                        Mobile Number Verification is a one time process only to enable{" "}
                                        <strong>Two Step Authentication</strong>
                                    </em>
                                    .
                                </li>
                            </ul>
                        </>
                    )}

                    <h2 className="text-lg mt-3 flex items-center">
                        <Icon.Lock className="inline-block mr-1" size="18" /> Two Step Authentication
                    </h2>
                    <ul className="mt-2 list-decimal list-inside">
                        <li className="mt-2">
                            After verifying <strong>Mobile Number</strong>, you will get the <strong>QR code</strong> in{" "}
                            <strong>profile</strong> page.
                        </li>
                        <li className="mt-1">
                            Download <strong>"Google Authenticator"</strong> app from
                            <a
                                rel="noreferrer"
                                className="text-primary"
                                href="https://play.google.com/store/search?q=google+authenticator&c=apps"
                                target="_blank">
                                <strong>
                                    {" "}
                                    <Icon.ExternalLink size="13" className="relative inline-block ml-1" /> Android Play Store
                                </strong>
                            </a>{" "}
                            or
                            <a
                                rel="noreferrer"
                                className="text-primary"
                                href="https://apps.apple.com/in/app/google-authenticator/id388497605"
                                target="_blank">
                                <strong>
                                    {" "}
                                    <Icon.ExternalLink size="13" className="relative inline-block ml-1" /> IOS App Store
                                </strong>
                            </a>
                            .
                        </li>
                        <li className="mt-1">
                            Scan the <strong>QR code</strong> from the <strong>profile</strong> page into your device using{" "}
                            <strong>"Google Authenticator"</strong> app. Scanning a QR code will give you{" "}
                            <strong>6 digit code (unique code)</strong>.
                        </li>
                        <li className="mt-1">
                            Enter the <strong>unique code</strong> into the <strong>profile</strong> page to enable{" "}
                            <strong>Two-Step Authentication</strong>.
                        </li>

                        <li className="mt-1">
                            Finally, enter the <strong>unique code</strong> provided by <strong>"Google Authenticator"</strong> app while
                            login.
                        </li>
                    </ul>
                </div>
            </Modal>
        );
    };

    return (
        <>
            {renderAuthenticationModal()}

            {/* BEGIN: Content */}
            <div className="content">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-5 mt-8 font-semibold text-[26px] dark:text-white">
                        Welcome to I2pay {userData?.data?.name || ""}
                    </div>
                    <div className="flex items-center">
                        <div className="border common-border-color h-[40px] mr-3 flex items-center px-3">
                            <Icon.RefreshCw color="#677793" size={17} />
                            <div className="text-gray-400 mx-2 font-medium">Refund:</div>
                            <div className="text-gray-600 font-medium">
                                {cardLoading ? (
                                    <PlaceholderLoading shape="rect" width={60} height={10} />
                                ) : (
                                    <>
                                    {decode(Currency?.find((item) => item?.value === currencyValue)?.symbol)}
                                    {widgetList?.transaction?.refund_transaction_total}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="md:w-32">
                            <Select
                                value={Currency?.find((item) => item?.value === currencyValue)}
                                styles={colourStyles}
                                style={{ boxShadow: "none" }}
                                options={Currency}
                                onChange={onChangeCurrency}
                                className="intro-x login__input form-control block shadow-none"
                                getOptionLabel={(e) => (
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span style={{ marginLeft: 5 }}>
                                            {decode(e.symbol)} ({e?.value})
                                        </span>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {applicationPercent < 100 && (
                    <div className="alert alert-dismissible show bg-primary text-white flex items-center mb-4" role="alert">
                        <span>
                            Your application is {Number(applicationPercent.toFixed(0)) <= 100 ? applicationPercent.toFixed(0) : 100}%
                            completed
                            {applicationPercent !== 100 ? (
                                <>
                                    , click{" "}
                                    <Link to="/merchant-register" className="underline">
                                        here
                                    </Link>{" "}
                                    to complete now.
                                </>
                            ) : null}
                        </span>
                    </div>
                )}

                <OverViewCard data={userData?.data} />

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="intro-y col-span-12 lg:col-span-8">
                        <TransactionBox title="Payment Transaction Count" minHeight={300}>
                            <TransactionCounts currencyValue={currencyValue} isLoading={cardLoading} />
                        </TransactionBox>
                    </div>
                    <div className="intro-y col-span-12 lg:col-span-4">
                        <div>
                            <TransactionBox
                                minHeight={85}
                                title="Online Store"
                                rightTitle="View All Store"
                                onClickRightTitle={() => {
                                    navigate("/store-front");
                                }}>
                                <OnlineStore isLoading={isLoadingTransactionStatus} />
                            </TransactionBox>
                        </div>
                        <div className="mt-4">
                            <TransactionBox
                                minHeight={85}
                                title="Connectors"
                                rightTitle="View All Connectorse"
                                onClickRightTitle={() => {
                                    navigate("/connector");
                                }}>
                                <ConnectorsCard currencyValue={currencyValue} />
                            </TransactionBox>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="intro-y col-span-12 sm:col-span-4">
                        <TransactionBox
                            height={420}
                            removeBottomPadding
                            removeFooterIcon
                            footerTitle="Connectors"
                            title="Connector Transactions"
                            // rightLayout={
                            //     <div>
                            //         <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center border border-slate-300 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 h-38">
                            //             <Icon.Calendar size={15} />
                            //         </div>
                            //         <DatePicker
                            //             selectsRange={true}
                            //             startDate={statusStartDate}
                            //             endDate={statusEndDate}
                            //             onChange={(update) => {
                            //                 onChangeStatusDate(update);
                            //             }}
                            //             isClearable={true}
                            //             className="form-control pl-12 text-[10px] w-[190px]"
                            //             dateFormat="dd/MM/yyyy"
                            //             placeholderText="Select Date"
                            //             maxDate={new Date()}
                            //         />
                            //     </div>
                            // }
                        >
                            {isLoadingConnectorTransaction ? (
                                <div className="flex justify-between items-end">
                                    <PlaceholderLoading shape="rect" width={30} height={400} />
                                    <PlaceholderLoading shape="rect" width={30} height={200} />
                                    <PlaceholderLoading shape="rect" width={30} height={50} />
                                    <PlaceholderLoading shape="rect" width={30} height={300} />
                                    <PlaceholderLoading shape="rect" width={30} height={150} />
                                    <PlaceholderLoading shape="rect" width={30} height={200} />
                                </div>
                            ) : state?.chart?.ConnectorTransaction?.length === 0 ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="intro-y col-span-12 flex items-center justify-center text-[#97A3B9] h-[57px]">
                                        No Transactions Found
                                    </div>
                                </div>
                            ) : (
                                <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                            )}
                        </TransactionBox>
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-4">
                        <TransactionBox
                            height={420}
                            // removeBottomPadding
                            removeFooterIcon
                            title="Transactions Status"
                            // rightLayout={
                            //     <div>
                            //         <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center border border-slate-300 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 h-38">
                            //             <Icon.Calendar size={15} />
                            //         </div>
                            //         <DatePicker
                            //             selectsRange={true}
                            //             startDate={statusStartDate}
                            //             endDate={statusEndDate}
                            //             onChange={(update) => {
                            //                 onChangeStatusDate(update);
                            //             }}
                            //             isClearable={true}
                            //             className="form-control pl-12 text-[10px] w-[190px]"
                            //             dateFormat="dd/MM/yyyy"
                            //             placeholderText="Select Date"
                            //             maxDate={new Date()}
                            //         />
                            //     </div>
                            // }
                            footerLayout={
                                isLoadingTransactionStatus ? (
                                    <div className="h-[55px] flex items-center px-4 border-t justify-between">
                                        <div className="flex items-center">
                                            <div className={`h-[8px] w-[15px] mr-2`}>
                                                <PlaceholderLoading shape="rect" width={15} height={8} />
                                            </div>
                                            <div className="text-[#677793] text-[11px]">
                                                <PlaceholderLoading shape="rect" width={30} height={8} />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className={`h-[8px] w-[15px] mr-2`}>
                                                <PlaceholderLoading shape="rect" width={15} height={8} />
                                            </div>
                                            <div className="text-[#677793] text-[11px]">
                                                <PlaceholderLoading shape="rect" width={30} height={8} />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className={`h-[8px] w-[15px] mr-2`}>
                                                <PlaceholderLoading shape="rect" width={15} height={8} />
                                            </div>
                                            <div className="text-[#677793] text-[11px]">
                                                <PlaceholderLoading shape="rect" width={30} height={8} />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className={`h-[8px] w-[15px] mr-2`}>
                                                <PlaceholderLoading shape="rect" width={15} height={8} />
                                            </div>
                                            <div className="text-[#677793] text-[11px]">
                                                <PlaceholderLoading shape="rect" width={30} height={8} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-[55px] flex items-center px-4 border-t justify-evenly">
                                        {state?.chart?.transactionStatus?.map((item) => {
                                            return (
                                                <div className="flex items-center">
                                                    <div className={`h-[8px] w-[15px] mr-2`} style={{ backgroundColor: item?.color }}></div>
                                                    <div className="text-[#677793] text-[11px]">{item?.name}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            }>
                            {isLoadingTransactionStatus ? (
                                <div className="flex justify-center items-center h-full">
                                    <PlaceholderLoading shape="circle" width={350} height={350} />
                                </div>
                            ) : state?.chart?.transactionStatus?.length === 0 ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="intro-y col-span-12 flex items-center justify-center text-[#97A3B9] h-[57px]">
                                        No Transactions Found
                                    </div>
                                </div>
                            ) : (
                                <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                            )}
                        </TransactionBox>
                    </div>
                    <div className="intro-y col-span-12 sm:col-span-4">
                        <TransactionBox
                            height={420}
                            removeBottomPadding
                            removeFooterIcon
                            footerTitle="Payment Method"
                            title="Payment Method Transactions"
                            // rightLayout={
                            //     <div>
                            //         <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center border border-slate-300 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 h-38">
                            //             <Icon.Calendar size={15} />
                            //         </div>
                            //         <DatePicker
                            //             selectsRange={true}
                            //             startDate={paymentMethodStartDate}
                            //             endDate={paymentMethodEndDate}
                            //             onChange={(update) => {
                            //                 onChangePaymentMethodDate(update);
                            //             }}
                            //             isClearable={true}
                            //             className="form-control pl-12 text-[10px] w-[190px]"
                            //             dateFormat="dd/MM/yyyy"
                            //             placeholderText="Select Date"
                            //             maxDate={new Date()}
                            //         />
                            //     </div>
                            // }
                        >
                            {isLoadingPaymentMethodTransaction ? (
                                <div className="flex justify-between items-end">
                                    <PlaceholderLoading shape="rect" width={30} height={400} />
                                    <PlaceholderLoading shape="rect" width={30} height={200} />
                                    <PlaceholderLoading shape="rect" width={30} height={50} />
                                    <PlaceholderLoading shape="rect" width={30} height={300} />
                                    <PlaceholderLoading shape="rect" width={30} height={150} />
                                    <PlaceholderLoading shape="rect" width={30} height={200} />
                                </div>
                            ) : state?.chart?.transactionStatus?.length === 0 ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="intro-y col-span-12 flex items-center justify-center text-[#97A3B9] h-[57px]">
                                        No Transactions Found
                                    </div>
                                </div>
                            ) : (
                                <HighchartsReact highcharts={Highcharts} options={barOptions} />
                            )}
                        </TransactionBox>
                    </div>
                </div>

                {/* <div className="intro-y mt-5">
                    <div className="overflow-x-auto scrollbar-hidden">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="intro-y col-span-12 sm:col-span-6">
                                <div className="intro-y flex flex-row items-center mt-8 mb-3">
                                    <h2 className="text-lg font-medium mr-auto">Transaction Status</h2>
                                    <>
                                        <div>
                                            <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 h-38">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-calendar w-4 h-4">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>{" "}
                                            </div>
                                            <DatePicker
                                                selectsRange={true}
                                                startDate={statusStartDate}
                                                endDate={statusEndDate}
                                                onChange={(update) => {
                                                    onChangeStatusDate(update);
                                                }}
                                                isClearable={true}
                                                className="form-control pl-12"
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Select Date"
                                                maxDate={new Date()}
                                            />
                                        </div>
                                    </>
                                </div>
                                {isLoadingTransactionStatus ? (
                                    <div className="h-[400px] box flex items-center justify-center">
                                        <MiniLoader
                                            isLoading={true}
                                            color="#1e3a8a"
                                            size={40}
                                            className="dark:text-white;"
                                            css={"border-width: 5px;"}
                                        />
                                    </div>
                                ) : state?.chart?.transactionStatus?.length === 0 ? (
                                    <div className="h-[400px] box flex items-center justify-center">
                                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">
                                            No Transactions Found
                                        </div>
                                    </div>
                                ) : (
                                    <div className="box">
                                        <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                                    </div>
                                )}
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-6">
                                <div className="intro-y flex flex-row items-center mt-8 mb-3">
                                    <h2 className="text-lg font-medium mr-auto">Connector Transaction</h2>

                                    <>
                                        <div>
                                            <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 h-38">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-calendar w-4 h-4">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>{" "}
                                            </div>
                                            <DatePicker
                                                selectsRange={true}
                                                startDate={connectorStartDate}
                                                endDate={connectorEndDate}
                                                onChange={(update) => {
                                                    onChangeConnectorDate(update);
                                                }}
                                                isClearable={true}
                                                className="form-control pl-12"
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Select Date"
                                                maxDate={new Date()}
                                            />
                                        </div>
                                    </>
                                </div>
                                {isLoadingConnectorTransaction ? (
                                    <div className="h-[400px] box flex items-center justify-center">
                                        <MiniLoader
                                            isLoading={true}
                                            color="#1e3a8a"
                                            size={40}
                                            className="dark:text-white;"
                                            css={"border-width: 5px;"}
                                        />
                                    </div>
                                ) : state?.chart?.connectorTransaction?.value?.length === 0 ? (
                                    <div className="h-[400px] box flex items-center justify-center">
                                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">
                                            No Transactions Found
                                        </div>
                                    </div>
                                ) : (
                                    <div className="box">
                                        <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                                    </div>
                                )}
                            </div>
                            <div className="intro-y col-span-12 sm:col-span-12">
                                <div className="intro-y flex flex-row items-center mt-8 mb-3">
                                    <h2 className="text-lg font-medium mr-auto">Payment Method Transaction</h2>

                                    <>
                                        <div>
                                            <div className="z-[1] absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400 h-38">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-calendar w-4 h-4">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>{" "}
                                            </div>
                                            <DatePicker
                                                selectsRange={true}
                                                startDate={paymentMethodStartDate}
                                                endDate={paymentMethodEndDate}
                                                onChange={(update) => {
                                                    onChangePaymentMethodDate(update);
                                                }}
                                                isClearable={true}
                                                className="form-control pl-12"
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Select Date"
                                                maxDate={new Date()}
                                            />
                                        </div>
                                    </>
                                </div>
                                {isLoadingPaymentMethodTransaction ? (
                                    <div className="h-[400px] box flex items-center justify-center">
                                        <MiniLoader
                                            isLoading={true}
                                            color="#1e3a8a"
                                            size={40}
                                            className="dark:text-white;"
                                            css={"border-width: 5px;"}
                                        />
                                    </div>
                                ) : visibleBarChart === false ? (
                                    <div className="h-[400px] box flex items-center justify-center">
                                        <div className="text-slate-500 text-lg mt-0.5 whitespace-nowrap text-center">
                                            No Transactions Found
                                        </div>
                                    </div>
                                ) : (
                                    <div className="box">
                                        <HighchartsReact highcharts={Highcharts} options={barOptions} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            {/* END: Content */}
        </>
    );
};

export default Dashboard;

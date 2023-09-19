import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from "./redux/store/index";
import PageRoutes from "./pages/index";
import AppLoader from "./components/common/Loader";
import Setting from "./components/common/Setting";
import { useEffect } from "react";
import { menuElementsType, menuItems } from "./utils/constants";
import { useLocation, useParams, matchPath } from "react-router-dom";
import Header from "./components/common/Header";
import MobileViewMenu from "./components/common/menu/MobileViewMenu";
import MainMenu from "./components/common/menu/index";
import { initializeApp } from "firebase/app";
import ApplicationRatesPopup from "./components/common/ApplicationRatesPopup";
import { equalTo, getDatabase, onValue, orderByChild, query, ref, remove, update } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
    changeApplicationStatus,
    changeConnectorStatus,
    changeKeyStatus,
    changeRateStatus,
    detailStart,
} from "./redux/actions/PersistActions";
import PopupNotification from "./components/common/notification";
import AdminNotification from "./components/common/AdminNotification";
import * as Icon from "react-feather";
import Footer from "./components/common/Footer";

const App = () => {
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);
    const [findIndex, setFindIndex] = React.useState(0);
    const [findSubIndex, setFindSubIndex] = React.useState(0);
    const [notificationList, setNotificationList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [globalNotificationData, setGlobalNotificationData] = React.useState([]);
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();

    let isLoggedIn = false;
    let isRateSent = "0";
    // let persistRoot = localStorage?.getItem("persist:root");
    const persistRoot = store.getState()?.persist;
    const { userData } = useSelector((state) => state.persist);

    if (persistRoot) {
        isLoggedIn = persistRoot?.isLoggedIn;
        isRateSent = persistRoot?.userData?.data?.is_rate_sent;
    }

    const onLocationChangeEffect = () => {
        let matchValue = "";
        const index = menuItems.findIndex((item) => {
            if (typeof item?.totalRoute === "object") {
                let flag = false;
                item?.totalRoute?.forEach((subItem) => {
                    const match = matchPath({ path: subItem }, location.pathname);

                    if (match && !flag) {
                        matchValue = match;
                        flag = true;
                    }
                });
                return flag;
            } else {
                return item.totalRoute?.includes(location.pathname);
            }
        });

        if (menuItems[index]?.type === menuElementsType.MULTI) {
            menuItems[index]?.subMenuItems?.map((subMenu, subMenuIndex) => {
                if (subMenu?.to === matchValue?.pathname) {
                    setFindSubIndex(subMenuIndex);
                }
            });
        }

        if (index !== -1) {
            setIsMenuVisible(true);
            setFindIndex(index);
            return;
        }
        setIsMenuVisible(false);
    };

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    useEffect(onLocationChangeEffect, [location, params]);
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    // useEffect(() => {
    //     // setInterval(function () {
    //     //     const notifications = [...notificationList];
    //     //     notifications.push(1);
    //     //     setNotificationList(notifications);
    //     // }, 2000);
    // }, []);

    // setInterval(function () {
    //     // const notifications = [...notificationList];
    //     // notifications.push(1);
    //     // setNotificationList(notifications);
    // }, 3000);

    try {
        onMessage(messaging, (payload) => {
            const toastProperties = {
                title: payload?.notification?.title,
                body: payload?.notification?.body,
                image: payload?.notification?.image,
                id: payload?.messageId,
            };
            setNotificationList([...notificationList, toastProperties]);

            // setTimeout(() => {
            //     setNotificationList(false);
            // }, 3000);
        });
    } catch (err) {
        console.log("Message received", { err });
    }

    useEffect(() => {
        window.ononline = (event) => {
            console.log("Back Online");
        };

        window.onoffline = (event) => {
            console.log("Connection Lost");
        };
    }, []);

    useEffect(() => {
        if (window?.location?.search?.includes("t=")) {
            setIsLoading(true);
            // dispatch(logoutUser());

            const token = window?.location?.search?.split("=")[1];

            // console.log(window.location);
            let finalToken = token;
            if (token?.split("/")) {
                finalToken = token?.split("/")[0];
            }

            const callback = () => {
                setIsLoading(false);
                // window.location.replace(`${window.location.origin}`);
                const nextURL = window.location.origin;
                const nextTitle = "My new page title";
                const nextState = { additionalInformation: "Updated the URL with JS" };

                // This will create a new entry in the browser's history, without reloading
                window.history.pushState(nextState, nextTitle, nextURL);
            };

            dispatch(detailStart(finalToken, callback));
        }
    }, []);

    const merchantId = store.getState()?.persist?.userData?.data?.id;

    const getData = async () => {
        const db = getDatabase();
        console.log({ merchantId });
        const q = query(ref(db, "merchant_detail"), orderByChild("merchant_id"), equalTo(merchantId));

        onValue(q, (snapshot) => {
            const data = [];
            snapshot.forEach(function (child) {
                data.push(child.val());
            });

            if (data?.[0]?.is_call_detail === "yes") {
                store.dispatch(detailStart(userData?.data?.token, () => {}));
            }
            console.log("Firebase Data In 1", { data });
            store.dispatch(changeApplicationStatus(data?.[0]));
            store.dispatch(changeRateStatus(data?.[0]));
            store.dispatch(changeConnectorStatus(data?.[0]));
            store.dispatch(changeKeyStatus(data?.[0]));
        });

        const merchantMessages = query(ref(db, "merchant_global_message"));
        onValue(merchantMessages, (snapshot) => {
            const data = [];
            snapshot.forEach(function (child) {
                if (JSON.parse(child.val().merchant_id)?.includes(merchantId)) {
                    data.push(child.val());
                }
            });
            setGlobalNotificationData(data);
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
            getData();
        }
    }, [isLoggedIn]);

    const onClickCloseMessage = (item) => {
        const db = getDatabase();
        const q = query(ref(db, "merchant_global_message"), orderByChild("id"), equalTo(item?.id));
        // console.log({q})

        onValue(q, async (snapshot) => {
            let data = {};
            snapshot.forEach(function (child) {
                data = child.val();
            });

            let merchantIdArray = JSON.parse(data?.merchant_id);
            const index = merchantIdArray?.indexOf(merchantId);
            if (index > -1) {
                // only splice array when item is found
                merchantIdArray.splice(index, 1); // 2nd parameter means remove one item only
            }

            if (merchantIdArray?.length > 0) {
                const postData = {
                    ...item,
                    merchant_id: JSON.stringify(merchantIdArray),
                };
                const updates = {};
                updates[`/merchant_global_message/${item?.id}`] = postData;

                await update(ref(db), updates);
            } else {
                await remove(ref(db, `/merchant_global_message/${item?.id}`));
            }
        });
    };

    return (
        <>
            {isLoading ? (
                <AppLoader isLoading={true} />
            ) : (
                <PersistGate loading={isLoading} persistor={persistor}>
                    {/* <div
                        className="toastify on toastify-center toastify-top max-w-[400px] w-full"
                        style={{ transform: notificationList ? "translate(0px, 0px)" : "", top: notificationList ? "15px" : "" }}>
                        <div id="notification-with-avatar-content" className="toastify-content flex">
                            {notificationList?.image && (
                                <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden mr-4">
                                    <img alt="Icewall Tailwind HTML Admin Template" src={notificationList?.image} />
                                </div>
                            )}

                            <div className="sm:mr-4">
                                <div className="font-medium">{notificationList?.title}</div>
                                <div className="text-slate-500 mt-1">{notificationList?.body}</div>
                            </div>
                            <a
                                onClick={() => {
                                    setNotificationList(false);
                                }}
                                data-dismiss="notification"
                                className="absolute top-0 bottom-0 right-0 flex items-center px-6 border-l border-slate-200/60 dark:border-darkmode-400 font-medium text-primary dark:text-slate-400">
                                Close
                            </a>
                        </div>
                    </div> */}

                    <PopupNotification toastList={notificationList} autoDelete={true} autoDeleteTime={2000} />

                    {isMenuVisible ? (
                        <>
                            {/* <div className="p-5"> */}
                            {isLoggedIn && <MobileViewMenu isMenuVisible={menuItems[findIndex].menu} />}
                            {isRateSent == 1 ? null : (
                                <Header
                                    active={findIndex + 1}
                                    activeSubMenu={findSubIndex}
                                    isMenuVisible={menuItems[findIndex]?.menu}
                                    isHeaderVisible={menuItems[findIndex]?.header}
                                    isAuthRequired={isLoggedIn ? menuItems[findIndex]?.isAuthRequired : false}></Header>
                            )}
                            {isLoggedIn && (
                                <div className="w-full z-[9999]">
                                    {globalNotificationData?.map((item, index) => {
                                        // console.log({ item });
                                        let messageType = "0";
                                        let borderColor = "";
                                        let bgColor = "";
                                        let icon = "";

                                        if (item?.type === "0") {
                                            messageType = "primary";
                                            borderColor = "#4B6C73";
                                            bgColor = "#E8F9FF";
                                            icon = <Icon.Info size={20} color={borderColor} className="text-white cursor-pointer mr-2" />;
                                        } else if (item?.type === "1") {
                                            messageType = "success";
                                            borderColor = "#4B7052";
                                            bgColor = "#E4FCE6";
                                            icon = (
                                                <Icon.CheckCircle
                                                    size={20}
                                                    color={borderColor}
                                                    className="text-white cursor-pointer mr-2"
                                                />
                                            );
                                        } else if (item?.type === "2") {
                                            messageType = "warning";
                                            borderColor = "#9A4C6C";
                                            bgColor = "#FFDFEE";
                                            icon = (
                                                <Icon.AlertOctagon
                                                    size={20}
                                                    color={borderColor}
                                                    className="text-white cursor-pointer mr-2"
                                                />
                                            );
                                        } else if (item?.type === "3") {
                                            messageType = "danger";
                                            borderColor = "#B12C1F";
                                            bgColor = "#FFE0DD";
                                            icon = (
                                                <Icon.AlertCircle
                                                    size={20}
                                                    color={borderColor}
                                                    className="text-white cursor-pointer mr-2"
                                                />
                                            );
                                        }

                                        return (
                                            <AdminNotification
                                                key={index}
                                                // isVisible
                                                borderColor={borderColor}
                                                bgColor={bgColor}
                                                type={messageType}
                                                icon={icon}
                                                message={item?.message}
                                                onClickCloseMessage={() => {
                                                    onClickCloseMessage(item);
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                            {isLoggedIn ? (
                                isRateSent == 1 ? (
                                    // <MainMenu active={false} isMenuVisible={menuItems[findIndex]?.menu}>
                                    <ApplicationRatesPopup visible={isRateSent == 1 ? true : false} />
                                ) : (
                                    <PageRoutes />
                                )
                            ) : (
                                // </MainMenu>
                                // <MainMenu
                                //     active={findIndex + 1}
                                //     activeSubMenu={findSubIndex}
                                //     isMenuVisible={menuItems[findIndex]?.menu}>
                                // <PageRoutes />
                                // </MainMenu>
                                <PageRoutes />
                            )}
                            {isLoggedIn && isRateSent == 1 ? null : <Footer />}
                            {/* </div> */}
                        </>
                    ) : (
                        <PageRoutes />
                    )}

                    <ToastContainer toastClassName="dark:bg-darkmode-800 dark:text-slate-500" />
                    {/* <Setting /> */}
                    <AppLoader />
                </PersistGate>
            )}
        </>
    );
};

export default App;

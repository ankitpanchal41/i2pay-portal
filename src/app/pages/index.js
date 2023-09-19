import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppLoader from "../components/common/Loader";
import { AuthRoute, PrivateRoute } from "../components/common/Route";
import Settings from "./Connector/Settings";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import {
    changeApplicationStatus,
    changeConnectorStatus,
    changeKeyStatus,
    changeRateStatus,
    detailStart,
} from "../redux/actions/PersistActions";
import ApiDoc from "./ApiDoc";
import ApiDocDetails from "./ApiDoc/ApiDocDetails";
import ThankYou from "../components/common/ThankYou";
import DirectDocumentApi from "./ApiDoc/DirectDocumentAPI";
import Notifications from "./Notifications";
import NotificationDetail from "./Notifications/Detail";
import PayButtonIntegration from "./ApiDoc/PayButtonIntegration";
import StoreIntegration from "./ApiDoc/StoreIntegration";
import InvoiceIntegration from "./ApiDoc/InvoiceIntegration";
import UploadAgreement from "../components/common/UploadAgreement";
import { equalTo, getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { store } from "../redux/store";
import PageNotFound from "../components/common/errors/404";
import TestTransactions from "./Transactions/testTransactions";
import RefundTransactions from "./Transactions/refundTransactions";
import StoreAPI from "./ApiDoc/StoreAPI";
import GetTransactionAPI from "./ApiDoc/GetTransactionAPI";
import ChargeBackTransactions from "./Transactions/chargeBackTransactions";
import SuspiciousTransactions from "./Transactions/suspiciousTransactions";
import RemoveSuspiciousTransactions from "./Transactions/removeSuspiciousTransactions";
import TwoFactorAuthentication from "./TwoFactorAuthentication";
import EmailCampaignIntegration from "./ApiDoc/EmailCampaignIntegration";
import SmsCampaignIntegration from "./ApiDoc/SmsCampaignIntegration";
import PaymentLinkIntegration from "./ApiDoc/PaymentLinkIntegration";
import PaymentPageIntegration from "./ApiDoc/PaymentPageIntegration";
import PaymentCardIntegration from "./ApiDoc/PaymentCardIntegration";
import WebhookIntegration from "./ApiDoc/WebhookIntegration";
import AutoPayoutReport from "./Payout/AutoPayoutReport";
import AutoPayoutPreview from "./Payout/AutoPayoutReport/Preview";
import DefaultPayoutReports from "./Payout/DefaultPayoutReports";
import DefaultPayoutReportsDetail from "./Payout/DefaultPayoutReports/detail";
import DefaultPayoutPreview from "./Payout/DefaultPayoutReports/preview";

const Dashboard = React.lazy(() => import("./Dashboard"));
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));
const VerifyOTP = React.lazy(() => import("./VerifyOTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const MerchantApplication = React.lazy(() => import("./MerchantApplication"));
const ChangePassword = React.lazy(() => import("./ChangePassword"));
const VerifyForgotPassword = React.lazy(() => import("./VerifyForgotPassword"));
const Connector = React.lazy(() => import("./Connector"));
const APIKey = React.lazy(() => import("./APIKey"));
const LiveTransaction = React.lazy(() => import("./Transactions"));
const WebhookList = React.lazy(() => import("./Webhook"));
const WebhookCreate = React.lazy(() => import("./Webhook/Create"));
const WebhookUpdate = React.lazy(() => import("./Webhook/Update"));
const WebhookView = React.lazy(() => import("./Webhook/View/WebhookView"));
const DefaultConnector = React.lazy(() => import("./Connector/defaultConnector"));
const SmsPaymentIntegration = React.lazy(() => import("./ApiDoc/SmsPaymentIntegration"));
const PaymentLink = React.lazy(() => import("./PaymentLinks/index"));
const PaymentLinkCreate = React.lazy(() => import("./PaymentLinks/Create"));
const PaymentLinkEdit = React.lazy(() => import("./PaymentLinks/Edit"));
const PrivacyPolicy = React.lazy(() => import("./PrivacyPolicy/index"));
const Rules = React.lazy(() => import("./Rules/Index"));
const CreateRules = React.lazy(() => import("./Rules/CreateRules"));
const EditRules = React.lazy(() => import("./Rules/EditRules"));
const IPWhiteList = React.lazy(() => import("./IPWhitelist"));
const IPWhiteListCreate = React.lazy(() => import("./IPWhitelist/Create"));
const IPWhiteListEdit = React.lazy(() => import("./IPWhitelist/Edit"));

const PageRoutes = () => {
    const dispatch = useDispatch();
    // const captchaRef = useRef();

    useEffect(() => {
        if (window?.location?.search?.includes("t=")) {
            // dispatch(logoutUser());

            const token = window?.location?.search?.split("=")[1];

            let finalToken = token;
            if (token?.split("/")) {
                finalToken = token?.split("/")[0];
            }

            dispatch(detailStart(finalToken));
        }
    }, []);

    const { userData, isLoggedIn } = useSelector((state) => state.persist);

    const merchantId = store.getState()?.persist?.userData?.data?.id;

    const getData = async () => {
        const db = getDatabase();

        const q = query(ref(db, "merchant_detail"), orderByChild("merchant_id"), equalTo(merchantId));

        onValue(q, (snapshot) => {
            const data = [];
            snapshot.forEach(function (child) {
                data.push(child.val());
            });
            console.log("Firebase Data In 3", { data });
            store.dispatch(changeApplicationStatus(data?.[0]));
            store.dispatch(changeRateStatus(data?.[0]));
            store.dispatch(changeConnectorStatus(data?.[0]));
            store.dispatch(changeKeyStatus(data?.[0]));
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
            getData();
        }
    }, [isLoggedIn]);

    return (
        <React.Suspense fallback={<AppLoader isLoading={true} />}>
            {/* <HashRouter> */}
            <Routes>
                {/* Auth Routes start */}
                <Route
                    path="/login"
                    element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    }
                    exact
                />
                <Route
                    path="/authenticate"
                    element={
                        <AuthRoute>
                            <TwoFactorAuthentication />
                        </AuthRoute>
                    }
                    exact
                />
                <Route
                    path="/register"
                    element={
                        <AuthRoute>
                            <Register />
                        </AuthRoute>
                    }
                    exact
                />
                <Route
                    path="/verify"
                    element={
                        <AuthRoute>
                            <VerifyOTP />
                        </AuthRoute>
                    }
                    exact
                />
                <Route
                    path="/forgot-password"
                    element={
                        <AuthRoute>
                            <ForgotPassword />
                        </AuthRoute>
                    }
                    exact
                />
                <Route
                    path="/reset-password"
                    element={
                        <AuthRoute>
                            <VerifyForgotPassword />
                        </AuthRoute>
                    }
                    exact
                />
                {/* Auth Routes end */}

                <Route path="/change-password" element={<ChangePassword />} exact />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} exact />
                <Route path="/terms-and-conditions" element={<Login />} exact />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/live-transactions"
                    element={
                        <PrivateRoute>
                            <LiveTransaction />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/test-transactions"
                    element={
                        <PrivateRoute>
                            <TestTransactions />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/merchant-register"
                    element={
                        <PrivateRoute>
                            <MerchantApplication />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/connector"
                    element={
                        <PrivateRoute>
                            <Connector />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/connector/:connector/settings"
                    element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/default-connector"
                    element={
                        <PrivateRoute>
                            <DefaultConnector />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                    exact
                />

                {/* <Route
                    path="/settings"
                    element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    }
                    exact
                /> */}
                <Route path="/api-document" element={<ApiDoc />} exact />
                <Route path="/api-document/:id" element={<ApiDocDetails />} exact />
                <Route path="/direct-document-api" element={<DirectDocumentApi />} exact />
                <Route path="/store-api" element={<StoreAPI />} exact />
                <Route path="/get-transaction-api" element={<GetTransactionAPI />} exact />
                <Route path="/paybutton-integration" element={<PayButtonIntegration />} exact />
                <Route path="/store-integration" element={<StoreIntegration />} exact />
                <Route path="/invoice-integration" element={<InvoiceIntegration />} exact />
                <Route path="/sms-payment-integration" element={<SmsPaymentIntegration />} exact />
                <Route path="/email-campaign-integration" element={<EmailCampaignIntegration />} exact />
                <Route path="/sms-campaign-integration" element={<SmsCampaignIntegration />} exact />
                <Route path="/payment-link-integration" element={<PaymentLinkIntegration />} exact />
                <Route path="/payment-page-integration" element={<PaymentPageIntegration />} exact />
                <Route path="/payment-card-integration" element={<PaymentCardIntegration />} exact />
                <Route path="/webhook-integration" element={<WebhookIntegration />} exact />

                {/*<Route path="/direct-document-api" element={<DirectDocumentApi />} exact />*/}

                {/*<Route path="*" element={<Navigate to="/login" element={<p>test</p>} />} />*/}
                <Route path="*" element={<PageNotFound />} />

                <Route path="/thank-you" element={<ThankYou />} exact />
                <Route path="/agreement-documents-upload" element={<UploadAgreement />} exact />

                <Route
                    path="/notifications"
                    element={
                        <PrivateRoute>
                            <Notifications />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path={"/notification/detail/:notificationId"}
                    element={
                        <PrivateRoute>
                            <NotificationDetail />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/api-key"
                    element={
                        <PrivateRoute>
                            <APIKey />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/refund-transactions"
                    element={
                        <PrivateRoute>
                            <RefundTransactions />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/chargeback-transactions"
                    element={
                        <PrivateRoute>
                            <ChargeBackTransactions />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/suspicious-transactions"
                    element={
                        <PrivateRoute>
                            <SuspiciousTransactions />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/remove-suspicious-transactions"
                    element={
                        <PrivateRoute>
                            <RemoveSuspiciousTransactions />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/payment-links"
                    element={
                        <PrivateRoute>
                            <PaymentLink />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/payment-links/create"
                    element={
                        <PrivateRoute>
                            <PaymentLinkCreate />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/payment-links/edit/:payment_link_id"
                    element={
                        <PrivateRoute>
                            <PaymentLinkEdit />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/webhook"
                    element={
                        <PrivateRoute>
                            <WebhookList />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/webhook/create"
                    element={
                        <PrivateRoute>
                            <WebhookCreate />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/webhook/update/:webhookId"
                    element={
                        <PrivateRoute>
                            <WebhookUpdate />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/webhook/view/:webhookId"
                    element={
                        <PrivateRoute>
                            <WebhookView />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/auto-payout-report"
                    element={
                        <PrivateRoute>
                            <AutoPayoutReport />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/auto-payout-report/:payoutId"
                    element={
                        <PrivateRoute>
                            <AutoPayoutPreview />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/default-payout-report"
                    element={
                        <PrivateRoute>
                            <DefaultPayoutReports />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/default-payout-report/:connectorId"
                    element={
                        <PrivateRoute>
                            <DefaultPayoutReportsDetail />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/default-payout-preview/:connectorId/:settlementId"
                    element={
                        <PrivateRoute>
                            <DefaultPayoutPreview />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/ip-whitelist"
                    element={
                        <PrivateRoute>
                            <IPWhiteList />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/ip-whitelist/create"
                    element={
                        <PrivateRoute>
                            <IPWhiteListCreate />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/ip-whitelist/:ipWhitelistId/edit"
                    element={
                        <PrivateRoute>
                            <IPWhiteListEdit />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/rules"
                    element={
                        <PrivateRoute>
                            <Rules />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/rules/create"
                    element={
                        <PrivateRoute>
                            <CreateRules />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/rules/edit/:rulesId"
                    element={
                        <PrivateRoute>
                            <EditRules />
                        </PrivateRoute>
                    }
                    exact
                />
            </Routes>
            {/* </HashRouter> */}
            {/* {!userData?.data?.token && <ThemeSwitch />} */}
            {/* {!userData?.data?.token && <Setting />} */}
        </React.Suspense>
    );
};

export default PageRoutes;

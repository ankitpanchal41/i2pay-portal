import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AppLoader from "../components/common/Loader";
import { AuthRoute, PrivateRoute } from "../components/common/Route";
import Invoice from "./Invoice";
import InvoiceDetail from "./Invoice/Detail";
import AddInvoice from "./Invoice/AddInvoice";
import EditInvoice from "./Invoice/EditInvoice";
import Settings from "./Connector/Settings";
import IPWhiteList from "./IPWhitelist";
import IPWhiteListCreate from "./IPWhitelist/Create";
import PayButton from "./PayButton";
import EditProduct from "./Products/EditProduct";
import Profile from "./Profile";
import Orders from "./Orders";
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
import ThemeSwitch from "../components/common/ThemeSwitch";
import Setting from "../components/common/Setting";
import ThankYou from "../components/common/ThankYou";
import DirectDocumentApi from "./ApiDoc/DirectDocumentAPI";
import Notifications from "./Notifications";
import NotificationDetail from "./Notifications/Detail";
import PayButtonIntegration from "./ApiDoc/PayButtonIntegration";
import StoreIntegration from "./ApiDoc/StoreIntegration";
import InvoiceIntegration from "./ApiDoc/InvoiceIntegration";
import SmsTemplateList from "./SmsTemplate";
import SmsTemplateCreate from "./SmsTemplate/Create";
import SmsTemplateEdit from "./SmsTemplate/Edit";
import UploadAgreement from "../components/common/UploadAgreement";
import { equalTo, getDatabase, onValue, orderByChild, query, ref } from "firebase/database";

import { store } from "../redux/store";
import IPWhiteListEdit from "./IPWhitelist/Edit";
import PageNotFound from "../components/common/errors/404";
import TestTransactions from "./Transactions/testTransactions";
import RefundTransactions from "./Transactions/refundTransactions";
import StoreAPI from "./ApiDoc/StoreAPI";
import GetTransactionAPI from "./ApiDoc/GetTransactionAPI";
import ChargeBackTransactions from "./Transactions/chargeBackTransactions";
import SuspiciousTransactions from "./Transactions/suspiciousTransactions";
import RemoveSuspiciousTransactions from "./Transactions/removeSuspiciousTransactions";
import RemoveRetrievalTransactions from "./Transactions/removeRetrievalTransactionsTransactions";
import RetrievalTransactions from "./Transactions/retrievalTransactionsTransactions";
import TwoFactorAuthentication from "./TwoFactorAuthentication";
import SmsPaymentIntegration from "./ApiDoc/SmsPaymentIntegration";
import EmailCampaignsPreview from "./EmailCampaigns/preview";
import ContactsPreview from "./Contacts/preview";
import SmsCampaignsPreview from "./SmsCampaigns/preview";
import PaymentLink from "./PaymentLinks";
import PaymentLinkCreate from "./PaymentLinks/Create";
import PaymentLinkEdit from "./PaymentLinks/Edit";
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
import Payout from "./Payout/AutoPayoutReport/payout";
import ReTryPayout from "./Payout/AutoPayoutReport/reTryPayout";
import Vendors from "./Connector/vendors";

const Dashboard = React.lazy(() => import("./Dashboard"));
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));
const VerifyOTP = React.lazy(() => import("./VerifyOTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const MerchantApplication = React.lazy(() => import("./MerchantApplication"));
const ChangePassword = React.lazy(() => import("./ChangePassword"));
const VerifyForgotPassword = React.lazy(() => import("./VerifyForgotPassword"));
const Connector = React.lazy(() => import("./Connector"));
const PayButtonList = React.lazy(() => import("./PayButton/PayButtonList"));
const StoreFront = React.lazy(() => import("./StoreFront"));
const CreateStore = React.lazy(() => import("./StoreFront/CreateStore"));
const Products = React.lazy(() => import("./Products"));
const CreateProduct = React.lazy(() => import("./Products/CreateProduct"));
const Rules = React.lazy(() => import("./Rules/Index"));
const CreateRules = React.lazy(() => import("./Rules/CreateRules"));
const EditRules = React.lazy(() => import("./Rules/EditRules"));
const APIKey = React.lazy(() => import("./APIKey"));
const Transactions = React.lazy(() => import("./Transactions/transactions"));
const LiveTransaction = React.lazy(() => import("./Transactions"));
const Contacts = React.lazy(() => import("./Contacts"));
const CreateContact = React.lazy(() => import("./Contacts/create"));
const UpdateContact = React.lazy(() => import("./Contacts/update"));
const EmailCampaigns = React.lazy(() => import("./EmailCampaigns"));
const CreateEmailCampaign = React.lazy(() => import("./EmailCampaigns/Create"));
const UpdateEmailCampaign = React.lazy(() => import("./EmailCampaigns/Update"));
const SmsCampaigns = React.lazy(() => import("./SmsCampaigns"));
const UpdateSmsCampaigns = React.lazy(() => import("./SmsCampaigns/Update"));
const CreateSmsCampaign = React.lazy(() => import("./SmsCampaigns/Create"));
const EmailTemplateCreateEditor = React.lazy(() => import("./EmailCampaigns/Create/EmailTemplateEdit"));
const EmailTemplateCreate = React.lazy(() => import("./EmailCampaigns/Create/EmailTemplate"));
const EmailTemplateUpdateEditor = React.lazy(() => import("./EmailCampaigns/Update/EmailTemplateEdit"));
const EmailTemplateUpdate = React.lazy(() => import("./EmailCampaigns/Update/EmailTemplate"));
const PaymentPage = React.lazy(() => import("./PaymentPage/index"));
const PaymentPageCreate = React.lazy(() => import("./PaymentPage/Create"));
const PaymentPageUpdate = React.lazy(() => import("./PaymentPage/Update"));
const UserPaymentPage = React.lazy(() => import("./PaymentPage/UserPaymentPage"));
const WebhookList = React.lazy(() => import("./Webhook"));
const WebhookCreate = React.lazy(() => import("./Webhook/Create"));
const WebhookUpdate = React.lazy(() => import("./Webhook/Update"));
const WebhookView = React.lazy(() => import("./Webhook/View/WebhookView"));
const PaymentCard = React.lazy(() => import("./PaymentCard"));
const PaymentCardCreate = React.lazy(() => import("./PaymentCard/Create"));
const PaymentCardEdit = React.lazy(() => import("./PaymentCard/Edit"));
const PaymentCardPreview = React.lazy(() => import("./PaymentCard/PaymentCardPreview"));
const PreviewProduct = React.lazy(() => import("./Products/preview"));
const Categories = React.lazy(() => import("./Products/Categories"));
const Blogs = React.lazy(() => import("./Blogs"));
const CreateBlog = React.lazy(() => import("./Blogs/create"));
const UpdateBlog = React.lazy(() => import("./Blogs/update"));
const CollectionBanner = React.lazy(() => import("./CollectionBanner"));
const CreateCollectionBanner = React.lazy(() => import("./CollectionBanner/create"));
const UpdateCollectionBanner = React.lazy(() => import("./CollectionBanner/update"));
const DefaultConnector = React.lazy(() => import("./Connector/defaultConnector"));
const PrivacyPolicy = React.lazy(() => import("./PrivacyPolicy"));

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
            // console.log("Firebase Data In 3", { data });
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
                    path="/transactions"
                    element={
                        <PrivateRoute>
                            <Transactions />
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
                    path="/pay-button-list"
                    element={
                        <PrivateRoute>
                            <PayButtonList />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/pay-button/add"
                    element={
                        <PrivateRoute>
                            <PayButton />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/pay-button/edit/:id"
                    element={
                        <PrivateRoute>
                            <PayButton />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/invoice"
                    element={
                        <PrivateRoute>
                            <Invoice />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/invoice/detail/:invoice_id"
                    element={
                        <PrivateRoute>
                            <InvoiceDetail />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/invoice/add"
                    element={
                        <PrivateRoute>
                            <AddInvoice />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/invoice/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditInvoice />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/store-front"
                    element={
                        <PrivateRoute>
                            <StoreFront />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/create-store"
                    element={
                        <PrivateRoute>
                            <CreateStore />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/store/edit/:id"
                    element={
                        <PrivateRoute>
                            <CreateStore />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/products/:storeId"
                    element={
                        <PrivateRoute>
                            <Products />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/:storeId/create-product"
                    element={
                        <PrivateRoute>
                            <CreateProduct />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/:storeId/edit-product/:productId"
                    element={
                        <PrivateRoute>
                            <EditProduct />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/:storeId/preview-product/:productId"
                    element={
                        <PrivateRoute>
                            <PreviewProduct />
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
                    path="/sms-payment"
                    element={
                        <PrivateRoute>
                            <SmsTemplateList />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/sms-payment/create"
                    element={
                        <PrivateRoute>
                            <SmsTemplateCreate />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/sms-payment/edit/:merchant_template_id"
                    element={
                        <PrivateRoute>
                            <SmsTemplateEdit />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/orders"
                    element={
                        <PrivateRoute>
                            <Orders />
                        </PrivateRoute>
                    }
                    exact
                />
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
                    path="/retrieval-transactions"
                    element={
                        <PrivateRoute>
                            <RetrievalTransactions />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/remove-retrieval-transactions"
                    element={
                        <PrivateRoute>
                            <RemoveRetrievalTransactions />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/contact"
                    element={
                        <PrivateRoute>
                            <Contacts />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/contact/create"
                    element={
                        <PrivateRoute>
                            <CreateContact />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/contact/update/:contactId"
                    element={
                        <PrivateRoute>
                            <UpdateContact />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/contact/preview/:contactId"
                    element={
                        <PrivateRoute>
                            <ContactsPreview />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/email-campaigns"
                    element={
                        <PrivateRoute>
                            <EmailCampaigns />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/email-campaigns/create"
                    element={
                        <PrivateRoute>
                            <CreateEmailCampaign />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/email-campaigns/create/:emailCampaignId"
                    element={
                        <PrivateRoute>
                            <CreateEmailCampaign />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/email-campaigns/update/:emailCampaignId"
                    element={
                        <PrivateRoute>
                            <UpdateEmailCampaign />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/email-campaigns/preview/:emailCampaignId"
                    element={
                        <PrivateRoute>
                            <EmailCampaignsPreview />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/sms-campaigns"
                    element={
                        <PrivateRoute>
                            <SmsCampaigns />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/sms-campaigns/update/:smsCampaignId"
                    element={
                        <PrivateRoute>
                            <UpdateSmsCampaigns />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/sms-campaigns/preview/:smsCampaignId"
                    element={
                        <PrivateRoute>
                            <SmsCampaignsPreview />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/sms-campaigns/create"
                    element={
                        <PrivateRoute>
                            <CreateSmsCampaign />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/email-template/create/:campaignId"
                    element={
                        <PrivateRoute>
                            <EmailTemplateCreate />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/email-template/create/:campaignId/editor/:templateId"
                    element={
                        <PrivateRoute>
                            <EmailTemplateCreateEditor />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/email-template/update/:campaignId"
                    element={
                        <PrivateRoute>
                            <EmailTemplateUpdate />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/email-template/update/editor/:campaignId"
                    element={
                        <PrivateRoute>
                            <EmailTemplateUpdateEditor />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/email-template/update/:campaignId/editor/:templateId"
                    element={
                        <PrivateRoute>
                            <EmailTemplateUpdateEditor />
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
                    path="/payment-page"
                    element={
                        <PrivateRoute>
                            <PaymentPage />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/payment-page/create/:pageId"
                    element={
                        <PrivateRoute>
                            <PaymentPageCreate />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/payment-page/update/:paymentPageId/:pageId"
                    element={
                        <PrivateRoute>
                            <PaymentPageUpdate />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/payment-page/update/:paymentPageId"
                    element={
                        <PrivateRoute>
                            <PaymentPageUpdate />
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
                    path="/payment-card"
                    element={
                        <PrivateRoute>
                            <PaymentCard />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/payment-card/create"
                    element={
                        <PrivateRoute>
                            <PaymentCardCreate />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/payment-card/update/:paymentCardId"
                    element={
                        <PrivateRoute>
                            <PaymentCardEdit />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route path="/payment/page/:id" element={<UserPaymentPage />} exact />
                <Route
                    path="/:storeId/categories"
                    element={
                        <PrivateRoute>
                            <Categories />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/blogs/:storeId"
                    element={
                        <PrivateRoute>
                            <Blogs />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/:storeId/create-blog"
                    element={
                        <PrivateRoute>
                            <CreateBlog />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/:storeId/edit-blog/:blogId"
                    element={
                        <PrivateRoute>
                            <UpdateBlog />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/collection-banner/:storeId"
                    element={
                        <PrivateRoute>
                            <CollectionBanner />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/:storeId/create-collection-banner"
                    element={
                        <PrivateRoute>
                            <CreateCollectionBanner />
                        </PrivateRoute>
                    }
                    exact
                />

                <Route
                    path="/:storeId/edit-collection-banner/:collectionBannerId"
                    element={
                        <PrivateRoute>
                            <UpdateCollectionBanner />
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
                    path="/auto-payout-generate/:payoutId"
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
                    path="/payout/:payoutId"
                    element={
                        <PrivateRoute>
                            <Payout />
                        </PrivateRoute>
                    }
                    exact
                />
                <Route
                    path="/retry-payout/:payoutId"
                    element={
                        <PrivateRoute>
                            <ReTryPayout />
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
                    path="/vendors"
                    element={
                        <PrivateRoute>
                            <Vendors />
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

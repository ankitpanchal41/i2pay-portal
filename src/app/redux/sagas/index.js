import { all } from "redux-saga/effects";
import ConnectorSaga from "./Connector";
import AuthSaga from "./AuthSaga";
import PersistSaga from "./PersistSaga";
import ApplicationSaga from "./ApplicationSaga";
import MenuSaga from "./MenuSaga";
import StoreFront from "./StoreFront";
import Product from "./Product";
import PayButton from "./PayButton";
import IPWhiteList from "./IPWhiteList";
import TransactionsSaga from "./TransactionsSaga";
import Profile from "./Profile";
import Invoice from "./Invoice";
import RulesSaga from "./RulesSaga";
import APIKey from "./APIKey";
import OrderSaga from "./OrderSaga";
import Agreement from "./Agreement";
import SmsTemplate from "./SmsTemplate";
import MerchantApplicationRatesSaga from "./MerchantApplicationRatesSaga";
import Notification from "./Notification";
import ChatSaga from "./ChatSaga";
import DashboardSaga from "./Dashboard";
import Contacts from "./Contact";
import EmailCampaign from "./EmailCampaign";
import EmailCampaignSentHistory from "./EmailCampaignSentHistory";
import SmsCampaignSentHistory from "./SmsCampaignSentHistory";
import SmsCampaign from "./SmsCampaign";
import PaymentLink from "./PaymentLink";
import PaymentPage from "./PaymentPage";
import Webhook from "./Webhook";
import PaymentCard from "./PaymentCard";
import ProductCategory from "./ProductCategory";
import Blogs from "./Blogs";
import CollectionBanner from "./CollectionBanner";
import AutoPayoutReports from "./AutoPayoutReports";

export default function* rootSaga() {
    yield all([
        AuthSaga(),
        PersistSaga(),
        ApplicationSaga(),
        ConnectorSaga(),
        MenuSaga(),
        StoreFront(),
        Product(),
        PayButton(),
        IPWhiteList(),
        Profile(),
        Invoice(),
        RulesSaga(),
        APIKey(),
        OrderSaga(),
        TransactionsSaga(),
        Agreement(),
        SmsTemplate(),
        MerchantApplicationRatesSaga(),
        Notification(),
        ChatSaga(),
        DashboardSaga(),
        Contacts(),
        EmailCampaignSentHistory(),
        SmsCampaignSentHistory(),
        EmailCampaign(),
        SmsCampaign(),
        PaymentLink(),
        PaymentPage(),
        Webhook(),
        PaymentCard(),
        ProductCategory(),
        Blogs(),
        CollectionBanner(),
        AutoPayoutReports(),
    ]);
}

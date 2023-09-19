import { all } from "redux-saga/effects";
import ConnectorSaga from "./Connector";
import AuthSaga from "./AuthSaga";
import PersistSaga from "./PersistSaga";
import ApplicationSaga from "./ApplicationSaga";
import MenuSaga from "./MenuSaga";
import IPWhiteList from "./IPWhiteList";
import TransactionsSaga from "./TransactionsSaga";
import Profile from "./Profile";
import RulesSaga from "./RulesSaga";
import APIKey from "./APIKey";
import Agreement from "./Agreement";
import MerchantApplicationRatesSaga from "./MerchantApplicationRatesSaga";
import Notification from "./Notification";
import ChatSaga from "./ChatSaga";
import DashboardSaga from "./Dashboard";
import PaymentLink from "./PaymentLink";
import Webhook from "./Webhook";
import AutoPayoutReports from "./AutoPayoutReports";

export default function* rootSaga() {
    yield all([
        AuthSaga(),
        PersistSaga(),
        ApplicationSaga(),
        ConnectorSaga(),
        MenuSaga(),
        IPWhiteList(),
        Profile(),
        RulesSaga(),
        APIKey(),
        TransactionsSaga(),
        Agreement(),
        MerchantApplicationRatesSaga(),
        Notification(),
        ChatSaga(),
        DashboardSaga(),
        PaymentLink(),
        Webhook(),
        AutoPayoutReports(),
    ]);
}

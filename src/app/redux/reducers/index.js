import { combineReducers } from "redux";
import AuthReducer from "./Auth/index";
import PersistReducer from "./PersistReducer/index";
import LoaderReducer from "./Loader";
import BreadcrumbData from "./Breadcrumb/index";
import ApplicationReducer from "./Application";
import ConnectorReducer from "./Connector/index";
import MenuReducer from "./Menu/index";
import IPWhiteListReducer from "./IPWhitelist";
import RulesReducer from "./Rules";
import APIKeyReducer from "./APIKey";
import AgreementReducer from "./Agreement";
import MerchantApplicationRatesReducer from "./MerchantApplicationRates";
import NotificationReducer from "./Notification";
import ChartReducer from "./Chart";
import TransactionRefundReducer from "./Transactions/transactionRefund";
import TransactionTetsReducer from "./Transactions/transactionTest";
import TransactionChargeBackReducer from "./Transactions/transactionChargeBack";
import TransactionSuspiciousReducer from "./Transactions/transactionSuspicious";
import TransactionRemoveSuspiciousReducer from "./Transactions/transactionRemoveSuspicious";
import DashboardReducer from "./Dashboard";
import PaymentLinkReducer from "./PaymentLink";
import WebhookReducer from "./Webhook";
import TransactionsLiveReducer from "./Transactions";
import AutoPayoutReports from "./AutoPayoutReports";

// list all reducers
const reducers = {
    auth: AuthReducer,
    persist: PersistReducer,
    loader: LoaderReducer,
    breadcrumb: BreadcrumbData,
    application: ApplicationReducer,
    connector: ConnectorReducer,
    menu_type: MenuReducer,
    ipWhitelist: IPWhiteListReducer,
    rules: RulesReducer,
    transactionsTest: TransactionTetsReducer,
    transactionsLive: TransactionsLiveReducer,
    transactionsRefund: TransactionRefundReducer,
    transactionsChargeBack: TransactionChargeBackReducer,
    transactionsSuspicious: TransactionSuspiciousReducer,
    transactionsRemoveSuspicious: TransactionRemoveSuspiciousReducer,
    apiKey: APIKeyReducer,
    agreement: AgreementReducer,
    rates: MerchantApplicationRatesReducer,
    notifications: NotificationReducer,
    chart: ChartReducer,
    dashboard: DashboardReducer,
    paymentLink: PaymentLinkReducer,
    webhook: WebhookReducer,
    autoPayoutReports: AutoPayoutReports,
};

export default combineReducers(reducers);

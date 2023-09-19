import { combineReducers } from "redux";

import AuthReducer from "./Auth/index";
import PersistReducer from "./PersistReducer/index";
import LoaderReducer from "./Loader";
import BreadcrumbData from "./Breadcrumb/index";
import ApplicationReducer from "./Application";
import ConnectorReducer from "./Connector/index";
import MenuReducer from "./Menu/index";
import ProductReducer from "./Product/index";
import StoreFrontCountReducer from "./StoreFrontStore";
import PayButtonReducer from "./PayButton/index";
import IPWhiteListReducer from "./IPWhitelist";
import Invoice from "./Invoice";
import SmsTemplate from "./SmsTemplate";
import RulesReducer from "./Rules";
import APIKeyReducer from "./APIKey";
import OrderReducer from "./Order";
import TransactionsReducer from "./Transactions/transactions";
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
import TransactionRetrievalReducer from "./Transactions/transactionRetrieval";
import TransactionRemoveRetrievalReducer from "./Transactions/transactionRemoveRetrieval";
import ContactReducer from "./Contact";
import EmailCampaignReducer from "./EmailCampaign";
import SmsCampaignReducer from "./SmsCampaign";
import EmailCampaignSentHistoryReducer from "./EmailCampaignSentHistory";
import SmsCampaignSentHistoryReducer from "./SmsCampaignSentHistory";
import PaymentLinkReducer from "./PaymentLink";
import PaymentPageReducer from "./PaymentPage";
import WebhookReducer from "./Webhook";
import PaymentCardReducer from "./PaymentCard";
import TransactionsLiveReducer from "./Transactions";
import ProductCategoryReducer from "./ProductCategory";
import BlogReducer from "./Blogs";
import CollectionBanner from "./CollectionBanner";
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
    product: ProductReducer,
    storeFrontStep: StoreFrontCountReducer,
    payButton: PayButtonReducer,
    ipWhitelist: IPWhiteListReducer,
    invoice: Invoice,
    sms: SmsTemplate,
    rules: RulesReducer,
    transactions: TransactionsReducer,
    transactionsTest: TransactionTetsReducer,
    transactionsLive: TransactionsLiveReducer,
    transactionsRefund: TransactionRefundReducer,
    transactionsChargeBack: TransactionChargeBackReducer,
    transactionsSuspicious: TransactionSuspiciousReducer,
    transactionsRemoveSuspicious: TransactionRemoveSuspiciousReducer,
    transactionRetrieval: TransactionRetrievalReducer,
    transactionRemoveRetrieval: TransactionRemoveRetrievalReducer,
    apiKey: APIKeyReducer,
    order: OrderReducer,
    agreement: AgreementReducer,
    rates: MerchantApplicationRatesReducer,
    notifications: NotificationReducer,
    chart: ChartReducer,
    dashboard: DashboardReducer,
    contact: ContactReducer,
    emailCampaignSentHistory: EmailCampaignSentHistoryReducer,
    smsCampaignSentHistory: SmsCampaignSentHistoryReducer,
    emailCampaign: EmailCampaignReducer,
    smsCampaign: SmsCampaignReducer,
    paymentLink: PaymentLinkReducer,
    paymentPage: PaymentPageReducer,
    webhook: WebhookReducer,
    paymentCard: PaymentCardReducer,
    productCategory: ProductCategoryReducer,
    blogs: BlogReducer,
    collectionBanners: CollectionBanner,
    autoPayoutReports: AutoPayoutReports,
};

export default combineReducers(reducers);

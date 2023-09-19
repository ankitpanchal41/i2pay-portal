const merchantRoutes = "merchant/merchant";
// const api = "api";

// const authenticatorApi = "https://www.authenticatorApi.com";

export const apiRoutes = {
    merchantRegister: `${merchantRoutes}/register`,
    merchantSendOTP: `${merchantRoutes}/send/otp`,
    merchantLogin: `${merchantRoutes}/login`,
    merchantDetail: `${merchantRoutes}/detail`,
    merchantLoginNew: { url: `${merchantRoutes}/login`, method: "POST" },
    applicationStep: (stepNumber) => `${merchantRoutes}/application/step-${stepNumber}`,
    uniqueValidation: `${merchantRoutes}/login/validation`,
    enableMultipleConnector: `${merchantRoutes}/profile/on-off-multi-connector`,
    removeLimitConnector: `${merchantRoutes}/connector/settings/remove`,
    changePassword: `${merchantRoutes}/change/password`,
    forgotPassword: `${merchantRoutes}/forgot-password`,
    verifyPasswordToken: `${merchantRoutes}/forgot-password/verify`,
    updatePassword: `${merchantRoutes}/forgot-password/update-password`,
    captchaVerify: { url: `merchant/captcha/verify`, method: "POST" },
    getApplicationStep: { url: `${merchantRoutes}/application/get`, method: "POST" },
    editApplicationStep: (stepNumber) => ({ url: `${merchantRoutes}/update/application/step-${stepNumber}`, method: "POST" }),
    getConnector: `${merchantRoutes}/connectors/get`,
    getEnabledConnector: `${merchantRoutes}/whitelisted-ip/active-connetors`,
    getConnectorSettings: `${merchantRoutes}/get/connector/settings`,
    updateConnector: `${merchantRoutes}/merchant-connector/update`,
    updateConnectorSettings: `${merchantRoutes}/connector/settings`,
    updateConnectorMode: `${merchantRoutes}/merchant-connector/mode/update`,
    getConnectorType: `${merchantRoutes}/merchant-connector/get/type`,
    getDefaultConnector: `${merchantRoutes}/merchant-connector/default/mid`,
    setDefaultConnector: `${merchantRoutes}/merchant-connector/default/mid/store`,
    getRules: `${merchantRoutes}/get/rules`,
    getRulesDetail: `${merchantRoutes}/rules/details`,
    updateRules: `${merchantRoutes}/update/rules`,
    updateRulesPriority: `${merchantRoutes}/update/rules/priority`,
    createRules: `${merchantRoutes}/create/rules`,
    deleteRules: `${merchantRoutes}/delete/rules`,
    updateRulesStatus: `${merchantRoutes}/update/rules/status`,
    getTransactionsLive: `${merchantRoutes}/transactions`,
    uploadAgreement: `${merchantRoutes}/application-agreement-received`,
    getMasterSmsTemplates: `${merchantRoutes}/payment-sms-content`,
    sendPaymentSms: `${merchantRoutes}/send/payment/sms`,
    detailMerchantApplicationRates: `${merchantRoutes}/detail`,
    approveMerchantApplicationRates: `${merchantRoutes}/application/approve`,
    declineMerchantApplicationRates: `${merchantRoutes}/application/decline`,
    deleteMultipleImage: `${merchantRoutes}/delete/multiple/file`,
    getNotification: `${merchantRoutes}/notifications/list`,
    getNotificationDetail: `${merchantRoutes}/notifications/details`,
    deleteNotification: `${merchantRoutes}/notifications/delete`,
    deleteDirectorShareholder: (type) => `${merchantRoutes}/application/${type}/delete`,
    getIPWhitelist: `${merchantRoutes}/whitelisted-ip/get`,
    createIPWhitelist: `${merchantRoutes}/whitelisted-ip/store`,
    deleteIPWhitelist: `${merchantRoutes}/whitelisted-ip/delete`,
    updateIPWhitelist: `${merchantRoutes}/whitelisted-ip/update`,
    detailIPWhitelist: `${merchantRoutes}/whitelisted-ip/detail`,
    profileUpdate: `${merchantRoutes}/profile/update`,
    editUpdate: `${merchantRoutes}/update/profile`,
    verifyMobileOtp: `${merchantRoutes}/verify/mobile/otp`,
    getPaymentLink: `${merchantRoutes}/payment-link/list`,
    createPaymentLink: `${merchantRoutes}/payment-link/create`,
    deletePaymentLink: `${merchantRoutes}/payment-link/delete`,
    updatePaymentLink: `${merchantRoutes}/payment-link/update`,
    detailPaymentLink: `${merchantRoutes}/payment-link/detail`,
    paymentLinkExport: `${merchantRoutes}/payment-link/export`,
    paymentLinkSend: `${merchantRoutes}/payment-link/send-link`,
    getWebhook: `${merchantRoutes}/webhook/list`,
    createWebhook: `${merchantRoutes}/webhook/create`,
    deleteWebhook: `${merchantRoutes}/webhook/delete`,
    updateWebhook: `${merchantRoutes}/webhook/update`,
    detailWebhook: `${merchantRoutes}/webhook/detail`,
    eventWebhook: `${merchantRoutes}/webhook/events`,
    subscribedEventWebhook: `${merchantRoutes}/webhook/subscribed/events`,
    webhookExport: `${merchantRoutes}/webhook/export`,
    viewWebhook: `${merchantRoutes}/webhook/view`,
    updateWebhookStatus: `${merchantRoutes}/webhook/status/change`,
    getWebhookLogs: `${merchantRoutes}/webhook/log`,
    testWebhook: `${merchantRoutes}/webhook/test`,
    emailVerify: `${merchantRoutes}/profile/verify-email-otp`,
    resendProfileOTP: `${merchantRoutes}/resend/verify-otp`,
    getAPIKey: `${merchantRoutes}/secret-keys/get`,
    createAPIKey: `${merchantRoutes}/secret-keys/store`,
    deleteAPIKey: `${merchantRoutes}/secret-keys/delete`,
    applicationList: `${merchantRoutes}/application/get/details`,
    transactionsExport: `${merchantRoutes}/transactions/manual-transactions/export`,
    transactionsLiveExport: `${merchantRoutes}/transactions/export`,
    connectorExport: `${merchantRoutes}/connectors/export`,
    rulesExport: `${merchantRoutes}/rules/export`,
    ipWhiteListExport: `${merchantRoutes}/whitelisted-ip/export`,
    transactionStatus: `${merchantRoutes}/chart-transaction-data`,
    connectorTransaction: `${merchantRoutes}/chart-connector-data`,
    paymentMethodTransaction: `${merchantRoutes}/chart-payment-method-data`,
    categoryList: `${merchantRoutes}/category/list`,
    transactionsRefund: `${merchantRoutes}/transactions/refund`,
    widgetList: `${merchantRoutes}/transaction/block-widget/list`,
    educationCategoryList: `${merchantRoutes}/category-feature/list`,
    connectorLogoList: `${merchantRoutes}/dashboard/connector-logo/list`,
    transactionsChargeBack: `${merchantRoutes}/transactions/chargeback`,
    transactionsSuspicious: `${merchantRoutes}/transactions/suspicious`,
    transactionsRemoveSuspicious: `${merchantRoutes}/transactions/remove-suspicious`,
    transactionsRetrieval: `${merchantRoutes}/transactions/retrieval`,
    transactionsRemoveRetrieval: `${merchantRoutes}/transactions/remove-retrieval`,
    transactionChangeStatus: `${merchantRoutes}/transactions/change-status`,
    googleAuthPair: `${merchantRoutes}/googele-auth/send/qr?`,
    googleAuthValidate: `${merchantRoutes}/googele-auth/validate/qr?`,
    changeVerificationFlag: `${merchantRoutes}/update/google/authenticator`,
    forgetGoogleAuthenticator: `${merchantRoutes}/forget/google/authenticator`,
    verifyRp: `${merchantRoutes}/verify-rp?RP=`,
    autoPayoutReports: `${merchantRoutes}/report/payout/lists`,
    autoPayoutSetting: `${merchantRoutes}/report/payout/autopay`,
    getAutoPayoutSetting: `${merchantRoutes}/report/payout/autopay`,
    getAutoPayoutDetail: `${merchantRoutes}/report/payout/details`,
    settlementData: `${merchantRoutes}/default/payout-report`,
    settlementPreviewData: `${merchantRoutes}/default/view-payout-report`,
    settlementConnectorList: `${merchantRoutes}/active-connetors-settlement`,
};
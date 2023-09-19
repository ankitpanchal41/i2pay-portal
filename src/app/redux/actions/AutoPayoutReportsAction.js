export const GET_AUTO_PAYOUT_REQUEST = "GET_AUTO_PAYOUT_REQUEST";
export const GET_AUTO_PAYOUT_RESPONSE = "GET_AUTO_PAYOUT_RESPONSE";

export const AUTO_PAYMENT_SETTING_REQUEST = "AUTO_PAYMENT_SETTING_REQUEST";
export const AUTO_PAYMENT_SETTING_RESPONSE = "AUTO_PAYMENT_SETTING_RESPONSE";

export const getAutoPayoutReportRequest = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_AUTO_PAYOUT_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getAutoPayoutReportResponse = (data) => ({
    type: GET_AUTO_PAYOUT_RESPONSE,
    payload: data,
});

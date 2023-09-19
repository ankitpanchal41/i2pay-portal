export const GET_PAYMENT_PAGE_REQUEST = "GET_PAYMENT_PAGE_REQUEST";
export const GET_PAYMENT_PAGE_RESPONSE = "GET_PAYMENT_PAGE_RESPONSE";

export const ADD_PAYMENT_PAGE_REQUEST = "ADD_PAYMENT_PAGE_REQUEST";
export const ADD_PAYMENT_PAGE_RESPONSE = "ADD_PAYMENT_PAGE_RESPONSE";

export const DELETE_PAYMENT_PAGE_REQUEST = "DELETE_PAYMENT_PAGE_REQUEST";
export const DELETE_PAYMENT_PAGE_RESPONSE = "DELETE_PAYMENT_PAGE_RESPONSE";

export const UPDATE_PAYMENT_PAGE_REQUEST = "UPDATE_PAYMENT_PAGE_REQUEST";
export const UPDATE_PAYMENT_PAGE_RESPONSE = "UPDATE_PAYMENT_PAGE_RESPONSE";

export const DETAIL_PAYMENT_PAGE_REQUEST = "DETAIL_PAYMENT_PAGE_REQUEST";
export const DETAIL_PAYMENT_PAGE_RESPONSE = "DETAIL_PAYMENT_PAGE_RESPONSE";

export const getPaymentPageRequest = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_PAYMENT_PAGE_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getPaymentPageResponse = (data) => ({
    type: GET_PAYMENT_PAGE_RESPONSE,
    payload: data,
});

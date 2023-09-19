export const GET_WEBHOOK_REQUEST = "GET_WEBHOOK_REQUEST";
export const GET_WEBHOOK_RESPONSE = "GET_WEBHOOK_RESPONSE";

export const ADD_WEBHOOK_REQUEST = "ADD_WEBHOOK_REQUEST";
export const ADD_WEBHOOK_RESPONSE = "ADD_WEBHOOK_RESPONSE";

export const DELETE_WEBHOOK_REQUEST = "DELETE_WEBHOOK_REQUEST";
export const DELETE_WEBHOOK_RESPONSE = "DELETE_WEBHOOK_RESPONSE";

export const UPDATE_WEBHOOK_REQUEST = "UPDATE_WEBHOOK_REQUEST";
export const UPDATE_WEBHOOK_RESPONSE = "UPDATE_WEBHOOK_RESPONSE";

export const DETAIL_WEBHOOK_REQUEST = "DETAIL_WEBHOOK_REQUEST";
export const DETAIL_WEBHOOK_RESPONSE = "DETAIL_WEBHOOK_RESPONSE";

export const GET_WEBHOOK_LOGS_REQUEST = "GET_WEBHOOK_LOGS_REQUEST";
export const GET_WEBHOOK_LOGS_RESPONSE = "GET_WEBHOOK_LOGS_RESPONSE";

export const TEST_WEBHOOK_REQUEST = "TEST_WEBHOOK_REQUEST";
export const TEST_WEBHOOK_RESPONSE = "TEST_WEBHOOK_RESPONSE";

export const getWebhookRequest = (currentPage, perPage, searchQuery, callback) => ({
    type: GET_WEBHOOK_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getWebhookResponse = (data) => ({
    type: GET_WEBHOOK_RESPONSE,
    payload: data,
});

export const getWebhookLogsRequest = (currentPage, perPage, callback, payload) => ({
    type: GET_WEBHOOK_LOGS_REQUEST,    
    currentPage,
    perPage,    
    callback,
    payload
});

export const getWebhookLogsResponse = (data) => ({
    type: GET_WEBHOOK_LOGS_RESPONSE,
    payload: data,
});

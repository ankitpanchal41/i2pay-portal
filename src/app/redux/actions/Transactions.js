export const GET_TRANSACTIONS_START = "GET_TRANSACTIONS_START";
export const GET_TRANSACTIONS_END = "GET_TRANSACTIONS_END";
export const GET_TRANSACTIONS_LIVE_START = "GET_TRANSACTIONS_LIVE_START";
export const GET_TRANSACTIONS_LIVE_END = "GET_TRANSACTIONS_LIVE_END";
export const GET_TRANSACTIONS_TEST_START = "GET_TRANSACTIONS_TEST_START";
export const GET_TRANSACTIONS_TEST_END = "GET_TRANSACTIONS_TEST_END";
export const GET_TRANSACTIONS_REFUND_START = "GET_TRANSACTIONS_REFUND_START";
export const GET_TRANSACTIONS_REFUND_END = "GET_TRANSACTIONS_REFUND_END";
export const GET_TRANSACTIONS_CHARGEBACK_START = "GET_TRANSACTIONS_CHARGEBACK_START";
export const GET_TRANSACTIONS_CHARGEBACK_END = "GET_TRANSACTIONS_CHARGEBACK_END";
export const GET_TRANSACTIONS_SUSPICIOUS_START = "GET_TRANSACTIONS_SUSPICIOUS_START";
export const GET_TRANSACTIONS_SUSPICIOUS_END = "GET_TRANSACTIONS_SUSPICIOUS_END";
export const GET_TRANSACTIONS_REMOVE_SUSPICIOUS_START = "GET_TRANSACTIONS_REMOVE_SUSPICIOUS_START";
export const GET_TRANSACTIONS_REMOVE_SUSPICIOUS_END = "GET_TRANSACTIONS_REMOVE_SUSPICIOUS_END";
export const GET_TRANSACTIONS_RETRIEVAL_START = "GET_TRANSACTIONS_RETRIEVAL_START";
export const GET_TRANSACTIONS_RETRIEVAL_END = "GET_TRANSACTIONS_RETRIEVAL_END";
export const GET_TRANSACTIONS_REMOVE_RETRIEVAL_START = "GET_TRANSACTIONS_REMOVE_RETRIEVAL_START";
export const GET_TRANSACTIONS_REMOVE_RETRIEVAL_END = "GET_TRANSACTIONS_REMOVE_RETRIEVAL_END";
export const CHANGE_TRANSACTION_STATUS_START = "CHANGE_TRANSACTION_STATUS_START";
export const CHANGE_TRANSACTION_STATUS_END = "CHANGE_TRANSACTION_STATUS_END";

export const getTransactionsStart = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getLiveTransactionsStart = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_LIVE_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getTestTransactionsStart = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_TEST_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getTransactionsEnd = (data) => ({
    type: GET_TRANSACTIONS_END,
    payload: data,
});

export const getTransactionsRefund = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_REFUND_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getTransactionsChargeBack = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_CHARGEBACK_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getTransactionsSuspicious = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_SUSPICIOUS_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getTransactionsRemoveSuspicious = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_REMOVE_SUSPICIOUS_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getTransactionsRetrieval = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_RETRIEVAL_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getTransactionsRemoveRetrieval = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_TRANSACTIONS_REMOVE_RETRIEVAL_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const changeTransactionStatus = (payload, callback, navigationState) => ({
    type: CHANGE_TRANSACTION_STATUS_START,
    payload,
    callback,
    navigationState,
});

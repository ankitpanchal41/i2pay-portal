export const GET_ORDER_LIST_START = "GET_ORDER_LIST_START";
export const GET_ORDER_LIST_END = "GET_ORDER_LIST_END";

export const getOrderDetailsStart = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_ORDER_LIST_START,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getOrderDetailsEnd = (data) => ({
    type: GET_ORDER_LIST_END,
    payload: data,
});
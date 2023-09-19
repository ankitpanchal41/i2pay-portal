import {LIST_PAY_BUTTON_REQUEST, LIST_PAY_BUTTON_RESPONSE} from "../types/PayButton";


export const getPayButtonsRequest = (currentPage, perPage, searchQuery, callback) => ({
    type: LIST_PAY_BUTTON_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getPayButtonsResponse = (data) => ({
    type: LIST_PAY_BUTTON_RESPONSE,
    payload: data,
});
import { LIST_INVOICE_REQUEST, LIST_INVOICE_RESPONSE, SET_SEND_INVOICE_REQUEST } from "../types/Invoice";

export const getInvoiceRequest = (currentPage, perPage, searchQuery, callback) => ({
    type: LIST_INVOICE_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getInvoiceResponse = (data) => ({
    type: LIST_INVOICE_RESPONSE,
    payload: data,
});

export const setSendInvoice = (data) => ({
    type: SET_SEND_INVOICE_REQUEST,
    payload: data,
});

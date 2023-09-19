import {
    LIST_SMS_TEMPLATE_REQUEST,
    LIST_SMS_TEMPLATE_RESPONSE,
    LIST_MASTER_SMS_TEMPLATE_REQUEST,
    LIST_MASTER_SMS_TEMPLATE_RESPONSE,
    SET_SEND_PAYMENT_SMS_REQUEST,
} from "../types/SmsTemplate";

export const getSmsTemplateRequest = (currentPage, perPage, searchQuery, callback) => ({
    type: LIST_SMS_TEMPLATE_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getSmsTemplateResponse = (data) => ({
    type: LIST_SMS_TEMPLATE_RESPONSE,
    payload: data,
});

export const getMasterSmsTemplateRequest = (callback) => ({
    type: LIST_MASTER_SMS_TEMPLATE_REQUEST,
    callback,
});

export const getMasterSmsTemplateResponse = (data) => ({
    type: LIST_MASTER_SMS_TEMPLATE_RESPONSE,
    payload: data,
});

export const setSendSMS = (data) => ({
    type: SET_SEND_PAYMENT_SMS_REQUEST,
    payload: data,
});

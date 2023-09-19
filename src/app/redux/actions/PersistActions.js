import { DETAIL_START, LOGIN_END, LOGIN_START } from "../types/Persist";

export const LOGIN_USER = "login-user";
export const SET_THEME_COLOR = "set-theme-color";
export const INCREASE_STEP_NUMBER = "increase-step-number";
export const DECREASE_STEP_NUMBER = "decrease-step-number";
export const LOGOUT_USER = "logout-user";
export const JUMP_TO_STEP_NUMBER = "jump-to-step-number";
export const SET_STEP_TO_ACTUAL = "set-step-to-actual";
export const CHANGE_ACTUAL_STEP = "change-actual-step";
export const CHANGE_RATE_STATUS = "CHANGE_RATE_STATUS";
export const CHANGE_CONNECTOR_STATUS = "CHANGE_CONNECTOR_STATUS";
export const CHANGE_KEY_STATUS = "CHANGE_KEY_STATUS";

export const CHANGE_PASSWORD_START = "change-password-start";
export const CHANGE_PASSWORD_END = "change-password-start";

export const STORE_FRONT_REQUEST = "STORE_FRONT_REQUEST";
export const STORE_FRONT_RESPONSE = "STORE_FRONT_RESPONSE";

export const PRODUCT_REQUEST = "PRODUCT_REQUEST";
export const PRODUCT_RESPONSE = "PRODUCT_RESPONSE";

export const TRANSACTIONS_REQUEST = "TRANSACTIONS_REQUEST";
export const TRANSACTIONS_RESPONSE = "TRANSACTIONS_RESPONSE";

export const ADD_INVOICE_START = "ADD_INVOICE_START";
export const ADD_INVOICE_END = "ADD_INVOICE_END";
export const EDIT_INVOICE_START = "EDIT_INVOICE_START";
export const EDIT_INVOICE_END = "EDIT_INVOICE_END";
export const DELETE_INVOICE = "DELETE_INVOICE";
export const CHANGE_APPLICATION_STATUS = "CHANGE_APPLICATION_STATUS";
export const CHANGE_MOBILE_VERIFICATION = "CHANGE_MOBILE_VERIFICATION";
export const CHANGE_GOOGLE_AUTH_VERIFICATION = "CHANGE_GOOGLE_AUTH_VERIFICATION";

export const loginUser = (data) => ({
    type: LOGIN_USER,
    data,
});

export const setThemeColor = (mode) => ({
    type: SET_THEME_COLOR,
    mode,
});

export const increaseStepNumber = (payload) => ({
    type: INCREASE_STEP_NUMBER,
    payload,
});

export const decreaseStepNumber = () => ({
    type: DECREASE_STEP_NUMBER,
});

export const jumpToStepNumber = (stepNumber) => ({
    type: JUMP_TO_STEP_NUMBER,
    stepNumber,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const changePasswordStart = (payload) => ({
    type: CHANGE_PASSWORD_START,
    payload,
});

export const changePasswordEnd = () => ({
    type: CHANGE_PASSWORD_END,
});

export const loginStart = (payload, captchaToken) => ({
    type: LOGIN_START,
    payload,
    captchaToken,
});

export const detailStart = (payload, callback) => ({
    type: DETAIL_START,
    payload,
    callback,
});

export const loginEnd = (data) => ({
    type: LOGIN_END,
    data,
});

export const setStepToActual = () => ({
    type: SET_STEP_TO_ACTUAL,
});

export const changeActualStep = () => ({
    type: CHANGE_ACTUAL_STEP,
});

export const changeRateStatus = (status) => ({
    type: CHANGE_RATE_STATUS,
    data: status,
});

export const changeConnectorStatus = (status) => ({
    type: CHANGE_CONNECTOR_STATUS,
    data: status,
});

export const changeKeyStatus = (status) => ({
    type: CHANGE_KEY_STATUS,
    data: status,
});

export const changeApplicationStatus = (status) => ({
    type: CHANGE_APPLICATION_STATUS,
    data: status,
});

export const addInvoiceStart = (values, callback) => ({
    type: ADD_INVOICE_START,
    payload: values,
    callback,
});

export const addInvoiceEnd = (values) => ({
    type: ADD_INVOICE_END,
    payload: values,
});

export const editInvoiceStart = (values, callback) => ({
    type: EDIT_INVOICE_START,
    payload: values,
    callback,
});

export const editInvoiceEnd = (values) => ({
    type: EDIT_INVOICE_END,
    payload: values,
});

export const deleteInvoice = (id) => ({
    type: DELETE_INVOICE,
    id,
});

export const changeMobileVerification = (status) => ({
    type: CHANGE_MOBILE_VERIFICATION,
    data: status,
});

export const changeGoogleAuthVerification = (status) => ({
    type: CHANGE_GOOGLE_AUTH_VERIFICATION,
    data: status,
});

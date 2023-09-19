export const GET_TRANSACTION_CHART_REQUEST = "GET_TRANSACTION_CHART_REQUEST";
export const GET_TRANSACTION_CHART_RESPONSE = "GET_TRANSACTION_CHART_RESPONSE";

export const GET_CONNECTOR_TRANSACTION_CHART_REQUEST = "GET_CONNECTOR_TRANSACTION_CHART_REQUEST";
export const GET_CONNECTOR_TRANSACTION_CHART_RESPONSE = "GET_CONNECTOR_TRANSACTION_CHART_RESPONSE";

export const GET_PAYMENT_METHOD_TRANSACTION_CHART_REQUEST = "GET_PAYMENT_METHOD_TRANSACTION_CHART_REQUEST";
export const GET_PAYMENT_METHOD_TRANSACTION_CHART_RESPONSE = "GET_PAYMENT_METHOD_TRANSACTION_CHART_RESPONSE";

export const getTransactionStatusRequest = (data, callback) => ({
    type: GET_TRANSACTION_CHART_REQUEST,
    payload: data,
    callback,
});

export const getConnectorTransactionRequest = (data, callback) => ({
    type: GET_CONNECTOR_TRANSACTION_CHART_REQUEST,
    payload: data,
    callback,
});

export const getPaymentMethodTransactionRequest = (data, callback) => ({
    type: GET_PAYMENT_METHOD_TRANSACTION_CHART_REQUEST,
    payload: data,
    callback,
});

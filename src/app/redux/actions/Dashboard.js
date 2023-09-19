export const GET_WIDGET_LIST_REQUEST = "GET_WIDGET_LIST_REQUEST";
export const GET_WIDGET_LIST_RESPONSE = "GET_WIDGET_LIST_RESPONSE";

export const getWidgetListRequest = (payload, callback) => ({
    type: GET_WIDGET_LIST_REQUEST,
    payload,
    callback,
});

export const getWidgetListResponse = (data) => ({
    type: GET_WIDGET_LIST_RESPONSE,
    payload: data,
});

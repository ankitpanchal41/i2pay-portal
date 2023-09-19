export const GET_NOTIFICATION_REQUEST = "GET_NOTIFICATION_REQUEST";
export const GET_NOTIFICATION_RESPONSE = "GET_NOTIFICATION_RESPONSE";

export const DELETE_NOTIFICATION_REQUEST = "DELETE_NOTIFICATION_REQUEST";
export const DELETE_NOTIFICATION_RESPONSE = "DELETE_NOTIFICATION_RESPONSE";


export const getNotificationRequest = (currentPage, perPage, searchQuery, callback) => ({
    type: GET_NOTIFICATION_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getNotificationResponse = (data) => ({
    type: GET_NOTIFICATION_RESPONSE,
    payload: data,
});

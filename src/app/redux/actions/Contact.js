export const ADD_CONTACT_REQUEST = "ADD_CONTACT_REQUEST";
export const ADD_CONTACT_RESPONSE = "ADD_CONTACT_RESPONSE";

export const DELETE_CONTACT_REQUEST = "DELETE_CONTACT_REQUEST";
export const DELETE_CONTACT_RESPONSE = "DELETE_CONTACT_RESPONSE";

export const GET_CONTACT_REQUEST = "GET_CONTACT_REQUEST";
export const GET_CONTACT_RESPONSE = "GET_CONTACT_RESPONSE";

export const UPDATE_CONTACT_REQUEST = "UPDATE_CONTACT_REQUEST";
export const UPDATE_CONTACT_RESPONSE = "UPDATE_CONTACT_RESPONSE";

export const DETAIL_CONTACT_REQUEST = "DETAIL_CONTACT_REQUEST";
export const DETAIL_CONTACT_RESPONSE = "DETAIL_CONTACT_RESPONSE";

export const getContactRequest = (currentPage, perPage, searchQuery, callback) => ({
    type: GET_CONTACT_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getContactResponse = (data) => ({
    type: GET_CONTACT_RESPONSE,
    payload: data,
});

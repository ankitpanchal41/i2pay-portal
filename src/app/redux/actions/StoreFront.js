export const GET_STORE_FRONT_LIST_REQUEST = "GET_STORE_FRONT_LIST_REQUEST";
export const GET_STORE_FRONT_LIST_RESPONSE = "GET_STORE_FRONT_LIST_RESPONSE";

export const ADD_STORE_FRONT_REQUEST = "ADD_STORE_FRONT_REQUEST";
export const ADD_STORE_FRONT_RESPONSE = "ADD_STORE_FRONT_RESPONSE";

export const EDIT_STORE_FRONT_REQUEST = "EDIT_STORE_FRONT_REQUEST";
export const EDIT_STORE_FRONT_RESPONSE = "EDIT_STORE_FRONT_RESPONSE";

export const DELETE_STORE_FRONT_REQUEST = "DELETE_STORE_FRONT_REQUEST";
export const DELETE_STORE_FRONT_RESPONSE = "DELETE_STORE_FRONT_RESPONSE";

export const GET_STORE_FRONT_REQUEST = "GET_STORE_FRONT_REQUEST";
export const GET_STORE_FRONT_RESPONSE = "GET_STORE_FRONT_RESPONSE";

export const addStoreAction = (data, callback, navigate) => ({
    type: ADD_STORE_FRONT_REQUEST,
    payload: data,
    callback,
    navigate,
});

export const editStoreAction = (data, callback, navigate) => ({
    type: EDIT_STORE_FRONT_REQUEST,
    payload: data,
    callback,
    navigate,
});

export const deleteStoreAction = (data, callback, navigate) => ({
    type: DELETE_STORE_FRONT_REQUEST,
    payload: data,
    callback,
    navigate,
});

// export const listStoreAction = (data, callback, navigate) => ({
//     type: GET_STORE_FRONT_LIST_RESPONSE,
//     payload: data,
//     callback,
//     navigate,
// });


export const getStoreFrontListRequest = (currentPage, perPage, searchQuery, payload, callback) => ({
    type: GET_STORE_FRONT_LIST_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    payload,
    callback,
});

export const getStoreFrontListResponse = (data) => ({
    type: GET_STORE_FRONT_LIST_RESPONSE,
    payload: data,
});

export const detailStoreAction = (data, callback, navigate) => ({
    type: GET_STORE_FRONT_RESPONSE,
    payload: data,
    callback,
    navigate,
});

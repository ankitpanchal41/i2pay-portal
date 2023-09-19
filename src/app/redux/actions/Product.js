export const GET_PRODUCT_START = "GET_PRODUCT_START";
export const GET_PRODUCT_END = "GET_PRODUCT_END";
export const CREATE_PRODUCT_START = "CREATE_PRODUCT_START";
export const CREATE_PRODUCT_END = "CREATE_PRODUCT_END";
export const EDIT_PRODUCT_START = "EDIT_PRODUCT_START";
export const EDIT_PRODUCT_END = "EDIT_PRODUCT_END";
export const DELETE_PRODUCT_START = "DELETE_PRODUCT_START";
export const DELETE_PRODUCT_END = "DELETE_PRODUCT_END";
export const GET_PRODUCT_DETAILS_START = "GET_PRODUCT_DETAILS_START";
export const GET_PRODUCT_DETAILS_END = "GET_PRODUCT_DETAILS_END";
export const CHANGE_LOGIN_START = "CHANGE_LOGIN_START";

export const getProductStart = (storeId, currentPage, perPage, searchQuery, callback) => ({
    type: GET_PRODUCT_START,
    storeId,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getProductEnd = (data) => ({
    type: GET_PRODUCT_END,
    payload: data,
});

export const createProductStart = (data, callback, navigate, variantError) => ({
    type: CREATE_PRODUCT_START,
    payload: data,
    callback,
    navigate,
    variantError,
});

export const createProductEnd = (data) => ({
    type: CREATE_PRODUCT_END,
    payload: data,
});

export const editProductStart = (data, callback, navigate, variantError) => ({
    type: EDIT_PRODUCT_START,
    payload: data,
    callback,
    navigate,
    variantError,
});

export const editProductEnd = (data) => ({
    type: EDIT_PRODUCT_END,
    payload: data,
});

export const deleteProductStart = (id, callback) => ({
    type: DELETE_PRODUCT_START,
    id,
    callback,
});

export const deleteProductEnd = (id) => ({
    type: DELETE_PRODUCT_END,
    id,
});

export const getProductDetailsStart = (data, callback, navigateListing) => ({
    type: GET_PRODUCT_DETAILS_START,
    payload: data,
    callback,
    navigateListing,
});

export const getProductDetailsEnd = (data) => ({
    type: GET_PRODUCT_DETAILS_END,
    payload: data,
});

export const changeLoginStart = (data) => ({
    type: CHANGE_LOGIN_START,
    data: data,
});

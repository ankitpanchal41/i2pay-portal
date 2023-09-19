export const GET_PRODUCT_CATEGORY_START = "GET_PRODUCT_CATEGORY_START";
export const GET_PRODUCT_CATEGORY_END = "GET_PRODUCT_CATEGORY_END";
export const CREATE_PRODUCT_CATEGORY_START = "CREATE_PRODUCT_CATEGORY_START";
export const CREATE_PRODUCT_CATEGORY_END = "CREATE_PRODUCT_CATEGORY_END";
export const EDIT_PRODUCT_CATEGORY_START = "EDIT_PRODUCT_CATEGORY_START";
export const EDIT_PRODUCT_CATEGORY_END = "EDIT_PRODUCT_CATEGORY_END";
export const DELETE_PRODUCT_CATEGORY_START = "DELETE_PRODUCT_CATEGORY_START";
export const DELETE_PRODUCT_CATEGORY_END = "DELETE_PRODUCT_CATEGORY_END";

export const getProductCategoryStart = (storeId, currentPage, perPage, searchQuery, callback) => ({
    type: GET_PRODUCT_CATEGORY_START,
    storeId,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getProductCategoryEnd = (data) => ({
    type: GET_PRODUCT_CATEGORY_END,
    payload: data,
});

export const createProductCategoryStart = (data, callback, navigate) => ({
    type: CREATE_PRODUCT_CATEGORY_START,
    payload: data,
    callback,
    navigate,
});

export const createProductCategoryEnd = (data) => ({
    type: CREATE_PRODUCT_CATEGORY_END,
    payload: data,
});

export const editProductCategoryStart = (data, callback, navigate) => ({
    type: EDIT_PRODUCT_CATEGORY_START,
    payload: data,
    callback,
    navigate,
});

export const editProductCategoryEnd = (data) => ({
    type: EDIT_PRODUCT_CATEGORY_END,
    payload: data,
});

export const deleteProductCategoryStart = (id, callback) => ({
    type: DELETE_PRODUCT_CATEGORY_START,
    id,
    callback,
});

export const deleteProductCategoryEnd = (id) => ({
    type: DELETE_PRODUCT_CATEGORY_END,
    id,
});

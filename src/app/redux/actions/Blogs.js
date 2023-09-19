export const ADD_BLOG_REQUEST = "ADD_BLOG_REQUEST";
export const ADD_BLOG_RESPONSE = "ADD_BLOG_RESPONSE";

export const DELETE_BLOG_REQUEST = "DELETE_BLOG_REQUEST";
export const DELETE_BLOG_RESPONSE = "DELETE_BLOG_RESPONSE";

export const GET_BLOG_REQUEST = "GET_BLOG_REQUEST";
export const GET_BLOG_RESPONSE = "GET_BLOG_RESPONSE";

export const UPDATE_BLOG_REQUEST = "UPDATE_BLOG_REQUEST";
export const UPDATE_BLOG_RESPONSE = "UPDATE_BLOG_RESPONSE";

export const DETAIL_BLOG_REQUEST = "DETAIL_BLOG_REQUEST";
export const DETAIL_BLOG_RESPONSE = "DETAIL_BLOG_RESPONSE";

export const getBlogRequest = (storeId, currentPage, perPage, searchQuery, callback) => ({
    type: GET_BLOG_REQUEST,
    payload: storeId,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getBlogResponse = (data) => ({
    type: GET_BLOG_RESPONSE,
    payload: data,
});

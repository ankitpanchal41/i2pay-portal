export const ADD_COLLECTION_BANNER_REQUEST = "ADD_COLLECTION_BANNER_REQUEST";
export const ADD_COLLECTION_BANNER_RESPONSE = "ADD_COLLECTION_BANNER_RESPONSE";

export const DELETE_COLLECTION_BANNER_REQUEST = "DELETE_COLLECTION_BANNER_REQUEST";
export const DELETE_COLLECTION_BANNER_RESPONSE = "DELETE_COLLECTION_BANNER_RESPONSE";

export const GET_COLLECTION_BANNER_REQUEST = "GET_COLLECTION_BANNER_REQUEST";
export const GET_COLLECTION_BANNER_RESPONSE = "GET_COLLECTION_BANNER_RESPONSE";

export const UPDATE_COLLECTION_BANNER_REQUEST = "UPDATE_COLLECTION_BANNER_REQUEST";
export const UPDATE_COLLECTION_BANNER_RESPONSE = "UPDATE_COLLECTION_BANNER_RESPONSE";

export const DETAIL_COLLECTION_BANNER_REQUEST = "DETAIL_COLLECTION_BANNER_REQUEST";
export const DETAIL_COLLECTION_BANNER_RESPONSE = "DETAIL_COLLECTION_BANNER_RESPONSE";

export const getCollectionBannerRequest = (storeId, currentPage, perPage, searchQuery, callback) => ({
    type: GET_COLLECTION_BANNER_REQUEST,
    payload: storeId,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getCollectionBannerResponse = (data) => ({
    type: GET_COLLECTION_BANNER_RESPONSE,
    payload: data,
});

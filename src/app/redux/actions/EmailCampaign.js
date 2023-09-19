import {GET_PRODUCT_END, GET_PRODUCT_START} from "./Product";

export const DELETE_EMAIL_CAMPAIGN_REQUEST = "DELETE_EMAIL_CAMPAIGN_REQUEST";
export const DELETE_EMAIL_CAMPAIGN_RESPONSE = "DELETE_EMAIL_CAMPAIGN_RESPONSE";

export const GET_EMAIL_CAMPAIGN_REQUEST = "GET_EMAIL_CAMPAIGN_REQUEST";
export const GET_EMAIL_CAMPAIGN_RESPONSE = "GET_EMAIL_CAMPAIGN_RESPONSE";

export const DETAIL_EMAIL_CAMPAIGN_REQUEST = "DETAIL_EMAIL_CAMPAIGN_REQUEST";
export const DETAIL_EMAIL_CAMPAIGN_RESPONSE = "DETAIL_EMAIL_CAMPAIGN_RESPONSE";

export const GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_REQUEST = "GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_REQUEST";
export const GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_RESPONSE = "GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_RESPONSE";

export const EMAIL_CAMPAIGN_SEND_EMAIL_REQUEST = "EMAIL_CAMPAIGN_SEND_EMAIL_REQUEST";
export const EMAIL_CAMPAIGN_SEND_EMAIL_RESPONSE = "EMAIL_CAMPAIGN_SEND_EMAIL_RESPONSE";

export const getEmailCampaignRequest = (currentPage, perPage, searchQuery, callback) => ({
    type: GET_EMAIL_CAMPAIGN_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getEmailCampaignResponse = (data) => ({
    type: GET_EMAIL_CAMPAIGN_RESPONSE,
    payload: data,
});


export const getEmailCampaignPreviewEmailListRequest = (campaignId, currentPage, perPage, searchQuery, callback) => ({
    type: GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_REQUEST,
    campaignId,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getEmailCampaignPreviewEmailListResponse = (data) => ({
    type: GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_RESPONSE,
    payload: data,
});

export const DELETE_SMS_CAMPAIGN_REQUEST = "DELETE_SMS_CAMPAIGN_REQUEST";
export const DELETE_SMS_CAMPAIGN_RESPONSE = "DELETE_SMS_CAMPAIGN_RESPONSE";

export const GET_SMS_CAMPAIGN_REQUEST = "GET_SMS_CAMPAIGN_REQUEST";
export const GET_SMS_CAMPAIGN_RESPONSE = "GET_SMS_CAMPAIGN_RESPONSE";

export const DETAIL_SMS_CAMPAIGN_REQUEST = "DETAIL_SMS_CAMPAIGN_REQUEST";
export const DETAIL_SMS_CAMPAIGN_RESPONSE = "DETAIL_SMS_CAMPAIGN_RESPONSE";

export const GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_REQUEST = "GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_REQUEST";
export const GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_RESPONSE = "GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_RESPONSE";

export const SMS_CAMPAIGN_SEND_SMS_REQUEST = "SMS_CAMPAIGN_SEND_SMS_REQUEST";
export const SMS_CAMPAIGN_SEND_SMS_RESPONSE = "SMS_CAMPAIGN_SEND_SMS_RESPONSE";

export const getSmsCampaignRequest = (currentPage, perPage, searchQuery, callback) => ({
    type: GET_SMS_CAMPAIGN_REQUEST,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getSmsCampaignResponse = (data) => ({
    type: GET_SMS_CAMPAIGN_RESPONSE,
    payload: data,
});



export const getSmsCampaignPreviewMobileListRequest = (campaignId, currentPage, perPage, searchQuery, callback) => ({
    type: GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_REQUEST,
    campaignId,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getSmsCampaignPreviewMobileListResponse = (data) => ({
    type: GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_RESPONSE,
    payload: data,
});

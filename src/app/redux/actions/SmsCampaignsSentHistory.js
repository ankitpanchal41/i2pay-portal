export const GET_SMS_CAMPAIGN_SENT_HISTORY_REQUEST = "GET_SMS_CAMPAIGN_SENT_HISTORY_REQUEST";
export const GET_SMS_CAMPAIGN_SENT_HISTORY_RESPONSE = "GET_SMS_CAMPAIGN_SENT_HISTORY_RESPONSE";


export const getSmsCampaignSentHistoryRequest = (contactId, currentPage, perPage, searchQuery, callback) => ({
    type: GET_SMS_CAMPAIGN_SENT_HISTORY_REQUEST,
    contactId,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getSmsCampaignSentHistoryResponse = (data) => ({
    type: GET_SMS_CAMPAIGN_SENT_HISTORY_RESPONSE,
    payload: data,
});

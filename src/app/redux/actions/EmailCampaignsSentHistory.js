export const GET_EMAIL_CAMPAIGN_SENT_HISTORY_REQUEST = "GET_EMAIL_CAMPAIGN_SENT_HISTORY_REQUEST";
export const GET_EMAIL_CAMPAIGN_SENT_HISTORY_RESPONSE = "GET_EMAIL_CAMPAIGN_SENT_HISTORY_RESPONSE";


export const getEmailCampaignSentHistoryRequest = (contactId, currentPage, perPage, searchQuery, callback) => ({
    type: GET_EMAIL_CAMPAIGN_SENT_HISTORY_REQUEST,
    contactId,
    currentPage,
    perPage,
    searchQuery,
    callback,
});

export const getEmailCampaignSentHistoryResponse = (data) => ({
    type: GET_EMAIL_CAMPAIGN_SENT_HISTORY_RESPONSE,
    payload: data,
});

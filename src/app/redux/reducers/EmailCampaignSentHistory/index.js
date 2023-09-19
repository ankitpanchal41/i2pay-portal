import { GET_EMAIL_CAMPAIGN_SENT_HISTORY_RESPONSE } from "../../actions/EmailCampaignsSentHistory";

const initialValues = {
    emailHistory: [],
    contactId: null,
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const EmailCampaignSentHistoryReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_EMAIL_CAMPAIGN_SENT_HISTORY_RESPONSE:
            return {
                ...state,
                contactId: action?.payload?.id,
                emailHistory: action.payload?.emailList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        default:
            return state;
    }
};

export default EmailCampaignSentHistoryReducer;

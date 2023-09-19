import { GET_SMS_CAMPAIGN_SENT_HISTORY_RESPONSE } from "../../actions/SmsCampaignsSentHistory";

const initialValues = {
    smsHistory: [],
    contactId: null,
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const SmsCampaignSentHistoryReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_SMS_CAMPAIGN_SENT_HISTORY_RESPONSE:
            return {
                ...state,
                contactId: action?.payload?.id,
                smsHistory: action.payload?.smsList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        default:
            return state;
    }
};

export default SmsCampaignSentHistoryReducer;

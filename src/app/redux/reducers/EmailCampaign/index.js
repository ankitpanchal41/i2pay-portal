import {
    DELETE_EMAIL_CAMPAIGN_RESPONSE,
    GET_EMAIL_CAMPAIGN_REQUEST,
    GET_EMAIL_CAMPAIGN_RESPONSE,
    DETAIL_EMAIL_CAMPAIGN_RESPONSE,
    GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_REQUEST,
    GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_RESPONSE,
    EMAIL_CAMPAIGN_SEND_EMAIL_RESPONSE,
} from "../../actions/EmailCampaign";

const initialValues = {
    emailCampaign: [],
    detailEmailCampaign: {},
    campaign_id: null,
    emailList: [],
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const EmailCampaignReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_EMAIL_CAMPAIGN_REQUEST:
            return {
                ...state,
                emailCampaign: [],
            };

        case GET_EMAIL_CAMPAIGN_RESPONSE:
            return {
                ...state,
                detailEmailCampaign: {},
                emailCampaign: action.payload?.campaign || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case DELETE_EMAIL_CAMPAIGN_RESPONSE:
            return {
                ...state,
                emailCampaign: state.emailCampaign.filter((item) => item?.id !== action?.id),
            };

        case DETAIL_EMAIL_CAMPAIGN_RESPONSE:
            return {
                ...state,
                detailEmailCampaign: action?.data?.data || {},
            };

        case GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_REQUEST:
            return {
                ...state,
                emailCampaign: [],
            };

        case GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_RESPONSE:
            return {
                ...state,
                campaign_id: action?.payload?.id,
                emailList: action.payload?.emailList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case EMAIL_CAMPAIGN_SEND_EMAIL_RESPONSE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default EmailCampaignReducer;

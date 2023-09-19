import {
    DELETE_SMS_CAMPAIGN_RESPONSE,
    GET_SMS_CAMPAIGN_REQUEST,
    GET_SMS_CAMPAIGN_RESPONSE,
    DETAIL_SMS_CAMPAIGN_RESPONSE,
    GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_REQUEST,
    GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_RESPONSE,
    SMS_CAMPAIGN_SEND_SMS_RESPONSE,
} from "../../actions/SmsCampaign";

const initialValues = {
    smsCampaign: [],
    detailSmsCampaign: {},
    campaign_id: null,
    mobileList: [],
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const SmsCampaignReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_SMS_CAMPAIGN_REQUEST:
            return {
                ...state,
                smsCampaign: [],
            };

        case GET_SMS_CAMPAIGN_RESPONSE:
            return {
                ...state,
                detailSmsCampaign: {},
                smsCampaign: action.payload?.campaign || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case DELETE_SMS_CAMPAIGN_RESPONSE:
            return {
                ...state,
                smsCampaign: state.smsCampaign.filter((item) => item?.id !== action?.id),
            };

        case DETAIL_SMS_CAMPAIGN_RESPONSE:
            return {
                ...state,
                detailSmsCampaign: action?.data?.data || {},
            };

        case GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_REQUEST:
            return {
                ...state,
                smsCampaign: [],
            };

        case GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_RESPONSE:
            return {
                ...state,
                campaign_id: action?.payload?.id,
                mobileList: action.payload?.mobileList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case SMS_CAMPAIGN_SEND_SMS_RESPONSE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default SmsCampaignReducer;

import {
    ADD_SMS_TEMPLATE_RESPONSE,
    DELETE_SMS_TEMPLATE_RESPONSE,
    DETAIL_SMS_TEMPLATE_RESPONSE,
    LIST_MASTER_SMS_TEMPLATE_REQUEST,
    LIST_MASTER_SMS_TEMPLATE_RESPONSE,
    LIST_SMS_TEMPLATE_REQUEST,
    LIST_SMS_TEMPLATE_RESPONSE,
    SEND_PAYMENT_SMS_REQUEST,
    SEND_PAYMENT_SMS_RESPONSE,
    SET_SEND_PAYMENT_SMS_RESPONSE,
} from "../../types/SmsTemplate";

const initialState = {
    smsTemplateList: [],
    masterSmsTemplateList: [],
    smsTemplateDetail: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const SmsTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SMS_TEMPLATE_RESPONSE:
            return {
                ...state,
                smsTemplateList: [...state?.smsTemplateList, action?.data?.data],
            };

        case DELETE_SMS_TEMPLATE_RESPONSE:
            return {
                ...state,
                smsTemplateList: state.smsTemplateList.filter((item) => item?.id !== action?.id),
            };

        case LIST_SMS_TEMPLATE_REQUEST:
            return {
                ...state,
                smsTemplateList: [],
            };

        case LIST_SMS_TEMPLATE_RESPONSE:
            return {
                ...state,
                smsTemplateList: action.payload?.smsTemplateList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case LIST_MASTER_SMS_TEMPLATE_REQUEST:
            return {
                ...state,
                masterSmsTemplateList: [],
            };

        case LIST_MASTER_SMS_TEMPLATE_RESPONSE:
            return {
                ...state,
                masterSmsTemplateList: action.payload?.masterSmsTemplateList || [],
            };

        case DETAIL_SMS_TEMPLATE_RESPONSE:
            return {
                ...state,
                smsTemplateDetail: action?.data?.data || {},
            };

        case SEND_PAYMENT_SMS_RESPONSE:
            return {
                ...state,
            };

        case SET_SEND_PAYMENT_SMS_RESPONSE:
            const tempSMSList = [...state.smsTemplateList];
            const findIndex = tempSMSList.findIndex((item) => item?.id === action?.payload?.id);

            if (findIndex !== -1) {
                tempSMSList[findIndex]["smsCount"] = action?.payload?.value;
            }

            return {
                ...state,
                smsTemplateList: tempSMSList,
            };

        default:
            return state;
    }
};

export default SmsTemplateReducer;

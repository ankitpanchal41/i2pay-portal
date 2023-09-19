import {
    ADD_WEBHOOK_RESPONSE,
    DELETE_WEBHOOK_RESPONSE,
    GET_WEBHOOK_REQUEST,
    GET_WEBHOOK_RESPONSE,
    UPDATE_WEBHOOK_RESPONSE,
    DETAIL_WEBHOOK_RESPONSE,
    GET_WEBHOOK_LOGS_REQUEST,
    GET_WEBHOOK_LOGS_RESPONSE,
    TEST_WEBHOOK_RESPONSE,
} from "../../actions/Webhook";

const initialValues = {
    webhook: [],
    webhookLogs: [],
    detailWebhook: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const WebhookReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_WEBHOOK_REQUEST:
            return {
                ...state,
                webhook: [],
            };

        case GET_WEBHOOK_RESPONSE:
            return {
                ...state,
                detailWebhook: {},
                webhook: action.payload?.webhook || [],
                webhookLogs: [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case ADD_WEBHOOK_RESPONSE:
            console.log("response", { action });
            return {
                ...state,
                webhook: [...state?.webhook, action?.data?.data],
            };

        case DELETE_WEBHOOK_RESPONSE:
            console.log("Delete reducer", state.webhook);
            return {
                ...state,
                webhook: state.webhook.filter((item) => item?.id !== action?.id),
            };

        case UPDATE_WEBHOOK_RESPONSE:
            return {
                ...state,
            };

        case DETAIL_WEBHOOK_RESPONSE:
            return {
                ...state,
                detailWebhook: action?.data?.data || {},
            };

        case GET_WEBHOOK_LOGS_REQUEST:
            return {
                ...state,
                webhook: [],
            };

        case GET_WEBHOOK_LOGS_RESPONSE:
            return {
                ...state,
                webhookLogs: state.webhookLogs.length
                    ? state.webhookLogs.concat(action.payload?.webhookLogs)
                    : action.payload?.webhookLogs || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case TEST_WEBHOOK_RESPONSE:
            console.log("Test", action?.data?.data);
            return {
                ...state,
                webhookLogs: [],
            };

        default:
            return state;
    }
};

export default WebhookReducer;

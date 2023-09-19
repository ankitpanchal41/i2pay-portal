import {
    ADD_IP_WHITELIST_RESPONSE,
    DELETE_IP_WHITELIST_RESPONSE,
    GET_IP_WHITELIST_REQUEST,
    GET_IP_WHITELIST_RESPONSE,
    UPDATE_IP_WHITELIST_RESPONSE,
    DETAIL_IP_WHITELIST_RESPONSE
} from "../../actions/IPWhitelist";

const initialValues = {
    ipWhitelist: [],
    detailIpWhitelist: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const IPWhitelistReducer = (state = initialValues, action) => {
    switch (action?.type) {

        case GET_IP_WHITELIST_REQUEST:
            return {
                ...state,
                ipWhitelist: [],
            };

        case GET_IP_WHITELIST_RESPONSE:
            return {
                ...state,
                detailIpWhitelist: {},
                ipWhitelist: action.payload?.ipWhitelist || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case ADD_IP_WHITELIST_RESPONSE:
            return {
                ...state,
                ipWhitelist: [...state?.ipWhitelist, action?.data],
            };

        case DELETE_IP_WHITELIST_RESPONSE:
            return {
                ...state,
                ipWhitelist: state.ipWhitelist.filter((item) => item?.id !== action?.id),
            };

        case UPDATE_IP_WHITELIST_RESPONSE:
            return {
                ...state,
            };

        case DETAIL_IP_WHITELIST_RESPONSE:
            return {
                ...state,
                detailIpWhitelist: action?.data?.data || {},
            };

        default:
            return state;
    }
};

export default IPWhitelistReducer;

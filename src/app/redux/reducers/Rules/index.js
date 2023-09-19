import {
    GET_RULES_RESPONSE,
    CREATE_RULES_RESPONSE,
    UPDATE_RULES_STATUS_RESPONSE,
    DELETE_RULES_RESPONSE,
    UPDATE_RULES_RESPONSE,
    GET_DETAIL_RULES_RESPONSE, GET_RULES_REQUEST,
    UPDATE_RULES_PRIORITY_RESPONSE,
    UPDATE_RULES_PRIORITY_REQUEST
} from "../../actions/Rules";

const initialState = {
    rules: [],
    rulesDetail: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const RulesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_RULES_REQUEST:
            return {
                ...state,
                rules: [],
            };

        case GET_RULES_RESPONSE:
            return {
                ...state,
                rules: action.payload?.rules || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case CREATE_RULES_RESPONSE:
            return {
                ...state,
                rules: [...state?.rules, action?.data],
            };

        case UPDATE_RULES_STATUS_RESPONSE:
            return {
                ...state,
            };

        case UPDATE_RULES_RESPONSE:
            return {
                ...state,
            };

        case UPDATE_RULES_PRIORITY_RESPONSE:
            return {
                ...state,
            };

        case GET_DETAIL_RULES_RESPONSE:
            return {
                ...state,
                rulesDetail: action?.data,
            };

        case DELETE_RULES_RESPONSE:
            return {
                ...state,
                rules: state.rules.filter((item) => item?.id !== action?.id),
            };

        default:
            return state;
    }
};

export default RulesReducer;

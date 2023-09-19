import {
    GET_CONNECTOR_TRANSACTION_CHART_RESPONSE,
    GET_PAYMENT_METHOD_TRANSACTION_CHART_RESPONSE,
    GET_TRANSACTION_CHART_RESPONSE,
} from "../../actions/Chart";
import {
    GET_RULES_RESPONSE,
    CREATE_RULES_RESPONSE,
    UPDATE_RULES_STATUS_RESPONSE,
    DELETE_RULES_RESPONSE,
    UPDATE_RULES_RESPONSE,
    GET_DETAIL_RULES_RESPONSE,
    GET_RULES_REQUEST,
} from "../../actions/Rules";

const initialState = {
    transactionStatus: [],
    connectorTransaction: {},
    paymentMethodTransaction: {},
};

const ChartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSACTION_CHART_RESPONSE:
            return {
                ...state,
                transactionStatus: action?.data || [],
            };

        case GET_CONNECTOR_TRANSACTION_CHART_RESPONSE:
            return {
                ...state,
                connectorTransaction: action?.data || {},
            };

        case GET_PAYMENT_METHOD_TRANSACTION_CHART_RESPONSE:
            return {
                ...state,
                paymentMethodTransaction: action?.data || {},
            };

        default:
            return state;
    }
};

export default ChartReducer;

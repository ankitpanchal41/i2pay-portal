import {
    GET_TRANSACTIONS_START,
    GET_TRANSACTIONS_END,
    CHANGE_TRANSACTION_STATUS_START,
    CHANGE_TRANSACTION_STATUS_END,
} from "../../actions/Transactions";

const initialValues = {
    transactions: [],
    changeStatus: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const TransactionsReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_TRANSACTIONS_START:
            return {
                ...state,
                transactions: [],
            };

        case GET_TRANSACTIONS_END:
            return {
                ...state,
                transactions: action.payload?.transactions || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case CHANGE_TRANSACTION_STATUS_START:
            return {
                ...state,
                changeStatus: {},
            };

        case CHANGE_TRANSACTION_STATUS_END:
            return {
                ...state,
                changeStatus: action.payload || {},
            };

        default:
            return state;
    }
};

export default TransactionsReducer;

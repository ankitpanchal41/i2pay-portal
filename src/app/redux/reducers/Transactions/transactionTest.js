import { GET_TRANSACTIONS_TEST_START, GET_TRANSACTIONS_TEST_END } from "../../actions/Transactions";

const initialValues = {
    transactions: [],
    changeStatus: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const TransactionsTestReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_TRANSACTIONS_TEST_START:
            return {
                ...state,
                transactions: [],
            };

        case GET_TRANSACTIONS_TEST_END:
            return {
                ...state,
                transactions: action.payload?.transactions || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        default:
            return state;
    }
};

export default TransactionsTestReducer;

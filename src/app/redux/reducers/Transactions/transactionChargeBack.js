import { GET_TRANSACTIONS_CHARGEBACK_END } from "../../actions/Transactions";

const initialValues = {
    transactions: [],
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const TransactionChargeBackReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_TRANSACTIONS_CHARGEBACK_END:
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

export default TransactionChargeBackReducer;

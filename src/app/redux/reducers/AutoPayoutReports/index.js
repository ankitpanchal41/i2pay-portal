import { GET_AUTO_PAYOUT_REQUEST, GET_AUTO_PAYOUT_RESPONSE } from "../../actions/AutoPayoutReportsAction";

const initialValues = {
    autoPayoutReports: [],
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const AutoPayoutReportsReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_AUTO_PAYOUT_REQUEST:
            return {
                ...state,
                cards: [],
            };

        case GET_AUTO_PAYOUT_RESPONSE:
            return {
                ...state,
                autoPayoutReports: action.payload?.autoPayoutReports || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        default:
            return state;
    }
};

export default AutoPayoutReportsReducer;

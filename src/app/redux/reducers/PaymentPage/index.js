import {
    ADD_PAYMENT_PAGE_RESPONSE,
    DELETE_PAYMENT_PAGE_RESPONSE,
    GET_PAYMENT_PAGE_REQUEST,
    GET_PAYMENT_PAGE_RESPONSE,
    UPDATE_PAYMENT_PAGE_RESPONSE,
    DETAIL_PAYMENT_PAGE_RESPONSE,
} from "../../actions/PaymentPageAction";

const initialValues = {
    pages: [],
    detailPaymentPage: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const PaymentPageReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_PAYMENT_PAGE_REQUEST:
            return {
                ...state,
                pages: [],
            };

        case GET_PAYMENT_PAGE_RESPONSE:
            return {
                ...state,
                detailPaymentPage: {},
                pages: action.payload?.paymentPage || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case ADD_PAYMENT_PAGE_RESPONSE:
            return {
                ...state,
                pages: [...state?.pages, action?.data],
            };

        case DELETE_PAYMENT_PAGE_RESPONSE:
            return {
                ...state,
                pages: state.pages.filter((item) => item?.id !== action?.id),
            };

        case UPDATE_PAYMENT_PAGE_RESPONSE:
            return {
                ...state,
            };

        case DETAIL_PAYMENT_PAGE_RESPONSE:
            return {
                ...state,
                detailPaymentPage: action?.data?.data || {},
            };

        default:
            return state;
    }
};

export default PaymentPageReducer;

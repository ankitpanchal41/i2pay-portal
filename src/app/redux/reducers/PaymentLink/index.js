import {
    ADD_PAYMENT_LINK_RESPONSE,
    DELETE_PAYMENT_LINK_RESPONSE,
    GET_PAYMENT_LINK_REQUEST,
    GET_PAYMENT_LINK_RESPONSE,
    UPDATE_PAYMENT_LINK_RESPONSE,
    DETAIL_PAYMENT_LINK_RESPONSE,
    PAYMENT_LINK_SEND_RESPONSE
} from "../../actions/PaymentLinkAction";

const initialValues = {
    links: [],
    detailPaymentLink: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const PaymentLinkReducer = (state = initialValues, action) => {
    switch (action?.type) {

        case GET_PAYMENT_LINK_REQUEST:
            return {
                ...state,
                links: [],
            };

        case GET_PAYMENT_LINK_RESPONSE:
            return {
                ...state,
                detailPaymentLink: {},
                links: action.payload?.paymentLink || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case ADD_PAYMENT_LINK_RESPONSE:
            return {
                ...state,
                links: [...state?.links, action?.data],
            };

        case DELETE_PAYMENT_LINK_RESPONSE:
            return {
                ...state,
                links: state.links.filter((item) => item?.id !== action?.id),
            };

        case UPDATE_PAYMENT_LINK_RESPONSE:
            return {
                ...state,
            };

        case DETAIL_PAYMENT_LINK_RESPONSE:
            return {
                ...state,
                detailPaymentLink: action?.data?.data || {},
            };

        case PAYMENT_LINK_SEND_RESPONSE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default PaymentLinkReducer;

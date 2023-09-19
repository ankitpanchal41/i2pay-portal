import {
    ADD_PAYMENT_CARD_RESPONSE,
    DELETE_PAYMENT_CARD_RESPONSE,
    GET_PAYMENT_CARD_REQUEST,
    GET_PAYMENT_CARD_RESPONSE,
    UPDATE_PAYMENT_CARD_RESPONSE,
    DETAIL_PAYMENT_CARD_RESPONSE,
    PAYMENT_CARD_SEND_RESPONSE
} from "../../actions/PaymentCardAction";

const initialValues = {
    cards: [],
    detailPaymentCard: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const PaymentCardReducer = (state = initialValues, action) => {
    switch (action?.type) {

        case GET_PAYMENT_CARD_REQUEST:
            return {
                ...state,
                cards: [],
            };

        case GET_PAYMENT_CARD_RESPONSE:
            return {
                ...state,
                detailPaymentCard: {},
                cards: action.payload?.paymentCard || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case ADD_PAYMENT_CARD_RESPONSE:
            return {
                ...state,
                cards: [...state?.cards, action?.data],
            };

        case DELETE_PAYMENT_CARD_RESPONSE:
            return {
                ...state,
                cards: state.cards.filter((item) => item?.id !== action?.id),
            };

        case UPDATE_PAYMENT_CARD_RESPONSE:
            return {
                ...state,
            };

        case DETAIL_PAYMENT_CARD_RESPONSE:
            return {
                ...state,
                detailPaymentCard: action?.data || {},
            };

        case PAYMENT_CARD_SEND_RESPONSE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default PaymentCardReducer;

import {
    ADD_PAY_BUTTON_RESPONSE,
    DELETE_PAY_BUTTON_RESPONSE,
    DETAIL_PAY_BUTTON_RESPONSE, LIST_PAY_BUTTON_REQUEST,
    LIST_PAY_BUTTON_RESPONSE,
} from "../../types/PayButton";

const initialState = {
    payButtonList: [],
    payButtonDetail: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const PayButtonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PAY_BUTTON_RESPONSE:
            return {
                ...state,
                payButtonList: [...state?.payButtonList, action?.data?.data],
            };

        case DELETE_PAY_BUTTON_RESPONSE:
            return {
                ...state,
                payButtonList: state.payButtonList.filter((item) => item?.id !== action?.id),
            };

        case LIST_PAY_BUTTON_REQUEST:
            return {
                ...state,
                payButtonList: [],
            };

        case LIST_PAY_BUTTON_RESPONSE:
            return {
                ...state,
                payButtonList: action.payload?.payButtonList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };


        case DETAIL_PAY_BUTTON_RESPONSE:
            return {
                ...state,
                payButtonDetail: action?.data?.data || {},
            };

        default:
            return state;
    }
};

export default PayButtonReducer;

import {GET_ORDER_LIST_END, GET_ORDER_LIST_START} from "../../actions/Order";

const initialState = {
    orderList: [],
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ORDER_LIST_START:
            return {
                ...state,
                orderList: [],
            };

        case GET_ORDER_LIST_END:
            return {
                ...state,
                orderList: action.payload?.orderList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        default:
            return state;
    }
};

export default OrderReducer;

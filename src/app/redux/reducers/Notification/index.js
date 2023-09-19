import {
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_RESPONSE,
    DELETE_NOTIFICATION_RESPONSE
} from "../../actions/Notification";

const initialValues = {
    notificationList: [],
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const NotificationReducer = (state = initialValues, action) => {
    switch (action?.type) {

        case GET_NOTIFICATION_REQUEST:
            return {
                ...state,
                notificationList: [],
            };

        case GET_NOTIFICATION_RESPONSE:
            return {
                ...state,
                notificationList: action.payload?.notificationList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case DELETE_NOTIFICATION_RESPONSE:
            return {
                ...state,
                notificationList: state.notificationList.filter((item) => item?.id !== action?.id),
            };

        default:
            return state;
    }
};

export default NotificationReducer;

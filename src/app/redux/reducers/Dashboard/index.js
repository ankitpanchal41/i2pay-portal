import { GET_WIDGET_LIST_REQUEST, GET_WIDGET_LIST_RESPONSE } from "../../actions/Dashboard";

const initialValues = {
    widgetList: {},
};

const DashboardReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_WIDGET_LIST_REQUEST:
            return {
                ...state,
                widgetList: {},
            };

        case GET_WIDGET_LIST_RESPONSE:
            return {
                ...state,
                widgetList: action.payload || {},
            };

        default:
            return state;
    }
};

export default DashboardReducer;

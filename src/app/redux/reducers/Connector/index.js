import {
    GET_CONNECTOR_REQUEST,
    GET_CONNECTOR_RESPONSE,
    GET_CONNECTOR_SETTINGS_RESPONSE,
    GET_ENABLED_CONNECTOR_REQUEST,
    GET_ENABLED_CONNECTOR_RESPONSE,
    UPDATE_CONNECTOR_MODE_RESPONSE,
    UPDATE_CONNECTOR_RESPONSE,
    UPDATE_CONNECTOR_SETTINGS_RESPONSE,
} from "../../actions/Connector";

const initialState = {
    connector: [],
    enabledConnector: [],
    settings: [],
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const ConnectorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONNECTOR_REQUEST:
            return {
                ...state,
                connector: [],
                settings: [],
            };

        case GET_CONNECTOR_RESPONSE:
            return {
                ...state,
                settings: [],
                connector: action.payload?.connector || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case GET_ENABLED_CONNECTOR_REQUEST:
            return {
                ...state,
                enabledConnector: [],
            };

        case GET_ENABLED_CONNECTOR_RESPONSE:
            // alert(action.payload);
            return {
                ...state,
                enabledConnector: action.payload?.enabledConnector || [],
            };

        case GET_CONNECTOR_SETTINGS_RESPONSE:
            return {
                ...state,
                settings: action?.data || [],
            };

        case UPDATE_CONNECTOR_MODE_RESPONSE:
            const data = [];
            state?.connector?.map((item) => {
                if (item?.id === action?.data?.connector_id) {
                    data.push({ ...item, mode: action?.data?.mode });
                } else {
                    data.push(item);
                }
            });

            return {
                ...state,
                connector: data,
            };

        case UPDATE_CONNECTOR_RESPONSE:
            return {
                ...state,
            };

        case UPDATE_CONNECTOR_SETTINGS_RESPONSE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default ConnectorReducer;

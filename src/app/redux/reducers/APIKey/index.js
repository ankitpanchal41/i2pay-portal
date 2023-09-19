import { ADD_API_KEY_RESPONSE, DELETE_API_KEY_RESPONSE, GET_API_KEY_RESPONSE } from "../../actions/APIKey";

const initialValues = {
    APIKeyList: [],
};

const APIKeyReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_API_KEY_RESPONSE:
            return {
                ...state,
                APIKeyList: action?.data?.data || [],
            };

        case ADD_API_KEY_RESPONSE:
            return {
                ...state,
                APIKeyList: [action?.data],
            };

        case DELETE_API_KEY_RESPONSE:
            return {
                ...state,
                APIKeyList: [],
            };

        default:
            return state;
    }
};

export default APIKeyReducer;

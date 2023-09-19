import { ADD_IP_WHITELIST_RESPONSE, DELETE_IP_WHITELIST_RESPONSE, GET_IP_WHITELIST_RESPONSE } from "../../actions/IPWhitelist";
import { SET_PROFILE_RESPONSE } from "../../actions/Profile";

const initialValues = {
    ipWhitelist: [],
};

const ProfileReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case SET_PROFILE_RESPONSE:
            return {
                ...state,
                ipWhitelist: action?.data?.data || [],
            };

        default:
            return state;
    }
};

export default ProfileReducer;

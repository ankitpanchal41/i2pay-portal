import {
    ADD_CONTACT_RESPONSE,
    DELETE_CONTACT_RESPONSE,
    GET_CONTACT_REQUEST,
    GET_CONTACT_RESPONSE,
    UPDATE_CONTACT_RESPONSE,
    DETAIL_CONTACT_RESPONSE,
} from "../../actions/Contact";

const initialValues = {
    contact: [],
    detailContact: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const ContactReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_CONTACT_REQUEST:
            return {
                ...state,
                contact: [],
            };

        case GET_CONTACT_RESPONSE:
            return {
                ...state,
                detailContact: {},
                contact: action.payload?.contact || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case ADD_CONTACT_RESPONSE:
            return {
                ...state,
                contact: [...state?.contact, action?.data],
            };

        case DELETE_CONTACT_RESPONSE:
            return {
                ...state,
                contact: state.contact.filter((item) => item?.id !== action?.id),
            };

        case UPDATE_CONTACT_RESPONSE:
            return {
                ...state,
            };

        case DETAIL_CONTACT_RESPONSE:
            return {
                ...state,
                detailContact: action?.data?.data || {},
            };

        default:
            return state;
    }
};

export default ContactReducer;

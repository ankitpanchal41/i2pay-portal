import {
    ADD_STORE_FRONT_REQUEST,
    ADD_STORE_FRONT_RESPONSE,
    DELETE_STORE_FRONT_REQUEST,
    DELETE_STORE_FRONT_RESPONSE,
    EDIT_STORE_FRONT_REQUEST,
    EDIT_STORE_FRONT_RESPONSE,
    GET_STORE_FRONT_LIST_REQUEST,
    GET_STORE_FRONT_LIST_RESPONSE,
    GET_STORE_FRONT_REQUEST,
    GET_STORE_FRONT_RESPONSE,
} from "../../actions/StoreFront";
import { SET_DEFAULT_STEP_RESPONSE, STEP_CHANGE_RESPONSE, STEP_CURRENT_CHANGE_RESPONSE } from "../../types/StoreSteps";

const initialState = {
    step1: {
        value: {
            store_banner_1: "",
            store_banner_2: "",
            store_banner_3: "",
            store_currency: "INR",
            store_description: "",
            store_email: "",
            store_name: "",
            template_banner: 1,
            address_line_1: "",
            address_line_2: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            banner_image_1_title: "",
            banner_image_1_description: "",
            banner_image_2_title: "",
            banner_image_2_description: "",
            banner_image_3_title: "",
            banner_image_3_description: "",
        },
    },
    step2: {
        value: {
            about_description: "",
            about_image: "",
        },
    },
    step3: {
        value: {
            store_contact_email: "",
            store_contact_description: "",
            store_contact_mobile: "",
            contact_image: "",
        },
    },
    currentStep: 1,
    storeFrontList: [],
    submitStep: false,
    editStoreFrontData: {},
    loadingGetList: false,
    loadingGetDetails: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingDelete: false,
    defaultStep: 1,
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const StoreFrontCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case STEP_CHANGE_RESPONSE:
            return {
                ...state,
                [`step${action?.payload?.step?.step}`]: action?.payload?.step,
                currentStep: action?.payload?.step?.step === 3 ? action?.payload?.step?.step : action?.payload?.step?.step + 1,
            };

        case SET_DEFAULT_STEP_RESPONSE:
            return {
                ...state,
                defaultStep: action?.data?.payload?.defaultStep,
            };
        //
        // case GET_STORE_FRONT_LIST_REQUEST:
        //     return {
        //         ...state,
        //         loadingGetList: true,
        //     };
        //
        // case GET_STORE_FRONT_LIST_RESPONSE:
        //     return {
        //         ...state,
        //         storeFrontList: action?.data?.data || [],
        //         loadingGetList: false,
        //     };

        case GET_STORE_FRONT_LIST_REQUEST:
            return {
                ...state,
                storeFrontList: [],
            };

        case GET_STORE_FRONT_LIST_RESPONSE:
            return {
                ...state,
                storeFrontList: action.payload?.storeFrontList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case STEP_CURRENT_CHANGE_RESPONSE:
            return {
                ...state,
                currentStep: action?.data?.payload?.currentStep,
            };

        case GET_STORE_FRONT_REQUEST:
            return {
                ...state,
                loadingGetDetails: true,
            };
        case GET_STORE_FRONT_RESPONSE:
            return {
                ...state,
                editStoreFrontData: action?.data[0],
                loadingGetDetails: false,
            };

        case ADD_STORE_FRONT_REQUEST:
            return {
                ...state,
                loadingAdd: true,
            };

        case ADD_STORE_FRONT_RESPONSE:
            return {
                ...state,
                storeFrontList: [...state?.storeFrontList, action?.data?.data],
                loadingAdd: false,
            };

        case EDIT_STORE_FRONT_REQUEST:
            return {
                ...state,
                loadingUpdate: true,
            };

        case EDIT_STORE_FRONT_RESPONSE:
            const tempFrontList = [...state.storeFrontList];
            const findIndex = tempFrontList.findIndex((item) => item?.id === action?.data?.data?.id);
            if (findIndex !== -1) {
                tempFrontList[findIndex] = action?.data?.data;
            }

            return {
                ...state,
                loadingUpdate: false,
                storeFrontList: tempFrontList,
            };

        case DELETE_STORE_FRONT_REQUEST:
            return {
                ...state,
                loadingDelete: true,
            };

        case DELETE_STORE_FRONT_RESPONSE:
            return {
                ...state,
                loadingDelete: false,
                storeFrontList: state.storeFrontList.filter((item) => item?.id !== action?.id),
            };

        default:
            return state;
    }
};

export default StoreFrontCountReducer;

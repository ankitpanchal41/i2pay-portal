import { TOTAL_MERCHANT_APPLICATION_STEP } from "../../../utils/constants";
import {
    INCREASE_STEP_NUMBER,
    LOGOUT_USER,
    SET_THEME_COLOR,
    CHANGE_PASSWORD_END,
    DECREASE_STEP_NUMBER,
    JUMP_TO_STEP_NUMBER,
    SET_STEP_TO_ACTUAL,
    CHANGE_ACTUAL_STEP,
    STORE_FRONT_RESPONSE,
    PRODUCT_RESPONSE,
    TRANSACTIONS_RESPONSE,
    ADD_INVOICE_END,
    EDIT_INVOICE_END,
    DELETE_INVOICE,
    CHANGE_RATE_STATUS,
    CHANGE_APPLICATION_STATUS,
    CHANGE_CONNECTOR_STATUS,
    CHANGE_KEY_STATUS,
    CHANGE_MOBILE_VERIFICATION,
    CHANGE_GOOGLE_AUTH_VERIFICATION,
} from "../../actions/PersistActions";
import { CHANGE_LOGIN_START } from "../../actions/Product";
import { SET_PROFILE_RESPONSE } from "../../actions/Profile";
import { LOGIN_END } from "../../types/Persist";

const initialState = {
    isLoggedIn: false,
    userData: null,
    mode: "light",
    loginStart: true,
    stepNumber: 0,
    storeFrontData: [],
    productData: [],
    transactionsData: [],
    invoiceList: [],
    ipWhitelist: [],
};

const PersistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_END:
            return {
                ...state,
                isLoggedIn: true,
                userData: action?.data,
                stepNumber:
                    Number(action?.data?.data?.step) === TOTAL_MERCHANT_APPLICATION_STEP
                        ? Number(action?.data?.data?.step)
                        : Number(action?.data?.data?.step) + 1,
                loginStart: true,
            };

        case SET_THEME_COLOR:
            return {
                ...state,
                mode: action?.mode,
            };

        case INCREASE_STEP_NUMBER:
            if (action.payload.isCreateStep) {
                return {
                    ...state,
                    userData: {
                        ...state?.userData,
                        data: {
                            ...state?.userData?.data,
                            step: Number(state?.userData?.data?.step) + 1,
                        },
                    },
                    stepNumber:
                        state?.stepNumber + 1 > TOTAL_MERCHANT_APPLICATION_STEP ? TOTAL_MERCHANT_APPLICATION_STEP : state?.stepNumber + 1,
                };
            }
            return {
                ...state,
                stepNumber:
                    state?.stepNumber + 1 > TOTAL_MERCHANT_APPLICATION_STEP ? TOTAL_MERCHANT_APPLICATION_STEP : state?.stepNumber + 1,
            };

        case DECREASE_STEP_NUMBER:
            return {
                ...state,
                stepNumber: state?.stepNumber - 1,
            };

        case JUMP_TO_STEP_NUMBER:
            return {
                ...state,
                stepNumber: action.stepNumber - 1 <= Number(state?.userData?.data?.step) ? action.stepNumber : state?.stepNumber,
            };

        case LOGOUT_USER:
            return {
                ...initialState,
                mode: state?.mode,
            };
        // return {
        //     isLoggedIn: false,
        //     userData: null,
        //     stepNumber: 0,
        // };

        case CHANGE_PASSWORD_END:
            return {
                ...state,
                userData: {
                    ...state?.userData,
                    data: {
                        ...state?.userData?.data,
                        redirect_screen: "",
                    },
                },
            };

        case SET_STEP_TO_ACTUAL:
            return {
                ...state,
                stepNumber:
                    Number(state?.userData?.data?.step) > TOTAL_MERCHANT_APPLICATION_STEP
                        ? 3
                        : Number(state?.userData?.data?.step) === TOTAL_MERCHANT_APPLICATION_STEP
                        ? Number(state?.userData?.data?.step)
                        : Number(state?.userData?.data?.step) + 1,
            };

        case SET_PROFILE_RESPONSE:
            return {
                ...state,
                userData: { ...state?.userData, data: { ...state?.userData?.data, image: action?.data?.data?.image } },
            };

        case CHANGE_ACTUAL_STEP:
            return {
                ...state,
                userData: {
                    ...state?.userData,
                    data: {
                        ...state?.userData?.data,
                        step:
                            state?.userData?.data?.step <= state?.stepNumber
                                ? Number(state?.userData?.data?.step) + 1
                                : state?.userData?.data?.step,
                    },
                },
            };
        case CHANGE_RATE_STATUS:
            return {
                ...state,
                userData: {
                    ...state?.userData,
                    data: {
                        ...state?.userData?.data,
                        is_rate_sent: action?.data?.is_rate_sent,
                    },
                },
            };
        case CHANGE_CONNECTOR_STATUS:
            return {
                ...state,
                userData: {
                    ...state?.userData,
                    data: {
                        ...state?.userData?.data,
                        is_active_connector: action?.data?.is_active_connector,
                    },
                },
            };
        case CHANGE_KEY_STATUS:
            return {
                ...state,
                userData: {
                    ...state?.userData,
                    data: {
                        ...state?.userData?.data,
                        is_secretKey: action?.data?.is_secretKey,
                    },
                },
            };

        case CHANGE_APPLICATION_STATUS:
            return {
                ...state,
                userData: {
                    ...state?.userData,
                    data: {
                        ...state?.userData?.data,
                        application_status: action?.data?.applications_status,
                    },
                },
            };

        case CHANGE_MOBILE_VERIFICATION:
            return {
                ...state,
                userData: {
                    ...state?.userData,
                    data: {
                        ...state?.userData?.data,
                        has_mobile_no_verified: action?.data?.has_mobile_no_verified,
                    },
                },
            };

        case CHANGE_GOOGLE_AUTH_VERIFICATION:
            return {
                ...state,
                userData: {
                    ...state?.userData,
                    data: {
                        ...state?.userData?.data,
                        has_google_auth_activated: action?.data?.has_google_auth_activated,
                    },
                },
            };

        case STORE_FRONT_RESPONSE:
            return {
                ...state,
                storeFrontData: action?.data,
            };

        case PRODUCT_RESPONSE:
            return {
                ...state,
                productData: action?.data,
            };

        case TRANSACTIONS_RESPONSE:
            return {
                ...state,
                transactionsData: action?.data,
            };

        case ADD_INVOICE_END:
            return {
                ...state,
                invoiceList: [...state?.invoiceList, action?.payload],
            };

        case EDIT_INVOICE_END:
            const tempInvoiceList = [...state?.invoiceList];
            const findIndex = tempInvoiceList.findIndex((item) => item?.id === action?.payload?.id);
            if (findIndex !== -1) {
                tempInvoiceList[findIndex] = action?.payload;
            }
            return {
                ...state,
                invoiceList: [...tempInvoiceList],
            };

        case DELETE_INVOICE:
            return {
                ...state,
                invoiceList: state?.invoiceList.filter((v) => v.id !== action?.id),
            };

        case CHANGE_LOGIN_START:
            return {
                ...state,
                loginStart: action?.data,
            };

        default:
            return state;
    }
};

export default PersistReducer;

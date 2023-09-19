import {
    DETAIL_MERCHANT_APPLICATION_RATES_RESPONSE,
    APPROVE_MERCHANT_APPLICATION_RATES_RESPONSE,
    DECLINE_MERCHANT_APPLICATION_RATES_RESPONSE,
} from "../../types/MerchantApplicationRates";

const initialState = {
    merchantApplicationRates: {},
};

const MerchantApplicationRatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAIL_MERCHANT_APPLICATION_RATES_RESPONSE:
            return {
                ...state,
                merchantApplicationRates: action?.data?.data || {},
            };

        case APPROVE_MERCHANT_APPLICATION_RATES_RESPONSE:
            return {
                ...state,
            };

        case DECLINE_MERCHANT_APPLICATION_RATES_RESPONSE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default MerchantApplicationRatesReducer;

import {
    UPLOAD_AGREEMENT_RESPONSE
} from "../../actions/AgreementAction";

const initialState = {
    agreementDetail: {},
};

const AgreementReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_AGREEMENT_RESPONSE:
            return {
                ...state,
                agreementDetail: action?.payload || {},
            };

        default:
            return state;
    }
};

export default AgreementReducer;

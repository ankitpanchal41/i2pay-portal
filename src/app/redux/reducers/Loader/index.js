import { SET_LOADER } from "../../actions/Loader";

const initialState = {
    loading: false,
};

const LoaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                loading: action?.newState ?? !state.loading,
            };

        default:
            return state;
    }
};

export default LoaderReducer;

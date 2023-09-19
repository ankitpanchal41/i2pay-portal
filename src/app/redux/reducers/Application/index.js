import {
    CREATE_EMPTY_VALUE,
    DELETE_DIRECTOR_MULTIPLE_IMAGE,
    DELETE_DIRECTOR_SHAREHOLDER_END,
    DELETE_SHARE_HOLDER_MULTIPLE_IMAGE,
    EDIT_STEP_DATA_END,
    GET_APPLICATION_LIST_END,
    GET_CATEGORY_LIST_END,
    GET_STEP_DATA_END,
} from "../../actions/ApplicationAction";
import { LOGOUT_USER } from "../../actions/PersistActions";

const initialState = {
    applicationStepValues: [],
    applicationList: null,
    categoryList: [],
};

const ApplicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STEP_DATA_END:
            const tempApplicationStepValues = [...state.applicationStepValues];
            tempApplicationStepValues[action.payload.step - 1] = action?.payload?.data;
            return {
                ...state,
                applicationStepValues: [...tempApplicationStepValues],
            };

        case EDIT_STEP_DATA_END:
            const temp = [...state.applicationStepValues];
            let data;
            if (action.payload.step - 1 === 1 || action.payload.step - 1 === 2)
                if (action.payload?.isCreate) {
                    // if (Array.isArray(temp[action.payload.step - 1])) {
                    const temp2 = Array.isArray(temp[action.payload.step - 1]) ? [...temp[action.payload.step - 1]] : [];
                    temp2[action?.payload?.index] = { ...action?.payload?.data };

                    data = temp2;
                    // } else {
                    // data = [{ ...action?.payload?.data }];
                    // }
                } else {
                    data = [...temp[action.payload.step - 1]];
                    const editIndex = data?.findIndex((item) => item.id === action?.payload?.data?.id);
                    if (editIndex !== -1) {
                        data[editIndex] = action?.payload?.data;
                    }
                }
            else {
                data = { ...action?.payload?.data };
            }

            temp[action.payload.step - 1] = data;
            return {
                ...state,
                applicationStepValues: [...temp],
            };

        case DELETE_DIRECTOR_SHAREHOLDER_END: {
            const mainIndex = action?.deleteType === "director" ? 1 : 2;
            const clone = [...state.applicationStepValues];

            if (action?.id) {
                clone[mainIndex] = clone[mainIndex]?.filter((v) => v?.id !== action?.id);
            } else if (action?.index && !clone?.[mainIndex]?.[action?.index]) {
                clone[mainIndex] = clone[mainIndex]?.filter((v, index) => index !== action?.index);
            } else if ((action?.index || action?.index === 0) && mainIndex === 2) {
                clone[mainIndex] = clone[mainIndex]?.filter((v, index) => index !== action?.index);
            }

            return {
                ...state,
                applicationStepValues: clone,
            };
        }

        case CREATE_EMPTY_VALUE:
            const mainIndex = action?.createType === "director" ? 1 : 2;
            const clone = [...state.applicationStepValues];

            clone[mainIndex] = Array.isArray(clone[mainIndex]) ? [...clone[mainIndex], undefined] : [undefined, undefined];

            return {
                ...state,
                applicationStepValues: clone,
            };

        case LOGOUT_USER:
            return initialState;

        case GET_APPLICATION_LIST_END:
            return {
                ...state,
                applicationList: action?.payload,
            };

        case GET_CATEGORY_LIST_END:
            return {
                ...state,
                categoryList: action?.data,
            };

        case DELETE_DIRECTOR_MULTIPLE_IMAGE:
            state.applicationStepValues[1][action?.step].director_additional_document = action?.data;

            return {
                ...state,
            };

        case DELETE_SHARE_HOLDER_MULTIPLE_IMAGE:
            state.applicationStepValues[2][action?.step].share_holder_additional_document = action?.data;

            return {
                ...state,
            };

        default:
            return state;
    }
};

export default ApplicationReducer;

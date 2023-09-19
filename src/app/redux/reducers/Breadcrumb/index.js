import _ from "lodash";
import { ADD_TO_BREADCRUMB, REMOVE_FROM_BREADCRUMB } from "../../actions/BreadcrumbAction";

const initialState = {
    data: [],
};

const BreadcrumbData = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_BREADCRUMB:
            return {
                ...state,
                data: action.payload,
            };

        case REMOVE_FROM_BREADCRUMB:
            const breadcrumbClone = _.cloneDeep(state.data);
            const index = breadcrumbClone.findIndex((item) => {
                return item.url === action?.payload;
            });
            breadcrumbClone.splice(index + 1, breadcrumbClone.length);

            return {
                ...state,
                data: breadcrumbClone,
            };

        default:
            return state;
    }
};

export default BreadcrumbData;

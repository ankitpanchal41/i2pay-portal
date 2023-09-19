import {
    CREATE_PRODUCT_END,
    DELETE_PRODUCT_END,
    EDIT_PRODUCT_END,
    GET_PRODUCT_DETAILS_END,
    GET_PRODUCT_DETAILS_START,
    GET_PRODUCT_END,
    GET_PRODUCT_START,
} from "../../actions/Product";

const initialValues = {
    productList: [],
    productDetails: null,
    store_id: null,
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const ProductReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_PRODUCT_START:
            return {
                ...state,
                productList: [],
            };

        case GET_PRODUCT_END:
            return {
                ...state,
                productList: action.payload?.productList || [],
                store_id: action?.payload?.store_id,
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case EDIT_PRODUCT_END:
            const tempProductList = [...state.productList];
            const findIndex = tempProductList.findIndex((item) => item?.id === action?.payload?.id);
            if (findIndex !== -1) {
                tempProductList[findIndex] = action?.payload;
            }

            return {
                ...state,
                productList: tempProductList,
            };

        case CREATE_PRODUCT_END:
            return {
                ...state,
                productList: [...state.productList, action.payload],
            };

        case DELETE_PRODUCT_END:
            return {
                ...state,
                productList: state.productList.filter((item) => item?.id !== action?.id),
            };

        case GET_PRODUCT_DETAILS_START:
            return {
                ...state,
                productDetails: action?.payload,
            };

        case GET_PRODUCT_DETAILS_END:
            return {
                ...state,
                productDetails: action?.payload,
            };

        default:
            return state;
    }
};

export default ProductReducer;

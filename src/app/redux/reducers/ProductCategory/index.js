import {
    CREATE_PRODUCT_CATEGORY_END,
    DELETE_PRODUCT_CATEGORY_END,
    EDIT_PRODUCT_CATEGORY_END,
    GET_PRODUCT_CATEGORY_END,
    GET_PRODUCT_CATEGORY_START,
} from "../../actions/ProductCategory";

const initialValues = {
    productCategoryList: [],
    productDetails: null,
    store_id: null,
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const ProductCategoryReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_PRODUCT_CATEGORY_START:
            return {
                ...state,
                productCategoryList: [],
            };

        case GET_PRODUCT_CATEGORY_END:
            return {
                ...state,
                productCategoryList: action.payload?.productCategoryList || [],
                store_id: action?.payload?.store_id,
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case EDIT_PRODUCT_CATEGORY_END:
            const tempProductCategoryList = [...state.productCategoryList];
            const findIndex = tempProductCategoryList.findIndex((item) => item?.id === action?.payload?.id);
            if (findIndex !== -1) {
                tempProductCategoryList[findIndex] = action?.payload;
            }

            return {
                ...state,
                productCategoryList: tempProductCategoryList,
            };

        case CREATE_PRODUCT_CATEGORY_END:
            return {
                ...state,
                productCategoryList: [...state.productCategoryList, action.payload],
            };

        case DELETE_PRODUCT_CATEGORY_END:
            return {
                ...state,
                productCategoryList: state.productCategoryList.filter((item) => item?.id !== action?.id),
            };

        default:
            return state;
    }
};

export default ProductCategoryReducer;

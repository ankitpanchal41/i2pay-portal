import {
    ADD_COLLECTION_BANNER_RESPONSE,
    DELETE_COLLECTION_BANNER_RESPONSE,
    GET_COLLECTION_BANNER_REQUEST,
    GET_COLLECTION_BANNER_RESPONSE,
    UPDATE_COLLECTION_BANNER_RESPONSE,
    DETAIL_COLLECTION_BANNER_RESPONSE,
} from "../../actions/CollectionBanner";

const initialValues = {
    collectionBanners: [],
    detailCollectionBanner: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const BlogReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_COLLECTION_BANNER_REQUEST:
            return {
                ...state,
                collectionBanners: [],
            };

        case GET_COLLECTION_BANNER_RESPONSE:
            
            return {
                ...state,
                detailCollectionBanner: {},
                collectionBanners: action.payload?.collectionBanners || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case ADD_COLLECTION_BANNER_RESPONSE:
            return {
                ...state,
                collectionBanners: [...state?.collectionBanners, action?.data],
            };

        case DELETE_COLLECTION_BANNER_RESPONSE:
            return {
                ...state,
                collectionBanners: state.collectionBanners.filter((item) => item?.id !== action?.id),
            };

        case UPDATE_COLLECTION_BANNER_RESPONSE:
            return {
                ...state,
            };

        case DETAIL_COLLECTION_BANNER_RESPONSE:
            return {
                ...state,
                detailCollectionBanner: action?.data || {},
            };

        default:
            return state;
    }
};

export default BlogReducer;

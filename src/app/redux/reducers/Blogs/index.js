import {
    ADD_BLOG_RESPONSE,
    DELETE_BLOG_RESPONSE,
    GET_BLOG_REQUEST,
    GET_BLOG_RESPONSE,
    UPDATE_BLOG_RESPONSE,
    DETAIL_BLOG_RESPONSE,
} from "../../actions/Blogs";

const initialValues = {
    blogs: [],
    detailBlogs: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const BlogReducer = (state = initialValues, action) => {
    switch (action?.type) {
        case GET_BLOG_REQUEST:
            return {
                ...state,
                blogs: [],
            };

        case GET_BLOG_RESPONSE:
            
            return {
                ...state,
                detailBlogs: {},
                blogs: action.payload?.blogs || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case ADD_BLOG_RESPONSE:
            return {
                ...state,
                blogs: [...state?.blogs, action?.data],
            };

        case DELETE_BLOG_RESPONSE:
            return {
                ...state,
                blogs: state.blogs.filter((item) => item?.id !== action?.id),
            };

        case UPDATE_BLOG_RESPONSE:
            return {
                ...state,
            };

        case DETAIL_BLOG_RESPONSE:
            return {
                ...state,
                detailBlogs: action?.data || {},
            };

        default:
            return state;
    }
};

export default BlogReducer;

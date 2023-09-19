import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import RestStore from "../../apiMethod/storeMethod";

export const getBlogData = async (value, payload) => {
    try {
        let searchString = "";
        if (value?.currentPage) {
            searchString += `page=${value?.currentPage}`;
        }

        if (value?.perPage) {
            searchString += `&perPage=${value?.perPage}`;
        }

        if (value?.searchQuery !== "") {
            searchString += `&search=${value?.searchQuery}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.getBlogs}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addBlogData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.createBlog, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteBlogData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.deleteBlog, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateBlogData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.updateBlog, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailBlogData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.detailBlog, { blog_id: payload.id });

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


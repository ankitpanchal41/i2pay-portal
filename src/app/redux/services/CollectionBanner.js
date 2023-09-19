import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import RestStore from "../../apiMethod/storeMethod";

export const getCollectionBannerData = async (value, payload) => {
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

        const { data } = await RestStore.post(`${apiRoutes.getCollectionBanner}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addCollectionBannerData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.createBlogCollectionBanner, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteCollectionBannerData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.deleteBlogCollectionBanner, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateCollectionBannerData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.updateBlogCollectionBanner, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailCollectionBannerData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.detailBlogCollectionBanner, { collection_banner_id: payload.id });

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

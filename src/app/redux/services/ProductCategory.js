import { callApi } from ".";
import RestStore from "../../apiMethod/storeMethod";
import { showToastMessage } from "../../utils/methods";
import { apiRoutes } from "./apiRoutes";

export const productCategoryListHandle = async (value, payload) => {
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

        const { data } = await RestStore.post(`${apiRoutes.getProductsCategoryList}?${searchString}`, payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const productCategoryAddHandle = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.createProductCategory, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return error;
    }
};

export const productCategoryUpdateHandle = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.editProductCategory, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return error;
    }
};

export const productCategoryDeleteHandle = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.deleteProductCategory, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return error;
    }
};

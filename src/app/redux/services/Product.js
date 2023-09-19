import { callApi } from ".";
import RestStore from "../../apiMethod/storeMethod";
import { showToastMessage } from "../../utils/methods";
import { apiRoutes } from "./apiRoutes";

export const productApiHandler = async (route, payload, shouldShowMessage = true, baseURL) => {
    try {
        const { data } = await callApi(route.url, { method: route.method || "GET", data: payload }, null, "https://store.payomatix.com/");

        if (shouldShowMessage) {
            if (data?.options?.validation) {
                data?.options?.validation?.forEach((v) => {
                    showToastMessage(v, data?.responseCode);
                });
            } else {
                showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
            }
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const productListHandle = async (value, payload) => {
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

        const { data } = await RestStore.post(`${apiRoutes.getProductsList}?${searchString}`, payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const productDetailHandle = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.getProductDetails, payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const productAddHandle = async (payload) => {
    try {
        const { data } = await RestStore.errorPost(apiRoutes.createProduct, payload);

        if (data?.responseCode !== 422) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const productUpdateHandle = async (payload) => {
    try {
        const { data } = await RestStore.errorPost(apiRoutes.editProduct, payload);
        if (data?.responseCode !== 422) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const productStatusUpdateHandle = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.editProductStatus, payload);
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return error;
    }
};

export const productDeleteHandle = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.deleteProduct, payload);
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return error;
    }
};

export const getCategoryListHandle = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.getProductsCategoryListAll, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return error;
    }
};

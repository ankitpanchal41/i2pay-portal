import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const addPayButton = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createPayButton, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updatePayButton = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updatePayButton, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deletePayButton = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deletePayButton, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailPayButton = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.detailsPayButton, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


export const listPayButton = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.listPayButton}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

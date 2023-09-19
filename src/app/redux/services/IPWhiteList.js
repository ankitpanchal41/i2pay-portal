import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getIPWhitelistData = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getIPWhitelist}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addIPWhitelistData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createIPWhitelist, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteIPWhitelistData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteIPWhitelist, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


export const updateIpWhitelistData = async (payload) => {
    try {
        const {data} = await Rest.post(apiRoutes.updateIPWhitelist, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailIpWhitelistData = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.detailIPWhitelist + "/" + payload.id, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


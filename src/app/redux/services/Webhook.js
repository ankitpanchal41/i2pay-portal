import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getWebhookData = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getWebhook}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const eventWebhookData = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.eventWebhook, payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const subscribedEventWebhookData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.subscribedEventWebhook, payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addWebhookData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createWebhook, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteWebhookData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteWebhook, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateWebhookData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateWebhook, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailWebhookData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.detailWebhook, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateWebhookStatus = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateWebhookStatus, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


export const getWebhookLogsData = async (value, payload) => {
    try {
        let searchString = "";
        if (value?.currentPage) {
            searchString += `page=${value?.currentPage}`;
        }

        if (value?.perPage) {
            searchString += `&perPage=${value?.perPage}`;
        }
     
        const { data } = await Rest.post(`${apiRoutes.getWebhookLogs}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const testWebhookData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.testWebhook, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

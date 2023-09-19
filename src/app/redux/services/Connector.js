import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getConnectorData = async (value) => {
    try {
        let searchString = "";

        if (value?.searchQuery !== "") {
            searchString += `?search=${value?.searchQuery}`;
        }

        const { data } = await Rest.post(`${apiRoutes.getConnector}${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getEnabledConnectorData = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.getEnabledConnector, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getConnectorSettings = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getConnectorSettings, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const setConnectorData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateConnector, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const setConnectorSettingsData = async (payload) => {
    try {
        // const { data } = await callApi(apiRoutes.updateConnector, { method: "POST", params: payload });
        const { data } = await Rest.post(apiRoutes.updateConnectorSettings, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const changeConnectorMode = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateConnectorMode, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getConnectorTypeData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getConnectorType, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getDefaultConnectorData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getDefaultConnector, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const setDefaultConnector = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.setDefaultConnector, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const enableDisableMultipleConnector = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.enableMultipleConnector, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const removeRateLimitConnector = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.removeLimitConnector, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getVendorsData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getVendors, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteVendorsData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteVendors, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const addVendorsData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createVendors, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateVendorsData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateVendors, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const splitPaymentEditData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.autoSplitPaymentEdit, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getAutoSplitPaymentData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getAutoSplitPaymentData, payload);
        // showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

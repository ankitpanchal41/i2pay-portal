import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const addSmsTemplate = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createMerchantSmsTemplates, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateSmsTemplate = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateMerchantSmsTemplates, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const sendPaymentSMSData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.sendPaymentSms, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteSmsTemplate = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteMerchantSmsTemplates, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailSmsTemplate = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.detailMerchantSmsTemplates, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const listSmsTemplate = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getMerchantSmsTemplates}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const listMasterSmsTemplate = async (value, payload) => {
    try {
        const { data } = await Rest.get(`${apiRoutes.getMasterSmsTemplates}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const downloadSmsTemplate = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.downloadSmsTemplate, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const downloadTransactionsExcel = async (payload) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.transactionsExport}`, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const downloadTransactionsLiveExcel = async (payload) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.transactionsLiveExport}`, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const downloadConnectorExcel = async (value) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await Rest.post(`${apiRoutes.connectorExport}${searchString}`);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        }
        return data;
    } catch (error) {
        return error;
    }
};

export const downloadRulesExcel = async (value) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await Rest.post(`${apiRoutes.rulesExport}${searchString}`);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        } else {
            return data;
        }
    } catch (error) {
        return error;
    }
};

export const downloadIPWhiteListExcel = async (value) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await Rest.post(`${apiRoutes.ipWhiteListExport}${searchString}`);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        } else {
            return data;
        }
    } catch (error) {
        return error;
    }
};

export const downloadPaymentLinkExcel = async (value) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await Rest.post(`${apiRoutes.paymentLinkExport}${searchString}`);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        } else {
            return data;
        }
    } catch (error) {
        return error;
    }
};

export const downloadWebhookExcel = async (value) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await Rest.post(`${apiRoutes.webhookExport}${searchString}`);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        } else {
            return data;
        }
    } catch (error) {
        return error;
    }
};

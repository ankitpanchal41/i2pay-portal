import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";
import RestStore from "../../apiMethod/storeMethod";

export const downloadInvoiceExcel = async (payload) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.invoiceExport}`, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        }
        return data;
    } catch (error) {
        return error;
    }
};

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

export const downloadPayButtonExcel = async (value) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await Rest.post(`${apiRoutes.payButtonExport}${searchString}`);

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

export const downloadProductExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.productExport}${searchString}`, payload);

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

export const downloadStoreExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.storeExport}${searchString}`, payload);

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

export const downloadOrderExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.orderExport}${searchString}`, payload);

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

export const downloadChargeBackTransactionsExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.transactionsLiveExport}${searchString}`, payload);

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

export const downloadRefundTransactionsExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.transactionsLiveExport}${searchString}`, payload);

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

export const downloadRetrievalTransactionsExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.transactionsLiveExport}${searchString}`, payload);

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

export const downloadRemoveRetrievalTransactionsExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.transactionsLiveExport}${searchString}`, payload);

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
export const downloadSuspiciousTransactionsExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.transactionsLiveExport}${searchString}`, payload);

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

export const downloadRemoveSuspiciousTransactionsExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.transactionsLiveExport}${searchString}`, payload);

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

export const downloadSMSPaymentExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await Rest.get(`${apiRoutes.smsPaymentExport}${searchString}`, payload);

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

export const downloadPaymentPageExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.paymentPageExport}${searchString}`, payload);

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

export const downloadPaymentCardExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.paymentCardExport}${searchString}`, payload);

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

export const downloadProductBlogExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.blogExport}${searchString}`, payload);

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

export const downloadProductCategoryExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.productCategoryExport}${searchString}`, payload);

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

export const downloadProductCollectionBannerExcel = async (value, payload) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await RestStore.post(`${apiRoutes.collectionBannerExport}${searchString}`, payload);

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

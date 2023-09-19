import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import RestStore from "../../apiMethod/storeMethod";
import Rest from "../../apiMethod";

export const getPaymentPageData = async (value) => {
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

        if (value?.payload?.merchant_id) {
            searchString += `&merchant_id=${value.payload?.merchant_id}`;
        }

        const { data } = await RestStore.get(`${apiRoutes.getPaymentPage}?${searchString}`);

        return data;
    } catch (error) {
        return error;
    }
};

export const addPaymentPageData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.createPaymentPage, payload, true);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deletePaymentPageData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.deletePaymentPage, payload);
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updatePaymentPageData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.updatePaymentPage, payload);
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailPaymentPageData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.detailPaymentPage, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const userDetailPaymentPageData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.userDetailPaymentPage, payload);

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

export const generatePaymentPageData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.generateLinkPaymentPage, payload);

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

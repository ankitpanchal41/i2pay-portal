import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import RestStore from "../../apiMethod/storeMethod";
import Rest from "../../apiMethod";

export const getPaymentCardData = async (value) => {
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

        const { data } = await RestStore.post(`${apiRoutes.getPaymentCard}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addPaymentCardData = async (payload) => {
    try {
        const { data } = await RestStore.errorPost(apiRoutes.createPaymentCard, payload);

        if (data?.responseCode !== 422) {
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

export const deletePaymentCardData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.deletePaymentCard, payload);

        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updatePaymentCardData = async (payload) => {
    try {
        const { data } = await RestStore.errorPost(apiRoutes.updatePaymentCard, payload);
        if (data?.responseCode !== 422) {
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

export const detailPaymentCardData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.detailPaymentCard, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const paymentCardSendData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.paymentCardSend, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const productListData = async (value) => {
    try {
        let searchString = "";
        if (value?.merchant_id) {
            searchString += `merchant_id=${value?.merchant_id}`;
        }

        const { data } = await RestStore.get(`${apiRoutes.paymentCardProductList}?${searchString}`);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const userDetailPaymentCardData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.userDetailPaymentCard, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const generatePaymentCardLink = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.generateLinkPaymentCard, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

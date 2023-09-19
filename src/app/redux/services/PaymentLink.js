import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getPaymentLinkData = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getPaymentLink}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addPaymentLinkData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createPaymentLink, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deletePaymentLinkData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deletePaymentLink, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


export const updatePaymentLinkData = async (payload) => {
    try {
        const {data} = await Rest.post(apiRoutes.updatePaymentLink, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailPaymentLinkData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.detailPaymentLink, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const paymentLinkSendData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.paymentLinkSend, payload);

        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

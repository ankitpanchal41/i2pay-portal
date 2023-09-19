import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";



export const detailMerchantApplicationRate = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.detailMerchantApplicationRates, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


export const approveMerchantApplicationRate = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.approveMerchantApplicationRates, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const declineMerchantApplicationRate = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.declineMerchantApplicationRates, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteMultipleImage = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteMultipleImage, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getSmsCampaignData = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getSMSCampaign}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addSmsCampaignData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createSMSCampaign, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteSmsCampaignData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteSMSCampaign, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateSmsCampaignData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateSMSCampaign, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailSmsCampaignData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.detailSMSCampaign, { id: payload.id });

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getSmsCampaignPreviewMobileListData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.getSMSCampaignPreviewList}?${searchString}`, payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const smsCampaignSendEmailData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.smsCampaignSendSMS, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

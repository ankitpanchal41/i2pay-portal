import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";
import RestStore from "../../apiMethod/storeMethod";

export const getEmailCampaignData = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getEmailCampaign}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addEmailCampaignData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createEmailCampaign, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteEmailCampaignData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteEmailCampaign, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateEmailCampaignData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateEmailCampaign, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailEmailCampaignData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.detailEmailCampaign, { id: payload.id });

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getEmailCampaignPreviewEmailListData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.getEmailCampaignPreviewList}?${searchString}`, payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const emailCampaignSendEmailData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.emailCampaignSendEmail, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

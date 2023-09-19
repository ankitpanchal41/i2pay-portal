import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getAPIKeyData = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.getAPIKey, payload);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const addAPIKeyData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createAPIKey, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteAPIKeyData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteAPIKey, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

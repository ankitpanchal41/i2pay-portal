import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getRulesData = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getRules}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};


export const getRulesDetailData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getRulesDetail, payload);

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

export const createRulesData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createRules, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const setRulesStatusData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateRulesStatus, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateRulesData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateRules, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


export const updateRulesPriorityData = async (payload) => {
    console.log("service", payload);
    try {
        const { data } = await Rest.post(apiRoutes.updateRulesPriority, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteRule = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteRules, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

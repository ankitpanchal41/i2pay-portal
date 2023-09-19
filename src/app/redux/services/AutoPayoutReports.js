import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const autoPayoutReportsData = async (value) => {
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

        const { data } = await Rest.post(`${apiRoutes.autoPayoutReports}?${searchString}`, value.payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const autoPayoutSetting = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.autoPayoutSetting, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getAutoPayoutSettingData = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.autoPayoutSetting, payload);
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

export const getPayoutConnectorData = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.payoutConnector, payload);
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

export const generatePayout = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.generatePayout, payload);

        showToastMessage(data?.options?.validation[0] || data?.response, "info");

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getAutoPayoutDetailData = async (reportId) => {
    try {
        let searchString = "";
        if (reportId) {
            searchString += `invoice_no=${reportId}`;
        }

        const { data } = await Rest.get(`${apiRoutes.getAutoPayoutDetail}?${searchString}`);
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

export const getPayoutModeData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getPayoutModeData, payload);

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

export const getPayoutModeFieldData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getPayoutModeFieldData, payload);

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

export const getPayoutDetailData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.getPayoutDetailData, payload);

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

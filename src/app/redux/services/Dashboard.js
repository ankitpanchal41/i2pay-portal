import { apiRoutes } from "./apiRoutes";
import Rest from "../../apiMethod/index";
import { showToastMessage } from "../../utils/methods";

export const getWidgetListData = async (value) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.widgetList}`, value?.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getEducationCategoryData = async (value) => {
    try {
        const { data } = await Rest.get(`${apiRoutes.educationCategoryList}`, value?.payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const getConnectorLogo = async (payload) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.connectorLogoList}`, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return error;
    }
};

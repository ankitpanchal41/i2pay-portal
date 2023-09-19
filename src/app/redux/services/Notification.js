import { apiRoutes } from "./apiRoutes";
import Rest from "../../apiMethod/index";

export const getNotificationData = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getNotification}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getNotificationDetail = async (payload) => {
    try {

        const { data } = await Rest.post(apiRoutes.getNotificationDetail, payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const deleteNotificationData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteNotification, payload);
        // showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

import { apiRoutes } from "./apiRoutes";
import Rest from "../../apiMethod/index";

export const getEmailCampaignSentHistoryData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.getContactEmailHistory}?${searchString}`, payload);

        return data;
    } catch (error) {
        return error;
    }
};

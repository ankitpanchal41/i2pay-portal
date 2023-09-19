import { apiRoutes } from "./apiRoutes";
import Rest from "../../apiMethod/index";

export const getSmsCampaignSentHistoryData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.getContactSmsHistory}?${searchString}`, payload);

        return data;
    } catch (error) {
        return error;
    }
};

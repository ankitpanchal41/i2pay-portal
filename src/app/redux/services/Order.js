import { apiRoutes } from "./apiRoutes";
import RestStore from "../../apiMethod/storeMethod";


export const getOrderList = async (value, payload) => {
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

        const { data } = await RestStore.post(`${apiRoutes.orderList}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

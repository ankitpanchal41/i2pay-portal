import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import RestStore from "../../apiMethod/storeMethod";

// export const getStoreFrontListData = async (payload) => {
//     try {
//         const { data } = await RestStore.post(apiRoutes.getStoreList, payload);
//
//         return data;
//     } catch (error) {
//         return {
//             error: true,
//             data: error,
//         };
//     }
// };


export const getStoreFrontListData = async (value, payload) => {
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

        const { data } = await RestStore.post(`${apiRoutes.getStoreList}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};


export const addStoreFrontData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.creteStore, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const editStoreFrontData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.updateStore, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateStoreFrontStatus = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.updateStoreStatus, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteStoreFrontData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.deleteStore, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getStoreFrontData = async (payload) => {
    try {
        const { data } = await RestStore.post(apiRoutes.getStore, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

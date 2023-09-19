import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const addInvoice = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createInvoice, payload, true);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateInvoice = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateInvoice, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteInvoice = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteInvoice, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailInvoice = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.detailsInvoice, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};
// export const listInvoice = async (payload) => {
//     try {
//         const { data } = await Rest.get(apiRoutes.listInvoice, payload);
//
//         return data;
//     } catch (error) {
//         return {
//             error: true,
//             data: error,
//         };
//     }
// };

export const listInvoice = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.listInvoice}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const payInvoice = async (payload, secrete_key) => {
    try {
        const { data } = await Rest.post(apiRoutes.payment, payload, false, {
            authorization: secrete_key,
        });

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const sendInvoice = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.sendInvoice, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const downloadInvoice = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.downloadInvoice, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

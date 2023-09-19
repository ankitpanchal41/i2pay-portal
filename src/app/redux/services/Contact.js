import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getContactData = async (value, payload) => {
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

        const { data } = await Rest.get(`${apiRoutes.getContact}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const addContactData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.createContact, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const deleteContactData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteContact, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updateContactData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updateContact, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const detailContactData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.detailContact, { contact_id: payload.id });

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const categoryListData = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.contactCategoryList + payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const downloadSampleFile = async () => {
    try {
        const { data } = await Rest.get(apiRoutes.contactDownloadSampleFile);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const importContact = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.contactImport, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const contactFilter = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.contactFilter, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const downloadContactExcel = async (value) => {
    try {
        let searchString = "";
        if (value !== "") {
            searchString += `?search=${value}`;
        }

        const { data } = await Rest.post(`${apiRoutes.contactExport}${searchString}`);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
            return false;
        }
        return data;
    } catch (error) {
        return error;
    }
};

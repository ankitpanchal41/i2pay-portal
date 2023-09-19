import { apiRoutes } from "./apiRoutes";
import Rest from "../../apiMethod/index";
import { showToastMessage } from "../../utils/methods";

export const getTransactionsData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.getTransactions}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getTransactionsLiveData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.getTransactionsLive}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getTransactionsRefundData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.transactionsRefund}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getTransactionsChargeBackData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.transactionsChargeBack}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getTransactionsSuspiciousData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.transactionsSuspicious}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getTransactionsRetrievalData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.transactionsRetrieval}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getTransactionsRemoveRetrievalData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.transactionsRemoveRetrieval}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getTransactionsRemoveSuspiciousData = async (value, payload) => {
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

        const { data } = await Rest.post(`${apiRoutes.transactionsRemoveSuspicious}?${searchString}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const changeTransactionStatusData = async (value, payload) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.transactionChangeStatus}`, value.payload);

        return data;
    } catch (error) {
        return error;
    }
};

export const getVendorListData = async (payload) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.getVendorList}`, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const addSplitPaymentData = async (payload) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.addSplitPayment}`, payload);

        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return error;
    }
};

export const getSplitTransactionsData = async (payload) => {
    try {
        const { data } = await Rest.post(`${apiRoutes.getSplitTransactions}`, payload);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return error;
    }
};

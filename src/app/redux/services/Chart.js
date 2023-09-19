import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const getTransactionStatusChartData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.transactionStatus, payload);

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

export const getConnectorTransactionChartData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.connectorTransaction, payload);

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

export const getPaymentMethodTransactionChartData = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.paymentMethodTransaction, payload);

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

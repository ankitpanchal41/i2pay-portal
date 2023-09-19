import Rest from "../../apiMethod/index";
import { apiRoutes } from "./apiRoutes";

export const settlementsData = async (connectorId) => {
    try {
        const { data } = await Rest.get(`${apiRoutes.settlementData}/${connectorId}`);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const settlementsPreviewData = async (connectorId, settlementId) => {
    try {
        const { data } = await Rest.get(`${apiRoutes.settlementPreviewData}/${connectorId}/${settlementId}`);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const settlementsConnectorList = async () => {
    try {
        const { data } = await Rest.get(apiRoutes.settlementConnectorList);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

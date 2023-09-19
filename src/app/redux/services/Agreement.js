import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const uploadAgreement = async (payload) => {

    console.log("payload", payload);
    try {
        const { data } = await Rest.post(apiRoutes.uploadAgreement, payload, true);

        if (data?.responseCode !== 200) {
            showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        } else {
            showToastMessage(data?.response, data?.responseCode);
        }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

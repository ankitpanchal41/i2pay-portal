import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod";

export const submitStep = async (payload, stepNumber) => {
    try {
        const { data } = await Rest.post(apiRoutes.applicationStep(stepNumber), payload);
        // const { data } = await callApi(apiRoutes.applicationStep(stepNumber), {
        //     method: "POST",
        //     data: payload,
        //     // headers: {
        //     //     "Content-Type": "multipart/form-data",
        //     // },
        // });

        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        if (data?.responseCode === 200) {
            return data;
        } else {
            return false;
        }
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const handleDirectorShareholderDelete = async (payload, type) => {
    try {
        const { data } = await Rest.post(apiRoutes.deleteDirectorShareholder(type), payload);
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const handleApplicationList = async () => {
    try {
        const { data } = await Rest.get(apiRoutes.applicationList);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

import { callApi } from ".";
import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const sendOTP = async (payload) => {
    try {
        // const { data } = await callApi(apiRoutes.merchantSendOTP, { method: "POST", data: payload });
        const { data } = await Rest.post(apiRoutes.merchantSendOTP, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const registerUser = async (payload) => {
    try {
        // const { data } = await callApi(apiRoutes.merchantRegister, { method: "POST", data: payload });
        const { data } = await Rest.post(apiRoutes.merchantRegister, payload);
        // showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const loginUserApi = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.merchantLogin.url, payload);
        // const { data } = await callApi(apiRoutes.merchantLogin, { method: "POST", data: payload });
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const loginTFAUserApi = async (payload, captchaPayload) => {
    try {
        const captchaVerifyResult = await authApiHandlerPost(apiRoutes.captchaVerify, captchaPayload, false);
        if (process.env.NODE_ENV === "development" || captchaVerifyResult?.responseCode === 200) {
            const result = await authApiHandlerPost(apiRoutes.merchantLoginNew, payload, false);
            if (result?.responseCode === 200) {
                return result;
            }
        }

        // showToastMessage("Something went wrong!", 500);
        return false;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const uniqueValidations = async (payload, catpchaPayload) => {
    try {
        const { data: captchaVerifyResult } = await Rest.post(apiRoutes.captchaVerify.url, catpchaPayload);
        // const { data: captchaVerifyResult } = await callApi(apiRoutes.captchaVerify.url, { method: "POST", data: catpchaPayload });
        if (process.env.NODE_ENV === "development" || captchaVerifyResult?.responseCode === 200) {
            const { data } = await Rest.post(apiRoutes.uniqueValidation, payload);
            // const { data } = await callApi(apiRoutes.uniqueValidation, { method: "POST", data: payload });
            data?.options?.validation?.forEach((v) => {
                showToastMessage(v, data?.responseCode);
            });

            return data;
        } else {
            return captchaVerifyResult;
        }
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const handleChangePassword = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.changePassword, payload);
        // const { data } = await callApi(apiRoutes.changePassword, { method: "POST", data: payload });
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const forgotPassword = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.forgotPassword, payload);
        // const { data } = await callApi(apiRoutes.forgotPassword, { method: "POST", data: payload });
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const verifyTokenStatus = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.verifyPasswordToken, payload);
        // const { data } = await callApi(apiRoutes.verifyPasswordToken, { method: "POST", data: payload });
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const updatePassword = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.updatePassword, payload);
        // const { data } = await callApi(apiRoutes.updatePassword, payload);
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const verifyToken = async (payload) => {
    try {
        const { data } = await callApi(apiRoutes.captchaVerify, { method: "POST", data: payload });
        showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const getCategoryListData = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.categoryList, payload);

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

export const authApiHandlerPost = async (route, payload, shouldShowMessage = true) => {
    try {
        const { data } = await Rest.post(route.url, payload);

        if (shouldShowMessage) {
            if (data?.options?.validation) {
                data?.options?.validation?.forEach(() => {
                    // showToastMessage(v, data?.responseCode);
                });
            } else {
                showToastMessage(data?.response, data?.responseCode);
            }
        }
        return data;
    } catch (error) {
        return error;
    }
};

// export const authApiHandlerGET = async (route, payload, shouldShowMessage = true) => {
//     try {
//         const { data } = await Rest.get(route.url, payload);
//
//         // const { data } = await callApi(route.url, { method: route.method || "GET", data: payload });
//
//         console.log("data?.response", data?.response);
//         console.log("data?.response", { shouldShowMessage });
//         if (shouldShowMessage) {
//             if (data?.options?.validation) {
//                 data?.options?.validation?.forEach((v) => {
//                     showToastMessage(v, data?.responseCode);
//                 });
//             } else {
//                 showToastMessage(data?.response, data?.responseCode);
//             }
//         }
//         return data;
//     } catch (error) {
//         return error;
//     }
// };

export const getMerchantDetail = async (payload) => {
    try {
        const { data } = await Rest.getDetails(apiRoutes.merchantDetail, payload);

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

export const verifyRP = async (payload) => {
    try {
        const { data } = await Rest.get(apiRoutes.verifyRp + payload);
        console.log({ data });
        if (data === undefined) {
            return 500;
        }
        // if (data?.responseCode !== 200) {
        //     showToastMessage(data?.options?.validation[0] || data?.response, data?.responseCode);
        //     return data?.responseCode;
        // }

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

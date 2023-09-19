import { apiRoutes } from "./apiRoutes";
import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const setProfilePic = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.profileUpdate, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const editProfile = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.editUpdate, payload);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const verifyMobileOtp = async (payload, loginToken = null) => {
    try {
        const { data } = await Rest.post(apiRoutes.verifyMobileOtp, payload, false, {}, loginToken);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const resendOtp = async (payload, loginToken = null) => {
    try {
        const { data } = await Rest.post(apiRoutes.resendProfileOTP, payload, false, {}, loginToken);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};


export const emailVerify = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.emailVerify, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const changeVerificationFlag = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.changeVerificationFlag, payload);
        showToastMessage(data?.response, data?.responseCode);

        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const forgetGoogleAuthenticator = async (payload) => {
    try {
        const { data } = await Rest.post(apiRoutes.forgetGoogleAuthenticator, payload);
        showToastMessage(data?.response, data?.responseCode);
        return data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

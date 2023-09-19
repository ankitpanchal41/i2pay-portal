import axios from "axios";
import { logoutUser } from "../redux/actions/PersistActions";
import { store } from "../redux/store/index";
import { showToastMessage } from "../utils/methods";
import unregisterFirebase from "../utils/unregisterdFCMToken";

axios.defaults.timeout = 1000 * 60;
axios.defaults.headers = {
    // "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    // Expires: 0,
    Accept: "application/json",
};

export default class Rest {
    static async get(url) {
        const { userData } = store.getState()?.persist;
        const token = userData?.data?.token;

        const instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: { authorization: `Bearer ${token}` },
        });

        return await instance
            .get(url)
            .then((res) => {
                if (res?.data?.responseCode === 401) {
                    store.dispatch(logoutUser());
                    unregisterFirebase();
                    return false;
                } else if (res?.data?.responseCode !== 200) {
                    showToastMessage(res?.data?.options?.validation[0] || res?.data?.response, res?.data?.responseCode);
                    return false;
                } else {
                    return res;
                }
            })
            .catch((error) => {
                if (error?.response === undefined || error?.code === "ECONNABORTED") {
                    showToastMessage("Please check your internet connection", 400);
                } else if (error?.response?.status === 404) {
                    showToastMessage(error?.response?.data?.response, error?.response?.status);
                    return {
                        data: error?.response?.status,
                    };
                } else {
                    showToastMessage("Something went wrong", 400);
                }
                return error;
            });
    }

    static async post(url, payload = {}, formData = false, headers = {}, loginToken = null) {
        const { userData } = store.getState()?.persist;
        const token = loginToken || userData?.data?.token;
        const instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": formData ? "multipart/form-data" : "application/json",
                ...headers,
            },
        });

        return await instance
            .post(url, payload)
            .then((res) => {
                if (res?.data?.responseCode === 401) {
                    store.dispatch(logoutUser());
                    unregisterFirebase();
                    return false;
                } else if (res?.data?.responseCode !== 200 && res?.data?.status_code !== 2) {
                    showToastMessage(res?.data?.options?.validation[0] || res?.data?.response, res?.data?.responseCode);
                    return false;
                } else {
                    return res;
                }
            })
            .catch((error) => {
                if (error?.response === undefined || error?.code === "ECONNABORTED") {
                    showToastMessage("Please check your internet connection", 400);
                } else if (error?.response?.status === 404) {
                    showToastMessage(error?.response?.data?.response, error?.response?.status);
                    return {
                        data: error?.response?.status,
                    };
                } else {
                    showToastMessage("Something went wrong", 400);
                }
                return false;
            });
    }

    static async getDetails(url, payload) {
        const instance = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            headers: { authorization: `Bearer ${payload}`, "Content-Type": "application/json" },
        });

        return await instance
            .get(url)
            .then((res) => {
                if (res?.data?.responseCode === 401) {
                    store.dispatch(logoutUser());
                    unregisterFirebase();
                    return false;
                } else if (res?.data?.responseCode !== 200 && res?.data?.status_code !== 2) {
                    showToastMessage(res?.data?.options?.validation[0] || res?.data?.response, res?.data?.responseCode);
                    return false;
                } else {
                    return res;
                }
            })
            .catch((error) => {
                if (error?.response === undefined || error?.code === "ECONNABORTED") {
                    showToastMessage("Please check your internet connection", 400);
                } else {
                    showToastMessage("Something went wrong", 400);
                }

                return error;
            });
    }

    static async checkPanCardImage(payload = {}) {
        const instance = axios.create({
            baseURL: "https://lynk.host",
        });

        return await instance
            .post("/api/pan-card-detail", payload)
            .then((res) => {
                if (res?.data?.status === "fail") {
                    showToastMessage(res?.data?.message);
                    return false;
                } else {
                    return res?.data;
                }
            })
            .catch((error) => {
                if (error?.response === undefined || error?.code === "ECONNABORTED") {
                    showToastMessage("Please check your internet connection", 400);
                } else {
                    showToastMessage("Something went wrong", 400);
                }
                return false;
            });
    }

    static async checkAadharCardImage(payload = {}) {
        const instance = axios.create({
            baseURL: "https://lynk.host",
        });

        return await instance
            .post("/api/aadhar-card-detail", payload)
            .then((res) => {
                if (res?.data?.is_back_ok === false || res?.data?.is_front_ok === false) {
                    showToastMessage(res?.data?.front_back_image_msg);
                    return false;
                } else {
                    return res?.data;
                }
            })
            .catch((error) => {
                if (error?.response === undefined || error?.code === "ECONNABORTED") {
                    showToastMessage("Please check your internet connection", 400);
                } else {
                    showToastMessage("Something went wrong", 400);
                }
                return false;
            });
    }
}

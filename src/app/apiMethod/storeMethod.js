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

export default class RestStore {
    static async get(url) {
        const { userData } = store.getState()?.persist;
        const token = userData?.data?.token;

        const instance = axios.create({
            baseURL: process.env.REACT_APP_STORE_API_URL,
            headers: { authorization: `${token}` },
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
                return false;
            });
    }

    static async post(url, payload = {}, formData = false) {
        const { userData } = store.getState()?.persist;
        const token = userData?.data?.token;
        const instance = axios.create({
            baseURL: process.env.REACT_APP_STORE_API_URL,
            headers: {
                authorization: `${token}`,
                "Content-Type": formData ? "multipart/form-data" : "application/json",
            },
        });

        return await instance
            .post(url, payload)
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
                return false;
            });
    }

    static async errorPost(url, payload = {}, formData = false) {
        const { userData } = store.getState()?.persist;
        const token = userData?.data?.token;
        const instance = axios.create({
            baseURL: process.env.REACT_APP_STORE_API_URL,
            headers: {
                authorization: `${token}`,
                "Content-Type": formData ? "multipart/form-data" : "application/json",
            },
        });

        return await instance
            .post(url, payload)
            .then((res) => {
                if (res?.data?.responseCode === 401) {
                    store.dispatch(logoutUser());
                    unregisterFirebase();
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

    // static async post(url) {
    //     return await axios
    //         .post("merchant/merchant/connectors/get")
    //         .then((res) => {
    //             console.log({ res });
    //         })
    //         .catch((error) => {
    //             console.log({ error });
    //         });
    // }
}

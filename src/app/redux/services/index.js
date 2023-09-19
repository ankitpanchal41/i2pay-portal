import axios from "axios";
import { store } from "../store/index";

// const client = axios.create({
//     baseURL: "https://admin.payomatix.com/",
// });

// client.interceptors.request.use(
//     (config) => {
//         const { userData } = store.getState()?.persist;
//         const token = userData?.data?.token;

//         if (token) {
//             config.headers.authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => Promise.reject(error),
// );

export async function callApi(path, options, params, baseURL) {
    // if (params) {
    //     path += serializeQueryParams(params);
    // }

    const { userData } = store.getState()?.persist;
    const token = userData?.data?.token;

    const authConfig = {};
    if (token) {
        authConfig.authorization = `Bearer ${token}`;
    }

    try {
        const response = await axios({
            url: (baseURL || "https://admin.payomatix.com/") + path,
            ...options,
            headers: {
                ...options.headers,
                ...authConfig,
            },
        });

        return response;
    } catch (error) {
        throw error;
    }
}

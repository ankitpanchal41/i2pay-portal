import { apiRoutes } from "./apiRoutes";
// import { showToastMessage } from "../../utils/methods";
import Rest from "../../apiMethod/index";

export const googleAuthPair = async (payload) => {
    try {
        const { data } = await Rest.get(
            `${apiRoutes.googleAuthPair}AppName=Payomatix&AppInfo=${payload?.email}&SecretCode=${payload?.secretCode}`,
        );

        return data?.data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

export const googleAuthValidate = async (payload) => {
    try {
        const { data } = await Rest.get(`${apiRoutes.googleAuthValidate}Pin=${payload?.pin}&SecretCode=${payload?.secretCode}`);

        return data?.data;
    } catch (error) {
        return {
            error: true,
            data: error,
        };
    }
};

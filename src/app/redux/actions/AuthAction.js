import { VERIFY_TOKEN_START } from "../types/Auth";

export const verifyTokenStart = (payload) => ({
    type: VERIFY_TOKEN_START,
    payload,
});

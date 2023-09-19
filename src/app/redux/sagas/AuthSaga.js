import { all, fork, takeEvery, call } from "redux-saga/effects";
import { verifyToken } from "../services/AuthService";
import { VERIFY_TOKEN_START } from "../types/Auth";

function* checkToken(data) {
    try {
        const payload = {
            recaptcha: data?.payload,
            server: process.env.NODE_ENV,
        };
        const result = yield call(verifyToken, payload);
        console.log("RESULT", result);
    } catch (error) {
        console.log("ERROR", error);
    }
}

function* watchVerifyTokenStart() {
    yield takeEvery(VERIFY_TOKEN_START, checkToken);
}

export default function* rootSaga() {
    yield all([fork(watchVerifyTokenStart)]);
}

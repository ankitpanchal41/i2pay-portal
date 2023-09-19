import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { setLoading } from "../actions/Loader";
import { addInvoiceEnd, ADD_INVOICE_START, editInvoiceEnd, EDIT_INVOICE_START, loginEnd } from "../actions/PersistActions";
import { apiRoutes } from "../services/apiRoutes";

import { authApiHandlerPost, getMerchantDetail } from "../services/AuthService";
import { DETAIL_START, LOGIN_START } from "../types/Persist";

function* loginSaga(data) {
    try {
        yield put(setLoading(true));
        const captchaVerifyResult = yield call(authApiHandlerPost, apiRoutes.captchaVerify, data?.captchaToken, false);
        if (process.env.NODE_ENV === "development" || captchaVerifyResult?.responseCode === 200) {
            const result = yield call(authApiHandlerPost, apiRoutes.merchantLoginNew, data?.payload);
            if (result?.responseCode === 200) {
                yield put(loginEnd(result));
            }
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        yield put(setLoading(false));
    }
}

function* detailSaga(data) {
    try {
        yield put(setLoading(true));
        // const captchaVerifyResult = yield call(authApiHandler, apiRoutes.captchaVerify, data?.captchaToken, false);
        // if (process.env.NODE_ENV === "development" || captchaVerifyResult?.responseCode === 200) {
        const result = yield call(getMerchantDetail, data?.payload);
        console.log({ result });
        if (result?.responseCode === 200) {
            yield put(loginEnd(result));
        }
        // }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        yield put(setLoading(false));
        data.callback();
    }
}

function* addInvoiceSaga(data) {
    try {
        yield put(setLoading(true));
        yield put(addInvoiceEnd(data.payload));
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        yield put(setLoading(false));
        data.callback();
    }
}

function* editInvoiceSaga(data) {
    try {
        yield put(setLoading(true));
        yield put(editInvoiceEnd(data.payload));
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        yield put(setLoading(false));
        data.callback();
    }
}

function* watchLoginSaga() {
    yield takeEvery(LOGIN_START, loginSaga);
}

function* watchDetailSaga() {
    yield takeEvery(DETAIL_START, detailSaga);
}

function* watchAddInvoiceSaga() {
    yield takeEvery(ADD_INVOICE_START, addInvoiceSaga);
}

function* watchEditInvoiceSaga() {
    yield takeEvery(EDIT_INVOICE_START, editInvoiceSaga);
}

export default function* rootSaga() {
    yield all([fork(watchLoginSaga), fork(watchAddInvoiceSaga), fork(watchEditInvoiceSaga), fork(watchDetailSaga)]);
}

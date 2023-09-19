import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    approveMerchantApplicationRate,
    declineMerchantApplicationRate,
    detailMerchantApplicationRate,
} from "../services/MerchantApplicationRates";
import {
    DETAIL_MERCHANT_APPLICATION_RATES_REQUEST,
    DETAIL_MERCHANT_APPLICATION_RATES_RESPONSE,
    APPROVE_MERCHANT_APPLICATION_RATES_REQUEST,
    APPROVE_MERCHANT_APPLICATION_RATES_RESPONSE,
    DECLINE_MERCHANT_APPLICATION_RATES_REQUEST,
    DECLINE_MERCHANT_APPLICATION_RATES_RESPONSE,
} from "../types/MerchantApplicationRates";

function* detailSmsTemplateSaga(action) {
    try {
        const result = yield call(detailMerchantApplicationRate, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_MERCHANT_APPLICATION_RATES_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* approveMerchantApplicationRatesSage(action) {
    try {
        const result = yield call(approveMerchantApplicationRate, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: APPROVE_MERCHANT_APPLICATION_RATES_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* declineMerchantApplicationRatesSage(action) {
    try {
        const result = yield call(declineMerchantApplicationRate, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DECLINE_MERCHANT_APPLICATION_RATES_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchSetMerchantApplicationRatesSaga() {
    yield takeEvery(DETAIL_MERCHANT_APPLICATION_RATES_REQUEST, detailSmsTemplateSaga);
    yield takeEvery(APPROVE_MERCHANT_APPLICATION_RATES_REQUEST, approveMerchantApplicationRatesSage);
    yield takeEvery(DECLINE_MERCHANT_APPLICATION_RATES_REQUEST, declineMerchantApplicationRatesSage);
}

export default function* rootSaga() {
    yield all([fork(watchSetMerchantApplicationRatesSaga)]);
}

import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    ADD_PAYMENT_PAGE_REQUEST,
    ADD_PAYMENT_PAGE_RESPONSE,
    DELETE_PAYMENT_PAGE_REQUEST,
    DELETE_PAYMENT_PAGE_RESPONSE,
    GET_PAYMENT_PAGE_REQUEST,
    GET_PAYMENT_PAGE_RESPONSE,
    UPDATE_PAYMENT_PAGE_REQUEST,
    UPDATE_PAYMENT_PAGE_RESPONSE,
    DETAIL_PAYMENT_PAGE_REQUEST,
    DETAIL_PAYMENT_PAGE_RESPONSE,
} from "../actions/PaymentPageAction";
import {
    addPaymentPageData,
    deletePaymentPageData,
    getPaymentPageData,
    updatePaymentPageData,
    detailPaymentPageData,
    paymentPageSendData,
} from "../services/PaymentPage";

function* getPaymentPageSaga(data) {
    try {
        const result = yield call(getPaymentPageData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_PAYMENT_PAGE_RESPONSE,
                payload: { paymentPage: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* addPaymentPageSaga(action) {
    try {
        const result = yield call(addPaymentPageData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_PAYMENT_PAGE_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deletePaymentPageSaga(action) {
    // return;
    try {
        const result = yield call(deletePaymentPageData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_PAYMENT_PAGE_RESPONSE,
                data: result,
                id: action?.payload?.payment_link_id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updatePaymentPageSaga(action) {
    try {
        const result = yield call(updatePaymentPageData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_PAYMENT_PAGE_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailPaymentPageSaga(action) {
    try {
        const result = yield call(detailPaymentPageData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_PAYMENT_PAGE_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchPaymentPageSaga() {
    yield takeEvery(GET_PAYMENT_PAGE_REQUEST, getPaymentPageSaga);
    yield takeEvery(ADD_PAYMENT_PAGE_REQUEST, addPaymentPageSaga);
    yield takeEvery(DELETE_PAYMENT_PAGE_REQUEST, deletePaymentPageSaga);
    yield takeEvery(UPDATE_PAYMENT_PAGE_REQUEST, updatePaymentPageSaga);
    yield takeEvery(DETAIL_PAYMENT_PAGE_REQUEST, detailPaymentPageSaga);
}

export default function* rootSaga() {
    yield all([fork(watchPaymentPageSaga)]);
}

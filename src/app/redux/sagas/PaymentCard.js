import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    ADD_PAYMENT_CARD_REQUEST,
    ADD_PAYMENT_CARD_RESPONSE,
    DELETE_PAYMENT_CARD_REQUEST,
    DELETE_PAYMENT_CARD_RESPONSE,
    GET_PAYMENT_CARD_REQUEST,
    GET_PAYMENT_CARD_RESPONSE,
    UPDATE_PAYMENT_CARD_REQUEST,
    UPDATE_PAYMENT_CARD_RESPONSE,
    DETAIL_PAYMENT_CARD_REQUEST,
    DETAIL_PAYMENT_CARD_RESPONSE,
    PAYMENT_CARD_SEND_REQUEST,
    PAYMENT_CARD_SEND_RESPONSE,
} from "../actions/PaymentCardAction";
import {
    addPaymentCardData,
    deletePaymentCardData,
    getPaymentCardData,
    updatePaymentCardData,
    detailPaymentCardData,
    paymentCardSendData,
} from "../services/PaymentCard";

function* getPaymentCardSaga(data) {
    try {
        const result = yield call(getPaymentCardData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_PAYMENT_CARD_RESPONSE,
                payload: { paymentCard: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* addPaymentCardSaga(action) {
    try {
        const result = yield call(addPaymentCardData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_PAYMENT_CARD_RESPONSE,
                data: result,
            });
            action.navigateState();
        } else if (result.responseCode === 422) {
            action?.variantError(result);
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deletePaymentCardSaga(action) {
    // return;
    try {
        const result = yield call(deletePaymentCardData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_PAYMENT_CARD_RESPONSE,
                data: result,
                id: action?.payload?.paymentCardId,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updatePaymentCardSaga(action) {
    try {
        const result = yield call(updatePaymentCardData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_PAYMENT_CARD_RESPONSE,
                data: result,
            });
            action.navigateState();
        } else if (result.responseCode === 422) {
            action?.variantError(result);
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailPaymentCardSaga(action) {
    try {
        const result = yield call(detailPaymentCardData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_PAYMENT_CARD_RESPONSE,
                data: result?.data[0],
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* paymentCardSendSaga(action) {
    try {
        const result = yield call(paymentCardSendData, action.payload);

        if (result?.responseCode === 200) {
            yield put({
                type: PAYMENT_CARD_SEND_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchPaymentCardSaga() {
    yield takeEvery(GET_PAYMENT_CARD_REQUEST, getPaymentCardSaga);
    yield takeEvery(ADD_PAYMENT_CARD_REQUEST, addPaymentCardSaga);
    yield takeEvery(DELETE_PAYMENT_CARD_REQUEST, deletePaymentCardSaga);
    yield takeEvery(UPDATE_PAYMENT_CARD_REQUEST, updatePaymentCardSaga);
    yield takeEvery(DETAIL_PAYMENT_CARD_REQUEST, detailPaymentCardSaga);
    yield takeEvery(PAYMENT_CARD_SEND_REQUEST, paymentCardSendSaga);
}

export default function* rootSaga() {
    yield all([fork(watchPaymentCardSaga)]);
}

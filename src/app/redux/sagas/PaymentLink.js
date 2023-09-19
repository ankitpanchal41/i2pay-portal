import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    ADD_PAYMENT_LINK_REQUEST,
    ADD_PAYMENT_LINK_RESPONSE,
    DELETE_PAYMENT_LINK_REQUEST,
    DELETE_PAYMENT_LINK_RESPONSE,
    GET_PAYMENT_LINK_REQUEST,
    GET_PAYMENT_LINK_RESPONSE,
    UPDATE_PAYMENT_LINK_REQUEST,
    UPDATE_PAYMENT_LINK_RESPONSE,
    DETAIL_PAYMENT_LINK_REQUEST,
    DETAIL_PAYMENT_LINK_RESPONSE, PAYMENT_LINK_SEND_REQUEST, PAYMENT_LINK_SEND_RESPONSE
} from "../actions/PaymentLinkAction";
import {
    addPaymentLinkData,
    deletePaymentLinkData,
    getPaymentLinkData,
    updatePaymentLinkData,
    detailPaymentLinkData,
    paymentLinkSendData
} from "../services/PaymentLink";

function* getPaymentLinkSaga(data) {
    try {

        const result = yield call(getPaymentLinkData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_PAYMENT_LINK_RESPONSE,
                payload: { paymentLink: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        data?.callback();
    }
}

function* addPaymentLinkSaga(action) {
    try {
        const result = yield call(addPaymentLinkData, action.payload);
        if (result?.responseCode === 200) {
            console.log({result})
            yield put({
                type: ADD_PAYMENT_LINK_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        action.callBack();
    }
}

function* deletePaymentLinkSaga(action) {
    // console.log("Delete Saga", {action});
    // return;
    try {
        const result = yield call(deletePaymentLinkData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_PAYMENT_LINK_RESPONSE,
                data: result,
                id: action?.payload?.payment_link_id,
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        action.callBack();
    }
}

export function* updatePaymentLinkSaga(action) {

    try {
        const result = yield call(updatePaymentLinkData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_PAYMENT_LINK_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        action.callBack();
    }

}

function* detailPaymentLinkSaga(action) {
    try {

        const result = yield call(detailPaymentLinkData, action.payload);

        if(result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            console.log({ result });
            yield put({
                type: DETAIL_PAYMENT_LINK_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        action.callBack();
    }
}

function* paymentLinkSendSaga(action) {
    try {

        const result = yield call(paymentLinkSendData, action.payload);


        if (result?.responseCode === 200) {
            console.log({ result });
            yield put({
                type: PAYMENT_LINK_SEND_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        action.callBack();
    }
}

function* watchPaymentLinkSaga() {
    yield takeEvery(GET_PAYMENT_LINK_REQUEST, getPaymentLinkSaga);
    yield takeEvery(ADD_PAYMENT_LINK_REQUEST, addPaymentLinkSaga);
    yield takeEvery(DELETE_PAYMENT_LINK_REQUEST, deletePaymentLinkSaga);
    yield takeEvery(UPDATE_PAYMENT_LINK_REQUEST, updatePaymentLinkSaga);
    yield takeEvery(DETAIL_PAYMENT_LINK_REQUEST, detailPaymentLinkSaga);
    yield takeEvery(PAYMENT_LINK_SEND_REQUEST, paymentLinkSendSaga);
}

export default function* rootSaga() {
    yield all([fork(watchPaymentLinkSaga)]);
}

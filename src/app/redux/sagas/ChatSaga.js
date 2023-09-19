import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
    GET_CONNECTOR_TRANSACTION_CHART_REQUEST,
    GET_CONNECTOR_TRANSACTION_CHART_RESPONSE,
    GET_PAYMENT_METHOD_TRANSACTION_CHART_REQUEST,
    GET_PAYMENT_METHOD_TRANSACTION_CHART_RESPONSE,
    GET_TRANSACTION_CHART_REQUEST,
    GET_TRANSACTION_CHART_RESPONSE,
} from "../actions/Chart";
import { getConnectorTransactionChartData, getPaymentMethodTransactionChartData, getTransactionStatusChartData } from "../services/Chart";

function* getTransactionStatusSaga(data) {
    try {
        const result = yield call(getTransactionStatusChartData, data?.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: GET_TRANSACTION_CHART_RESPONSE,
                data:  result?.data,
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        data?.callback();
    }
}

function* getConnectorTransactionSaga(data) {
    try {
        const result = yield call(getConnectorTransactionChartData, data?.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: GET_CONNECTOR_TRANSACTION_CHART_RESPONSE,
                data:  result?.data,
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        data?.callback();
    }
}

function* getPaymentMethodTransactionSaga(data) {
    try {
        const result = yield call(getPaymentMethodTransactionChartData, data?.payload);
        if (result.responseCode === 200) {
            yield put({
                type: GET_PAYMENT_METHOD_TRANSACTION_CHART_RESPONSE,
                data:  result?.data,
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        data?.callback();
    }
}

function* watchDashboardChatSaga() {
    yield takeEvery(GET_TRANSACTION_CHART_REQUEST, getTransactionStatusSaga);
    yield takeEvery(GET_CONNECTOR_TRANSACTION_CHART_REQUEST, getConnectorTransactionSaga);
    yield takeEvery(GET_PAYMENT_METHOD_TRANSACTION_CHART_REQUEST, getPaymentMethodTransactionSaga);
}

export default function* rootSaga() {
    yield all([fork(watchDashboardChatSaga)]);
}

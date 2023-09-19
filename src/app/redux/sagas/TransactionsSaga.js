import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    GET_TRANSACTIONS_START,
    GET_TRANSACTIONS_END,
    GET_TRANSACTIONS_REFUND_END,
    GET_TRANSACTIONS_REFUND_START,
    GET_TRANSACTIONS_CHARGEBACK_END,
    GET_TRANSACTIONS_CHARGEBACK_START,
    GET_TRANSACTIONS_SUSPICIOUS_END,
    GET_TRANSACTIONS_SUSPICIOUS_START,
    GET_TRANSACTIONS_REMOVE_SUSPICIOUS_END,
    GET_TRANSACTIONS_REMOVE_SUSPICIOUS_START,
    CHANGE_TRANSACTION_STATUS_END,
    CHANGE_TRANSACTION_STATUS_START,
    GET_TRANSACTIONS_RETRIEVAL_START,
    GET_TRANSACTIONS_RETRIEVAL_END,
    GET_TRANSACTIONS_REMOVE_RETRIEVAL_START,
    GET_TRANSACTIONS_REMOVE_RETRIEVAL_END,
    GET_TRANSACTIONS_LIVE_START,
    GET_TRANSACTIONS_LIVE_END,
    GET_TRANSACTIONS_TEST_END,
    GET_TRANSACTIONS_TEST_START,
} from "../actions/Transactions";
import {
    getTransactionsData,
    getTransactionsRefundData,
    getTransactionsChargeBackData,
    getTransactionsSuspiciousData,
    getTransactionsRemoveSuspiciousData,
    changeTransactionStatusData,
    getTransactionsRetrievalData,
    getTransactionsRemoveRetrievalData,
    getTransactionsLiveData,
} from "../services/Transactions";

function* getTransactionsSaga(data) {
    try {
        //debugger;
        // const formData = new FormData();

        const result = yield call(getTransactionsData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsSaga() {
    yield takeEvery(GET_TRANSACTIONS_START, getTransactionsSaga);
}

function* getTransactionsLiveSaga(data) {
    try {
        //debugger;
        // const formData = new FormData();

        const result = yield call(getTransactionsLiveData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_LIVE_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsLiveSaga() {
    yield takeEvery(GET_TRANSACTIONS_LIVE_START, getTransactionsLiveSaga);
}

function* getTransactionsTestSaga(data) {
    try {
        //debugger;
        // const formData = new FormData();

        const result = yield call(getTransactionsLiveData, data);

        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_TEST_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsTestSaga() {
    yield takeEvery(GET_TRANSACTIONS_TEST_START, getTransactionsTestSaga);
}

function* getTransactionsRefundSaga(data) {
    try {
        const result = yield call(getTransactionsRefundData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_REFUND_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsRefundSaga() {
    yield takeEvery(GET_TRANSACTIONS_REFUND_START, getTransactionsRefundSaga);
}

function* getTransactionsChargeBackSaga(data) {
    try {
        const result = yield call(getTransactionsChargeBackData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_CHARGEBACK_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsChargeBackSaga() {
    yield takeEvery(GET_TRANSACTIONS_CHARGEBACK_START, getTransactionsChargeBackSaga);
}

function* getTransactionsSuspiciousSaga(data) {
    try {
        const result = yield call(getTransactionsSuspiciousData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_SUSPICIOUS_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsSuspiciousSaga() {
    yield takeEvery(GET_TRANSACTIONS_SUSPICIOUS_START, getTransactionsSuspiciousSaga);
}

function* getTransactionsRemoveSuspiciousSaga(data) {
    try {
        const result = yield call(getTransactionsRemoveSuspiciousData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_REMOVE_SUSPICIOUS_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsRemoveSuspiciousSaga() {
    yield takeEvery(GET_TRANSACTIONS_REMOVE_SUSPICIOUS_START, getTransactionsRemoveSuspiciousSaga);
}

function* getTransactionsRetrievalSaga(data) {
    try {
        const result = yield call(getTransactionsRetrievalData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_RETRIEVAL_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsRetrievalSaga() {
    yield takeEvery(GET_TRANSACTIONS_RETRIEVAL_START, getTransactionsRetrievalSaga);
}

function* getTransactionsRemoveRetrievalSaga(data) {
    try {
        const result = yield call(getTransactionsRemoveRetrievalData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_TRANSACTIONS_REMOVE_RETRIEVAL_END,
                payload: { transactions: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchTransactionsRemoveRetrievalSaga() {
    yield takeEvery(GET_TRANSACTIONS_REMOVE_RETRIEVAL_START, getTransactionsRemoveRetrievalSaga);
}

function* changeTransactionStatusSaga(data) {
    try {
        const result = yield call(changeTransactionStatusData, data);

        if (result.responseCode === 200) {
            yield put({
                type: CHANGE_TRANSACTION_STATUS_END,
                payload: result.data,
            });
            data?.navigationState();
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchChangeTransactionStatusSaga() {
    yield takeEvery(CHANGE_TRANSACTION_STATUS_START, changeTransactionStatusSaga);
}

export default function* rootSaga() {
    yield all([fork(watchTransactionsSaga)]);
    yield all([fork(watchTransactionsLiveSaga)]);
    yield all([fork(watchTransactionsTestSaga)]);
    yield all([fork(watchTransactionsRefundSaga)]);
    yield all([fork(watchTransactionsChargeBackSaga)]);
    yield all([fork(watchTransactionsSuspiciousSaga)]);
    yield all([fork(watchTransactionsRemoveSuspiciousSaga)]);
    yield all([fork(watchTransactionsRetrievalSaga)]);
    yield all([fork(watchTransactionsRemoveRetrievalSaga)]);
    yield all([fork(watchChangeTransactionStatusSaga)]);
}

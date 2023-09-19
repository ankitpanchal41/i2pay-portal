import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
    ADD_WEBHOOK_REQUEST,
    ADD_WEBHOOK_RESPONSE,
    DELETE_WEBHOOK_REQUEST,
    DELETE_WEBHOOK_RESPONSE,
    GET_WEBHOOK_REQUEST,
    GET_WEBHOOK_RESPONSE,
    UPDATE_WEBHOOK_REQUEST,
    UPDATE_WEBHOOK_RESPONSE,
    DETAIL_WEBHOOK_REQUEST,
    DETAIL_WEBHOOK_RESPONSE,
    GET_WEBHOOK_LOGS_REQUEST,
    GET_WEBHOOK_LOGS_RESPONSE,
    TEST_WEBHOOK_REQUEST,
    TEST_WEBHOOK_RESPONSE,
} from "../actions/Webhook";
import {
    addWebhookData,
    deleteWebhookData,
    getWebhookData,
    updateWebhookData,
    detailWebhookData,
    getWebhookLogsData,
    testWebhookData,
} from "../services/Webhook";

function* getWebhookSaga(data) {
    try {
        const result = yield call(getWebhookData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_WEBHOOK_RESPONSE,
                payload: { webhook: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* addWebhookSaga(action) {
    try {
        const result = yield call(addWebhookData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_WEBHOOK_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteWebhookSaga(action) {
    // return;
    try {
        const result = yield call(deleteWebhookData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_WEBHOOK_RESPONSE,
                data: result,
                id: action?.payload?.id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateWebhookSaga(action) {
    try {
        const result = yield call(updateWebhookData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_WEBHOOK_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailWebhookSaga(action) {
    try {
        const result = yield call(detailWebhookData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_WEBHOOK_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* getWebhookLogsSaga(data) {
    try {
        const result = yield call(getWebhookLogsData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_WEBHOOK_LOGS_RESPONSE,
                payload: { webhookLogs: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* testWebhookSaga(action) {
    try {
        const result = yield call(testWebhookData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: TEST_WEBHOOK_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchWebhookSaga() {
    yield takeEvery(GET_WEBHOOK_REQUEST, getWebhookSaga);
    yield takeEvery(ADD_WEBHOOK_REQUEST, addWebhookSaga);
    yield takeEvery(DELETE_WEBHOOK_REQUEST, deleteWebhookSaga);
    yield takeEvery(UPDATE_WEBHOOK_REQUEST, updateWebhookSaga);
    yield takeEvery(DETAIL_WEBHOOK_REQUEST, detailWebhookSaga);
    yield takeEvery(GET_WEBHOOK_LOGS_REQUEST, getWebhookLogsSaga);
    yield takeEvery(TEST_WEBHOOK_REQUEST, testWebhookSaga);
}

export default function* rootSaga() {
    yield all([fork(watchWebhookSaga)]);
}

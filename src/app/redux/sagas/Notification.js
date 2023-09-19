import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    DELETE_NOTIFICATION_REQUEST,
    DELETE_NOTIFICATION_RESPONSE,
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_RESPONSE,
} from "../actions/Notification";
import { deleteNotificationData, getNotificationData } from "../services/Notification";

function* getNotificationSaga(data) {
    try {
        const result = yield call(getNotificationData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_NOTIFICATION_RESPONSE,
                payload: { notificationList: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* deleteNotificationSaga(action) {
    try {
        const result = yield call(deleteNotificationData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_NOTIFICATION_RESPONSE,
                data: result,
                id: action?.payload?.id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchNotificationSaga() {
    yield takeEvery(GET_NOTIFICATION_REQUEST, getNotificationSaga);
    yield takeEvery(DELETE_NOTIFICATION_REQUEST, deleteNotificationSaga);
}

export default function* rootSaga() {
    yield all([fork(watchNotificationSaga)]);
}

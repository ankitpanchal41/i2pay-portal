import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import { GET_WIDGET_LIST_REQUEST, GET_WIDGET_LIST_RESPONSE } from "../actions/Dashboard";
import { getWidgetListData } from "../services/Dashboard";

function* getWidgetListSaga(data) {
    try {
        const result = yield call(getWidgetListData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_WIDGET_LIST_RESPONSE,
                payload: result.data,
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        data?.callback();
    }
}

function* watchWidgetListSaga() {
    yield takeEvery(GET_WIDGET_LIST_REQUEST, getWidgetListSaga);
}

export default function* rootSaga() {
    yield all([fork(watchWidgetListSaga)]);
}

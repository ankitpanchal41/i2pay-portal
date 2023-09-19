import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import { addAPIKeyData, deleteAPIKeyData, getAPIKeyData } from "../services/APIKey";
import {
    ADD_API_KEY_REQUEST,
    ADD_API_KEY_RESPONSE,
    DELETE_API_KEY_REQUEST,
    DELETE_API_KEY_RESPONSE,
    GET_API_KEY_REQUEST,
    GET_API_KEY_RESPONSE,
} from "../actions/APIKey";

function* getAPIKeySaga(action) {
    try {
        const result = yield call(getAPIKeyData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: GET_API_KEY_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* addAPIKeySaga(action) {
    try {
        const result = yield call(addAPIKeyData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_API_KEY_RESPONSE,
                data: result?.data,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteAPIKeySaga(action) {
    try {
        const result = yield call(deleteAPIKeyData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_API_KEY_RESPONSE,
                data: result?.data,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchAPIKeySaga() {
    yield takeEvery(GET_API_KEY_REQUEST, getAPIKeySaga);
    yield takeEvery(ADD_API_KEY_REQUEST, addAPIKeySaga);
    yield takeEvery(DELETE_API_KEY_REQUEST, deleteAPIKeySaga);
}

export default function* rootSaga() {
    yield all([fork(watchAPIKeySaga)]);
}

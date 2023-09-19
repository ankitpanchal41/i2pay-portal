import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
    changeConnectorMode,
    getConnectorData,
    getConnectorSettings,
    getEnabledConnectorData,
    setConnectorData,
    setConnectorSettingsData,
} from "../services/Connector";
import {
    GET_CONNECTOR_REQUEST,
    GET_CONNECTOR_RESPONSE,
    GET_ENABLED_CONNECTOR_REQUEST,
    GET_ENABLED_CONNECTOR_RESPONSE,
    GET_CONNECTOR_SETTINGS_RESPONSE,
    GET_CONNECTOR_SETTINGS_REQUEST,
    UPDATE_CONNECTOR_REQUEST,
    UPDATE_CONNECTOR_RESPONSE,
    UPDATE_CONNECTOR_SETTINGS_REQUEST,
    UPDATE_CONNECTOR_SETTINGS_RESPONSE,
    UPDATE_CONNECTOR_MODE_REQUEST,
    UPDATE_CONNECTOR_MODE_RESPONSE,
} from "../actions/Connector";

function* getConnectorSaga(data) {
    try {
        const result = yield call(getConnectorData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_CONNECTOR_RESPONSE,
                payload: { connector: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* getEnabledConnectorSaga(data) {
    try {
        const result = yield call(getEnabledConnectorData, data);

        if (result.responseCode === 200) {
            yield put({
                type: GET_ENABLED_CONNECTOR_RESPONSE,
                payload: { enabledConnector: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callBack();
    }
}

export function* getConnectorSettingsSaga(action) {
    try {
        const result = yield call(getConnectorSettings, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: GET_CONNECTOR_SETTINGS_RESPONSE,
                data: result?.data,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateConnectorSaga(action) {
    try {
        const result = yield call(setConnectorData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_CONNECTOR_RESPONSE,
                data: result,
            });
            action.response(result);
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateConnectorSettingsSaga(action) {
    try {
        const result = yield call(setConnectorSettingsData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_CONNECTOR_SETTINGS_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateConnectorModeSaga(action) {
    try {
        const result = yield call(changeConnectorMode, action.payload);

        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_CONNECTOR_MODE_RESPONSE,
                data: result?.data,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchConnectorSaga() {
    yield takeEvery(GET_CONNECTOR_REQUEST, getConnectorSaga);
    yield takeEvery(GET_ENABLED_CONNECTOR_REQUEST, getEnabledConnectorSaga);
    yield takeEvery(GET_CONNECTOR_SETTINGS_REQUEST, getConnectorSettingsSaga);
    yield takeEvery(UPDATE_CONNECTOR_REQUEST, updateConnectorSaga);
    yield takeEvery(UPDATE_CONNECTOR_SETTINGS_REQUEST, updateConnectorSettingsSaga);
    yield takeEvery(UPDATE_CONNECTOR_MODE_REQUEST, updateConnectorModeSaga);
}

export default function* rootSaga() {
    yield all([fork(watchConnectorSaga)]);
}

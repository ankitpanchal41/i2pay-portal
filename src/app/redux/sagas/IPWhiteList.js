import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    ADD_IP_WHITELIST_REQUEST,
    ADD_IP_WHITELIST_RESPONSE,
    DELETE_IP_WHITELIST_REQUEST,
    DELETE_IP_WHITELIST_RESPONSE,
    GET_IP_WHITELIST_REQUEST,
    GET_IP_WHITELIST_RESPONSE,
    UPDATE_IP_WHITELIST_REQUEST,
    UPDATE_IP_WHITELIST_RESPONSE,
    DETAIL_IP_WHITELIST_REQUEST,
    DETAIL_IP_WHITELIST_RESPONSE,
} from "../actions/IPWhitelist";
import {
    addIPWhitelistData,
    deleteIPWhitelistData,
    getIPWhitelistData,
    updateIpWhitelistData,
    detailIpWhitelistData,
} from "../services/IPWhiteList";

function* getIPWhitelistSaga(data) {
    try {
        const result = yield call(getIPWhitelistData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_IP_WHITELIST_RESPONSE,
                payload: { ipWhitelist: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* addIPWhitelistSaga(action) {
    try {
        const result = yield call(addIPWhitelistData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_IP_WHITELIST_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteIPWhitelistSaga(action) {
    try {
        const result = yield call(deleteIPWhitelistData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_IP_WHITELIST_RESPONSE,
                data: result,
                id: action?.payload?.id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateIpWhitelistSaga(action) {
    try {
        const result = yield call(updateIpWhitelistData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_IP_WHITELIST_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailIpWhitelistSaga(action) {
    try {
        const result = yield call(detailIpWhitelistData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_IP_WHITELIST_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchIPWhiteListSaga() {
    yield takeEvery(GET_IP_WHITELIST_REQUEST, getIPWhitelistSaga);
    yield takeEvery(ADD_IP_WHITELIST_REQUEST, addIPWhitelistSaga);
    yield takeEvery(DELETE_IP_WHITELIST_REQUEST, deleteIPWhitelistSaga);
    yield takeEvery(UPDATE_IP_WHITELIST_REQUEST, updateIpWhitelistSaga);
    yield takeEvery(DETAIL_IP_WHITELIST_REQUEST, detailIpWhitelistSaga);
}

export default function* rootSaga() {
    yield all([fork(watchIPWhiteListSaga)]);
}

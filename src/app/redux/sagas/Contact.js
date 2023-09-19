import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    ADD_CONTACT_REQUEST,
    ADD_CONTACT_RESPONSE,
    DELETE_CONTACT_REQUEST,
    DELETE_CONTACT_RESPONSE,
    GET_CONTACT_REQUEST,
    GET_CONTACT_RESPONSE,
    UPDATE_CONTACT_REQUEST,
    UPDATE_CONTACT_RESPONSE,
    DETAIL_CONTACT_REQUEST,
    DETAIL_CONTACT_RESPONSE,
} from "../actions/Contact";
import { getContactData, addContactData, deleteContactData, updateContactData, detailContactData } from "../services/Contact";

function* getContactSaga(data) {
    try {
        const result = yield call(getContactData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_CONTACT_RESPONSE,
                payload: { contact: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* addContactSaga(action) {
    try {
        const result = yield call(addContactData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_CONTACT_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteContactSaga(action) {
    try {
        const result = yield call(deleteContactData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_CONTACT_RESPONSE,
                data: result,
                id: action?.payload?.contact_id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateContactSaga(action) {
    try {
        const result = yield call(updateContactData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_CONTACT_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailContactSaga(action) {
    try {
        const result = yield call(detailContactData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_CONTACT_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchContactSaga() {
    yield takeEvery(GET_CONTACT_REQUEST, getContactSaga);
    yield takeEvery(ADD_CONTACT_REQUEST, addContactSaga);
    yield takeEvery(DELETE_CONTACT_REQUEST, deleteContactSaga);
    yield takeEvery(UPDATE_CONTACT_REQUEST, updateContactSaga);
    yield takeEvery(DETAIL_CONTACT_REQUEST, detailContactSaga);
}

export default function* rootSaga() {
    yield all([fork(watchContactSaga)]);
}

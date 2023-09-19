import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
    deleteDirectorShareholderEnd,
    DELETE_DIRECTOR_SHAREHOLDER_START,
    editStepDataEnd,
    EDIT_STEP_DATA_START,
    getApplicationListEnd,
    getStepDataEnd,
    GET_APPLICATION_LIST_START,
    GET_CATEGORY_LIST_END,
    GET_CATEGORY_LIST_START,
    GET_STEP_DATA_START,
} from "../actions/ApplicationAction";
import { setLoading, SET_LOADER } from "../actions/Loader";
import { apiRoutes } from "../services/apiRoutes";

import { authApiHandlerPost, getCategoryListData } from "../services/AuthService";
import { handleApplicationList, handleDirectorShareholderDelete } from "../services/Merchant";

function* getApplicationStepSaga(data) {
    try {
        // yield put(setLoading(true));
        const result = yield call(authApiHandlerPost, apiRoutes.getApplicationStep, data?.payload, false);
        if (result?.responseCode === 200) {
            yield put(getStepDataEnd({ data: result?.data, step: data?.payload?.step }));
        }
    } catch (error) {
    } finally {
        // yield put(setLoading(false));
        data?.callback();
    }
}

function* watchGetApplicationStepSaga() {
    yield takeEvery(GET_STEP_DATA_START, getApplicationStepSaga);
}

function* editApplicationStepSaga(data) {
    try {
        // yield put(setLoading(true));
        // yield put({ type: SET_LOADER, newState: true });

        const result = yield call(authApiHandlerPost, apiRoutes.editApplicationStep(data?.stepNumber), data?.payload);
        if (result?.responseCode === 200) {
            let response = {};
            Object.keys(data.values).forEach((item) => {
                response[item] = result?.data?.[item];
            });
            yield put(editStepDataEnd({ data: response, step: data?.stepNumber, isCreate: false }));
            data?.callback(result);
        }
    } catch (error) {
    } finally {
        // yield put(setLoading(false));
        yield put({ type: SET_LOADER, newState: false });
        data?.callback();
    }
}

function* watchEditApplicationStepSaga() {
    yield takeEvery(EDIT_STEP_DATA_START, editApplicationStepSaga);
}

function* getCategoryListSaga(data) {
    try {
        const result = yield call(getCategoryListData);
        if (result?.responseCode === 200) {
            yield put({
                type: GET_CATEGORY_LIST_END,
                data: result?.data,
            });
        }
    } catch (error) {
    } finally {
        yield put({ type: SET_LOADER, newState: false });
        data?.callback();
    }
}

function* watchCategoryListSaga() {
    yield takeEvery(GET_CATEGORY_LIST_START, getCategoryListSaga);
}

function* deleteApplicationSaga({ payload, deleteType, id, callback }) {
    try {
        yield put(setLoading(true));
        const result = yield call(handleDirectorShareholderDelete, payload, deleteType);

        if (result?.responseCode === 200) {
            yield put(deleteDirectorShareholderEnd(id, deleteType));
            if (callback) {
                callback();
            }
        }
    } catch (error) {
    } finally {
        yield put(setLoading(false));
    }
}

function* watchDeleteApplicationSaga() {
    yield takeEvery(DELETE_DIRECTOR_SHAREHOLDER_START, deleteApplicationSaga);
}

function* getApplicationListSaga({ callback }) {
    try {
        const result = yield call(handleApplicationList);

        if (result?.responseCode === 200) {
            yield put(getApplicationListEnd(result?.data));
        }
    } catch (error) {
    } finally {
        callback();
    }
}

function* watchGetApplicationListSaga() {
    yield takeEvery(GET_APPLICATION_LIST_START, getApplicationListSaga);
}

export default function* rootSaga() {
    yield all([
        fork(watchGetApplicationStepSaga),
        fork(watchEditApplicationStepSaga),
        fork(watchDeleteApplicationSaga),
        fork(watchGetApplicationListSaga),
        fork(watchCategoryListSaga),
    ]);
}

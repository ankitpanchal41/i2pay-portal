import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { setLoading } from "../actions/Loader";
import { STORE_FRONT_REQUEST, STORE_FRONT_RESPONSE } from "../actions/PersistActions";
import {
    ADD_STORE_FRONT_REQUEST,
    ADD_STORE_FRONT_RESPONSE,
    DELETE_STORE_FRONT_REQUEST,
    DELETE_STORE_FRONT_RESPONSE,
    EDIT_STORE_FRONT_REQUEST,
    EDIT_STORE_FRONT_RESPONSE,
    GET_STORE_FRONT_LIST_REQUEST,
    GET_STORE_FRONT_LIST_RESPONSE,
    GET_STORE_FRONT_REQUEST,
    GET_STORE_FRONT_RESPONSE,
} from "../actions/StoreFront";
import {
    addStoreFrontData,
    deleteStoreFrontData,
    editStoreFrontData,
    getStoreFrontData,
    getStoreFrontListData,
} from "../services/storeFront";
import {
    SET_DEFAULT_STEP_REQUEST,
    SET_DEFAULT_STEP_RESPONSE,
    STEP_CHANGE_REQUEST,
    STEP_CHANGE_RESPONSE,
    STEP_CURRENT_CHANGE_REQUEST,
    STEP_CURRENT_CHANGE_RESPONSE,
} from "../types/StoreSteps";

function* storeFrontSaga(data) {
    try {
        yield put({
            type: STORE_FRONT_RESPONSE,
            data: data?.data,
        });
    } catch (error) {
    } finally {
        yield put(setLoading(false));
    }
}

function* storeCurrentStepSaga(data) {
    try {
        yield put({
            type: STEP_CURRENT_CHANGE_RESPONSE,
            data: data,
        });
    } catch (error) {
    } finally {
        yield put(setLoading(false));
    }
}

function* storeFrontStepsSaga(data) {
    try {
        yield put({
            type: STEP_CHANGE_RESPONSE,
            data: data,
        });
    } catch (error) {
    } finally {
        yield put(setLoading(false));
    }
}

// function* getStoreFrontListSaga(action) {
//     try {
//         const result = yield call(getStoreFrontListData, action.payload);
//         if (result?.responseCode === 200) {
//             yield put({
//                 type: GET_STORE_FRONT_LIST_RESPONSE,
//                 data: result,
//             });
//         }
//     } catch (error) {

//     } finally {
//         action?.callBack();
//     }
// }

function* getStoreFrontListSaga(data) {
    try {
        const result = yield call(getStoreFrontListData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_STORE_FRONT_LIST_RESPONSE,
                payload: { storeFrontList: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* addStoreFrontSaga(action) {
    try {
        const result = yield call(addStoreFrontData, action.payload);

        if (result?.responseCode === 200) {
            yield put({
                type: ADD_STORE_FRONT_RESPONSE,
                data: result,
            });
            action?.navigateState();
        }
    } catch (error) {
    } finally {
        action?.callBack();
    }
}

function* editStoreFrontSaga(action) {
    try {
        const result = yield call(editStoreFrontData, action.payload);

        if (result?.responseCode === 200) {
            yield put({
                type: EDIT_STORE_FRONT_RESPONSE,
                data: result,
            });
            action?.navigateState();
        }
    } catch (error) {
    } finally {
        action?.callBack();
    }
}

function* deleteStoreFrontSaga(action) {
    try {
        const result = yield call(deleteStoreFrontData, action.payload);

        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_STORE_FRONT_RESPONSE,
                data: result,
                id: action?.payload?.store_id,
            });
        }
    } catch (error) {
    } finally {
        action?.callBack();
    }
}

function* getStoreFrontDataSaga(action) {
    const result = yield call(getStoreFrontData, action.payload);
    // console.group("Store front");

    // console.groupEnd();

    try {
        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: GET_STORE_FRONT_RESPONSE,
                data: result?.data,
            });
        }
    } catch (error) {
    } finally {
        action?.callBack();
    }
}

function* setDefaultStep(action) {
    try {
        yield put({
            type: SET_DEFAULT_STEP_RESPONSE,
            data: action,
        });
    } catch (error) {
    } finally {
        yield put(setLoading(false));
    }
}

function* watchSetStoreFrontSaga() {
    yield takeEvery(STORE_FRONT_REQUEST, storeFrontSaga);
    yield takeEvery(STEP_CURRENT_CHANGE_REQUEST, storeCurrentStepSaga);
    yield takeEvery(STEP_CHANGE_REQUEST, storeFrontStepsSaga);
    yield takeEvery(GET_STORE_FRONT_LIST_REQUEST, getStoreFrontListSaga);
    yield takeEvery(ADD_STORE_FRONT_REQUEST, addStoreFrontSaga);
    yield takeEvery(EDIT_STORE_FRONT_REQUEST, editStoreFrontSaga);
    yield takeEvery(DELETE_STORE_FRONT_REQUEST, deleteStoreFrontSaga);
    yield takeEvery(GET_STORE_FRONT_REQUEST, getStoreFrontDataSaga);
    yield takeEvery(SET_DEFAULT_STEP_REQUEST, setDefaultStep);
}

export default function* rootSaga() {
    yield all([fork(watchSetStoreFrontSaga)]);
}

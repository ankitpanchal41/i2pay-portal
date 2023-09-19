import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { addPayButton, deletePayButton, detailPayButton, listPayButton, updatePayButton } from "../services/PayButton";
import {
    ADD_PAY_BUTTON_REQUEST,
    ADD_PAY_BUTTON_RESPONSE,
    DELETE_PAY_BUTTON_REQUEST,
    DELETE_PAY_BUTTON_RESPONSE,
    DETAIL_PAY_BUTTON_REQUEST,
    DETAIL_PAY_BUTTON_RESPONSE,
    EDIT_PAY_BUTTON_REQUEST,
    EDIT_PAY_BUTTON_RESPONSE,
    LIST_PAY_BUTTON_REQUEST,
    LIST_PAY_BUTTON_RESPONSE,
} from "../types/PayButton";

function* addPayButtonSaga(action) {
    try {
        const result = yield call(addPayButton, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_PAY_BUTTON_RESPONSE,
                data: result,
            });
            action?.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* editPayButtonSaga(action) {
    try {
        const result = yield call(updatePayButton, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: EDIT_PAY_BUTTON_RESPONSE,
                data: result,
            });
            action?.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deletePayButtonSaga(action) {
    try {
        const result = yield call(deletePayButton, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_PAY_BUTTON_RESPONSE,
                data: result,
                id: action?.payload?.payButton_id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailPayButtonSaga(action) {
    try {
        const result = yield call(detailPayButton, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_PAY_BUTTON_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

// function* listPayButtonSaga(action) {
//     try {
//         const result = yield call(listPayButton, action.payload);
//         if (result?.responseCode === 200) {

//             yield put({
//                 type: LIST_PAY_BUTTON_RESPONSE,
//                 data: result,
//             });
//         }
//     } catch (error) {

//     } finally {
//         action.callBack();
//     }
// }

function* listPayButtonSaga(data) {
    try {
        const result = yield call(listPayButton, data);
        if (result.responseCode === 200) {
            yield put({
                type: LIST_PAY_BUTTON_RESPONSE,
                payload: { payButtonList: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchSetStoreFrontSaga() {
    yield takeEvery(ADD_PAY_BUTTON_REQUEST, addPayButtonSaga);
    yield takeEvery(LIST_PAY_BUTTON_REQUEST, listPayButtonSaga);
    yield takeEvery(EDIT_PAY_BUTTON_REQUEST, editPayButtonSaga);
    yield takeEvery(DELETE_PAY_BUTTON_REQUEST, deletePayButtonSaga);
    yield takeEvery(DETAIL_PAY_BUTTON_REQUEST, detailPayButtonSaga);
}

export default function* rootSaga() {
    yield all([fork(watchSetStoreFrontSaga)]);
}

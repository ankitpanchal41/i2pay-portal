import { all, fork, put, takeEvery } from "redux-saga/effects";
import { SET_LISTING_TYPE_REQUEST, SET_LISTING_TYPE_RESPONSE, SET_MENU_TYPE_REQUEST, SET_MENU_TYPE_RESPONSE } from "../actions/Menu";

export function* setMenuSaga(action) {
    yield put({
        type: SET_MENU_TYPE_RESPONSE,
        data: action.payload,
    });
}

function* watchMenuSaga() {
    yield takeEvery(SET_MENU_TYPE_REQUEST, setMenuSaga);
}

export function* setListingMenuSaga(action) {
    yield put({
        type: SET_LISTING_TYPE_RESPONSE,
        data: action.payload,
    });
}

function* watchListingMenuSaga() {
    yield takeEvery(SET_LISTING_TYPE_REQUEST, setListingMenuSaga);
}

export default function* rootSaga() {
    yield all([fork(watchMenuSaga, watchListingMenuSaga)]);
}

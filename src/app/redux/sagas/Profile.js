import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { SET_PROFILE_REQUEST, SET_PROFILE_RESPONSE } from "../actions/Profile";
import { setProfilePic } from "../services/Profile";

function* setProfilePicSaga(action) {
    try {
        const result = yield call(setProfilePic, action.payload);
        if (result?.responseCode === 200) {
            console.log({ result });
            yield put({
                type: SET_PROFILE_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
        console.log("ERROR", error);
    } finally {
        action.callBack();
    }
}

function* watchProfileSaga() {
    yield takeEvery(SET_PROFILE_REQUEST, setProfilePicSaga);
}

export default function* rootSaga() {
    yield all([fork(watchProfileSaga)]);
}

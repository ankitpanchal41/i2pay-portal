import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { uploadAgreement } from "../services/Agreement";
import { UPLOAD_AGREEMENT_REQUEST, UPLOAD_AGREEMENT_RESPONSE } from "../actions/AgreementAction";

function* uploadAgreementSaga(action) {
    try {
        const result = yield call(uploadAgreement, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPLOAD_AGREEMENT_RESPONSE,
                data: result,
            });
            action?.navigateState();
            action.callBack("success");
        }
    } catch (error) {
    } finally {
        action.callBack("reuploaded");
    }
}

function* watchSetAgreementSaga() {
    yield takeEvery(UPLOAD_AGREEMENT_REQUEST, uploadAgreementSaga);
}

export default function* rootSaga() {
    yield all([fork(watchSetAgreementSaga)]);
}

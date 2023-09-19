import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { GET_AUTO_PAYOUT_REQUEST, GET_AUTO_PAYOUT_RESPONSE } from "../actions/AutoPayoutReportsAction";
import { autoPayoutReportsData } from "../services/AutoPayoutReports";

function* getAutoPayoutReportsSaga(data) {
    try {
        const result = yield call(autoPayoutReportsData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_AUTO_PAYOUT_RESPONSE,
                payload: { autoPayoutReports: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchAutoPayoutReportsSaga() {
    yield takeEvery(GET_AUTO_PAYOUT_REQUEST, getAutoPayoutReportsSaga);
}

export default function* rootSaga() {
    yield all([fork(watchAutoPayoutReportsSaga)]);
}

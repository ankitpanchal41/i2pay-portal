import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import { GET_SMS_CAMPAIGN_SENT_HISTORY_REQUEST, GET_SMS_CAMPAIGN_SENT_HISTORY_RESPONSE } from "../actions/SmsCampaignsSentHistory";
import { getSmsCampaignSentHistoryData } from "../services/SmsCampaignSentHistory";

function* getSmsCampaignSentHistorySaga(data) {
    try {
        const formData = new FormData();
        formData.append("id", data?.contactId);

        const result = yield call(getSmsCampaignSentHistoryData, data, formData);

        if (result.responseCode === 200) {
            yield put({
                type: GET_SMS_CAMPAIGN_SENT_HISTORY_RESPONSE,
                payload: { smsList: result.data, id: data?.contactId, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchSmsCampaignSentHistorySaga() {
    yield takeEvery(GET_SMS_CAMPAIGN_SENT_HISTORY_REQUEST, getSmsCampaignSentHistorySaga);
}

export default function* rootSaga() {
    yield all([fork(watchSmsCampaignSentHistorySaga)]);
}

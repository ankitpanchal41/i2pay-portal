import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import { GET_EMAIL_CAMPAIGN_SENT_HISTORY_REQUEST, GET_EMAIL_CAMPAIGN_SENT_HISTORY_RESPONSE } from "../actions/EmailCampaignsSentHistory";
import { getEmailCampaignSentHistoryData } from "../services/EmailCampaignSentHistory";

function* getEmailCampaignSentHistorySaga(data) {
    try {
        const formData = new FormData();
        formData.append("id", data?.contactId);

        const result = yield call(getEmailCampaignSentHistoryData, data, formData);

        if (result.responseCode === 200) {
            yield put({
                type: GET_EMAIL_CAMPAIGN_SENT_HISTORY_RESPONSE,
                payload: { emailList: result.data, id: data?.contactId, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchEmailCampaignSentHistorySaga() {
    yield takeEvery(GET_EMAIL_CAMPAIGN_SENT_HISTORY_REQUEST, getEmailCampaignSentHistorySaga);
}

export default function* rootSaga() {
    yield all([fork(watchEmailCampaignSentHistorySaga)]);
}

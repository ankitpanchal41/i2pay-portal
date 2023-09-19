import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    DELETE_SMS_CAMPAIGN_REQUEST,
    DELETE_SMS_CAMPAIGN_RESPONSE,
    GET_SMS_CAMPAIGN_REQUEST,
    GET_SMS_CAMPAIGN_RESPONSE,
    DETAIL_SMS_CAMPAIGN_REQUEST,
    DETAIL_SMS_CAMPAIGN_RESPONSE,
    GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_RESPONSE,
    GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_REQUEST,
    SMS_CAMPAIGN_SEND_SMS_REQUEST,
    SMS_CAMPAIGN_SEND_SMS_RESPONSE,
} from "../actions/SmsCampaign";
import {
    getSmsCampaignData,
    deleteSmsCampaignData,
    detailSmsCampaignData,
    getSmsCampaignPreviewMobileListData,
    smsCampaignSendEmailData,
} from "../services/SmsCampaign";
import { emailCampaignSendEmailData } from "../services/EmailCampaign";
import { EMAIL_CAMPAIGN_SEND_EMAIL_RESPONSE } from "../actions/EmailCampaign";

function* getSmsCampaignSaga(data) {
    try {
        const result = yield call(getSmsCampaignData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_SMS_CAMPAIGN_RESPONSE,
                payload: { campaign: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* deleteSmsCampaignSaga(action) {
    try {
        const result = yield call(deleteSmsCampaignData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_SMS_CAMPAIGN_RESPONSE,
                data: result,
                id: action?.payload?.id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailSmsCampaignSaga(action) {
    try {
        const result = yield call(detailSmsCampaignData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_SMS_CAMPAIGN_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* getSmsCampaignPreviewMobileListSaga(data) {
    try {
        const formData = new FormData();
        formData.append("id", data?.campaignId);

        const result = yield call(getSmsCampaignPreviewMobileListData, data, formData);

        if (result.responseCode === 200) {
            yield put({
                type: GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_RESPONSE,
                payload: { mobileList: result.data, id: data?.campaignId, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* smsCampaignSendSmsSaga(action) {
    try {
        const result = yield call(smsCampaignSendEmailData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: SMS_CAMPAIGN_SEND_SMS_RESPONSE,
                data: result,
                id: action?.payload?.id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchSmsCampaignSaga() {
    yield takeEvery(GET_SMS_CAMPAIGN_REQUEST, getSmsCampaignSaga);
    yield takeEvery(DELETE_SMS_CAMPAIGN_REQUEST, deleteSmsCampaignSaga);
    yield takeEvery(DETAIL_SMS_CAMPAIGN_REQUEST, detailSmsCampaignSaga);
    yield takeEvery(GET_SMS_CAMPAIGN_PREVIEW_MOBILE_LIST_REQUEST, getSmsCampaignPreviewMobileListSaga);
    yield takeEvery(SMS_CAMPAIGN_SEND_SMS_REQUEST, smsCampaignSendSmsSaga);
}

export default function* rootSaga() {
    yield all([fork(watchSmsCampaignSaga)]);
}

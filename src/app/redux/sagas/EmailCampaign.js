import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    DELETE_EMAIL_CAMPAIGN_REQUEST,
    DELETE_EMAIL_CAMPAIGN_RESPONSE,
    GET_EMAIL_CAMPAIGN_REQUEST,
    GET_EMAIL_CAMPAIGN_RESPONSE,
    DETAIL_EMAIL_CAMPAIGN_REQUEST,
    DETAIL_EMAIL_CAMPAIGN_RESPONSE,
    GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_REQUEST,
    GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_RESPONSE,
    EMAIL_CAMPAIGN_SEND_EMAIL_REQUEST,
    EMAIL_CAMPAIGN_SEND_EMAIL_RESPONSE,
} from "../actions/EmailCampaign";
import {
    getEmailCampaignData,
    deleteEmailCampaignData,
    detailEmailCampaignData,
    getEmailCampaignPreviewEmailListData,
    emailCampaignSendEmailData,
} from "../services/EmailCampaign";
import { productListHandle } from "../services/Product";
import { GET_PRODUCT_END } from "../actions/Product";

function* getEmailCampaignSaga(data) {
    try {
        const result = yield call(getEmailCampaignData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_EMAIL_CAMPAIGN_RESPONSE,
                payload: { campaign: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* deleteEmailCampaignSaga(action) {
    try {
        const result = yield call(deleteEmailCampaignData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_EMAIL_CAMPAIGN_RESPONSE,
                data: result,
                id: action?.payload?.id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailEmailCampaignSaga(action) {
    try {
        const result = yield call(detailEmailCampaignData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_EMAIL_CAMPAIGN_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* getEmailCampaignPreviewEmailListSaga(data) {
    try {
        const formData = new FormData();
        formData.append("id", data?.campaignId);

        const result = yield call(getEmailCampaignPreviewEmailListData, data, formData);

        if (result.responseCode === 200) {
            yield put({
                type: GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_RESPONSE,
                payload: { emailList: result.data, id: data?.campaignId, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* emailCampaignSendEmailSaga(action) {
    try {
        const result = yield call(emailCampaignSendEmailData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: EMAIL_CAMPAIGN_SEND_EMAIL_RESPONSE,
                data: result,
                id: action?.payload?.id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchEmailCampaignSaga() {
    yield takeEvery(GET_EMAIL_CAMPAIGN_REQUEST, getEmailCampaignSaga);
    yield takeEvery(DELETE_EMAIL_CAMPAIGN_REQUEST, deleteEmailCampaignSaga);
    yield takeEvery(DETAIL_EMAIL_CAMPAIGN_REQUEST, detailEmailCampaignSaga);
    yield takeEvery(GET_EMAIL_CAMPAIGN_PREVIEW_EMAIL_LIST_REQUEST, getEmailCampaignPreviewEmailListSaga);
    yield takeEvery(EMAIL_CAMPAIGN_SEND_EMAIL_REQUEST, emailCampaignSendEmailSaga);
}

export default function* rootSaga() {
    yield all([fork(watchEmailCampaignSaga)]);
}

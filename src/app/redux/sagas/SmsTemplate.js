import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    addSmsTemplate,
    deleteSmsTemplate,
    detailSmsTemplate,
    listSmsTemplate,
    updateSmsTemplate,
    listMasterSmsTemplate,
    sendPaymentSMSData,
} from "../services/SmsTemplate";
import {
    ADD_SMS_TEMPLATE_REQUEST,
    ADD_SMS_TEMPLATE_RESPONSE,
    DELETE_SMS_TEMPLATE_REQUEST,
    DELETE_SMS_TEMPLATE_RESPONSE,
    DETAIL_SMS_TEMPLATE_REQUEST,
    DETAIL_SMS_TEMPLATE_RESPONSE,
    EDIT_SMS_TEMPLATE_REQUEST,
    EDIT_SMS_TEMPLATE_RESPONSE,
    LIST_SMS_TEMPLATE_REQUEST,
    LIST_SMS_TEMPLATE_RESPONSE,
    LIST_MASTER_SMS_TEMPLATE_REQUEST,
    LIST_MASTER_SMS_TEMPLATE_RESPONSE,
    SEND_PAYMENT_SMS_REQUEST,
    SEND_PAYMENT_SMS_RESPONSE,
    SET_SEND_PAYMENT_SMS_REQUEST,
    SET_SEND_PAYMENT_SMS_RESPONSE,
} from "../types/SmsTemplate";

function* addSmsTemplateSaga(action) {
    try {
        const result = yield call(addSmsTemplate, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_SMS_TEMPLATE_RESPONSE,
                data: result,
            });
            action?.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* editSmsTemplateSaga(action) {
    try {
        const result = yield call(updateSmsTemplate, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: EDIT_SMS_TEMPLATE_RESPONSE,
                data: result,
            });
            action?.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteSmsTemplateSaga(action) {
    try {
        const result = yield call(deleteSmsTemplate, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_SMS_TEMPLATE_RESPONSE,
                data: result,
                id: action?.payload?.merchant_payment_sms_content_id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailSmsTemplateSaga(action) {
    try {
        const result = yield call(detailSmsTemplate, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_SMS_TEMPLATE_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* listSmsTemplateSaga(data) {
    try {
        const result = yield call(listSmsTemplate, data);
        if (result.responseCode === 200) {
            yield put({
                type: LIST_SMS_TEMPLATE_RESPONSE,
                payload: { smsTemplateList: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* listMasterSmsTemplateSaga(data) {
    try {
        const result = yield call(listMasterSmsTemplate, data);

        if (result.responseCode === 200) {
            yield put({
                type: LIST_MASTER_SMS_TEMPLATE_RESPONSE,
                payload: { masterSmsTemplateList: result.data },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

export function* sendPaymentSMSSaga(action) {
    try {
        const result = yield call(sendPaymentSMSData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: SEND_PAYMENT_SMS_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callback();
    }
}

function* sentSMSListSaga(data) {
    try {
        yield put({
            type: SET_SEND_PAYMENT_SMS_RESPONSE,
            payload: data?.payload,
        });
    } catch (error) {
    } finally {
        // data?.callback();
    }
}

function* watchSetSMSTemplateSaga() {
    yield takeEvery(ADD_SMS_TEMPLATE_REQUEST, addSmsTemplateSaga);
    yield takeEvery(LIST_SMS_TEMPLATE_REQUEST, listSmsTemplateSaga);
    yield takeEvery(LIST_MASTER_SMS_TEMPLATE_REQUEST, listMasterSmsTemplateSaga);
    yield takeEvery(EDIT_SMS_TEMPLATE_REQUEST, editSmsTemplateSaga);
    yield takeEvery(DELETE_SMS_TEMPLATE_REQUEST, deleteSmsTemplateSaga);
    yield takeEvery(DETAIL_SMS_TEMPLATE_REQUEST, detailSmsTemplateSaga);
    yield takeEvery(SEND_PAYMENT_SMS_REQUEST, sendPaymentSMSSaga);
    yield takeEvery(SET_SEND_PAYMENT_SMS_REQUEST, sentSMSListSaga);
}

export default function* rootSaga() {
    yield all([fork(watchSetSMSTemplateSaga)]);
}

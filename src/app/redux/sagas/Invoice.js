import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import { addInvoice, deleteInvoice, detailInvoice, listInvoice, updateInvoice } from "../services/Invoice";
import {
    ADD_INVOICE_REQUEST,
    ADD_INVOICE_RESPONSE,
    DELETE_INVOICE_REQUEST,
    DELETE_INVOICE_RESPONSE,
    DETAIL_INVOICE_REQUEST,
    DETAIL_INVOICE_RESPONSE,
    EDIT_INVOICE_REQUEST,
    EDIT_INVOICE_RESPONSE,
    LIST_INVOICE_REQUEST,
    LIST_INVOICE_RESPONSE,
    SET_SEND_INVOICE_REQUEST,
    SET_SEND_INVOICE_RESPONSE,
} from "../types/Invoice";

function* addInvoiceSaga(action) {
    try {
        const result = yield call(addInvoice, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_INVOICE_RESPONSE,
                data: result,
            });
            action?.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* editInvoiceSaga(action) {
    try {
        const result = yield call(updateInvoice, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: EDIT_INVOICE_RESPONSE,
                data: result,
            });
            action?.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteInvoiceSaga(action) {
    try {
        const result = yield call(deleteInvoice, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_INVOICE_RESPONSE,
                data: result,
                id: action?.payload?.invoice_id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailInvoiceSaga(action) {
    try {
        const result = yield call(detailInvoice, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_INVOICE_RESPONSE,
                data: result,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* listInvoiceSaga(data) {
    try {
        const result = yield call(listInvoice, data);
        if (result.responseCode === 200) {
            yield put({
                type: LIST_INVOICE_RESPONSE,
                payload: { invoiceList: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* sentInvoiceListSaga(data) {
    try {
        yield put({
            type: SET_SEND_INVOICE_RESPONSE,
            payload: data?.payload,
        });
    } catch (error) {
    } finally {
        // data?.callback();
    }
}

function* watchSetStoreFrontSaga() {
    yield takeEvery(ADD_INVOICE_REQUEST, addInvoiceSaga);
    yield takeEvery(LIST_INVOICE_REQUEST, listInvoiceSaga);
    yield takeEvery(EDIT_INVOICE_REQUEST, editInvoiceSaga);
    yield takeEvery(DELETE_INVOICE_REQUEST, deleteInvoiceSaga);
    yield takeEvery(DETAIL_INVOICE_REQUEST, detailInvoiceSaga);
    yield takeEvery(SET_SEND_INVOICE_REQUEST, sentInvoiceListSaga);
}

export default function* rootSaga() {
    yield all([fork(watchSetStoreFrontSaga)]);
}

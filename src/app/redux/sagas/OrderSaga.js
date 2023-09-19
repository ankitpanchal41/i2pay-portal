import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { GET_ORDER_LIST_START, GET_ORDER_LIST_END } from "../actions/Order";

import { getOrderList } from "../services/Order";

function* getOrderListSaga(data) {
    try {
        const result = yield call(getOrderList, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_ORDER_LIST_END,
                payload: { orderList: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchOrderListSaga() {
    yield takeEvery(GET_ORDER_LIST_START, getOrderListSaga);
}

export default function* rootSaga() {
    yield all([fork(watchOrderListSaga)]);
}

import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { showToastMessage } from "../../utils/methods";
import { setLoading } from "../actions/Loader";
import { PRODUCT_REQUEST, PRODUCT_RESPONSE } from "../actions/PersistActions";
import {
    CREATE_PRODUCT_END,
    CREATE_PRODUCT_START,
    DELETE_PRODUCT_END,
    DELETE_PRODUCT_START,
    EDIT_PRODUCT_END,
    EDIT_PRODUCT_START,
    GET_PRODUCT_DETAILS_END,
    GET_PRODUCT_DETAILS_START,
    GET_PRODUCT_END,
    GET_PRODUCT_START,
} from "../actions/Product";
import { productAddHandle, productDeleteHandle, productDetailHandle, productListHandle, productUpdateHandle } from "../services/Product";

function* productSaga(data) {
    try {
        yield put({
            type: PRODUCT_RESPONSE,
            data: data?.data,
        });
    } catch (error) {
    } finally {
        yield put(setLoading(false));
    }
}

function* getProductListSaga(data) {
    try {
        const formData = new FormData();
        formData.append("store_id", data?.storeId);

        const result = yield call(productListHandle, data, formData);
        if (result.responseCode === 200) {
            yield put({
                type: GET_PRODUCT_END,
                payload: { productList: result.data, store_id: data?.storeId, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* createProductSaga(data) {
    try {
        const result = yield call(productAddHandle, data?.payload);

        if (result.responseCode === 200) {
            yield put({
                type: CREATE_PRODUCT_END,
                payload: result.data,
            });
            data?.navigate();
        } else if (result.responseCode === 422) {
            data?.variantError(result);
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* editProductSaga(data) {
    try {
        const result = yield call(productUpdateHandle, data?.payload);

        if (result.responseCode === 200) {
            yield put({
                type: EDIT_PRODUCT_END,
                payload: result?.data,
            });
            data?.navigate();
        } else if (result.responseCode === 422) {
            data?.variantError(result);
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* deleteProductSaga(data) {
    try {
        const formData = new FormData();
        formData.append("product_id", data?.id);
        const result = yield call(productDeleteHandle, formData);

        if (result.responseCode === 200) {
            yield put({
                type: DELETE_PRODUCT_END,
                id: data?.id,
            });
        } else {
            showToastMessage(result.responseCode, result.response);
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* getProductDetailsSaga(data) {
    try {
        const result = yield call(productDetailHandle, data?.payload);

        if (result === 404 && data?.navigateListing) {
            data.navigateListing();
            return false;
        }

        if (result.responseCode === 200) {
            yield put({
                type: GET_PRODUCT_DETAILS_END,
                payload: result?.data[0],
            });
        } else {
            showToastMessage(result.responseCode, result.response);
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* watchSetProductSaga() {
    yield takeEvery(PRODUCT_REQUEST, productSaga);
}

function* watchProductListSaga() {
    yield takeEvery(GET_PRODUCT_START, getProductListSaga);
}

function* watchCreateProductSaga() {
    yield takeEvery(CREATE_PRODUCT_START, createProductSaga);
}

function* watchEditProductSaga() {
    yield takeEvery(EDIT_PRODUCT_START, editProductSaga);
}

function* watchDeleteProductSaga() {
    yield takeEvery(DELETE_PRODUCT_START, deleteProductSaga);
}

function* watchGetProductDetailsSaga() {
    yield takeEvery(GET_PRODUCT_DETAILS_START, getProductDetailsSaga);
}

export default function* rootSaga() {
    yield all([
        fork(watchSetProductSaga),
        fork(watchProductListSaga),
        fork(watchCreateProductSaga),
        fork(watchEditProductSaga),
        fork(watchDeleteProductSaga),
        fork(watchGetProductDetailsSaga),
    ]);
}

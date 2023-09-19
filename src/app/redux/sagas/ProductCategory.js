import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { showToastMessage } from "../../utils/methods";
import { setLoading } from "../actions/Loader";
import { PRODUCT_REQUEST, PRODUCT_RESPONSE } from "../actions/PersistActions";
import {
    CREATE_PRODUCT_CATEGORY_END,
    CREATE_PRODUCT_CATEGORY_START,
    DELETE_PRODUCT_CATEGORY_END,
    DELETE_PRODUCT_CATEGORY_START,
    EDIT_PRODUCT_CATEGORY_END,
    EDIT_PRODUCT_CATEGORY_START,
    GET_PRODUCT_CATEGORY_END,
    GET_PRODUCT_CATEGORY_START,
} from "../actions/ProductCategory";
import {
    productCategoryAddHandle,
    productCategoryDeleteHandle,
    productCategoryListHandle,
    productCategoryUpdateHandle,
} from "../services/ProductCategory";

function* getProductCategoryListSaga(data) {
    try {
        const formData = new FormData();
        formData.append("store_id", data?.storeId);

        const result = yield call(productCategoryListHandle, data, formData);
        if (result.responseCode === 200) {
            yield put({
                type: GET_PRODUCT_CATEGORY_END,
                payload: { productCategoryList: result.data, store_id: data?.storeId, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* createProductCategorySaga(data) {
    try {
        const result = yield call(productCategoryAddHandle, data?.payload);

        if (result.responseCode === 200) {
            yield put({
                type: CREATE_PRODUCT_CATEGORY_END,
                payload: result.data,
            });
            data?.navigate();
        } else {
            showToastMessage(result.responseCode, result.response);
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* editProductCategorySaga(data) {
    try {
        const result = yield call(productCategoryUpdateHandle, data?.payload);

        if (result.responseCode === 200) {
            yield put({
                type: EDIT_PRODUCT_CATEGORY_END,
                payload: result?.data,
            });
            data?.navigate();
        } else {
            showToastMessage(result.responseCode, result.response);
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* deleteProductCategorySaga(data) {
    try {
        const formData = new FormData();
        formData.append("category_id", data?.id);
        const result = yield call(productCategoryDeleteHandle, formData);

        if (result.responseCode === 200) {
            yield put({
                type: DELETE_PRODUCT_CATEGORY_END,
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

function* watchProductCategoryListSaga() {
    yield takeEvery(GET_PRODUCT_CATEGORY_START, getProductCategoryListSaga);
}

function* watchCreateProductCategorySaga() {
    yield takeEvery(CREATE_PRODUCT_CATEGORY_START, createProductCategorySaga);
}

function* watchEditProductCategorySaga() {
    yield takeEvery(EDIT_PRODUCT_CATEGORY_START, editProductCategorySaga);
}

function* watchDeleteProductCategorySaga() {
    yield takeEvery(DELETE_PRODUCT_CATEGORY_START, deleteProductCategorySaga);
}

export default function* rootSaga() {
    yield all([
        fork(watchProductCategoryListSaga),
        fork(watchCreateProductCategorySaga),
        fork(watchEditProductCategorySaga),
        fork(watchDeleteProductCategorySaga),
    ]);
}

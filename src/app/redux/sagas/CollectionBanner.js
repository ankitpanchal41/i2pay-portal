import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    ADD_COLLECTION_BANNER_REQUEST,
    ADD_COLLECTION_BANNER_RESPONSE,
    DELETE_COLLECTION_BANNER_REQUEST,
    DELETE_COLLECTION_BANNER_RESPONSE,
    GET_COLLECTION_BANNER_REQUEST,
    GET_COLLECTION_BANNER_RESPONSE,
    UPDATE_COLLECTION_BANNER_REQUEST,
    UPDATE_COLLECTION_BANNER_RESPONSE,
    DETAIL_COLLECTION_BANNER_REQUEST,
    DETAIL_COLLECTION_BANNER_RESPONSE,
} from "../actions/CollectionBanner";
import {
    getCollectionBannerData,
    addCollectionBannerData,
    deleteCollectionBannerData,
    updateCollectionBannerData,
    detailCollectionBannerData,
} from "../services/CollectionBanner";

function* getCollectionBannerSaga(data) {
    try {
        const result = yield call(getCollectionBannerData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_COLLECTION_BANNER_RESPONSE,
                payload: { collectionBanners: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* addCollectionBannerSaga(action) {
    try {
        const result = yield call(addCollectionBannerData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_COLLECTION_BANNER_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteCollectionBannerSaga(action) {
    try {
        const result = yield call(deleteCollectionBannerData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_COLLECTION_BANNER_RESPONSE,
                data: result,
                id: action?.payload?.collection_banner_id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateCollectionBannerSaga(action) {
    try {
        const result = yield call(updateCollectionBannerData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_COLLECTION_BANNER_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailCollectionBannerSaga(action) {
    try {
        const result = yield call(detailCollectionBannerData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_COLLECTION_BANNER_RESPONSE,
                data: result?.data[0],
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchCollectionBannerSaga() {
    yield takeEvery(GET_COLLECTION_BANNER_REQUEST, getCollectionBannerSaga);
    yield takeEvery(ADD_COLLECTION_BANNER_REQUEST, addCollectionBannerSaga);
    yield takeEvery(DELETE_COLLECTION_BANNER_REQUEST, deleteCollectionBannerSaga);
    yield takeEvery(UPDATE_COLLECTION_BANNER_REQUEST, updateCollectionBannerSaga);
    yield takeEvery(DETAIL_COLLECTION_BANNER_REQUEST, detailCollectionBannerSaga);
}

export default function* rootSaga() {
    yield all([fork(watchCollectionBannerSaga)]);
}

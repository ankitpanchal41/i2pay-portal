import { all, fork, put, takeEvery, call } from "redux-saga/effects";

import {
    ADD_BLOG_REQUEST,
    ADD_BLOG_RESPONSE,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_RESPONSE,
    GET_BLOG_REQUEST,
    GET_BLOG_RESPONSE,
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_RESPONSE,
    DETAIL_BLOG_REQUEST,
    DETAIL_BLOG_RESPONSE,
} from "../actions/Blogs";
import { getBlogData, addBlogData, deleteBlogData, updateBlogData, detailBlogData } from "../services/Blogs";

function* getBlogSaga(data) {
    try {
        const result = yield call(getBlogData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_BLOG_RESPONSE,
                payload: { blogs: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

function* addBlogSaga(action) {
    try {
        const result = yield call(addBlogData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: ADD_BLOG_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteBlogSaga(action) {
    try {
        const result = yield call(deleteBlogData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_BLOG_RESPONSE,
                data: result,
                id: action?.payload?.BLOG_id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateBlogSaga(action) {
    try {
        const result = yield call(updateBlogData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_BLOG_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* detailBlogSaga(action) {
    try {
        const result = yield call(detailBlogData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: DETAIL_BLOG_RESPONSE,
                data: result?.data[0],
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchBlogSaga() {
    yield takeEvery(GET_BLOG_REQUEST, getBlogSaga);
    yield takeEvery(ADD_BLOG_REQUEST, addBlogSaga);
    yield takeEvery(DELETE_BLOG_REQUEST, deleteBlogSaga);
    yield takeEvery(UPDATE_BLOG_REQUEST, updateBlogSaga);
    yield takeEvery(DETAIL_BLOG_REQUEST, detailBlogSaga);
}

export default function* rootSaga() {
    yield all([fork(watchBlogSaga)]);
}

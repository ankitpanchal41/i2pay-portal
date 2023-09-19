import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import {
    GET_RULES_REQUEST,
    GET_RULES_RESPONSE,
    CREATE_RULES_REQUEST,
    CREATE_RULES_RESPONSE,
    UPDATE_RULES_STATUS_REQUEST,
    UPDATE_RULES_STATUS_RESPONSE,
    DELETE_RULES_REQUEST,
    DELETE_RULES_RESPONSE,
    GET_DETAIL_RULES_REQUEST,
    UPDATE_RULES_RESPONSE,
    GET_DETAIL_RULES_RESPONSE,
    UPDATE_RULES_REQUEST,
    UPDATE_RULES_PRIORITY_REQUEST,
    UPDATE_RULES_PRIORITY_RESPONSE,
} from "../actions/Rules";

import {
    getRulesData,
    deleteRule,
    setRulesStatusData,
    createRulesData,
    updateRulesData,
    getRulesDetailData,
    updateRulesPriorityData,
} from "../services/Rules";

function* getRulesSaga(data) {
    try {
        const result = yield call(getRulesData, data);
        if (result.responseCode === 200) {
            yield put({
                type: GET_RULES_RESPONSE,
                payload: { rules: result.data, paginate: result?.paginate },
            });
        }
    } catch (error) {
    } finally {
        data?.callback();
    }
}

export function* getRulesDetailSaga(action) {
    try {
        const result = yield call(getRulesDetailData, action.payload);

        if (result === 404 && action.navigateListing) {
            action.navigateListing();
            return false;
        }

        if (result?.responseCode === 200) {
            yield put({
                type: GET_DETAIL_RULES_RESPONSE,
                data: result?.data,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* createRulesSaga(action) {
    try {
        const result = yield call(createRulesData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: CREATE_RULES_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateRulesStatusSaga(action) {
    try {
        const result = yield call(setRulesStatusData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_RULES_STATUS_RESPONSE,
                data: result,
            });
            action.returnResponse(result);
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateRulesSaga(action) {
    try {
        const result = yield call(updateRulesData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_RULES_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

export function* updateRulesPrioritySaga(action) {
    try {
        const result = yield call(updateRulesPriorityData, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: UPDATE_RULES_PRIORITY_RESPONSE,
                data: result,
            });
            action.navigateState();
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* deleteRuleSaga(action) {
    try {
        const result = yield call(deleteRule, action.payload);
        if (result?.responseCode === 200) {
            yield put({
                type: DELETE_RULES_RESPONSE,
                data: result,
                id: action?.payload?.rules_id,
            });
        }
    } catch (error) {
    } finally {
        action.callBack();
    }
}

function* watchRulesSaga() {
    yield takeEvery(GET_RULES_REQUEST, getRulesSaga);
    yield takeEvery(GET_DETAIL_RULES_REQUEST, getRulesDetailSaga);
    yield takeEvery(CREATE_RULES_REQUEST, createRulesSaga);
    yield takeEvery(UPDATE_RULES_STATUS_REQUEST, updateRulesStatusSaga);
    yield takeEvery(UPDATE_RULES_REQUEST, updateRulesSaga);
    yield takeEvery(UPDATE_RULES_PRIORITY_REQUEST, updateRulesPrioritySaga);
    yield takeEvery(DELETE_RULES_REQUEST, deleteRuleSaga);
}

export default function* rootSaga() {
    yield all([fork(watchRulesSaga)]);
}

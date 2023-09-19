export const GET_STEP_DATA_START = "GET_STEP_DATA_START";
export const GET_STEP_DATA_END = "GET_STEP_DATA_END";
export const EDIT_STEP_DATA_START = "EDIT_STEP_DATA_START";
export const EDIT_STEP_DATA_END = "EDIT_STEP_DATA_END";
export const DELETE_DIRECTOR_SHAREHOLDER_START = "delete-director-shareholder-start";
export const DELETE_DIRECTOR_SHAREHOLDER_END = "delete-director-shareholder-end";
export const CREATE_EMPTY_VALUE = "create-empty-value";
export const GET_APPLICATION_LIST_START = "GET_APPLICATION_LIST_START";
export const GET_APPLICATION_LIST_END = "GET_APPLICATION_LIST_END";
export const GET_CATEGORY_LIST_START = "GET_CATEGORY_LIST_START";
export const GET_CATEGORY_LIST_END = "GET_CATEGORY_LIST_END";
export const DELETE_DIRECTOR_MULTIPLE_IMAGE = "DELETE_DIRECTOR_MULTIPLE_IMAGE";
export const DELETE_SHARE_HOLDER_MULTIPLE_IMAGE = "DELETE_SHARE_HOLDER_MULTIPLE_IMAGE";

export const getStepDataStart = (payload, callback) => ({
    type: GET_STEP_DATA_START,
    payload,
    callback,
});

export const getStepDataEnd = (payload) => ({
    type: GET_STEP_DATA_END,
    payload,
});

export const editStepDataStart = (payload, stepNumber, values, callback) => ({
    type: EDIT_STEP_DATA_START,
    payload,
    stepNumber,
    values,
    callback,
});

export const getCategories = (callback) => ({
    type: GET_CATEGORY_LIST_START,
    callback,
});

export const editStepDataEnd = (payload) => ({
    type: EDIT_STEP_DATA_END,
    payload,
});

export const deleteDirectorShareholderStart = (payload, deleteType, id, callback) => ({
    type: DELETE_DIRECTOR_SHAREHOLDER_START,
    payload,
    deleteType,
    id,
    callback,
});

export const deleteDirectorShareholderEnd = (id, deleteType, index) => ({
    type: DELETE_DIRECTOR_SHAREHOLDER_END,
    id,
    deleteType,
    index,
});

export const createStepValue = (createType) => ({
    type: CREATE_EMPTY_VALUE,
    createType,
});

export const getApplicationListStart = (callback) => ({
    type: GET_APPLICATION_LIST_START,
    callback,
});

export const getApplicationListEnd = (payload) => ({
    type: GET_APPLICATION_LIST_END,
    payload,
});

export const ADD_TO_BREADCRUMB = "add-to-breadcrumb";
export const REMOVE_FROM_BREADCRUMB = "remove-from-breadcrumb";

export const addToBreadcrumb = (payload) => ({
    type: ADD_TO_BREADCRUMB,
    payload,
});

export const removeFromBreadcrumb = (payload) => ({
    type: REMOVE_FROM_BREADCRUMB,
    payload,
});

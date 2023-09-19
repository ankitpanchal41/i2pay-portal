import { SET_CURRENCY_TYPE_REQUEST, SET_LISTING_TYPE_REQUEST, SET_MENU_TYPE_REQUEST } from "../../actions/Menu";

const initialState = {
    menuType: "",
    listingType: "",
    currencyType: "",
};

const MenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MENU_TYPE_REQUEST:
            return {
                ...state,
                menuType: action?.payload?.menuType,
            };
        case SET_LISTING_TYPE_REQUEST:
            return {
                ...state,
                listingType: action?.payload?.listingType,
            };
        case SET_CURRENCY_TYPE_REQUEST:
            return {
                ...state,
                currencyType: action?.payload?.currencyType,
            };

        default:
            return state;
    }
};

export default MenuReducer;

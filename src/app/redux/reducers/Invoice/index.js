import {
    ADD_INVOICE_RESPONSE,
    DELETE_INVOICE_RESPONSE,
    DETAIL_INVOICE_RESPONSE,
    LIST_INVOICE_REQUEST,
    LIST_INVOICE_RESPONSE,
    SET_SEND_INVOICE_RESPONSE,
} from "../../types/Invoice";

const initialState = {
    invoiceList: [],
    invoiceDetail: {},
    currentPage: 1,
    totalPage: 1,
    perPage: 10,
};

const InvoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INVOICE_RESPONSE:
            return {
                ...state,
                invoiceList: [...state?.invoiceList, action?.data?.data],
            };

        case DELETE_INVOICE_RESPONSE:
            return {
                ...state,
                invoiceList: state.invoiceList.filter((item) => item?.id !== action?.id),
            };

        case LIST_INVOICE_REQUEST:
            return {
                ...state,
                invoiceList: [],
            };

        case LIST_INVOICE_RESPONSE:
            return {
                ...state,
                invoiceList: action.payload?.invoiceList || [],
                currentPage: Number(action?.payload?.paginate?.page) || 1,
                totalPage: Number(action?.payload?.paginate?.totalPage) || 1,
                perPage: Number(action?.payload?.paginate?.perPage) || 10,
            };

        case SET_SEND_INVOICE_RESPONSE:
            const tempInvoiceList = [...state.invoiceList];
            const findIndex = tempInvoiceList.findIndex((item) => item?.id === action?.payload?.id);

            if (findIndex !== -1) {
                tempInvoiceList[findIndex]["invoiceEmailCount"] = action?.payload?.value;
            }

            return {
                ...state,
                invoiceList: tempInvoiceList,
            };

        case DETAIL_INVOICE_RESPONSE:
            return {
                ...state,
                invoiceDetail: action?.data?.data || {},
            };

        default:
            return state;
    }
};

export default InvoiceReducer;

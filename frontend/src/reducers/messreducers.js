import { MESS_LIST_REQUEST, MESS_LIST_SUCCESS, MESS_LIST_FAIL, MESS_DETAILS_FAIL, MESS_DETAILS_REQUEST, MESS_DETAILS_SUCCESS, MESS_UPDATE_REQUEST, MESS_UPDATE_SUCCESS, MESS_UPDATE_FAIL, MESS_UPDATE_RESET, MESS_DELETE_REQUEST, MESS_DELETE_SUCCESS, MESS_DELETE_FAIL, MESS_ADD_REQUEST, MESS_ADD_SUCCESS, MESS_ADD_FAIL, MESS_ADD_RESET, MESS_SEARCH_REQUEST, MESS_SEARCH_SUCCESS, MESS_SEARCH_FAIL } from '../constants/messconstants';

export const messlistReducer = (state = { messes: [] }, action) => {
    switch (action.type) {
        case MESS_LIST_REQUEST:
            return { loading: true, messes: [] };
        case MESS_LIST_SUCCESS:
            return { loading: false, messes: action.payload };
        case MESS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const messdetailsReducer = (state = { mess: {} }, action) => {
    switch (action.type) {
        case MESS_DETAILS_REQUEST:
            return { loading: true, ...state };
        case MESS_DETAILS_SUCCESS:
            return { loading: false, mess: action.payload };
        case MESS_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deletemessReducer = (state = {}, action) => {
    switch (action.type) {
        case MESS_DELETE_REQUEST:
            return { loading: true };
        case MESS_DELETE_SUCCESS:
            return { loading: false, success: true };
        case MESS_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const updatemessReducer = (state = { mess: {} }, action) => {
    switch (action.type) {
        case MESS_UPDATE_REQUEST:
            return { loading: true };
        case MESS_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case MESS_UPDATE_FAIL:
            return { loading: false, success: false, error: action.payload };
        case MESS_UPDATE_RESET:
            return { mess: {} };
        default:
            return state;
    }
};

export const addmessReducer = (state = { mess: {} }, action) => {
    switch (action.type) {
        case MESS_ADD_REQUEST:
            return { loading: true };
        case MESS_ADD_SUCCESS:
            return { loading: false, success: true, mess: action.payload };
        case MESS_ADD_FAIL:
            return { loading: false, success: false, error: action.payload };
        case MESS_ADD_RESET:
            return { mess: {} };
        default:
            return state;
    }
};

export const messsearchReducer = (state = { messes: [] }, action) => {
    switch (action.type) {
        case MESS_SEARCH_REQUEST:
            return { loading: true, messes: [] };
        case MESS_SEARCH_SUCCESS:
            return { loading: false, success: true, messes: action.payload };
        case MESS_SEARCH_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};
import { MESS_LIST_REQUEST, MESS_LIST_SUCCESS, MESS_LIST_FAIL, MESS_DETAILS_FAIL, MESS_DETAILS_REQUEST, MESS_DETAILS_SUCCESS } from '../constants/messconstants';

export const messlistReducer =  (state = {messes:[]}, action) => {
    switch(action.type){
        case MESS_LIST_REQUEST:
            return {loading: true, messes:[]};
        case MESS_LIST_SUCCESS:
            return {loading: false, messes: action.payload};
        case MESS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const messdetailsReducer =  (state = {mess:[]}, action) => {
    switch(action.type){
        case MESS_DETAILS_REQUEST:
            return {loading: true, ...state};
        case MESS_DETAILS_SUCCESS:
            return {loading: false, mess: action.payload};
        case MESS_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

import { MESS_LIST_REQUEST, MESS_LIST_SUCCESS, MESS_LIST_FAIL } from '../constants/messconstants';

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
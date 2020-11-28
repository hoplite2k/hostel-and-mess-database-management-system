import { USER_LOGIN_FAIL,USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_UPDATE_PASSWORD_FAIL, USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_RESET, USER_UPDATE_PASSWORD_SUCCESS } from '../constants/userconstants';

export const userloginReducer = (state = { }, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}; 
        case USER_LOGIN_SUCCESS:
            return {loading:false, userinfo:action.payload};
        case USER_LOGIN_FAIL:
            return {loading:false, error:action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userdetailsReducer = (state = {user: { employeeid: { } } }, action) => {
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {loading:true, ...state}; 
        case USER_DETAILS_SUCCESS:
            return {loading:false, user:action.payload};
        case USER_DETAILS_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
};

export const userupdatepasswordReducer = (state = { }, action) => {
    switch(action.type){
        case USER_UPDATE_PASSWORD_REQUEST:
            return {loading:true}; 
        case USER_UPDATE_PASSWORD_SUCCESS:
            return {loading:false, success:true, userinfo:action.payload};
        case USER_UPDATE_PASSWORD_FAIL:
            return {loading:false, error:action.payload};
        case USER_UPDATE_PASSWORD_RESET:
            return {loading:false, success:false};
        default:
            return state;
    }
};
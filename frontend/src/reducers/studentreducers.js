import { STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_REQUEST, STUDENT_DELETE_FAIL, STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_RESET, STUDENT_UPDATE_SUCCESS } from '../constants/studentconstants';

export const studentlistReducer = (state = {students: []}, action) => {
    switch(action.type){
        case STUDENT_LIST_REQUEST:
            return {loading:true, students:[]}; 
        case STUDENT_LIST_SUCCESS:
            return {loading:false, students:action.payload};
        case STUDENT_LIST_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
};

export const studentdetailsReducer = (state = {student: {parents:{}}}, action) => {
    switch(action.type){
        case STUDENT_DETAILS_REQUEST:
            return {loading:true, ...state}; 
        case STUDENT_DETAILS_SUCCESS:
            return {loading:false, student:action.payload};
        case STUDENT_DETAILS_FAIL:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
};

export const deletestudentReducer = (state = {}, action) => {
    switch(action.type){
        case STUDENT_DELETE_REQUEST:
            return {loading:true}; 
        case STUDENT_DELETE_SUCCESS:
            return {loading:false, success:true};
        case STUDENT_DELETE_FAIL:
            return {loading:false, success:false, error:action.payload};
        default:
            return state;
    }
};

export const updatestudentReducer = (state = {student: {parents:{}}}, action) => {
    switch(action.type){
        case STUDENT_UPDATE_REQUEST:
            return {loading:true}; 
        case STUDENT_UPDATE_SUCCESS:
            return {loading:false, success:true};
        case STUDENT_UPDATE_FAIL:
            return {loading:false, success:false, error:action.payload};
        case STUDENT_UPDATE_RESET:
            return {student: {parents:{}}};
        default:
            return state;
    }
};
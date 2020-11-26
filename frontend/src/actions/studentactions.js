import axios from 'axios';
import { STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_REQUEST } from '../constants/studentconstants';

export const liststudents = () => async (dispatch) => {
    try {
        dispatch({type:STUDENT_LIST_REQUEST});

        const { data } = await axios.get('/students');
        dispatch({
            type: STUDENT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STUDENT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const liststudentdetails = (id) => async (dispatch) => {
    try {
        dispatch({type:STUDENT_DETAILS_REQUEST});

        const { data } = await axios.get(`/students/${id}`);
        dispatch({
            type: STUDENT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STUDENT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};
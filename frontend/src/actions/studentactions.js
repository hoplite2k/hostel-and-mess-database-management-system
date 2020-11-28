import axios from 'axios';
import { STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_REQUEST } from '../constants/studentconstants';

export const liststudents = () => async (dispatch, getState) => {
    try {
        dispatch({type:STUDENT_LIST_REQUEST});

        const {userlogin: {userinfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/students', config);
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

export const liststudentdetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type:STUDENT_DETAILS_REQUEST});

        const {userlogin: {userinfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get(`/students/${id}`, config);
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
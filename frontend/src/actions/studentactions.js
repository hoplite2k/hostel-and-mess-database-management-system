import axios from 'axios';
import { STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_REQUEST, STUDENT_DELETE_FAIL, STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_SUCCESS, STUDENT_ADD_REQUEST, STUDENT_ADD_SUCCESS, STUDENT_ADD_FAIL } from '../constants/studentconstants';

export const liststudents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_LIST_REQUEST });

        const { userlogin: { userinfo } } = getState();

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
        dispatch({ type: STUDENT_DETAILS_REQUEST });

        const { userlogin: { userinfo } } = getState();

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

export const deletestudentdetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_DELETE_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        await axios.delete(`/students/${id}`, config);
        dispatch({
            type: STUDENT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: STUDENT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const updatestudentdetails = (student) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_UPDATE_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.put(`/students/${student._id}`, student, config);

        dispatch({
            type: STUDENT_UPDATE_SUCCESS,
        });

        dispatch({
            type: STUDENT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: STUDENT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const addnewstudent = (student) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_ADD_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.post(`/students`, student, config);
        dispatch({
            type: STUDENT_ADD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: STUDENT_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};
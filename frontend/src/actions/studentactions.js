import axios from 'axios';
import { STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_REQUEST, STUDENT_DELETE_FAIL, STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_SUCCESS, STUDENT_ADD_REQUEST, STUDENT_ADD_SUCCESS, STUDENT_ADD_FAIL, STUDENT_SEARCH_SUCCESS, STUDENT_SEARCH_FAIL, STUDENT_SEARCH_REQUEST, STUDENT_LIST_ALL_REQUEST, STUDENT_LIST_ALL_SUCCESS, STUDENT_LIST_ALL_FAIL } from '../constants/studentconstants';

export const liststudents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_LIST_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/api/students', config);
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

        const { data } = await axios.get(`/api/students/${id}`, config);
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

        await axios.delete(`/api/students/${id}`, config);
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

        const { data } = await axios.put(`/api/students/${student._id}`, student, config);

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

        const { data } = await axios.post(`/api/students`, student, config);
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

export const searchstudents = (student) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_SEARCH_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.post('/api/students/search', student, config);
        dispatch({
            type: STUDENT_SEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STUDENT_SEARCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const listallstudents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_LIST_ALL_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/api/students/all', config);
        dispatch({
            type: STUDENT_LIST_ALL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STUDENT_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};
import axios from 'axios';
import { EMPLOYEE_LIST_REQUEST, EMPLOYEE_LIST_SUCCESS, EMPLOYEE_LIST_FAIL, EMPLOYEE_DETAILS_FAIL, EMPLOYEE_DETAILS_REQUEST, EMPLOYEE_DETAILS_SUCCESS, EMPLOYEE_DELETE_FAIL, EMPLOYEE_DELETE_REQUEST, EMPLOYEE_DELETE_SUCCESS, EMPLOYEE_UPDATE_REQUEST, EMPLOYEE_UPDATE_SUCCESS, EMPLOYEE_UPDATE_FAIL, EMPLOYEE_ADD_SUCCESS, EMPLOYEE_ADD_FAIL, EMPLOYEE_ADD_REQUEST } from '../constants/employeeconstants';

export const listemployees = () => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_LIST_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/employees', config);
        dispatch({
            type: EMPLOYEE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EMPLOYEE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const listemployeesdetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_DETAILS_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get(`/employees/${id}`, config);
        dispatch({
            type: EMPLOYEE_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: EMPLOYEE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const deleteemployeedetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_DELETE_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        await axios.delete(`/employees/${id}`, config);
        dispatch({
            type: EMPLOYEE_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: EMPLOYEE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const updateemployeedetails = (employee) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_UPDATE_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.put(`/employees/${employee._id}`, employee, config);

        dispatch({
            type: EMPLOYEE_UPDATE_SUCCESS,
        });

        dispatch({
            type: EMPLOYEE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: EMPLOYEE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const addnewemployee = (employee) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPLOYEE_ADD_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.post(`/employees`, employee, config);
        dispatch({
            type: EMPLOYEE_ADD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: EMPLOYEE_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};
import axios from 'axios';
import { EMPLOYEE_LIST_REQUEST, EMPLOYEE_LIST_SUCCESS, EMPLOYEE_LIST_FAIL, EMPLOYEE_DETAILS_FAIL, EMPLOYEE_DETAILS_REQUEST, EMPLOYEE_DETAILS_SUCCESS } from '../constants/employeeconstants';

export const listemployees = () => async (dispatch, getState) => {
    try {
        dispatch({type: EMPLOYEE_LIST_REQUEST});

        const {userlogin: {userinfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const {data} = await axios.get('/employees', config);
        dispatch({
            type: EMPLOYEE_LIST_SUCCESS, 
            payload:data,
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
        dispatch({type: EMPLOYEE_DETAILS_REQUEST});

        const {userlogin: {userinfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const {data} = await axios.get(`/employees/${id}`, config);
        dispatch({
            type: EMPLOYEE_DETAILS_SUCCESS, 
            payload:data,
        });
    } catch (error) {
        dispatch({
            type: EMPLOYEE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};
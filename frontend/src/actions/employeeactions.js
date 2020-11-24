import axios from 'axios';
import { EMPLOYEE_LIST_REQUEST, EMPLOYEE_LIST_SUCCESS, EMPLOYEE_LIST_FAIL } from '../constants/employeeconstants';

export const listemployees = () => async (dispatch) => {
    try {
        dispatch({type: EMPLOYEE_LIST_REQUEST});

        const {data} = await axios.get('/employees');
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
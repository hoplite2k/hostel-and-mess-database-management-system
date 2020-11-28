import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_UPDATE_PASSWORD_FAIL, USER_UPDATE_PASSWORD_REQUEST, USER_UPDATE_PASSWORD_RESET, USER_UPDATE_PASSWORD_SUCCESS } from '../constants/userconstants';
import axios from 'axios';

export const login = (id, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.post('/users/login', {id, password}, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userinfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userinfo');
    dispatch({
        type: USER_LOGOUT,
    });
}

export const getuserdetails = (id) => async(dispatch, getState) => {
    try {

        dispatch({
            type: USER_UPDATE_PASSWORD_RESET
        })

        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const { userlogin: {userinfo} } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const {data} = await axios.get(`/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
}

export const updateuserpassword = (user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PASSWORD_REQUEST
        });

        const { userlogin: {userinfo} } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const {data} = await axios.put(`/users/profile`, user, config);

        dispatch({
            type: USER_UPDATE_PASSWORD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
}
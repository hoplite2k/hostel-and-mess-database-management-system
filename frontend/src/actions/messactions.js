import axios from 'axios';
import { MESS_LIST_REQUEST, MESS_LIST_SUCCESS, MESS_LIST_FAIL, MESS_DETAILS_FAIL, MESS_DETAILS_REQUEST, MESS_DETAILS_SUCCESS, MESS_UPDATE_REQUEST, MESS_UPDATE_SUCCESS, MESS_UPDATE_FAIL, MESS_DELETE_REQUEST, MESS_DELETE_SUCCESS, MESS_DELETE_FAIL, MESS_ADD_REQUEST, MESS_ADD_SUCCESS, MESS_ADD_FAIL, MESS_SEARCH_REQUEST, MESS_SEARCH_SUCCESS, MESS_SEARCH_FAIL } from '../constants/messconstants';

export const listmess = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MESS_LIST_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/mess', config);
        dispatch({
            type: MESS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MESS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const listmessdetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MESS_DETAILS_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get(`/mess/${id}`, config);
        dispatch({
            type: MESS_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MESS_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const deletemessdetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MESS_DELETE_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        await axios.delete(`/mess/${id}`, config);
        dispatch({
            type: MESS_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: MESS_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const updatemessdetails = (mess) => async (dispatch, getState) => {
    try {
        dispatch({ type: MESS_UPDATE_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.put(`/mess/${mess._id}`, mess, config);

        dispatch({
            type: MESS_UPDATE_SUCCESS,
        });

        dispatch({
            type: MESS_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: MESS_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const addnewmess = (mess) => async (dispatch, getState) => {
    try {
        dispatch({ type: MESS_ADD_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.post(`/mess`, mess, config);
        dispatch({
            type: MESS_ADD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MESS_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const searchmess = (mess) => async (dispatch, getState) => {
    try {
        dispatch({ type: MESS_SEARCH_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.post('/mess/search', mess, config);
        dispatch({
            type: MESS_SEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MESS_SEARCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

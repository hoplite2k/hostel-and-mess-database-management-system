import axios from 'axios';
import { ROOM_LIST_REQUEST, ROOM_LIST_SUCCESS, ROOM_LIST_FAIL, ROOM_DETAILS_FAIL, ROOM_DETAILS_REQUEST, ROOM_DETAILS_SUCCESS, ROOMSET_ADD_FAIL, ROOMSET_ADD_REQUEST, ROOMSET_ADD_SUCCESS, ROOMSET_DELETE_REQUEST, ROOMSET_DELETE_SUCCESS, ROOMSET_DELETE_FAIL, ROOM_SEARCH_REQUEST, ROOM_SEARCH_SUCCESS, ROOM_SEARCH_FAIL, ROOM_LIST_ALL_REQUEST, ROOM_LIST_ALL_SUCCESS, ROOM_LIST_ALL_FAIL } from '../constants/roomconstants';

export const listrooms = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_LIST_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/api/rooms', config);
        dispatch({
            type: ROOM_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const listroomdetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_DETAILS_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get(`/api/rooms/${id}`, config);
        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const roomsetdelete = (room) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOMSET_DELETE_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            },
            data: room
        };

        await axios.delete('/api/rooms', config);
        dispatch({
            type: ROOMSET_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: ROOMSET_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const addnewroomset = (room) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOMSET_ADD_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.post(`/api/rooms`, room, config);
        dispatch({
            type: ROOMSET_ADD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ROOMSET_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const searchrooms = (room) => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_SEARCH_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.post('/api/rooms/search', room, config);
        dispatch({
            type: ROOM_SEARCH_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_SEARCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const listallrooms = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_LIST_ALL_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/api/rooms/all', config);
        dispatch({
            type: ROOM_LIST_ALL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_LIST_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

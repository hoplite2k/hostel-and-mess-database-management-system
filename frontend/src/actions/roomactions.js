import axios from 'axios';
import { ROOM_LIST_REQUEST, ROOM_LIST_SUCCESS, ROOM_LIST_FAIL, ROOM_DETAILS_FAIL, ROOM_DETAILS_REQUEST, ROOM_DETAILS_SUCCESS, ROOMSET_ADD_FAIL, ROOMSET_ADD_REQUEST, ROOMSET_ADD_SUCCESS, ROOMSET_DELETE_REQUEST, ROOMSET_DELETE_SUCCESS, ROOMSET_DELETE_FAIL } from '../constants/roomconstants';

export const listrooms = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ROOM_LIST_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/rooms', config);
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

        const { data } = await axios.get(`/rooms/${id}`, config);
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

        await axios.delete('/rooms', config);
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

        const { data } = await axios.post(`/rooms`, room, config);
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
